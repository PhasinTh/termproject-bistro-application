import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import { RPCExceptionFilter } from './rpc-exception.filter';

async function bootstrap() {
  const URL = process.env.APP_URL || '0.0.0.0:3000'
  const app = await  NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: URL,
      package: 'menu',
      protoPath: 'menu.proto',
      loader: {
        includeDirs: [join(__dirname)],
        arrays: true,
      },
    },
  })

  app.useGlobalFilters(new RPCExceptionFilter())

  await app.listen();
  Logger.log(`Application is running on: ${URL}`, 'Main')
}

bootstrap();
