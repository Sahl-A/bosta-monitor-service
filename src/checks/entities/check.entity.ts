import { User } from '../../users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import Model from '../../shared/database/entity.model';
import { CheckLog } from './check-log.entity';
import { CheckConfig } from './check-config.entity';

@Entity({ name: 'checks' })
export class Check extends Model {
  // one-to-many with logs
  @OneToMany(() => CheckLog, (log) => log.check)
  logs: CheckLog[];

  // many-to-one relation with users
  @ManyToOne(() => User, (user) => user.checks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // one-to-one with config
  @OneToOne(() => CheckConfig, (checkConfig) => checkConfig.check, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  config: CheckConfig;
}
