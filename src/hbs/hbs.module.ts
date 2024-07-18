import { Module } from '@nestjs/common';
import { TestConotroller } from './controller/test.controller';
import { TestService } from './service/test.service';

@Module({
    controllers: [
      TestConotroller,
    ],
    providers: [
      TestService,
    ],
    
  })
  export class HBSModule {}