import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Roles } from '../../common/decorators/auth/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';

/**
 * User Resolver
 * All operations require ADMIN role for security
 *
 * Note: Consider splitting into public/admin resolvers if users
 * need to view/update their own profiles
 */
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user
   * Requires ADMIN role
   */
  @Mutation(() => User)
  @Roles(UserRole.ADMIN)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create(input);
  }

  /**
   * Get all users with pagination
   * Requires ADMIN role
   */
  @Query(() => [User], { name: 'users' })
  @Roles(UserRole.ADMIN)
  async getUsers(
    @Args('limit', { nullable: true, defaultValue: 50 }) limit: number,
    @Args('offset', { nullable: true, defaultValue: 0 }) offset: number,
  ): Promise<User[]> {
    return this.userService.findAll(limit, offset);
  }

  /**
   * Get a single user by ID
   * Requires ADMIN role
   */
  @Query(() => User, { name: 'user' })
  @Roles(UserRole.ADMIN)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  /**
   * Search users by name or email
   * Requires ADMIN role
   */
  @Query(() => [User], { name: 'searchUsers' })
  @Roles(UserRole.ADMIN)
  async searchUsers(
    @Args('query') query: string,
    @Args('limit', { nullable: true, defaultValue: 20 }) limit: number,
  ): Promise<User[]> {
    return this.userService.search(query, limit);
  }

  /**
   * Update user
   * Requires ADMIN role
   */
  @Mutation(() => User)
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, input);
  }

  /**
   * Soft delete user (set isActive to false)
   * Requires ADMIN role
   */
  @Mutation(() => User)
  @Roles(UserRole.ADMIN)
  async softDeleteUser(@Args('id') id: string): Promise<User> {
    return this.userService.softDelete(id);
  }

  /**
   * Hard delete user
   * Requires ADMIN role only (most restrictive)
   */
  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.userService.remove(id);
  }
}
