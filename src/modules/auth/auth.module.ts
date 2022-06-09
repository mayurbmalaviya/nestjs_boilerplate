import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule, 
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        /**
         * TODO : enable this for refresh tokens
         *
         * signOptions: {
         *   expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
         * },
         */
      }),
    }),

  ],
  providers: [JwtStrategy, JwtRefreshStrategy, AuthService]

})
export class AuthModule {}
