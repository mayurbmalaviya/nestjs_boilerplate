import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { AuthenticationService } from './authentication.service';
import { messages } from './constants';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Response } from 'express';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService,
    private readonly userService: UsersService
    ) {}

    @ApiCreatedResponse({ description: messages.userRegistered })
    @ApiNotFoundResponse({ description: messages.invalidSignUpRequest })
    @ApiConflictResponse({description: messages.userAlreadyExists})
//    @Serialize(SignUpResDto)
    @Post('signup')
    async signup(@Body() signupData: SignUpDto) {
        const result = await this.userService.signup(signupData);
        return {message: messages.userRegistered, data: result};
    }

    @ApiOkResponse({ description: messages.signInSuccess })
    @ApiUnauthorizedResponse({ description: messages.invalidPassword })
    @ApiUnauthorizedResponse({ description: messages.unverified })
    @HttpCode(200)
    @Post('signin')
    async signin(@Body() signinData: SignInDto, @Res() response: Response) {
        const { cookies, token } = await this.authenticationService.signin(
            signinData.email,
            signinData.password
        );

        response.setHeader('Set-Cookie', [
            cookies.accessTokenCookie.cookie,
            cookies.refreshTokenCookie.cookie,
        ]);

        return response.send({
        message: messages.signInSuccess,
        data: { token },
        });
  }
}
