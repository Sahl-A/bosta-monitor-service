import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return `This action returns a #${id} check`;
  }

  update(id: number, updateCheckDto: UpdateCheckDto) {
    return `This action updates a #${id} check`;
  }

  remove(id: number) {
    return `This action removes a #${id} check`;
  }
}
