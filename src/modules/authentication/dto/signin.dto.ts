import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class SignInDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}