import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // initialize configService to get data from it
  const configService = app.get(ConfigService);

  // get port from configService
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
