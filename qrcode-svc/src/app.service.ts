import { Delete, Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQRCodeDto } from './dtos/create.dto';
import { QRCode } from './entities/qrcode.entity';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { UpdateQRCodeDto } from './dtos/update.dto';
import { RpcException } from '@nestjs/microservices';
import {
  QRCodeByBistroRequest,
  QRCodesRequestRequest,
} from './dtos/request.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(QRCode) private qrcodeRepository: Repository<QRCode>,
  ) {}

  async findAll(data: QRCodesRequestRequest): Promise<Pagination<QRCode>> {
    try {
      return paginate<QRCode>(this.qrcodeRepository, {
        limit: data?.limit || 20,
        page: data?.page || 1,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  findOne(id: string): Promise<QRCode> {
    try {
      return this.qrcodeRepository.findOneBy({ id });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async create(createdto: CreateQRCodeDto): Promise<QRCode> {
    try {
      console.log(createdto);
      const newQRCode = this.qrcodeRepository.create(createdto);
      return this.qrcodeRepository.save(newQRCode);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async update(updatedto: UpdateQRCodeDto): Promise<QRCode> {
    const temp = await this.qrcodeRepository.findOneBy({ id: updatedto.id });
    temp.name = updatedto.name;
    temp.bistroId = updatedto.bistroId;
    return this.qrcodeRepository.save(temp);
  }

  async delete(id: string) {
    try {
      const temp = await this.qrcodeRepository.findOneBy({ id });
      await this.qrcodeRepository.remove(temp);
      return temp;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByBistro(data: QRCodeByBistroRequest) {
    try {
      return paginate<QRCode>(
        this.qrcodeRepository,
        { limit: data?.meta?.limit || 20, page: data?.meta?.page || 1 },
        {
          where: {
            bistroId: data.bistroId,
          },
        },
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
