import { Controller, Get, Param } from '@nestjs/common';
import { QrService } from '../service/qr.service';

@Controller('qr')
export class QRController {
  constructor(private readonly qrService: QrService) { }

  @Get('decode')
  async decode(@Param('buffer') buffer: Buffer) {
    return this.qrService.decodeQR(buffer)
  }
}