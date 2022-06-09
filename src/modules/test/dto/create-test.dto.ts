import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTestDto {
    //ApiProperty tag is used to list the paramter in Swagger
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty({ default: false })
    //IsOptional tag is used to pass as a optional parameter
    @IsOptional()
    isActive: boolean;
}