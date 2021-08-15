import { Module } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { ChecksController } from './checks.controller';
import { CheckRepository } from './entities/check.repository';
import { CheckConfigRepository } from './entities/check-config.repository';
import { CheckLogRepository } from './entities/check-log.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecksScheduler } from './checksScheduler.service';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CheckRepository,
      CheckConfigRepository,
      CheckLogRepository,
    ]),
    ClientsModule,
  ],
  controllers: [ChecksController],
  providers: [ChecksService, ChecksScheduler],
})
export class ChecksModule {}
