import * as path from 'path';
import * as dotenv from 'dotenv';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env.NODE_ENV || 'development';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  console.log('Cannot resolve any environment variable file');
}

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  migrationsRun: true,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/shared/migrations/*.js'],
  cli: {
    entitiesDir: 'src/**/entity',
    migrationsDir: 'src/shared/migrations',
    subscribersDir: 'src/shared/subscribers',
  },
};

export default config;
