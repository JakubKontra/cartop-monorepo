import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../../common/enums/role.enum';

export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/**
 * JWT Strategy for Passport
 * Validates JWT tokens and extracts user information
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // Return user object that will be attached to request
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role || UserRole.PUBLIC,
    };
  }
}
