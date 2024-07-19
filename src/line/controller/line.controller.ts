import { Controller, Post, Req, Res, Get, Param } from '@nestjs/common';
import { LineService } from '../service/line.service';
import * as line from '@line/bot-sdk';

@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  @Post('webhook')
  async webhook(@Req() req, @Res() res) {
    const signature = req.headers['x-line-signature'];
    const channelSecret = process.env.LINE_CHANNEL_SECRET
    if (!line.validateSignature(JSON.stringify(req.body), channelSecret, signature)) {
      return res.status(400).send('Invalid signature');
    }
    const events: line.WebhookEvent[] = req.body.events;
    for (const event of events) {
      await this.lineService.handleEvent(event);
    }
    return res.status(200).send('OK');
  }
  @Get('profile/:id')
  async getUserProfile(@Param('id') userToken: string, @Res() res) {
    try {
      const profile = await this.lineService.getUserProfile(userToken);
      const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>User Profile</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333;
            }
            p {
              margin-bottom: 10px;
            }
            img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>User Profile</h1>
            <p><strong>Name:</strong> ${profile.displayName}</p>
            <p><strong>Status:</strong> ${profile.statusMessage}</p>
            <p><strong>User ID:</strong> ${profile.userId}</p>
            ${profile.pictureUrl ? `<img src="${profile.pictureUrl}" alt="User Image" />` : '<p>No image available</p>'}
            <p><strong>Legion:</strong> ${profile.language}</p>
          </div>
        </body>
      </html>
    `;
      res.setHeader('Content-Type', 'text/html');
      res.send(html)
    } catch (error) {
      return { error: error.message };
    }
  }
}