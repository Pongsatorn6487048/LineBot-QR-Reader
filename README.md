<p align="center">
  <a href="http://localhost:3000/" target="blank"><img src="https://i.ibb.co/nwcpgn7/line-bot-pfp.jpg" width="200" alt="Nest Logo" /></a><br>
  <h1 align="center">Line Bot QR-Reader</h1>
  
  <h4 align="center">A Line Bot that can read qr code reply the result and collect history to database.</h1>
</p>

<div align="center">
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="ExpressJS">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Line-00C300?style=for-the-badge&logo=line&logoColor=white" alt="Line">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres">
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS">
</div>

## QR-Reader

**QR-Reader** is a simple project while internship to experience coding, This project use Nest Express, Typescript and Docker

<div align="center">
  <img src="https://i.ibb.co/SNYTRZk/example.png" alt="img_1" width="30%" height="30%">
</div>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Installation

```bash
$ npm install
```

# HOW RUN PROJECT ❓
This project is build in following environment:
> **Node.js version: 22.2.0**  
> **Nest Framwork version: 10.3.9**  
> **Server platform: [AWS App Runner](https://aws.amazon.com/th/apprunner/)**  [Optional if you want to deploy]
> **Database: PostgreSQL: 16.3**


### Prerequisite
 - [Line Developer Account](https://developers.line.biz/console/) for provide a channel bot
 - [NGROK Account & Install](https://ngrok.com/) for port forwarding to public
 - [AWS Account](https://aws.amazon.com/free/?nc1=h_ls&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) [Optional if you want to deploy]
 
 If you want to run this project,Please following these steps:

### Create and setup `.env`  🔒

```plaintext
DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USER='admin'
DATABASE_PASSWORD='admin'
DATABASE_NAME='database'
```
You can adjust your **User**, **Password**, **Name** as whatever you want.

### Create Line Provider & Channel 📺
Direct to [Line Developer Console](https://developers.line.biz/console/)
* Create a provider
* Select "Create Messaging API Channel"
  - Channel type: "Messaging API"
  - Fill another information on your own
* Get your channel secret & channel access token and put it in your `.env` like this

```plaintext
LINE_CHANNEL_ACCESS_TOKEN='abcdefghijklmnopqrstuvwxyz'
LINE_CHANNEL_SECRET='9mmaspqbsos6f'
```
Note: You can get "LINE_CHANNEL_ACCESS_TOKEN" from the bottom of "Messaging API" Tab by click "issue" for the first time.

### NGROK 🌐
To make server connect with Line Web hook, We need to make our local port can access by public with Ngrok [Download](https://dashboard.ngrok.com/get-started/setup/windows)
* Create Account
* Download and run Ngrok

Run this command on Ngrok terminal to forward port 3000 to public

```plaintext
ngrok http 3000
```

Note: You can run ngrok before and after run *npm start* 

### Webhook 🪝
After we got a new URL from Ngrok, We need to direct to Line Dev Console to define Web hook URL.
* Go to channel that we create early.
* In *Messaging API* tab click edit at Web hook URL and paste a new URL from Ngrok with this path

```plaintext
https://xxxxngrokxxxx.ngrok-free.app/line/webhook
```
  
* Click *update* and *Verify* If success it mean we can use this bot ✅

### Add friend bot 🤖
Last step we need to add this bot as a friend first by
* Navigate to *Messaging API* tab, You can add by *Bot ID* or *QR Code*

### Running the app 📱
run application in local
```bash
$ npm start
```

### 🌟🏆 Completed, let's send QR and wait for the result.🎉



## Test (Local)

```bash
$ npm test
```

## Stay in touch

- Author - Pongsatorn Arunrat
