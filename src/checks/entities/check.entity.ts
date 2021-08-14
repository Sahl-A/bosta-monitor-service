import { Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import Model from '../../shared/database/entity.model';
import { CheckConfig } from './check-config.entity';
import { CheckLog } from './check-log.entity';

@Entity({ name: 'checks' })
export class Check extends Model {
  @OneToOne(() => CheckConfig, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'checks_config_id' })
  config: CheckConfig;

  @OneToMany(() => CheckLog, (log) => log.check)
  logs: CheckLog[];
}
