import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { messages } from './constants';
import { UsersService } from '../users/users.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
) { }
  
  async signup(
    name: string,
    address: string,
    email: string,
    password: string,
    isVerified: boolean = false
  ) {
      const objUser: CreateUserDto = {
        name,
        email,
        password,
        address,
        isVerified
      };
      const user = await this.userService.signup(objUser);
      return user;
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }

  async signin(
    email: string,
    password: string
  ) {
    //user signin service call
      const objUser: SignInUserDto =  { email, password };
      const user = await this.userService.signIn(objUser);
      
      const payload = {
          email: user.email,
          id: user.id,
          name: user.name,
        };
        const cookies = this.getTokens(payload);
        const token = this.getSignedToken(payload);

        return { cookies, token }; 
  }

  //This function will create new Access token with cookie
  private getCookieWithJwtAccessToken(payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return {
      cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    };
  }

  //This function will create new Refresh token with cookie
  private getCookieWithJwtRefreshToken(payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }

  //this function will generate Access token and Refresh token
  private getTokens(payload: any) {
    return {
      accessTokenCookie: this.getCookieWithJwtAccessToken(payload),
      refreshTokenCookie: this.getCookieWithJwtRefreshToken(payload),
    };
  }

  private getSignedToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }
}
