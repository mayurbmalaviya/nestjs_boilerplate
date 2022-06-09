import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { messages } from './constants';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TbTests } from './test.entity';

@Injectable()
export class TestService {
  //Constructor must have to inject entity and  create instance of injected repository.
  constructor(
    @InjectRepository(TbTests)
    private readonly testRepo: Repository<TbTests>,
) { }

  async create(createTestDto: CreateTestDto) {
    let test = await this.testRepo.create();
    test.name = createTestDto.name;
    test.address = createTestDto.address;
    return await this.testRepo.save(test);
  }

  findAll(): Promise<TbTests[]> {
    const tests = this.testRepo.find();
    return tests;
  }

  async findOne(id: number) {
    const test = await this.testRepo.findOne({where: {id: id}});
    return test;
  }

  async updateTest(
    testId: number,
    objTest: UpdateTestDto,
  ) {
    const test = await this.testRepo.findOne({ where: {
      id: testId,
    }});
    if (test == undefined) {
      throw new NotFoundException(messages.testRecordNotFound);
    }
    if(objTest.name) {
      test.name = objTest.name;
    }
    if(objTest.address) {
      test.address = objTest.address;
    }
    return await this.testRepo.save(test);
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  schedulerSampleTask() {
    console.log(`Scheduler cronjob executed`);
  }
}
