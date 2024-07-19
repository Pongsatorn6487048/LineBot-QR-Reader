import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { MessageEntity } from '../model/message.entity';
import { UserEntity } from '../model/user.entity';
import { ImageEntity } from '../model/image.entity';
import { TextEntity } from '../model/text.entity';
import { error } from 'console';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(TextEntity)
    private readonly textRepository: Repository<TextEntity>,
  ) {}

  async createMessage(messageInfo: MessageEntity): Promise<MessageEntity> {
    return await this.messageRepository.save(messageInfo);
  }
  async findMessageById(id: number): Promise<MessageEntity> {
    const message = await this.messageRepository.findOne({
      where: { message_id: id }, relations: ['user', 'text', 'image',]
    });
    if (!message) { throw new error(`Message with ID ${id} not found`); }
    else if (!message.image) {
      const result = this.messageRepository.findOne({ where: { message_id: id }, relations: ['user', 'text'] });
      return result;
    }
    else if (!message.text) {
      const result = this.messageRepository.findOne({ where: { message_id: id }, relations: ['user', 'image'] });
      return result;
    }
  }
  async findAllPosts(): Promise<MessageEntity[]> {
    if (this.messageRepository.find({ relations: ['user', 'text'] })) {
      return await this.messageRepository.find({ relations: ['user', 'text'] });
    }
    else if (this.messageRepository.find({ relations: ['user', 'image'] })) {
      return await this.messageRepository.find({ relations: ['user', 'image'] });
    }
    return await this.messageRepository.find({ relations: ['user', 'image', 'text'] });
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return await this.messageRepository.delete(id);
  }
  async updateTextInMessage(messageId: number, textId: number): Promise<MessageEntity> {
    const message = await this.messageRepository.findOne({ where: { message_id: messageId }, relations: ['text'] });
    if (!message) { throw new Error('Message not found'); }
    const text = await this.textRepository.findOne({ where: { text_id: textId } });
    if (!text) {
      throw new Error('Text not found');
    }
    message.text = text;
    return this.messageRepository.save(message);
  }
  async updateImageInMessage(messageId: number, imageId: number): Promise<MessageEntity> {
    const message = await this.messageRepository.findOne({ where: { message_id: messageId }, relations: ['image'] });
    if (!message) { throw new Error('Message not found'); }
    const image = await this.imageRepository.findOne({ where: { image_id: imageId } });
    if (!image) { throw new Error('Image not found'); }
    message.image = image;
    return this.messageRepository.save(message);
  }
}