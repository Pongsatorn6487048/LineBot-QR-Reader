import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ImageEntity } from '../model/image.entity';
import { ImageInfo } from '../model/image.interface';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly dbInfoRepository: Repository<ImageEntity>,
  ) {}

  async createPost(dbInfo: ImageInfo): Promise<ImageInfo> {
    return await this.dbInfoRepository.save(dbInfo);
  }

  async findAllPosts(): Promise<ImageInfo[]> {
    return await this.dbInfoRepository.find({ relations: ['message'] });
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.dbInfoRepository.delete(id);
  }
}