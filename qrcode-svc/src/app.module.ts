import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QRCode } from './entities/qrcode.entity';

const db_maps = {
  sqlite: 'sqlite',
  postgres: 'postgres',
};

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
      entities: [QRCode],
    }),
    TypeOrmModule.forFeature([QRCode]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
