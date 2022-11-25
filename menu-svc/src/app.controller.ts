import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateMenuDto } from './dtos/create.dto';
import {
  MenuByBistroRequest,
  MenuRequestId,
  MenusRequestRequest,
} from './dtos/request.dto';
import { UpdateMenuDto } from './dtos/update.dto';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @GrpcMethod('MenuService', 'GetMenu')
  async findOne(body: MenuRequestId) {
    return await this.appService.findOne(body.id);
  }

  @GrpcMethod('MenuService', 'DeleteMenu')
  async delete(body: MenuRequestId) {
    const result = await this.appService.delete(body.id);
    return result;
  }

  @GrpcMethod('MenuService', 'GetMenus')
  async findAll(body: MenusRequestRequest) {
    const result = await this.appService.findAll(body);
    return result;
  }

  @GrpcMethod('MenuService', 'CreateMenu')
  async createOne(body: CreateMenuDto) {
    return await this.appService.create(body);
  }

  @GrpcMethod('MenuService', 'updateMenu')
  async update(body: UpdateMenuDto) {
    const result = await this.appService.update(body);
    return result;
  }

  @GrpcMethod('MenuService', 'GetMenusByBistro')
  async findByBistro(body: MenuByBistroRequest) {
    const result = await this.appService.findByBistro(body);
    return result;
  }
}
