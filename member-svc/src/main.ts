import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { promises } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // setup global
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  // if (['development', 'staging'].includes(process.env.NODE_ENV)) {
  // const pkg = JSON.parse(
  //   await promises.readFile(join('.', 'package.json'), 'utf8'),
  // );

  // const options = new DocumentBuilder()
  //   .setTitle('Bistro API')
  //   .setDescription('Description')
  //   .setVersion(pkg.version)
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('swagger', app, document);
  // }
  await app.listen(3000);
}
bootstrap();
