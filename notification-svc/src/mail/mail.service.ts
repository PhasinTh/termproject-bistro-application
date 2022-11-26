import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SendWelcomeEmailDTO } from './welcome_emaill.dto';
import {
  Notification,
  NotificationDocument,
} from '../schemas/notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async sendEmail(data: SendWelcomeEmailDTO) {
    await this.mailerService.sendMail({
      to: data.email,
      subject: data.subject,
      template: './welcome',
      context: {
        header: data.header,
        message: data.message,
      },
    });
    const createdNotification = new this.notificationModel({
      chanel: 'EMAIL',
      type: 'NOTIFICATION',
      subject: data.subject,
      to: data.email,
    });
    createdNotification.save();
  }
}
