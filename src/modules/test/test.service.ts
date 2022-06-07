import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
