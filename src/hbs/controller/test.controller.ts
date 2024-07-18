import { Controller, Post, Req, Res } from '@nestjs/common';
import { TestService } from '../service/test.service';
const liff = require('@line/liff')

@Controller('hbs')
export class TestConotroller {
  constructor(private readonly testService: TestService) {}

  @Post('profile')
  async getHomePage() {
    const id = this.testService.getLiffId()

    return { LIFF_ID: id};
  }
  @Post('categorizedProfile')
  async getCategoirzedProfile(@Req() req, @Res() res){
    const {userId, displayName, pictureUrl} = req.body
    return { userId: userId}
  }
}

