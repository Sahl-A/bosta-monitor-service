import { EntityRepository, Repository } from 'typeorm';
import { CheckConfig } from './check-config.entity';

@EntityRepository(CheckConfig)
export class CheckConfigRepository extends Repository<CheckConfig> {}
