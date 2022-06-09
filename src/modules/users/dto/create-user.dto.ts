import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty({ default: false })
    @IsBoolean()
    isVerified: boolean;

}