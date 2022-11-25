import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate, Pagination } from 'nestjs-typeorm-paginate'
import { Repository } from 'typeorm'
import { Bistro } from './entities/bistro.entity'
import {
    CreateBistroRequest,
    GetBistrosRequest,
    BistroRequestId,
    GetBistroByOwnerRequest,
} from './proto/bistro.pb'

@Injectable()
export class BistroService {
    @InjectRepository(Bistro)
    private readonly repository: Repository<Bistro>

    public async create(data: CreateBistroRequest): Promise<Bistro> {
        try {
            const bistro: Bistro = this.repository.create(data)
            return await this.repository.save(bistro)
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async findAll(data: GetBistrosRequest): Promise<Pagination<Bistro>> {
        try {
            return paginate<Bistro>(this.repository, {
                limit: data?.limit || 20,
                page: data?.page || 1,
            })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async findOne(data: BistroRequestId): Promise<Bistro> {
        try {
            return this.repository.findOneBy({ id: data.id })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async findByOwner(data: GetBistroByOwnerRequest): Promise<Bistro> {
        try {
            return this.repository.findOneBy({ ownerId: data.ownerId })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async update(updatedto: Bistro): Promise<Bistro> {
        const temp = await this.repository.findOneBy({ id: updatedto.id })
        temp.name = updatedto.name
        temp.description = updatedto.description
        temp.image = updatedto.image
        temp.ownerId = updatedto.ownerId
        return this.repository.save(temp)
    }

    async delete(data: BistroRequestId): Promise<Bistro> {
        try {
            const temp = await this.repository.findOneBy({ id: data.id })
            return await this.repository.remove(temp)
        } catch (error) {
            throw new RpcException(error)
        }
    }
}
