import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineController } from './line/controller/line.controller';
import { ImageController } from './db/controller/image.controller';
import { MessageController } from './db/controller/message.controller';
import { TextController } from './db/controller/text.controller';
import { UserController } from './db/controller/user.controller';
import { LineService } from './line/service/line.service';
import { ImageService } from './db/service/image.service';
import { QrService } from './line/service/qr.service';
import { QRController } from './line/controller/qr.controller';
import { TextService } from './db/service/text.service';
import { MessageService } from './db/service/message.service';
import { UserService } from './db/service/user.service';
import { LineModule } from './line/line.module';
import { DBModule } from './db/db.module';
import { User } from '@line/bot-sdk';
import { UserEntity } from './db/model/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let dbInfoRepository: Repository<UserEntity>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass:  Repository,
        }
      ],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
    dbInfoRepository = moduleRef.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));

  });

  describe('findAllPosts', () => {
    it('findAll user', async () => {
      const expectedUsers: UserEntity[] = [
        { user_id: 1, username: 'Pst.Arr', userToken: 'U7782f56111767bdee7a71887cfe5ea3c' } as UserEntity,
        { user_id: 2, username: 'Joh Wick', userToken: 'KASDKASDL11767bdee7kqmw340e5ea3c' } as UserEntity,
        { user_id: 3, username: 'John Cena', userToken: 'OAlmweafe5ea3casdd34321e2assdC' } as UserEntity,
      ]
      jest.spyOn(dbInfoRepository, 'find').mockImplementation(async () => expectedUsers)
      const actually = await userController.findAll();

      expect(actually).toBe(expectedUsers);
    });

  });
});


