import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UserEntity } from './model/user.entity'; 
import { MessageEntity } from './model/message.entity';
import { TextEntity } from './model/text.entity';
import { MessageService } from './service/message.service';
import { MessageController } from './controller/message.controller';
import { TextService } from './service/text.service';
import { TextController } from './controller/text.controller';
import { ImageEntity } from './model/image.entity';
import { ImageService } from './service/image.service';
import { ImageController } from './controller/image.controller';

@Module({
  imports: [TypeOrmModule.forFeature(
    [
      UserEntity, 
      MessageEntity, 
      TextEntity, 
      ImageEntity
    ])], 
  providers: 
    [
      UserService, 
      MessageService, 
      TextService, 
      ImageService
    ],
  controllers: 
    [
      UserController, 
      MessageController, 
      TextController, 
      ImageController],
  exports: [
    UserService,
    MessageService,
    TextService,
    ImageService
  ]
})
export class DBModule {}