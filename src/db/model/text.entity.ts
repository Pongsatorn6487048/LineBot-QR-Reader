import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity('Text') 

export class TextEntity {
  @PrimaryGeneratedColumn()
  text_id: number;

  @OneToOne(() => MessageEntity, (message) => message.text, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  message: MessageEntity; 

  @Column({ default: ''})
  text_message: string;
}
