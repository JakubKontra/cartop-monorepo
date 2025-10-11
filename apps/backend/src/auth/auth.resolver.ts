import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { ImpersonateInput } from './dto/impersonate.input';
import { AuthResponse } from './dto/auth-response.type';
import { ImpersonateResponse } from './dto/impersonate-response.type';
import { Public } from '../common/decorators/auth/public.decorator';
import { Roles } from '../common/decorators/auth/roles.decorator';
import { CurrentUser } from '../common/decorators/auth/current-user.decorator';
import { UserRole } from '../common/enums/role.enum';
import { JwtPayload } from './strategies/jwt.strategy';

/**
 * Authentication Resolver
 * Handles login and token refresh mutations
 */
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login mutation
   * Authenticates user and returns access/refresh tokens
   * @Public - No authentication required
   */
  @Mutation(() => AuthResponse)
  @Public()
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.authService.login(input);
  }

  /**
   * Refresh token mutation
   * Generates new access/refresh tokens using existing refresh token
   * @Public - No authentication required (refresh token is validated)
   */
  @Mutation(() => AuthResponse)
  @Public()
  async refreshToken(@Args('input') input: RefreshTokenInput): Promise<AuthResponse> {
    return this.authService.refreshAccessToken(input.refreshToken);
  }

  /**
   * Impersonate user mutation
   * Allows admins to impersonate other users
   * @Roles(ADMIN) - Only admins can impersonate
   */
  @Mutation(() => ImpersonateResponse)
  @Roles(UserRole.ADMIN)
  async impersonateUser(
    @Args('input') input: ImpersonateInput,
    @CurrentUser() admin: JwtPayload,
  ): Promise<ImpersonateResponse> {
    return this.authService.impersonate(admin.id, input.targetUserId);
  }

  /**
   * Stop impersonation mutation
   * Returns admin to their original session
   * Requires active impersonation session
   */
  @Mutation(() => AuthResponse)
  async stopImpersonation(@CurrentUser() user: JwtPayload): Promise<AuthResponse> {
    if (!user.impersonatedBy) {
      throw new Error('Not currently impersonating a user');
    }
    return this.authService.stopImpersonation(user.impersonatedBy);
  }
}
