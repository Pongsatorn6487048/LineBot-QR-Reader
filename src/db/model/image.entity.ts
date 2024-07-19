import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('Image') 
export class ImageEntity {
  @PrimaryGeneratedColumn()
  image_id: number;

  @OneToOne(() => MessageEntity, (message) => message.image, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity; 

  @Column({ default: ''})
  image_decoded: string;

  @Column({ default: ''})
  status: string;
}
