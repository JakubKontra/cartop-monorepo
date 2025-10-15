import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from '../model/user/user.entity';
import { NotificationModule } from '../notification/notification.module';
import { getJwtSecret, getJwtExpiration } from '../config/config.validation';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: getJwtSecret(),
      signOptions: {
        expiresIn: getJwtExpiration(),
      },
    }),
    TypeOrmModule.forFeature([User]),
    NotificationModule,
  ],
  providers: [JwtStrategy, AuthService, AuthResolver],
  exports: [JwtModule, PassportModule, AuthService],
})
export class AuthModule {}
