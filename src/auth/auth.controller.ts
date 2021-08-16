import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { IextendedRequest } from '../shared/interfaces/extendedRequest.inteface';
import { SignupDto } from './dto/signup.dto';
import { Itoken } from 'src/shared/interfaces/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto): Promise<Itoken> {
    return await this.authService.signup(signupDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: IextendedRequest): Promise<Itoken> {
    return this.authService.login(req.user);
  }
}
