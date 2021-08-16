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

      // Add log to db
      await this.checksLogRepository.addLog(check, {
        responseTime: res.responseTime,
        status: res.data.isSucceeded ? 'up' : 'down',
      });

      // get last log status (up or down)
      const lastLogStatus = await this.checksLogRepository.getLastLogStatus();

      // if server status changed since last log
      if (
        (res.data.isSucceeded && lastLogStatus === 'down') ||
        (!res.data.isSucceeded && lastLogStatus === 'up')
      ) {
        console.log(`Server went ${res.data.isSucceeded ? 'up' : 'down'}`);
      }
    });

    this.schedulerRegistry.addCronJob(check.uuid, job);

    job.start();
  }
}
