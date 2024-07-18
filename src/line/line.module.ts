import { Module } from '@nestjs/common';
import { LineController } from './controller/line.controller';
import { LineService } from './service/line.service';
import { AppService } from 'src/app.service';
import { QrService } from './service/qr.service';
import { DBModule } from 'src/db/db.module';
import { LineLoginController } from './controller/login.controller';
import { LineLoginService } from './service/login.service';

@Module({
  imports: [ DBModule],
  controllers: [
    LineController,
    LineLoginController,
  ],
  providers: [
    LineService,
    QrService,
    AppService,
    LineLoginService,
  ],
  
})
export class LineModule {}