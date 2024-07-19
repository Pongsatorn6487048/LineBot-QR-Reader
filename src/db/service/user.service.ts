import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly dbInfoRepository: Repository<UserEntity>,
  ) {}

  async createPost(dbInfo: UserEntity): Promise<UserEntity> {
    let existed = await this.findExistedUser(dbInfo.userToken)
    if (existed) {
      console.log('user_id: ',existed.user_id,'username: ', existed.username,' | This User already existed')
    } else {
      console.log('user_id: ',dbInfo.user_id, 'username: ', dbInfo.username, '| Save user successfully')
      return await this.dbInfoRepository.save(dbInfo);
    } 
  }

  async getUserByUserToken(userToken: string): Promise<UserEntity> {
    const user = (await this.dbInfoRepository.findOne( { where: { userToken}}))
    return user;
  }
  async findAllPosts(): Promise<UserEntity[]> {
    return await this.dbInfoRepository.find();
  }
  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.dbInfoRepository.findOne({where: { user_id: id }});
    if (!user) { console.log('User not found!')}
    return user;
  }
  async findExistedUser(userToken: string): Promise<UserEntity> {
    return await this.dbInfoRepository.findOne( { where: {userToken}})
  }

  async updatePost(id: number, dbInfo: UserEntity,): Promise<UpdateResult> {
    return await this.dbInfoRepository.update(id, dbInfo);
  }
  async deletePost(id: number): Promise<DeleteResult> {
    return await this.dbInfoRepository.delete(id);
  }
}