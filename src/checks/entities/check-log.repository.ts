import { EntityRepository, Repository } from 'typeorm';
import { CheckLog } from './check-log.entity';

@EntityRepository(CheckLog)
export class CheckLogRepository extends Repository<CheckLog> {}
