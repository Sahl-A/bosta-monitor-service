import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

export interface IextendedRequest extends Request {
  user: User;
}
