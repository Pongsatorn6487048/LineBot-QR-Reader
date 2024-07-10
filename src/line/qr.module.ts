import { Module } from '@nestjs/common';
import { QrService } from './service/qr.service';
import { QRController } from './controller/qr.controller';

@Module({
  providers: [
    QrService
  ],
  controllers: [
    QRController
  ], 
})
export class QrModule {}
