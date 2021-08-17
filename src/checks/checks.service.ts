import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { ChecksScheduler } from './checksScheduler.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
import { CheckConfigRepository } from './entities/check-config.repository';
import { Check } from './entities/check.entity';
import { CheckRepository } from './entities/check.repository';

@Injectable()
export class ChecksService {
  constructor(
    private checkRepository: CheckRepository,
    private checkConfigRepository: CheckConfigRepository,
    private checkScheduler: ChecksScheduler,
  ) {}
  async create(user: User, createCheckDto: CreateCheckDto): Promise<string> {
    // create a check
    const newCheck = await this.checkRepository.createCheck(user);

    // Add check config
    await this.checkConfigRepository.addConfig(createCheckDto, newCheck);

    // run a job with interval from createCheckDto
    this.checkScheduler.scheduleChecks(user, newCheck, createCheckDto);

    return newCheck.uuid;
  }

  async findAll(user: User): Promise<Check[]> {
    const checks = await this.checkRepository
      .createQueryBuilder('checks')
      .where('checks.user.id = :id', { id: user.id })
      .innerJoinAndSelect('checks.logs', 'log')
      .getMany();

    return checks;
  }

  async findOne(checkUuid: string, user: User): Promise<Check> {
    return await this.checkRepository
      .createQueryBuilder('checks')
      .where('checks.user.id = :id', { id: user.id })
      .where('checks.uuid = :id', { id: checkUuid })
      .innerJoinAndSelect('checks.logs', 'log')
      .getOne();
  }

  update(id: number, updateCheckDto: UpdateCheckDto) {
    return `This action updates a #${id} check`;
  }

  async remove(checkUuid: string, user: User): Promise<void> {
    // get all checks of this user
    const checks = await this.checkRepository
      .createQueryBuilder('checks')
      .where('checks.user.id = :id', { id: user.id })
      .getMany();

    // throw error if check is not created by user
    if (!checks.some((check) => check.uuid === checkUuid)) {
      throw new UnauthorizedException('Unauthorized');
    }

    // delete the check
    await this.checkRepository.delete({
      uuid: checkUuid,
    });
  }
}
