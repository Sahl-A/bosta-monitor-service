import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import Model from '../../shared/database/entity.model';
import { Check } from './check.entity';

@Entity({ name: 'checks_logs' })
export class CheckLog extends Model {
  @Column()
  status: string;

  @Column()
  response_time: string;

  // many to one relation with Check entity
  @ManyToOne(() => Check, (check) => check.logs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'check_id' })
  check: Check;
}
