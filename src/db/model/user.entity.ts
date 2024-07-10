import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MessageEntity} from '../model/message.entity'

@Entity('User') 

export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ default: '' })
  username: string;

  @Column({ default: '' })
  userToken: string;

  @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user) //message_id work
  message: MessageEntity[];

}
