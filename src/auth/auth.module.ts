import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from 'src/configs/config.interface';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    UsersService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
