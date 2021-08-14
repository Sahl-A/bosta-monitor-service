import { EntityRepository, Repository } from 'typeorm';
import { CreateCheckDto } from '../dto/create-check.dto';
import { CheckConfig } from './check-config.entity';
import { Check } from './check.entity';

@EntityRepository(CheckConfig)
export class CheckConfigRepository extends Repository<CheckConfig> {
  public async addConfig(
    config: CreateCheckDto,
    newCheck: Check,
  ): Promise<void> {
    const newCheckConfig = this.create();

    newCheckConfig.check = newCheck;
    newCheckConfig.name = config.name;
    newCheckConfig.url = config.url;
    newCheckConfig.protocol = config.protocol;
    if (config.path) newCheckConfig.path = config.path;
    if (config.port) newCheckConfig.port = config.port;
    if (config.webhook) newCheckConfig.webhook = config.webhook;
    if (config.timeout) newCheckConfig.timeout = config.timeout;
    if (config.interval) newCheckConfig.interval = config.interval;
    if (config.threshold) newCheckConfig.threshold = config.threshold;
    if (config.authentication) {
      newCheckConfig.auth_username = config.authentication.username;
      newCheckConfig.auth_password = config.authentication.password;
    }
    if (config.tags) newCheckConfig.tags = config.tags;
    if (config.ignore_ssl) newCheckConfig.ignore_ssl = config.ignore_ssl;

    await this.save(newCheckConfig);
  }
}
