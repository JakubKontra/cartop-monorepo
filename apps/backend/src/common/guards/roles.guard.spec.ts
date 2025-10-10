import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../enums/role.enum';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    it('should allow access to public routes', () => {
      const mockExecutionContext = createMockExecutionContext();

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(true) // IS_PUBLIC_KEY
        .mockReturnValueOnce(null); // ROLES_KEY

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should allow access when no roles are required', () => {
      const mockExecutionContext = createMockExecutionContext({
        id: 'user-1',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY
        .mockReturnValueOnce(null); // ROLES_KEY (no roles required)

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should allow access when user has required role', () => {
      const mockExecutionContext = createMockExecutionContext({
        id: 'user-1',
        email: 'test@example.com',
        role: UserRole.ADMIN,
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY
        .mockReturnValueOnce([UserRole.ADMIN]); // ROLES_KEY

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should allow access when user role is higher in hierarchy', () => {
      const mockExecutionContext = createMockExecutionContext({
        id: 'user-1',
        email: 'test@example.com',
        role: UserRole.ADMIN,
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY
        .mockReturnValueOnce([UserRole.CATALOG_MANAGER]); // ROLES_KEY

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should deny access when user role is lower in hierarchy', () => {
      const mockExecutionContext = createMockExecutionContext({
        id: 'user-1',
        email: 'test@example.com',
        role: UserRole.CUSTOMER,
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY
        .mockReturnValueOnce([UserRole.ADMIN]); // ROLES_KEY

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow(ForbiddenException);
    });

    it('should allow access when user has one of multiple required roles', () => {
      const mockExecutionContext = createMockExecutionContext({
        id: 'user-1',
        email: 'test@example.com',
        role: UserRole.CATALOG_MANAGER,
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY
        .mockReturnValueOnce([
          UserRole.CATALOG_MANAGER,
          UserRole.ADMIN,
        ]); // ROLES_KEY

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when user is not authenticated', () => {
      const mockExecutionContext = createMockExecutionContext(null);

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY (first call)
        .mockReturnValueOnce([UserRole.ADMIN]) // ROLES_KEY (first call)
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY (second call)
        .mockReturnValueOnce([UserRole.ADMIN]); // ROLES_KEY (second call)

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow(ForbiddenException);

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow('User not authenticated');
    });

    it('should include required roles in error message', () => {
      const mockExecutionContext = createMockExecutionContext({
        id: 'user-1',
        email: 'test@example.com',
        role: UserRole.PUBLIC,
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValueOnce(false) // IS_PUBLIC_KEY
        .mockReturnValueOnce([UserRole.ADMIN, UserRole.CATALOG_MANAGER]); // ROLES_KEY

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow('Insufficient permissions. Required roles: admin, catalogManager');
    });
  });

  describe('hasPermission', () => {
    it('should grant permission when user role matches required role', () => {
      const hasPermission = (guard as any).hasPermission(
        UserRole.ADMIN,
        UserRole.ADMIN,
      );
      expect(hasPermission).toBe(true);
    });

    it('should grant permission when user role is higher than required', () => {
      const hasPermission = (guard as any).hasPermission(
        UserRole.ADMIN,
        UserRole.CUSTOMER,
      );
      expect(hasPermission).toBe(true);
    });

    it('should deny permission when user role is lower than required', () => {
      const hasPermission = (guard as any).hasPermission(
        UserRole.CUSTOMER,
        UserRole.ADMIN,
      );
      expect(hasPermission).toBe(false);
    });

    it('should handle role hierarchy correctly', () => {
      // Test full hierarchy
      const roles = [
        UserRole.PUBLIC,
        UserRole.CUSTOMER,
        UserRole.JUNIOR_SALES_REPRESENTATIVE,
        UserRole.SALES_REPRESENTATIVE,
        UserRole.CATALOG_MANAGER,
        UserRole.MARKETING,
        UserRole.CUSTOMER_SERVICE,
        UserRole.ADMIN,
      ];

      // Admin should have access to everything
      for (const role of roles) {
        expect((guard as any).hasPermission(UserRole.ADMIN, role)).toBe(true);
      }

      // Customer should only have access to customer and public
      expect((guard as any).hasPermission(UserRole.CUSTOMER, UserRole.PUBLIC)).toBe(
        true,
      );
      expect((guard as any).hasPermission(UserRole.CUSTOMER, UserRole.CUSTOMER)).toBe(
        true,
      );
      expect(
        (guard as any).hasPermission(UserRole.CUSTOMER, UserRole.SALES_REPRESENTATIVE),
      ).toBe(false);

      // Sales representative should have access to junior and below
      expect(
        (guard as any).hasPermission(
          UserRole.SALES_REPRESENTATIVE,
          UserRole.JUNIOR_SALES_REPRESENTATIVE,
        ),
      ).toBe(true);
      expect(
        (guard as any).hasPermission(
          UserRole.SALES_REPRESENTATIVE,
          UserRole.CATALOG_MANAGER,
        ),
      ).toBe(false);
    });
  });
});

function createMockExecutionContext(user: any = null): ExecutionContext {
  const mockRequest = { user };
  const mockContext = { req: mockRequest };

  const executionContext = {
    switchToHttp: jest.fn(),
    getHandler: jest.fn(),
    getClass: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn().mockReturnValue('graphql'),
  } as unknown as ExecutionContext;

  jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
    getContext: () => mockContext,
  } as any);

  return executionContext;
}
