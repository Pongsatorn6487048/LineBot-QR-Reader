import { Controller, Get, Render } from '@nestjs/common';
import { LineLoginService } from '../service/login.service';
const liff = require('@line/liff')

@Controller()
export class LineLoginController {
  constructor(private readonly lineLoginService: LineLoginService) {}

  @Get('home')
  @Render('home')
  async getHomePage() {
    const id = this.lineLoginService.getLiffId()
    console.log(id)
    return { LIFF_ID: id};
  }

  @Get('login')
  @Render('login')
  getLoginPage() {
    const id = this.lineLoginService.getLiffId()
    return { LIFF_ID: id };
  }

  @Get('test')
  @Render('test')
  getTestPage() {
    const id = this.lineLoginService.getLiffId()
    const profile = this.lineLoginService.getProfile()
    return { LIFF_ID: id, PROFILE: profile};
  }
}

