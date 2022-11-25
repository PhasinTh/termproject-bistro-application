import { Controller, Logger } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { AppService } from './app.service'
import { CreateOrderDto } from './dtos/create.dto'
import { GetOrdersRequest, RequestBistro, RequestQR } from './dtos/request.dto'

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name)
    constructor(private readonly appService: AppService) {}

    @GrpcMethod('OrderService', 'CreateOrderByQR')
    async createOrderByQR(data: CreateOrderDto) {
        const result = await this.appService.createOrderByQR(data)
        return result
    }

    @GrpcMethod('OrderService', 'GetOrdersByBistro')
    async getOrdersByBistro(data: RequestBistro) {
        const result = await this.appService.findOrdersByBistro(data)
        return result
    }

    @GrpcMethod('OrderService', 'GetOrders')
    async getOrders(data: GetOrdersRequest) {
        const result = await this.appService.findAll(data)
        return result
    }

    @GrpcMethod('OrderService', 'GetOrdersByQR')
    async getOrdersByQR(data: RequestQR) {
        const result = await this.appService.findOrdersByQR(data)
        return result
    }

    @GrpcMethod('OrderService', 'CreateOrder')
    async createOrders(data: any) {
        return this.appService.craeteOrder(data)
    }

    @GrpcMethod('OrderService', 'PlaceOrder')
    async placeOrders(data: any) {
        return this.appService.placeOrder(data)
    }

    @GrpcMethod('OrderService', 'DeleteItemsByOrder')
    async removeItems(data: any) {
        return this.appService.delteItemsbyOrder(data)
    }

    @GrpcMethod('OrderService', 'DeleteOrder')
    async removeOrder(data: any) {
        return this.appService.delete(data)
    }

    @GrpcMethod('OrderService', 'UpdateOrderStatus')
    async updateOrderStatus(data: any) {
        return this.appService.updateOrderStatus(data)
    }
}
