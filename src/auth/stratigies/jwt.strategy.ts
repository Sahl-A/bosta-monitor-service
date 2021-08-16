import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IjwtPayload } from 'src/shared/interfaces/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  // When reaching for protected endpoint, the JwtModule registered in auth.module
  // will run and activate the appropriate strategy provided in Guard before the endpoint
  // if jwt is provided, it will extract the token from the body.req.
  // if the token is valid, it will return uuid and email below. If not, it will throw an error
  async validate(payload: IjwtPayload) {
    // get the user from database
    const user = await this.userService.findByEmail(payload.email);
    return user;
  }
}
