import { Injectable } from '@nestjs/common';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  async create(signupDto: SignupDto): Promise<User> {
    return await this.userRepository.addUser(signupDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // compare the attempt login password with the hashed stored pass
  async comparePass(attempt: string, hashedPass: string) {
    return await this.userRepository.comparePasswords(attempt, hashedPass);
  }
}
