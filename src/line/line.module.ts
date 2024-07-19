import { Module } from '@nestjs/common';
import { LineController } from './controller/line.controller';
import { LineService } from './service/line.service';
import { AppService } from 'src/app.service';
import { QrService } from './service/qr.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [ DBModule],
  controllers: [
    LineController,
  ],
  providers: [
    LineService,
    QrService,
    AppService,
  ],
})
export class LineModule {}