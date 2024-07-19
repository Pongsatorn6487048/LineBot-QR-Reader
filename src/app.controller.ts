import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res) {
    try {
      const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nest.js Application</title>
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
            .center {
              text-align: center;
              margin-top: 50px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to QR Reader Webpage!</h1>
            <p>This is a simple index page to check connection.</p>
            <p>We will customize this page in the future.</p>
            <div class="center">
              <p>Pongsatorn Arunrat : 10/7/2024</p>
              <img src="https://nestjs.com/img/logo_text.svg" alt="Nest.js Logo" width="200">
            </div>
          </div>
        </body>
      </html>
    `;
      res.setHeader('Content-Type', 'text/html');
      res.send(html)
    } catch (error) {
      return {error: error.message}
    }
  }
}