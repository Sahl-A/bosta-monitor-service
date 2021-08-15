import { Injectable } from '@nestjs/common';
import { ChecksScheduler } from './checksScheduler.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
import { CheckConfigRepository } from './entities/check-config.repository';
import { CheckRepository } from './entities/check.repository';

@Injectable()
export class ChecksService {
  constructor(
    private checkRepository: CheckRepository,
    private checkConfigRepository: CheckConfigRepository,
    private checkScheduler: ChecksScheduler,
  ) {}
  async create(createCheckDto: CreateCheckDto) {
    // create a check
    const newCheck = await this.checkRepository.createCheck();

    // Add check config
    await this.checkConfigRepository.addConfig(createCheckDto, newCheck);

    // run a job with interval from createCheckDto
    this.checkScheduler.scheduleChecks(createCheckDto);

    return newCheck.uuid;
  }

  findAll() {
    return `This action returns all checks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} check`;
  }

  update(id: number, updateCheckDto: UpdateCheckDto) {
    return `This action updates a #${id} check`;
  }

  remove(id: number) {
    return `This action removes a #${id} check`;
  }
}
