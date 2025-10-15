import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from '../model/user/user.entity';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth-response.type';
import { ImpersonateResponse } from './dto/impersonate-response.type';
import { PasswordResetRequestResponse } from './dto/password-reset-request-response.type';
import { PasswordResetResponse } from './dto/password-reset-response.type';
import { RequestPasswordResetInput } from './dto/request-password-reset.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { JwtPayload } from './strategies/jwt.strategy';
import { UserRole } from '../common/enums/role.enum';
import { NotificationService } from '../notification/notification.service';

/**
 * Authentication Service
 * Handles user login, token generation, and refresh token logic
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // Store refresh tokens in memory (in production, use Redis or database)
  private refreshTokens: Map<string, { userId: string; expiresAt: number }> = new Map();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationService,
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

  /**
   * Request password reset
   * Generates token and sends email with reset link
   */
  async requestPasswordReset(input: RequestPasswordResetInput): Promise<PasswordResetRequestResponse> {
    const { email } = input;

    try {
      // Find user by email
      const user = await this.userRepository.findOne({ where: { email } });

      // Only process if user exists and is active
      // Don't reveal whether user exists for security
      if (user && user.isActive) {
        // Generate secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token before storing
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // Set token and expiry (24 hours from now)
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        // Update user with reset token
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = expiresAt;
        await this.userRepository.save(user);

        // Build reset link for frontend
        const frontendUrl = process.env.FRONTEND_URL || 'https://cartop.cz';
        const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

        // Send password reset email
        await this.notificationService.sendPasswordReset({
          email: user.email,
          resetPasswordLink: resetLink,
          userId: user.id,
        });

        this.logger.log(`Password reset requested for user: ${user.email}`);
      } else {
        // For security, don't reveal if user doesn't exist
        // Just log it internally
        this.logger.warn(`Password reset attempted for non-existent or inactive user: ${email}`);
      }

      // Always return success to prevent email enumeration
      return {
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.',
      };
    } catch (error) {
      this.logger.error(`Password reset request failed for ${email}:`, error);
      // Still return success to prevent information leakage
      return {
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.',
      };
    }
  }

  /**
   * Reset password using token
   */
  async resetPassword(input: ResetPasswordInput): Promise<PasswordResetResponse> {
    const { token, newPassword, confirmPassword } = input;

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Find all users with non-expired reset tokens
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.passwordResetToken IS NOT NULL')
      .andWhere('user.passwordResetExpires > :now', { now: new Date() })
      .getMany();

    // Check each user's hashed token
    let matchedUser: User | null = null;
    for (const user of users) {
      const isMatch = await bcrypt.compare(token, user.passwordResetToken!);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    matchedUser.password = hashedPassword;
    matchedUser.passwordResetToken = null;
    matchedUser.passwordResetExpires = null;
    await this.userRepository.save(matchedUser);

    // Invalidate all refresh tokens for this user (force re-login)
    const tokensToDelete: string[] = [];
    this.refreshTokens.forEach((value, key) => {
      if (value.userId === matchedUser!.id) {
        tokensToDelete.push(key);
      }
    });
    tokensToDelete.forEach(key => this.refreshTokens.delete(key));

    this.logger.log(`Password reset successful for user: ${matchedUser.email}`);

    return {
      success: true,
      message: 'Your password has been reset successfully. You can now log in with your new password.',
    };
  }
}
