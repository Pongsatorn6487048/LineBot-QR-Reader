<p align="center">
  <a href="http://localhost:3000/" target="blank"><img src="https://i.ibb.co/nwcpgn7/line-bot-pfp.jpg" width="200" alt="Nest Logo" /></a><br>
  <h1 align="center">Line Bot QR-Reader</h1>
  
  <h4 align="center">A Line Bot that can read qr code then reply the result and collect chat history to database.</h1>
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

**QR-Reader** is a simple project while internship to experience coding, This project use Nest, Express.js, Typescript, PostgreSQL, Docker, AWS RDS and Deploy with AWS App Runner

<div align="center">
  <img src="https://i.ibb.co/SNYTRZk/example.png" alt="img_1" width="30%" height="30%">
</div>

## Description

This is the complete deployment flow for this document, showing all the services we actually need.

<div align="center">
  <img src="https://i.ibb.co/jRQpW13/flow.png" alt="flow">
</div>


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
 - [PostgreSQL 16.3](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) database server for manage and monitor
 
## 6 Steps to start

### 1. Create and setup `.env`  🔒

```plaintext
DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USER='postgres'
DATABASE_PASSWORD='123456789'
DATABASE_NAME='LineBot'
```

### 2. Create Line Provider & Channel 📺
Direct to [Line Developer Console](https://developers.line.biz/console/)
* Create a provider
* Select "Create Messaging API Channel"
  - Channel type: "Messaging API"
  - Fill another information on your own
  - **Create**
  - In Messaging API tab don't forget to Enable ***Web hook*** and disable **Auto-Reply**
  - Get "LINE_CHANNEL_ACCESS_TOKEN" from the bottom of "Messaging API" Tab by click "issue" for the first time.

Get your channel secret & channel access token and put it in your `.env` like this example

```plaintext
LINE_CHANNEL_ACCESS_TOKEN='abcdefghijklmnopqrstuvwxyz'
LINE_CHANNEL_SECRET='pk1abs5maspqbsos6f'
```

> [!NOTE]
> Reference: Line Messaging API document click [Here](https://developers.line.biz/en/docs/messaging-api/overview/)

### 3. Running the app 📱
run application in local
```bash
$ npm start
```

### 4. NGROK 🌐
To make server connect with Line Web hook, We need to make our local port can access by public with Ngrok [Download](https://dashboard.ngrok.com/get-started/setup/windows)
* Create Account
* Download and run Ngrok

Run this command on Ngrok terminal to forward port 3000 to public

```plaintext
ngrok http 3000
```

> [!NOTE]
> You can run ngrok before and after run *npm start* it doesn't have any effect.

### 5. Webhook 🪝
After we got a new URL from Ngrok, We need to direct to Line Dev Console to define Web hook URL.
* Go to channel that we create early.
* In *Messaging API* tab click edit at Web hook URL and paste a new URL from Ngrok with this path

```plaintext
https://xxxxngrokxxxx.ngrok-free.app/line/webhook
```
  
* Click *update* and *Verify* If success it mean we can use this bot ✅

### 6. Add friend bot 🤖
Last step we need to add this bot as a friend first by
* Navigate to *Messaging API* tab, You can add by *Bot ID* or *QR Code*

### 🌟🏆 Completed, let's send QR and wait for the result.🎉

## Test (Optional)
Use Jest framework and test different scenario with local image in project
```bash
$ npm test
```

# How to Deploy
This is tools we need to use for deploy
> **Database management: pgAdmin 4**  
> **Build: Docker**  
> **Cloud provider: AWS**
>  - AWS CLI (Command Line Interface)
>  - AWS ECR (Elastic Container Registry)
>  - AWS RDS (Relational Database Instance)
>  - AWS App Runner

### Prerequisite
You must have all of this resource before start to deploy
 - [AWS CLI Install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) for run aws command on command prompt
 - [Docker Account & Install](https://www.docker.com/) for build project image
 - [AWS Account ](https://aws.amazon.com/free/?nc1=h_ls&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) for access AWS Console and other services

## 6. Steps to deploy

There is so many configuration, Please follow these step

### 1. Add SSL to make RDS not reject unauthorized
RDS (Relational Database Instance) they're force us to use SSL connection only but we not have SSL certificated for Postgres DB, here is some solution
* In `app.module.ts` add this in database configuration below ***syncronize***
  ```typescript
        ssl: {
        rejectUnauthorized: false
      },
  ```
> [!NOTE]
> Reference for the [Database Certificated Authority](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html).

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
  - Search for "rds.force_ssl" and change value from 1 to 0
    > this step will disable SSL connection for RDS
* Back to Database on the left panel and we gonna Create Database, Here is some important config 
  - Engine type: **Postgres**
  - Template: **◉ Production or Free Tier**
  - Available and Durability: **◉ Single DB Instace**
    > no need to select if free tier
  - Master username: **postgres**
  - Credentials management: **◉ Self Manage**
  - Master Password: **123456789**
    > same as your `.env` & confirm your password
  - Connectivity: **◉ Don't connect to an EC2 resource**
  - Public Access: **Yes**
  - Database port: **5432**
  - Additional Config/Initial database name: **Linebot**
  - Additional Config/Parameter group: **Parameter group we created in previous step**
  - **Create**
* Wait until status turn to "Available" and Click to see more information
* Copy ***EndPoint*** from Connectivity & Security tab and replace at ***localhost*** in your `.env`
  ```bash
  DATABASE_HOST='...' //Here
  DATABASE_PORT=5432
  DATABASE_USER='postgres'
  DATABASE_PASSWORD='123456789'
  DATABASE_NAME='LineBot'
  ```

> [!NOTE]
> After finish step 2, You can test database connection with ***npm start*** or connect with ***pgAdmin*** by create new server with RDS endpoint.

### 3. Create & Login with IAM User 

> [!NOTE]
> If you already have AWS IAM User you can skip this step.

* Go to search box type "IAM" -> User -> Create user
* After name for user, Select ◉ Attach policy directly
* Assign "AdministratorAccess" role for user and create
* Inspect user info and click "Create Access Key" -> Select ◉ CLI
* Coppy Access Key and Secret Access Key

Now we can login with these steps
* Run this command in command prompt
  ```bash
  aws configure
  ```
* Add Cretentials from previous step to use for login in next step

### 4. Build & Push Image to ECR
We need image to deploy with AWS, So we need to build it first
* Open docker desktop
* Run this command on your project terminal
  ```bash
  docker compose up --build
  ```
  
If you didn't change any docker configuration you will get image name "aws-linebot:lastest"

* In AWS search for "ECR" -> Create private repository there ***( recommand to use same name as you image )***
* Enter repository -> Click on the top right "View push command" button you'll see command, ****<u>asd</u>follow AWS document**** to login and push
* After push complete, `Copy` **image URI** inside repository for the next step
  

### 5. Launch App Runner Service
Now we got all we need (RDS, Image URI) we're at the last step of deploy
* Go to **App Runner** by search bar
* Create service
* Here is easy config
  - Repository Type: **Container Registry**
  - Provider: **Amazon ECR**
  - Container Image URI: `IMAGE URI`
    > Image URI from image in ECR repository
  - Deployment trigger: **Manual**
    > it's up to you, in my case is manual
  - ECR access role: **existing service role**
  - go **Next**
  - Service name:  **...**
    > name your service
  - Port: **3000**
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

 
> [!NOTE]
> This environment should have be the same as your local `.env`

* Let all config left default.   
* **Next** then Confirm you configuration and ***Create & Deploy***  
* Wait until Service status is **Active** then click service to see *Service Overview*

Now you can see application public domain at **Default domain** 

### 6. Connect Web hook with new domain
Navigate to [Line Developer Console](https://developers.line.biz/console/) to change Web hook URL to new URL from App Runner
* Change Web hook URL to **New URL** with same path like this.
  
  ```bash
  //EXAMPLE
  https://newdomain.ap-southest-1.awsapprunner.com/line/webhook
  ```
* Update and Verify Web hook ✅


Let's try your Chat Bot!! 🤖💬

<div align="center">
  <h2> 🏆💯🌟Congratulations Your Application is Deploy Successfully!🚀🎯🎉</h1>
</div>

## Stay in touch

- Author - Pongsatorn Arunrat


[stars-shield]: https://img.shields.io/github/stars/Pongsatorn6487048/LineBot-QR-Reader.svg?style=for-the-badge
[stars-url]: https://github.com/Pongsatorn6487048/LineBot-QR-Reader/stargazers
