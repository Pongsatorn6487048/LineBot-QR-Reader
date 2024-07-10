import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
  } from '@nestjs/common';
  import { DeleteResult } from 'typeorm';
  import { ImageInfo } from '../model/image.interface';
  import { ImageService } from '../service/image.service';
  
  @Controller('image')
  export class ImageController {
    constructor(private imageService: ImageService) {}
  
    @Post()
    async create(@Body() createMessageDto: ImageInfo): Promise<ImageInfo> {
    return await this.imageService.createPost(createMessageDto);
      }

    @Get()
    async findAll(): Promise<ImageInfo[]> {
      return await this.imageService.findAllPosts();
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DeleteResult> {
      return await this.imageService.deletePost(id);
    }
  }
