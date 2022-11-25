import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateQRCodeDto } from './dtos/create.dto';
import {
  QRCodeByBistroRequest,
  QRCodeRequestId,
  QRCodesRequestRequest,
} from './dtos/request.dto';
import { UpdateQRCodeDto } from './dtos/update.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @GrpcMethod('QRCodeService', 'GetQRCode')
  async findOne(body: QRCodeRequestId) {
    return await this.appService.findOne(body.id);
  }

  @GrpcMethod('QRCodeService', 'DeleteQRCode')
  async delete(body: QRCodeRequestId) {
    const result = await this.appService.delete(body.id);
    return result;
  }

  @GrpcMethod('QRCodeService', 'GetQRCodes')
  async findAll(body: QRCodesRequestRequest) {
    const result = await this.appService.findAll(body);
    return result;
  }

  @GrpcMethod('QRCodeService', 'CreateQRCode')
  async createOne(body: CreateQRCodeDto) {
    return await this.appService.create(body);
  }

  @GrpcMethod('QRCodeService', 'UpdateQRCode')
  async update(body: UpdateQRCodeDto) {
    const result = await this.appService.update(body);
    return result;
  }

  @GrpcMethod('QRCodeService', 'GetQRCodeByBistro')
  async findByBistro(body: QRCodeByBistroRequest) {
    const result = await this.appService.findByBistro(body);
    console.log(result);
    return result;
  }
}
