import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import Model from '../../shared/database/entity.model';
import { Check } from './check.entity';

@Entity({ name: 'checks_config' })
export class CheckConfig extends Model {
  // one-to-one relation with check entity
  @OneToOne(() => Check, (check) => check.config)
  @JoinColumn({ name: 'checks_id' })
  check: Check;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  @Column()
  protocol: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  webhook: string;

  @Column({ default: 5 })
  timeout: number; // time in seconds

  @Column({ default: 600 })
  interval: number; // time in seconds

  @Column({ default: 1 })
  threshold: number; // The threshold of failed requests that will create an alert

  @Column({ nullable: true }) // An HTTP authentication header, with the Basic scheme, to be sent with the polling request
  auth_username: string;

  @Column({ nullable: true }) // An HTTP authentication header, with the Basic scheme, to be sent with the polling request
  auth_password: string;

  @Column({ nullable: true })
  ignore_ssl: boolean; // A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol.

  @Column('text', { array: true })
  tags: string[];
}
