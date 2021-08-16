import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { SignupDto } from 'src/auth/dto/signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async comparePasswords(attempt: string, password: string) {
    return await bcrypt.compare(attempt, password);
  }

  async addUser(signupDto: SignupDto): Promise<User> {
    const user = this.create();
    user.email = signupDto.email;
    user.password = signupDto.password;
    user.name = signupDto.name;

    await this.save(user);

    return user;
  }
}
