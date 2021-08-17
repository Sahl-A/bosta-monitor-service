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

  public async findUserSingleCheck(userUuid: string, checkUuid: string) {
    return await this.createQueryBuilder('checks')
      .where('checks.user.uuid = :uuid', { uuid: userUuid })
      .where('checks.uuid = :uuid', { uuid: checkUuid })
      .innerJoinAndSelect('checks.logs', 'log')
      .innerJoinAndSelect('checks.config', 'config')
      .getOne();
  }

  public async findUserChecks(userUuid: string): Promise<Check[]> {
    return await this.createQueryBuilder('checks')
      .where('user.uuid = :uuid', { uuid: userUuid })
      .innerJoinAndSelect('checks.logs', 'log')
      .innerJoinAndSelect('checks.user', 'user')
      .innerJoinAndSelect('checks.config', 'config')
      .getMany();
  }

  public async findAllChecks(): Promise<Check[]> {
    return await this.createQueryBuilder('checks')
      .innerJoinAndSelect('checks.logs', 'log')
      .innerJoinAndSelect('checks.user', 'user')
      .innerJoinAndSelect('checks.config', 'config')
      .getMany();
  }
}
