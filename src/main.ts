import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../openAPI/monitor.openAPI.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // initialize configService to get data from it
  const configService = app.get(ConfigService);

  // get the swagger definitions
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // get port from configService
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
