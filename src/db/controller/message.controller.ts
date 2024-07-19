import { Body, Controller, Get, Param, Put, Post, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { MessageService } from '../service/message.service';
import { MessageEntity } from '../model/message.entity';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) { }

  @Post()
  async create(@Body() createMessageDto: MessageEntity): Promise<MessageEntity> {
    return await this.messageService.createMessage(createMessageDto);
  }
  @Get(':id')
  async findMessageById(@Param('id') id: number): Promise<MessageEntity> {
    return this.messageService.findMessageById(id);
  }
  @Get()
  async findAll(): Promise<MessageEntity[]> {
    return await this.messageService.findAllPosts();
  }
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.messageService.deletePost(id);
  }
  @Put(':id')
  async updateText(@Param('id') id: number, @Body() updateData: number): Promise<MessageEntity> {
    return this.messageService.updateTextInMessage(id, updateData);
  }
  @Put(':id')
  async updateImage(@Param('id') id: number, @Body() updateData: number): Promise<MessageEntity> {
    return this.messageService.updateImageInMessage(id, updateData);
  }
}