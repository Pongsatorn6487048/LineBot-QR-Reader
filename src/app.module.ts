import { Module } from '@nestjs/common';
import { LineModule } from './line/line.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { HBSModule } from './hbs/hbs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/entity/*.entity{.ts,.js}'], 
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
         rejectUnauthorized: false,
      },
      

    },),
    LineModule,
    HBSModule,
  ],
  providers: [
    AppService
  ],
  controllers: [
    AppController
  ]
})
export class AppModule {}
