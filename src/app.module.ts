import { Module } from '@nestjs/common';
import { ChecksModule } from './checks/checks.module';

@Module({
  imports: [ChecksModule],
})
export class AppModule {}
