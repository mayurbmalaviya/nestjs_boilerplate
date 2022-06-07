import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Request } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { messages } from './constants';

//ApiTags used to provide controller name in Swagger
@ApiTags('Test')
@Controller('test')
export class TestController {
  //Constructor must have to register service.
  constructor(private readonly testService: TestService) {}

  @Post('')
  //ApiOkResponse used to mention response type in Swagger
  @ApiOkResponse({ description: messages.testRecordCreated })
  async create(@Body() createTestDto: CreateTestDto, @Request() req) {
    const result = await this.testService.create(createTestDto);
    return {
      message: messages.testRecordCreated,
      data: result
    }
  }

  @Get()
  @ApiOkResponse({ description: messages.testRecordFound })
  @ApiNotFoundResponse({ description: messages.testRecordNotFound })
  async findAll() {
    const tests = await this.testService.findAll();
    if(!tests.length) {
      throw new NotFoundException(messages.testRecordNotFound);
    }
    return {
      message: messages.testRecordFound,
      data: tests
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: messages.testRecordFound })
  @ApiNotFoundResponse({ description: messages.testRecordNotFound })
  //Api Operation used to provide description about api
  @ApiOperation({ description: 'Find specific record' })
  async findOne(@Param('id') id: number) {
    const test = await this.testService.findOne(id);
    if(test==null) {
      throw new NotFoundException(messages.testRecordNotFound);
    }
    return {message: messages.testRecordFound, data: test }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
