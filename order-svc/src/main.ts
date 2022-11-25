import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { join } from 'path'
import { RPCExceptionFilter } from './rpc-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const URL = process.env.GRPC_URL || '0.0.0.0:3000'

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            url: URL,
            package: 'order',
            protoPath: 'order.proto',
            loader: {
                includeDirs: [join(__dirname)],
                arrays: true,
            },
        },
    })

    app.useGlobalFilters(new RPCExceptionFilter())

    await app.startAllMicroservices()
}

bootstrap()
