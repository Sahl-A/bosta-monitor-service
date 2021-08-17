import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Ireport } from '../shared/interfaces/report.interface';
import { User } from '../users/entities/user.entity';
import { ChecksScheduler } from './checksScheduler.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { CheckConfigRepository } from './entities/check-config.repository';
import { CheckLogRepository } from './entities/check-log.repository';
import { Check } from './entities/check.entity';
import { CheckRepository } from './entities/check.repository';

@Injectable()
export class ChecksService implements OnModuleInit {
  constructor(
    private checkRepository: CheckRepository,
    private checkLogRepository: CheckLogRepository,
    private checkConfigRepository: CheckConfigRepository,
    private checkScheduler: ChecksScheduler,
  ) {}

  // start jobs for all checks found in DB
  async onModuleInit() {
    // get all checks
    const checks = await this.checkRepository.findAllChecks();
    checks.forEach((check) => {
      // run job for each check
      this.checkScheduler.scheduleChecks(check.user, check, check.config);
    });
  }

  async create(user: User, createCheckDto: CreateCheckDto): Promise<string> {
    // create a check
    const newCheck = await this.checkRepository.createCheck(user);

    // Add check config
    await this.checkConfigRepository.addConfig(createCheckDto, newCheck);

    // run a job with interval from createCheckDto
    this.checkScheduler.scheduleChecks(user, newCheck, createCheckDto);

    return newCheck.uuid;
  }

  async findAll(user: User): Promise<{ checksCount: number; checks: Check[] }> {
    const checks = await this.checkRepository.findUserChecks(user.uuid);
    return {
      checksCount: checks.length,
      checks,
    };
  }

  async findOne(checkUuid: string, user: User): Promise<Check> {
    return await this.checkRepository.findUserSingleCheck(user.uuid, checkUuid);
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

    // kill the job of this check
    this.checkScheduler.killJob(checkUuid);
  }

  async getCheckReport(user: User, checkUuid: string): Promise<Ireport> {
    const check = await this.checkRepository.findUserSingleCheck(
      user.uuid,
      checkUuid,
    );

    // get average reponse time
    const avgResponseTime = await this.checkLogRepository.getAvgResTime(
      checkUuid,
    );

    // get up & down status count
    const logsConut = check.logs.length;
    const upCount = await this.checkLogRepository.count({
      where: { status: 'up', check: { uuid: checkUuid } },
      relations: ['check'],
    });
    const downCount = Math.abs(logsConut - upCount);

    return {
      status: check.logs[0].status,
      outages: downCount,
      availability: Math.round((upCount / logsConut) * 100),
      downtime: downCount * check.config.interval,
      uptime: upCount * check.config.interval,
      averageResponseTime: avgResponseTime,
      history: check.logs,
    };
  }
}
