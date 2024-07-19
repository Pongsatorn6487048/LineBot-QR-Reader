import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TextEntity } from '../model/text.entity';
import { TextInfo } from '../model/text.interface';

@Injectable()
export class TextService {
  constructor(
    @InjectRepository(TextEntity)
    private readonly dbInfoRepository: Repository<TextEntity>,
  ) {}

  async createPost(dbInfo: TextInfo): Promise<TextInfo> {
    return await this.dbInfoRepository.save(dbInfo);
  }
  async findAllPosts(): Promise<TextInfo[]> {
    return await this.dbInfoRepository.find({ relations: ['message'] });
  }
  async deletePost(id: number): Promise<DeleteResult> {
    return await this.dbInfoRepository.delete(id);
  }
}