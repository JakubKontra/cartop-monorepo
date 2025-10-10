import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

/**
 * User Service - Business logic for user operations
 * All changes are automatically tracked by AuditSubscriber
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   */
  async create(input: CreateUserInput): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = this.userRepository.create({
      ...input,
      password: hashedPassword,
    });

    // Save triggers AuditSubscriber.afterInsert
    return this.userRepository.save(user);
  }

  /**
   * Find all users with pagination
   */
  async findAll(limit: number = 50, offset: number = 0): Promise<User[]> {
    return this.userRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Find user by ID
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Update user
   */
  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    // Merge updates
    Object.assign(user, input);

    // Save triggers AuditSubscriber.afterUpdate with change tracking
    return this.userRepository.save(user);
  }

  /**
   * Soft delete user (set isActive to false)
   */
  async softDelete(id: string): Promise<User> {
    const user = await this.findOne(id);
    user.isActive = false;

    // This will trigger audit log with UPDATE action
    return this.userRepository.save(user);
  }

  /**
   * Hard delete user
   */
  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);

    // Remove triggers AuditSubscriber.afterRemove
    await this.userRepository.remove(user);

    return true;
  }

  /**
   * Bulk operations - demonstrates batch audit logging
   */
  async createBulk(inputs: CreateUserInput[]): Promise<User[]> {
    const users = await Promise.all(
      inputs.map(async (input) => {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        return this.userRepository.create({
          ...input,
          password: hashedPassword,
        });
      }),
    );

    // Batch insert - each user triggers individual audit log
    return this.userRepository.save(users);
  }

  /**
   * Search users by name or email
   */
  async search(query: string, limit: number = 20): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email ILIKE :query', { query: `%${query}%` })
      .orWhere('user.firstName ILIKE :query', { query: `%${query}%` })
      .orWhere('user.lastName ILIKE :query', { query: `%${query}%` })
      .take(limit)
      .getMany();
  }
}
