import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { OrderItem } from './entities/order-item.entity'

const db_maps = {
    sqlite: 'sqlite',
    postgres: 'postgres',
}

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: db_maps[process.env.DB_DRIVER || 'sqlite'],
            host: process.env.DB_HOST || 'localhost',
            database: process.env.DB_DATABASE || 'application_db',
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            port: parseInt(process.env.PORT, 5432) || undefined,
            synchronize: process.env.NODE_ENV != 'production',
            logging: process.env.NODE_ENV != 'production',
            entities: [Order, OrderItem],
        }),
        TypeOrmModule.forFeature([Order, OrderItem]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
