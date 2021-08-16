import { User } from '../../users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import Model from '../../shared/database/entity.model';
import { CheckLog } from './check-log.entity';

@Entity({ name: 'checks' })
export class Check extends Model {
  @OneToMany(() => CheckLog, (log) => log.check)
  logs: CheckLog[];

  // many-to-one relation with users
  @ManyToOne(() => User, (user) => user.checks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
