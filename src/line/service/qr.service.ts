import { Injectable } from '@nestjs/common';
import Jimp from 'jimp';
import * as QRReader from 'qrcode-reader';

@Injectable() 
export class QrService {
  async decodeQR(buffer: Buffer): Promise<string> {
    try {
      const image = await Jimp.read(buffer);
      const qr = new QRReader();
      return new Promise((resolve, reject) => {
        qr.callback = (err, value) => {
          if (err) { //pattern not found
            throw new Error('Cannot decode image');          
          } 
          else {
            let result = value.result.replace(/[\x00\r\n]/g, '');
            resolve(result);
          }
        };
        qr.decode(image.bitmap); 
      });
    } catch (err) {
      throw new Error('Failed to decode image | ' + err.message);
    }
  }
}
export default QrService;
