import { User } from '../../users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Check } from './check.entity';

@EntityRepository(Check)
export class CheckRepository extends Repository<Check> {
  public async createCheck(user: User): Promise<Check> {
    const newCheck = this.create();
    newCheck.user = user;
    return await this.save(newCheck);
  }
}
