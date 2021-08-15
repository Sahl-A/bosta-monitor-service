import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CreateCheckDto } from './dto/create-check.dto';
import { v4 as uuid } from 'uuid';
import { ClientsService } from 'src/clients/clients.service';
import { Check } from './entities/check.entity';
import { CheckLogRepository } from './entities/check-log.repository';

@Injectable()
export class ChecksScheduler {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly clientService: ClientsService,
    private readonly checksLogRepository: CheckLogRepository,
  ) {}

  scheduleChecks(check: Check, checkConfig: CreateCheckDto) {
    const job = new CronJob(`*/${checkConfig.interval} * * * * *`, async () => {
      console.log(`cron job that runs every ${checkConfig.interval} secs`);
      const res = await this.clientService.httpClientAPI.get(checkConfig.url, {
        timeout: checkConfig.timeout,
        ignoreSsl: checkConfig.ignore_ssl,
        authentication: checkConfig.authentication,
      });

      // get last log status (up or down)
      const lastLogStatus = await this.checksLogRepository.getLastLogStatus();

      // Add log to db
      await this.checksLogRepository.addLog(check, {
        responseTime: res.responseTime,
        status: res.data.isSucceeded ? 'up' : 'down',
      });

      // if server status changed since last log
      if (
        (res.data.isSucceeded && lastLogStatus === 'down') ||
        (!res.data.isSucceeded && lastLogStatus === 'up')
      ) {
        console.log(`Server went ${res.data.isSucceeded ? 'up' : 'down'}`);
      }
    });

    const cronJobName = `${checkConfig.name}-${uuid()}`;
    this.schedulerRegistry.addCronJob(cronJobName, job);

    job.start();
  }
}
