import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailService } from './mail.service';
import { SendWelcomeEmailDTO } from './welcome_emaill.dto';
import { Logger } from '@nestjs/common';
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @EventPattern('send_welcome_emaill')
  async send_welcome_emaill(
    @Payload() data: SendWelcomeEmailDTO,
    @Ctx() context: RmqContext,
  ) {
    Logger.debug('Send welcome email to' + data.email, context.getPattern());
    await this.mailService.sendEmail(data);
  }
}
