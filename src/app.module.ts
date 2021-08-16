import { Module } from '@nestjs/common';
import { ChecksModule } from './checks/checks.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import dbConfig from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const evnVariable = process.env.NODE_ENV;
@Module({
  imports: [
    ChecksModule,
    ConfigModule.forRoot({
      // load different .env files based on runtime environment variable
      envFilePath: !evnVariable ? '.development.env' : `.${evnVariable}.env`,
      isGlobal: true,
      load: [appConfig],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
