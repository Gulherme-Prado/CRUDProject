import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      password: '474269',
      database: 'users_db',
      entities: [Client],
      synchronize: true,
    }),
    ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
