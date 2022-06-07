import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';import { Test } from '@nestjs/testing';
import { TbTests } from './test.entity';

@Module({
  //Import and register list of Entity which we wanna used in this module
  imports: [
    TypeOrmModule.forFeature([TbTests]),
  ],
  controllers: [TestController],
  providers: [TestService]
  //We must have to export service which we would like to import in other modules.
})
export class TestModule {}
