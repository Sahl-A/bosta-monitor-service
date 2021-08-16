import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IjwtPayload } from 'src/shared/interfaces/jwtPayload.interface';
import { SignupDto } from './dto/signup.dto';

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

  async signup(signupDto: SignupDto) {
    // check if the email already exists
    const currUser = await this.userService.findByEmail(signupDto.email);

    if (currUser) {
      throw new BadRequestException('Please choose another email');
    }
    // Create user & save it to db
    const user = await this.userService.create(signupDto);

    return user;
  }

  async login(user: User) {
    const payload: IjwtPayload = { email: user.email, uuid: user.uuid };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
