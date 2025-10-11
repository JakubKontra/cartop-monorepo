import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../model/user/user.entity';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';
import { ImpersonateResponse } from './dto/impersonate-response.type';
import { JwtPayload } from './strategies/jwt.strategy';
import { UserRole } from '../common/enums/role.enum';

/**
 * Authentication Service
 * Handles user login, token generation, and refresh token logic
 */
@Injectable()
export class AuthService {
  // Store refresh tokens in memory (in production, use Redis or database)
  private refreshTokens: Map<string, { userId: string; expiresAt: number }> = new Map();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login user with email and password
   */
  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
    // Validate refresh token
    const tokenData = this.refreshTokens.get(refreshToken);

    if (!tokenData) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if token is expired
    if (Date.now() > tokenData.expiresAt) {
      this.refreshTokens.delete(refreshToken);
      throw new UnauthorizedException('Refresh token expired');
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: { id: tokenData.userId },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    // Invalidate old refresh token
    this.refreshTokens.delete(refreshToken);

    // Generate new tokens
    const newAccessToken = this.generateAccessToken(user);
    const newRefreshToken = this.generateRefreshToken(user);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user,
    };
  }

  /**
   * Generate JWT access token (short-lived: 15 minutes)
   */
  private generateAccessToken(user: User, impersonatedBy?: string): string {
    const payload: JwtPayload = {
      id: user.id,
      sub: user.id,
      email: user.email,
      roles: user.roles,
      impersonatedBy,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }

  /**
   * Generate refresh token (long-lived: 7 days)
   */
  private generateRefreshToken(user: User): string {
    // Generate random token
    const token = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' },
    );

    // Store token with expiration (7 days)
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    this.refreshTokens.set(token, {
      userId: user.id,
      expiresAt,
    });

    return token;
  }

  /**
   * Revoke refresh token (logout)
   */
  async revokeRefreshToken(refreshToken: string): Promise<boolean> {
    return this.refreshTokens.delete(refreshToken);
  }

  /**
   * Impersonate another user (ADMIN only)
   */
  async impersonate(adminUserId: string, targetUserId: string): Promise<ImpersonateResponse> {
    // Get admin user
    const adminUser = await this.userRepository.findOne({
      where: { id: adminUserId },
    });

    if (!adminUser || !adminUser.roles.includes(UserRole.ADMIN)) {
      throw new ForbiddenException('Only admins can impersonate users');
    }

    // Get target user
    const targetUser = await this.userRepository.findOne({
      where: { id: targetUserId },
    });

    if (!targetUser) {
      throw new UnauthorizedException('Target user not found');
    }

    if (!targetUser.isActive) {
      throw new UnauthorizedException('Cannot impersonate inactive user');
    }

    // Cannot impersonate another admin
    if (targetUser.roles.includes(UserRole.ADMIN)) {
      throw new ForbiddenException('Cannot impersonate another admin');
    }

    // Generate tokens with impersonation context
    const accessToken = this.generateAccessToken(targetUser, adminUser.id);
    const refreshToken = this.generateRefreshTokenWithImpersonation(targetUser, adminUser.id);

    return {
      accessToken,
      refreshToken,
      impersonatedUser: targetUser,
      originalUser: adminUser,
    };
  }

  /**
   * Stop impersonation and return to admin session
   */
  async stopImpersonation(impersonatedBy: string): Promise<AuthResponse> {
    // Get the original admin user
    const adminUser = await this.userRepository.findOne({
      where: { id: impersonatedBy },
    });

    if (!adminUser || !adminUser.isActive) {
      throw new UnauthorizedException('Original admin user not found or inactive');
    }

    // Generate new tokens for the admin (without impersonation)
    const accessToken = this.generateAccessToken(adminUser);
    const refreshToken = this.generateRefreshToken(adminUser);

    return {
      accessToken,
      refreshToken,
      user: adminUser,
    };
  }

  /**
   * Generate refresh token with impersonation context
   */
  private generateRefreshTokenWithImpersonation(user: User, impersonatedBy: string): string {
    // Generate token with impersonation flag
    const token = this.jwtService.sign(
      { sub: user.id, type: 'refresh', impersonatedBy },
      { expiresIn: '7d' },
    );

    // Store token with expiration (7 days)
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    this.refreshTokens.set(token, {
      userId: user.id,
      expiresAt,
    });

    return token;
  }
}
