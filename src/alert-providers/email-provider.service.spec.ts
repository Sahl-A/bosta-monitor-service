import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailProviderService } from './email-provider.service';
import { MailService } from '@sendgrid/mail';

describe('EmailProviderService', () => {
  let service: EmailProviderService;
  jest.mock('./email-provider.service');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailProviderService, ConfigService],
    }).compile();

    service = module.get<EmailProviderService>(EmailProviderService);
  });

  it('should be defined and have the necessary methods', () => {
    expect(service).toBeDefined();
    expect(service).toHaveProperty('sendEmail');
  });
});
