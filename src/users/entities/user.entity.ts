import { Entity, Column, Unique, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import Model from '../../shared/database/entity.model';
import { Check } from '../../checks/entities/check.entity';
@Entity({ name: 'users' })
@Unique(['email'])
export class User extends Model {
  // one-to-many relation with checks table
  @OneToMany(() => Check, (check) => check.user)
  checks: Check[];

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  passwordConfirm: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 12);
  }

  // Hide id when fetching from table
  toJSON() {
    return { ...this, id: undefined, passwordConfirm: undefined };
  }
}
