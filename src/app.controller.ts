import { Controller, Get, Res, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  Root() {
    return { author: 'Pongsatorn Arunrat' };
  }
}
