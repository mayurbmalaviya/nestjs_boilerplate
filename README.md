# NESTJS
***
## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Features](#features)

### Description
## Why did I build this project?
I try to create boilerplate of NESTJS which used Typescript as well as Nodejs in 3 tier architecture. I have tried to create basic boiler-plate which we can use while create new project and develop project in standard approach.

### Prerequisites
```
Nodejs(>= 10.13.0)
```

### Technologies
***
A list of technologies used within the project:
```
* [TypeScript]
* [NodeJs]
* [TypeORM]
```

### How to install and run NESTJS project?
***
A little intro about to install nest js. 
```
$ npm i -g @nestjs/cli
$ nest new [project-name]
$ cd [project-name]
$ npm start
```

### Installation of this boiler-plate
***
A little intro about the installation. 
```
$ clone this repo
$ cd demo
$ npm start
```

### Explanation of NESTJS
Here's a brief overview of those core files:
|Files     | Explanation      | 
| ------------ |   ------------ | 
| main.ts | The `entry file` of the application which uses the core function NestFactory to create a Nest application instance.|
| app.controller.ts        | A basic controller with a single `route`.  | 
| app.controller.spec.ts         | The `unit tests` for the controller. | 
| app.module.ts | The `root module` of the application. We have to `register all modules` in app.module file.|
| app.service.ts | A basic `service` with a single method. |

### Explanation of nestjs basic dependencies
|Dependencies     | Explanation      | 
| ------------ |   ------------ | 
| @nestjs/config | It helps to `set configuration` such as `environment file`|
| express-basic-auth | The `middleware` will now `check incoming requests` to match the credentials. For e.g., users: {admin:admin}.|
| @nestjs/swagger | The `OpenAPI` specification is a language-agnostic definition format used to `describe RESTful APIs`.|
|swagger-ui-express| This module allows you to serve `auto-generated swagger-ui generated API docs from express`, based on a swagger.json file.|
|@nestjs/typeorm| TypeORM is definitely the most mature `Object Relational Mapper (ORM)` available in the node.js world. Since it's written in `TypeScript`, it works pretty well with the Nest framework. We have to `register all entities` into typeORM config.|
|mysql2| It used to perform operation with mysql database.| 


### Features
***
List of features are mentioned below:
```
Api development,
```
