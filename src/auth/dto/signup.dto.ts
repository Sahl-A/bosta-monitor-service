import { IsEmail, IsString, MinLength } from 'class-validator';
import { Match } from '../../shared/validations/matchTwoFileds';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @Match('password')
  passwordConfirm: string;
}
