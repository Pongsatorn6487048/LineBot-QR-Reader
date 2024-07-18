import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { QrService } from './qr.service';
import { MessageService } from 'src/db/service/message.service';
import { UserService } from 'src/db/service/user.service';
import { UserEntity } from 'src/db/model/user.entity';
import { TextService } from 'src/db/service/text.service';
import { ImageService } from 'src/db/service/image.service';
import { MessageEntity } from 'src/db/model/message.entity';
import { TextEntity } from 'src/db/model/text.entity';
import { ImageEntity } from 'src/db/model/image.entity';

@Injectable()
export class LineService {
  private client: line.Client;
  constructor(
    private readonly qrService: QrService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly textService: TextService,
    private readonly imageService: ImageService,
    ){ 
    this.client = new line.Client({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    });
    }

  getChannelSecret(): string {
    return process.env.LINE_CHANNEL_SECRET;
  }

  //getUserProfile http://localhost:8080/line/profile/{userId}
  async getUserProfile(userToken: string) {
    try {
      const profile = await this.client.getProfile(userToken);
      return profile;
    } catch (err) {
      throw new Error(`Failed to get user profile: ${err.message}`);
    }
  }

  //Handle Message
  async handleEvent(event: line.WebhookEvent) {
    const displayName = (await this.getUserProfile(event.source.userId)).displayName; // Get display name from user profile JSON
    const userToken = event.source.userId;
    let user = await this.userService.getUserByUserToken(userToken);
    if (!user) {
      const userInfo = new UserEntity();
      userInfo.username = displayName;
      userInfo.userToken = userToken;
      user = await this.userService.createPost(userInfo);
      console.log('\nNew User Created: ', user, '\n-------------');
    }

    if (event.type === 'message' && event.message.type === 'text') {
      const replyToken = event.replyToken;
      const message = event.message.text;

      //CREATE MESSAGE
      const messageInfo = new MessageEntity();
      messageInfo.user = user;
      await this.messageService.createMessage(messageInfo)

      //CREATE TEXT 
      const textInfo = new TextEntity();
      const messageId = await this.messageService.findMessageById(messageInfo.message_id)
      textInfo.text_message = message;
      textInfo.message = messageInfo
      await this.textService.createPost(textInfo);

      //UPDATE FR TO MESSAGE
      await this.messageService.updateTextInMessage(messageId.message_id, textInfo.text_id)

      await this.client.replyMessage(replyToken, {
        type: 'text',
        text: `You said: ${message}`,
      });
    } 

    else if (event.type === 'message' && event.message.type == 'image') {
      const replyToken = event.replyToken;
      //CREATE MESSAGE
      const messageInfo = new MessageEntity();
      messageInfo.user = user;
      await this.messageService.createMessage(messageInfo) 
      const ImagemessageId = await this.messageService.findMessageById(messageInfo.message_id)

      //CREATE IMAGE
      const imageInfo = new ImageEntity();
      imageInfo.message = messageInfo 

      //GET BUFFER FROM MESSAGE CONTENT
      const messageContent = await this.client.getMessageContent(event.message.id);
      const buffer = [];
      messageContent.on('data', (chunk) => {
        buffer.push(chunk);
      });
      messageContent.on('end', async () => {
        const imageData = Buffer.concat(buffer); 
        const fileSize = imageData.length / (1024);

        await this.qrService.decodeQR(imageData).then(result => {
          return this.client.replyMessage(event.replyToken, {
            type: 'text',
            text: `${result}`
          })
            .then(async () => {
              console.log('Reply Message: ', result);
              console.log('Reply sent successfully \n-------------\n');
              imageInfo.image_decoded = result;
              imageInfo.status = 'success'
              await this.imageService.createPost(imageInfo)
              //UPDATE FR KEY TO MESSAGE
              await this.messageService.updateImageInMessage(ImagemessageId.message_id, imageInfo.image_id)
              console.log('Updated message: ', await this.messageService.findMessageById(messageInfo.message_id))
            })
            .catch((err) => { //Happen when can't return 
              console.error('Error sending message:', err);
              imageInfo.image_decoded = result;
            });
        })
          //Catch Invalid QR
          .catch(async error => {
            console.error('Type: ', event.message.type, ' | Error decoding QR code:', error.message,);
            console.log('Error sending message')

            imageInfo.status = 'failure'
            await this.imageService.createPost(imageInfo)

            //UPDATE FR KEY TO MESSAGE
            this.messageService.updateImageInMessage(ImagemessageId.message_id, imageInfo.image_id)
            console.log('failure image info: ', imageInfo)

            return this.client.replyMessage(event.replyToken, {
              type: 'text',
              text: '$Cannot found QR Pattern\nPlease ensure correct image \nOr try to centralize it\n( Not too close, not too far )',
              emojis: [{
                index: 0,
                productId: '5ac21a18040ab15980c9b43e',
                emojiId: '068',
              }],
            })
          });
      });
    }

    else if (event.type == 'message' && event.message.type != 'text' && event.message.type != 'image'){
      const replyToken = event.replyToken;
      return this.client.replyMessage(event.replyToken, {
        type: 'text',
        text: `We can only process QR codes. Please send a QR code image. `
      })
    }
  }
}