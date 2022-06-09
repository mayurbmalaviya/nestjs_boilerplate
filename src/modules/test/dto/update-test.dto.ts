import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateTestDto } from './create-test.dto';

//This is how we can create partial dto file which can accept partial parameters
export class UpdateTestDto extends PartialType(CreateTestDto) {

}
