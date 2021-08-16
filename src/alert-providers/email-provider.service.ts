import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';

@Injectable()
export class EmailProviderService {
  sgMail: MailService;
  constructor(private configService: ConfigService) {
    this.sgMail = new MailService();
    this.sgMail.setApiKey(this.configService.get('sendGridKey'));
  }

  public async sendEmail(
    email: string,
    apiStatus: string,
    url: string,
  ): Promise<void> {
    const msg = {
      to: email,
      from: this.configService.get('sendGridEmail') as string, // Change to your verified sender
      subject: 'BOSTA API Montiroing',
      text: `This alert to let you know that the url:${url} is ${apiStatus} `,
      html: `<strong>This alert to let you know that the url:${url} is ${apiStatus}</strong>`,
    };

    this.sgMail
      .send(msg)
      .then(() => {
        console.log(`email sent successfully`);
      })
      .catch((error) => {
        console.log(`error while sending email`, error);
      });
  }
}
