import { Entity, OneToMany } from 'typeorm';

import Model from '../../shared/database/entity.model';
import { CheckLog } from './check-log.entity';

@Entity({ name: 'checks' })
export class Check extends Model {
  @OneToMany(() => CheckLog, (log) => log.check)
  logs: CheckLog[];
}
