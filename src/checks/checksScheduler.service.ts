import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CreateCheckDto } from './dto/create-check.dto';
import { v4 as uuid } from 'uuid';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ChecksScheduler {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly clientService: ClientsService,
  ) {}

  scheduleChecks(checkConfig: CreateCheckDto) {
    const job = new CronJob(`*/${checkConfig.interval} * * * * *`, async () => {
      console.log(`cron job that runs every ${checkConfig.interval} secs`);
      const res = await this.clientService.httpClientAPI.get(checkConfig.url, {
        timeout: checkConfig.timeout,
        ignoreSsl: checkConfig.ignore_ssl,
        authentication: checkConfig.authentication,
      });

      // console.log(`http call response`, res);
      // console.log(`=======================`);
    });

    this.schedulerRegistry.addCronJob(`${checkConfig.name}-${uuid()}`, job);
    job.start();
  }
}
