import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { AuthResponse } from './dto/auth-response.type';
import { Public } from '../common/decorators/auth/public.decorator';

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
}
