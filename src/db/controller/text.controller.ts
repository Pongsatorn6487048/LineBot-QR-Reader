import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
  } from '@nestjs/common';
  import { DeleteResult } from 'typeorm';
  import { TextInfo } from '../model/text.interface';
  import { TextService } from '../service/text.service';
  
  @Controller('text')
  export class TextController {
    constructor(private textService: TextService) {}
  
    @Post()
    async create(@Body() createMessageDto: TextInfo): Promise<TextInfo> {
    return await this.textService.createPost(createMessageDto);
      }

    @Get()
    async findAll(): Promise<TextInfo[]> {
      return await this.textService.findAllPosts();
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
      return await this.textService.deletePost(id);
    }
  }