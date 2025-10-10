/**
 * User related types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  role?: UserRole;
}
