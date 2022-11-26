import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop()
  chanel: string;

  @Prop()
  type: string;

  @Prop()
  subject: string;

  @Prop()
  to: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
