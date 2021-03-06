import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertProvidersModule } from '../alert-providers/alert-providers.module';
import { CheckConfigRepository } from '../checks/entities/check-config.repository';
import { CheckLogRepository } from '../checks/entities/check-log.repository';
import { CheckRepository } from '../checks/entities/check.repository';
import { ClientsModule } from '../clients/clients.module';
import { CheckJobService } from './check-job.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CheckRepository,
      CheckConfigRepository,
      CheckLogRepository,
    ]),
    ClientsModule,
    AlertProvidersModule,
  ],
  providers: [CheckJobService],
  exports: [CheckJobService],
})
export class JobsModule {}
