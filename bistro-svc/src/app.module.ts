import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BistroModule } from './bistro/bistro.module'
import { Bistro } from './bistro/entities/bistro.entity'

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
            username: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            port: parseInt(process.env.PORT, 5432) || undefined,
            synchronize: process.env.NODE_ENV != 'production',
            logging: process.env.NODE_ENV != 'production',
            entities: [Bistro],
        }),
        BistroModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
