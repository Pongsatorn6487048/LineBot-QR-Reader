import { Test } from '@nestjs/testing';
import { UserController } from './db/controller/user.controller';
import { UserService } from './db/service/user.service';
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


