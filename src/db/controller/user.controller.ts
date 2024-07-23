import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { UserService } from '../service/user.service';
import { UserEntity } from '../model/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async create(@Body() UserInfo: UserEntity): Promise<UserEntity> {
    return await this.userService.createPost(UserInfo);
  }
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAllPosts();
  }
  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<UserEntity> {
    try {
      const user = await this.userService.findUserById(id);
      return user;
    } catch (error) { throw new Error(error.message); }
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.deletePost(id);
  }
}