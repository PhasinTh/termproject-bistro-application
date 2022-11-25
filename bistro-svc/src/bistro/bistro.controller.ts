import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { Pagination } from 'nestjs-typeorm-paginate'
import { BistroByIdRequestDto, CreateBistroRequestDto } from './bistro.dto'
import { BistroService } from './bistro.service'
import { Bistro } from './entities/bistro.entity'
import {
    BISTRO_SERVICE_NAME,
    GetBistroByOwnerRequest,
    GetBistrosRequest,
} from './proto/bistro.pb'

@Controller()
export class BistroController {
    @Inject(BistroService)
    private readonly service: BistroService

    @GrpcMethod(BISTRO_SERVICE_NAME, 'CreateBistro')
    private async createBistro(data: CreateBistroRequestDto): Promise<Bistro> {
        return this.service.create(data)
    }

    @GrpcMethod(BISTRO_SERVICE_NAME, 'GetBistro')
    private async getBistro(data: BistroByIdRequestDto): Promise<Bistro> {
        return this.service.findOne(data)
    }

    @GrpcMethod(BISTRO_SERVICE_NAME, 'GetBistroByOwner')
    private async getBistroByOwner(
        data: GetBistroByOwnerRequest
    ): Promise<Bistro> {
        return this.service.findByOwner(data)
    }

    @GrpcMethod(BISTRO_SERVICE_NAME, 'GetBistros')
    private async getBistros(
        data: GetBistrosRequest
    ): Promise<Pagination<Bistro>> {
        return this.service.findAll(data)
    }

    @GrpcMethod(BISTRO_SERVICE_NAME, 'UpdateBistro')
    private async updateBistro(data: Bistro): Promise<Bistro> {
        return this.service.update(data)
    }

    @GrpcMethod(BISTRO_SERVICE_NAME, 'DeleteBistro')
    private async deleteBistro(data: BistroByIdRequestDto): Promise<Bistro> {
        return this.service.delete(data)
    }
}
