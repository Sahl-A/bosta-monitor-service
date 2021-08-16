import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { CreateCheckDto } from './dto/create-check.dto';
import { Check } from './entities/check.entity';
import { CheckJobService } from '../jobs/check-job.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ChecksScheduler {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly checkActions: CheckJobService,
  ) {}

  scheduleChecks(user: User, check: Check, checkConfig: CreateCheckDto) {
    const job = new CronJob(`*/${checkConfig.interval} * * * * *`, async () => {
      await this.checkActions.checkActions(user, check, checkConfig);
    });

    this.schedulerRegistry.addCronJob(check.uuid, job);

    job.start();
  }
}
