import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity} from './user.entity'
import { ImageEntity } from './image.entity'
import { TextEntity } from './text.entity'

@Entity('Message') 

export class MessageEntity {
  @PrimaryGeneratedColumn()
  message_id: number;

  @ManyToOne(() => UserEntity, userEntity => userEntity.message)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;


  @OneToOne(() => ImageEntity, (imageEntity) => imageEntity.message, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'image_id' })
  image: ImageEntity;

  @OneToOne(() => TextEntity, (textEntity) => textEntity.message, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'text_id' })
  text: TextEntity;

}
