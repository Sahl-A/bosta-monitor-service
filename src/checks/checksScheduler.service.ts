import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CreateCheckDto } from './dto/create-check.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ChecksScheduler {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  scheduleChecks(checkConfigs: CreateCheckDto) {
    const job = new CronJob(`*/${checkConfigs.interval} * * * * *`, () => {
      console.log(`cron job that runs every ${checkConfigs.interval} secs`);
    });

    this.schedulerRegistry.addCronJob(`${checkConfigs.name}-${uuid()}`, job);
    job.start();
  }
}
