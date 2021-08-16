import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async comparePasswords(attempt: string, password: string) {
    return await bcrypt.compare(attempt, password);
  }
}
