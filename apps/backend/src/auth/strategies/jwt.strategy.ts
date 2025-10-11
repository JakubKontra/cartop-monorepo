import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../../common/enums/role.enum';
import { getJwtSecret } from '../../config/config.validation';

export interface JwtPayload {
  id: string; // user ID (from sub)
  sub: string; // user ID
  email: string;
  roles: UserRole[];
  impersonatedBy?: string; // admin user ID if this is an impersonation session
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
      secretOrKey: getJwtSecret(),
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
      roles: payload.roles || [UserRole.PUBLIC],
      impersonatedBy: payload.impersonatedBy, // Include impersonation context if present
    };
  }
}
