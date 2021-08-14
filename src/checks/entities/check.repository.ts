import { EntityRepository, Repository } from 'typeorm';
import { Check } from './check.entity';

@EntityRepository(Check)
export class CheckRepository extends Repository<Check> {
  public async createCheck(): Promise<Check> {
    const newCheck = this.create();
    return await this.save(newCheck);
  }
}
