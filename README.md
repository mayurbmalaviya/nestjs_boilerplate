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

## What is the workflow of this project?
This project has tried to write API as well as documentation using OpenAPI(Swagger). It has used `JWT authentication` using `passport js`.

### Prerequisites
```
Nodejs(>= 10.13.0)
```

### Technologies
***
A list of technologies used within the project:
* TypeScript
* NodeJs
* TypeORM
* Swagger


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

### FAQ's
## What should I take care after create module?
We have to add dependency at 2 places:
- Register `Entity` at typeorm configuration file 
- Register `Module` at `import of App Module`.

## How to generate module?
```
 nest g resource [module_name]
```

## What modules consider?
Module consider mainly 4 files:
- Module
  `Module consider mainly four parts:` 
    * imports(it import `entity of used modules`, `external modules` and `services`), 
    * controllers, 
    * providers(consider `services`), 
    * exports(consider `Modules and Services`)
- Controller
- Service(`Inject entity` in constructor)
- Entity

## What is Swagger?
Swagger is an `API specification`. `Simplify API development` for users, teams and enterprises with the Swagger open source and professional toolset.

## Most use of tags to create Swagger documentation?
|Tags     | Explanation      | 
| ------------ |   ------------ | 
| @ApiTags | It's `controller` level tag. It's uniquely identify to controller.|
|@ApiOkResponse | It's `router` level tag. It's used to identify `response type`.|
|@ApiBearerAuth| It's `router` level tag. It's used to `authenticate token`. |
|@ApiQuery| It's `router` level tag. It's used to identify `query` parameter.
|@ApiOperation| It's `router` level tag. It's used to `display description` about api.|
|@ApiProperty | It used in `DTO` file. It seems body parameter for specific route.|


## Most used exception tags?
|Tags     | Explanation  | 
| ------------ |   ------------ | 
| ConflictException | If record is `already exists`.|
| NotFoundException | If recoded is `not found`.|
| BadRequestException| If record is `exist but not activate`. |
| ForbiddenException| If record is `exist but not activate`.|
| UnauthorizedException | If record is `exist but password or email doesn't match`.|

### Features
***
List of features are mentioned below:
```
CRUD operations,
```
