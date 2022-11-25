import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate'
import { RpcException } from '@nestjs/microservices'
import { Order } from './entities/order.entity'
import { UpdateOrderDto } from './dtos/update.dto'
import { CreateOrderDto } from './dtos/create.dto'
import { GetOrdersRequest, RequestBistro, RequestQR } from './dtos/request.dto'
import { OrderItem } from './entities/order-item.entity'

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>
    ) {}

    // TODO: Application Admin CRUD
    async findAll(data: GetOrdersRequest): Promise<Pagination<Order>> {
        try {
            return paginate<Order>(
                this.orderRepository,
                {
                    limit: data.meta?.limit || 20,
                    page: data.meta?.page || 1,
                },
                {
                    relations: {
                        items: true,
                    },
                    order: {
                        createAt: 'DESC',
                    },
                }
            )
        } catch (error) {
            throw new RpcException(error)
        }
    }

    findOne(id: string) {
        try {
            return this.orderRepository.findOneBy({ id })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async create(createdto: CreateOrderDto) {
        try {
            const newOrder = this.orderRepository.create(createdto)
            return this.orderRepository.save(newOrder)
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async update(updatedto: UpdateOrderDto) {
        const temp = await this.orderRepository.findOneBy({ id: updatedto.id })
        return this.orderRepository.save(temp)
    }

    async delete(data: any) {
        try {
            const temp = await this.orderRepository.findOneBy({ id: data.id })
            await this.orderRepository.remove(temp)
            return temp
        } catch (error) {
            throw new RpcException(error)
        }
    }

    // Service for Bistro Admin

    async findOrdersByBistro(data: RequestBistro): Promise<Pagination<Order>> {
        try {
            return paginate<Order>(
                this.orderRepository,
                {
                    limit: data.meta?.limit || 20,
                    page: data.meta?.page || 1,
                },
                {
                    where: {
                        bistroId: data.bistroId,
                    },
                    relations: {
                        items: true,
                    },
                    order: {
                        createAt: 'DESC',
                    },
                }
            )
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async createOrderByQR(data: CreateOrderDto) {
        try {
            const created = this.orderRepository.create(data)
            return this.orderRepository.save(created)
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async findOrdersByQR(data: RequestQR) {
        try {
            return this.orderRepository.findOneBy({
                qrcodeId: data.qrcodeId,
            })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async placeOrder(data: any) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: data.orderId },
                relations: {
                    items: true,
                },
            })

            if (order) {
                const result = this.orderItemRepository
                    .createQueryBuilder()
                    .insert()
                    .into(OrderItem)
                    .values(
                        data.items.map((item: any) => ({
                            order: order,
                            menuId: item.menuId,
                            menuPrice: item.menuPrice,
                            menuName: item.menuName,
                            menuImage: item.menuImage,
                            quantity: item.quantity,
                        }))
                    )
                    .execute()

                return await this.orderRepository.findOne({
                    where: { id: data.orderId },
                    relations: {
                        items: true,
                    },
                })

                // order.items = result
                // return this.orderRepository.save(order)
            }
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async craeteOrder(data: any) {
        try {
            let order = await this.orderRepository.create({
                bistroId: data.bistroId,
                qrcodeId: data.qrcodeId,
                qrcodeName: data.qrcodeName,
            })

            order = await this.orderRepository.save(order)

            if (order) {
                await this.orderItemRepository
                    .createQueryBuilder()
                    .insert()
                    .into(OrderItem)
                    .values(
                        data.items.map((item: any) => ({
                            order: order,
                            menuId: item.menuId,
                            menuPrice: item.menuPrice,
                            menuName: item.menuName,
                            menuImage: item.menuImage,
                            quantity: item.quantity,
                        }))
                    )
                    .execute()

                return await this.orderRepository.findOne({
                    where: { id: order.id },
                    relations: {
                        items: true,
                    },
                })
            }
            return null
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async delteItemsbyOrder(data: any) {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: data.orderId },
                relations: {
                    items: true,
                },
            })

            if (order) {
                const ids = data.items.map((item) => item.id)

                await this.orderItemRepository
                    .createQueryBuilder()
                    .delete()
                    .from(OrderItem)
                    .where({
                        id: In(ids),
                    })
                    .execute()

                order.items.filter((item) => !ids.includes(item.id))
                return this.orderRepository.save(order)
            }
        } catch (error) {
            throw new RpcException(error)
        }
    }

    async updateOrderStatus(data: any) {
        try {
            console.log(data)
            const order = await this.orderRepository.findOneBy({
                id: data.orderId,
            })
            order.isPaid = data.isPaid
            return this.orderRepository.save(order)
        } catch (error) {
            throw new RpcException(error)
        }
    }
}
