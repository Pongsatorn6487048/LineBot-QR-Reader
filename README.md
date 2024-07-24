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
  
  [![Line Bot stars badge][stars-shield]][stars-url]
  
</div>


## QR-Reader  

**QR-Reader** is a simple project while internship to experience coding, This project use Nest Express, Typescript and Docker

<div align="center">
  <img src="https://i.ibb.co/SNYTRZk/example.png" alt="img_1" width="30%" height="30%">
</div>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Installation
Locate to project folder directory and run this command in terminal.

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
 
## 6 Steps to start

### 1. Create and setup `.env`  🔒

```plaintext
DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USER='postgres'
DATABASE_PASSWORD='123456789'
DATABASE_NAME='database'
```
You can adjust your **User**, **Password**, **Name** as whatever you want.

### 2. Create Line Provider & Channel 📺
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

### 3. NGROK 🌐
To make server connect with Line Web hook, We need to make our local port can access by public with Ngrok [Download](https://dashboard.ngrok.com/get-started/setup/windows)
* Create Account
* Download and run Ngrok

Run this command on Ngrok terminal to forward port 3000 to public

```plaintext
ngrok http 3000
```

***Note:*** You can run ngrok before and after run *npm start* 

### 4. Webhook 🪝
After we got a new URL from Ngrok, We need to direct to Line Dev Console to define Web hook URL.
* Go to channel that we create early.
* In *Messaging API* tab click edit at Web hook URL and paste a new URL from Ngrok with this path

```plaintext
https://xxxxngrokxxxx.ngrok-free.app/line/webhook
```
  
* Click *update* and *Verify* If success it mean we can use this bot ✅

### 5. Add friend bot 🤖
Last step we need to add this bot as a friend first by
* Navigate to *Messaging API* tab, You can add by *Bot ID* or *QR Code*

### 6. Running the app 📱
run application in local
```bash
$ npm start
```

### 🌟🏆 Completed, let's send QR and wait for the result.🎉

## Test (Local)

```bash
$ npm test
```

# How to Deploy
This is tools we used to deploy
> **Database management: pgAdmin 4**  
> **Build: Docker**  
> **Cloud provider: AWS**
>  - AWS ECR (Elastic Container Registry)
>  - AWS RDS (Relational Database Instance)
>  - AWS App Runner


### Prerequisite
 - [Docker Account & Install](https://www.docker.com/) for build project image
 - [AWS Account ](https://aws.amazon.com/free/?nc1=h_ls&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) for access AWS Console and other services

## xx Steps to start

There is so many configuration, Please follow these step

***Note:*** If no need Database you can skip step 1-2, Which mean you need to change code too.

### 1. Add SSL to make RDS not reject unauthorized
RDS (Relational Database Instance) they're force us to use SSL connection only but we not have SSL certificated for Postgres DB, here is some solution
* In `app.module.ts` add this configuration below ***syncronize***
  ```bash
        ssl: {
        rejectUnauthorized: false
      },
  ```

### 2. Create RDS & Parameter Group
We gonna change from local database to Instance Database and test connection.
Navigate to [AWS Console](https://aws.amazon.com/console/) and search for RDS.
* Create Parameter Group for RDS first
  - Navigate to parameter group on the left panel
  - Click **create parameter group** and config like below
  - Engine: **PostgreSQL**
  - Parameter group family: **Postgres 16**
  - **Create**
  - Edit parameter group we just created
  - Search for "rds.force_ssl" and change value from 1 to 0 //this step will disable SSL connection
* Back to Database on the left panel and we gonna Create Database, Here is some important config 
  - Engine type: **Postgres**
  - Template: **◉ Production or Free Tier**
  - Available and Durability: **◉ Single DB Instace** //no need to select if free tier
  - Master username: **postgres**
  - Credentials management: **◉ Self Manage**
  - Master Password: **123456789** //same as your `.env`
  - Connectivity: **◉ Don't connect to an EC2 resource**
  - Public Access: **Yes**
  - Database port: **5432**
  - Additional Config/Initial database name: **Linebot**
  - Additional Config/Parameter group: **Parameter group we created in previous step**
  - **Create**
* Wait until status turn to "Available" and Click to see more information
* Copy ***EndPoint*** from Connectivity & Security tab and replace at ***localhost*** in your `.env`
  ```bash
  DATABASE_HOST='{HERE}' 
  DATABASE_PORT=5432
  DATABASE_USER='postgres'
  DATABASE_PASSWORD='123456789'
  DATABASE_NAME='LineBot'
  ```
* Test connection with ***npm start*** or ***pgAdmin***


### 3. Build & Push Image to ECR
We need image to deploy with AWS, So we need to build it first
* After install completed, Open docker on desktop
* Run this command on your project terminal
```bash
docker compose up --build
```
If you didn't change any docker config we'll get image name "aws-linebot"

* After build complete, Navigate and login to [AWS Console](https://aws.amazon.com/console/)
* Go to search box type "ECR" -> Create private repository there ***( recommanded use same name as you image )***
* Enter repository -> Click on the top right "View push command" button you'll see command, follow AWS document

Here is checklist for you   
☐ Create IAM User with Access permission   
☐ Config CLI Cretentials & Login CLI   
☐ Push image success   

### 4. Launch App Runner Service
Now we got all we need (RDS, Image) we're at the last step of deploy
* Go to **App Runner** by search bar
* Create service
* Here is easy config
  - Repository Type: **Container Registry**
  - Provider: **Amazon ECR**
  - Container Image URI: **{IMAGE URI HERE}**
  - Deployment trigger: **Manual** //it's up to you, in my case is manual
  - ECR access role: **existing service role**
  - **Next**
  - Service name: ... //you service name
  - Port: 3000
  - Add environment variable with this format

|   Source   | Environment Variable Name | Environment Variable Value |
| ---------- | --------------------------|             :---:          |
| Plain text | DATABASE_HOST             |      //RDS Endpoint//      |
| Plain text | DATABASE_PORT             |             5432           |
| Plain text | DATABASE_USER             |           postgres         |
| Plain text | DATABASE_PASSWORD         |           123456789        |
| Plain text | DATABASE_NAME             |           LineBot          |
| Plain text | LINE_CHANNEL_ACCESS_TOKEN |   //LINE ACCESS TOKEN//    |
| Plain text | LINE_CHANNEL_SECRET       |   //LINE CHANNEL SECRET//  |

* Let all config left default.   
* **Next** then Confirm you configuration and ***Create & Deploy***  
* Wait until Service status is **Active** then click service to see *Service Overview*

Now your application have public domain at **Default domain**  

### 5. Connect Web hook with new domain
Navigate to [Line Developer Console](https://developers.line.biz/console/) to change Web hook URL to new URL from App Runner
* Change Web hook URL to **New URL** with same path like this.
  ```bash
  https://newdomain.ap-southest-1.awsapprunner.com/line/webhook
  ```
  * Update and Verify Web hook



Let's try your Chat Bot!! 🤖💬

<div align="center">
  <h2> 🏆💯🌟Congratulations Your Application is Deploy Successfully!🚀🎯🎉</h1>
</div>

## Stay in touch

- Author - Pongsatorn Arunrat


[stars-shield]: https://img.shields.io/github/stars/Pongsatorn6487048/LineBot-QR-Reader.svg?style=for-the-badge
[stars-url]: https://github.com/Pongsatorn6487048/LineBot-QR-Reader/stargazers
