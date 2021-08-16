import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  async login(user: User) {
    const payload = { email: user.email, sub: user.uuid };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
