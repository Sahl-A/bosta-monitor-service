import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // If user is not found
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    // If passwords do not match
    const isPassMatch = await this.userService.comparePass(pass, user.password);
    if (!isPassMatch) {
      return null;
    }
    // else return the below
    return user;
  }
}
