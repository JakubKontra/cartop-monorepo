import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/auth/public.decorator';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  describe('canActivate', () => {
    it('should allow access to public routes', () => {
      const mockExecutionContext = createMockExecutionContext();

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      const result = guard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
        mockExecutionContext.getHandler(),
        mockExecutionContext.getClass(),
      ]);
    });

    it('should require authentication for protected routes', async () => {
      const mockExecutionContext = createMockExecutionContext();
      const mockRequest = { headers: { authorization: 'Bearer token' }, user: null };

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
      jest.spyOn(guard, 'getRequest').mockReturnValue(mockRequest);

      // Mock the parent canActivate to return true
      const parentCanActivate = jest.spyOn(
        Object.getPrototypeOf(Object.getPrototypeOf(guard)),
        'canActivate',
      ).mockReturnValue(true);

      await guard.canActivate(mockExecutionContext);

      expect(reflector.getAllAndOverride).toHaveBeenCalled();
      expect(parentCanActivate).toHaveBeenCalled();
    });
  });

  describe('getRequest', () => {
    it('should extract request from GraphQL context', () => {
      const mockRequest = { headers: {}, user: null };
      const mockContext = {
        req: mockRequest,
      };

      const mockExecutionContext = {
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

      const request = guard.getRequest(mockExecutionContext);

      expect(request).toBe(mockRequest);
    });
  });

  describe('handleRequest', () => {
    it('should return user when authentication succeeds', () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        role: 'admin',
      };

      const result = guard.handleRequest(null, mockUser, null);

      expect(result).toBe(mockUser);
    });

    it('should throw UnauthorizedException when user is not provided', () => {
      expect(() => {
        guard.handleRequest(null, null, null);
      }).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when error occurs', () => {
      const error = new Error('Token expired');
      const mockUser = { id: 'user-1', email: 'test@example.com' };

      expect(() => {
        guard.handleRequest(error, mockUser, null);
      }).toThrow(error);
    });

    it('should throw custom error message for missing token', () => {
      expect(() => {
        guard.handleRequest(null, null, null);
      }).toThrow('Invalid or missing authentication token');
    });
  });
});

function createMockExecutionContext(): ExecutionContext {
  return {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn(),
    }),
    getHandler: jest.fn(),
    getClass: jest.fn(),
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn().mockReturnValue('graphql'),
  } as unknown as ExecutionContext;
}
