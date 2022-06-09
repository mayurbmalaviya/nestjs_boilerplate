import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Request, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { messages } from './constants';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

//ApiTags used to provide controller name in Swagger
@ApiTags('Test')
@Controller('test')
export class TestController {
  //Constructor must have to register service.
  constructor(private readonly testService: TestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  //ApiOkResponse used to mention response type in Swagger
  @ApiOkResponse({ description: messages.testRecordCreated })
  @ApiOperation({ description: 'Create new test record.' })
  async create(@Body() createTestDto: CreateTestDto, @Request() req) {
    const result = await this.testService.create(createTestDto);
    return {
      message: messages.testRecordCreated,
      data: result
    }
  }

  //this guard is used to authenticate the token
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ description: messages.testRecordFound })
  @ApiNotFoundResponse({ description: messages.testRecordNotFound })
 //ApiOperation is used to provide description in Swagger documentation
  @ApiOperation({ description: 'Find specific record' })
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTestDto: UpdateTestDto) {
    const result = await this.testService.updateTest(id, updateTestDto);
    return {message: messages.testRecordUpdated, data: result};
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
