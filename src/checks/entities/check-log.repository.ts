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

  async getLastLogStatus(): Promise<string> {
    const lastLog = await this.findOne({ order: { created_at: 'DESC' } });
    return lastLog.status;
  }
}
