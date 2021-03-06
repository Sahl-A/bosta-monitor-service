import { IcheckLogs } from '../../shared/interfaces/checkLogs.interface';
import { EntityRepository, Repository } from 'typeorm';
import { CheckLog } from './check-log.entity';
import { Check } from './check.entity';

@EntityRepository(CheckLog)
export class CheckLogRepository extends Repository<CheckLog> {
  async addLog(check: Check, logs: IcheckLogs): Promise<void> {
    const newLog = this.create();

    newLog.check = check;
    newLog.status = logs.status;
    newLog.response_time = logs.responseTime || null;

    await this.save(newLog);
  }

  async getLastLogStatus(checkUuid: string): Promise<string> {
    const lastLog = await this.find({
      order: { created_at: 'DESC' },
      relations: ['check'],
      where: { check: { uuid: checkUuid } },
      take: 2,
    });
    // if this is first log, return it
    return lastLog.length === 1 ? lastLog[0].status : lastLog[1].status;
  }

  async getAvgResTime(checkUuid: string): Promise<number> {
    const { avgResponseTime } = (await this.createQueryBuilder('logs')
      .select('AVG(logs.response_time)', 'avgResponseTime')
      .innerJoin('logs.check', 'check')
      .where('check.uuid = :uuid', { uuid: checkUuid })
      .getRawOne()) as { avgResponseTime: string };

    return parseInt(parseInt(avgResponseTime).toFixed(2));
  }
}
