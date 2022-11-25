import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';

const db_maps = {
  sqlite: 'sqlite',
  postgres: 'postgres',
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: db_maps[process.env.DB_DRIVER || 'sqlite'],
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_DATABASE || 'member_db',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      port: parseInt(process.env.PORT, 5432) || undefined,
      synchronize: process.env.NODE_ENV != 'production',
      logging: process.env.NODE_ENV != 'production',
      entities: [User],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
