import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bistro } from 'src/bistro/entities/bistro.entity'
import { BistroService } from './bistro.service'
import { BistroController } from './bistro.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Bistro])],
    controllers: [BistroController],
    providers: [BistroService],
})
export class BistroModule {}
