import { Module } from '@nestjs/common';
import { ChecksModule } from './checks/checks.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app';
import dbConfig from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot(dbConfig),
  ],
})
export class AppModule {}
