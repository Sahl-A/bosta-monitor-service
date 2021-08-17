import { Injectable } from '@nestjs/common';
import { CheckLogRepository } from '../checks/entities/check-log.repository';
import { ClientsService } from '../clients/clients.service';
import { User } from '../users/entities/user.entity';
import { CreateCheckDto } from '../checks/dto/create-check.dto';
import { Check } from '../checks/entities/check.entity';
import { EmailProviderService } from '../alert-providers/email-provider.service';

@Injectable()
export class CheckJobService {
  constructor(
    private readonly clientService: ClientsService,
    private readonly checksLogRepository: CheckLogRepository,
    private readonly emailProvider: EmailProviderService,
  ) {}
  public async checkActions(
    user: User,
    check: Check,
    checkConfig: CreateCheckDto,
  ) {
    console.log(
      `cron job ${check.uuid} that runs every ${checkConfig.interval} secs`,
    );
    const res = await this.clientService.httpClientAPI.get(checkConfig.url, {
      timeout: checkConfig.timeout,
      ignoreSsl: checkConfig.ignore_ssl,
      authentication: checkConfig.authentication,
    });

    // Add log to db
    await this.checksLogRepository.addLog(check, {
      responseTime: res.responseTime,
      status: res.data.isSucceeded ? 'up' : 'down',
    });

    // get last log status (up or down)
    const lastLogStatus = await this.checksLogRepository.getLastLogStatus(
      check.uuid,
    );

    // if server status changed since last log
    const isServerStatusChanged =
      (res.data.isSucceeded && lastLogStatus === 'down') ||
      (!res.data.isSucceeded && lastLogStatus === 'up');

    if (isServerStatusChanged) {
      console.log(`Server went ${res.data.isSucceeded ? 'up' : 'down'}`);
      // call different providers
      ////////////////////
      // send email
      await this.emailProvider.sendEmail(
        user.email,
        res.data.isSucceeded,
        checkConfig.url,
      );
    }
  }
}
