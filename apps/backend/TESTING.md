# Testing Guide

## Overview

Comprehensive test suite for the CartOp Backend v3 with 111 passing tests covering all critical functionality.

## Test Coverage

### Unit Tests (111 tests)

#### 1. AuditService Tests (`src/model/audit/audit.service.spec.ts`)
**Coverage**: Batch processing, queue integration, change detection

Tests:
- ✅ Service initialization with flush interval
- ✅ Module lifecycle (init/destroy)
- ✅ Audit log creation with buffering
- ✅ Batch size threshold triggering
- ✅ Automatic buffer flushing
- ✅ Bulk audit logging
- ✅ Error handling and retry logic
- ✅ Query filtering (entity, user, date range)
- ✅ Entity history retrieval
- ✅ User activity tracking
- ✅ Field-level change calculation
- ✅ Metadata field exclusion

**Key Features Tested**:
- In-memory buffer management
- Configurable batch size (100 items)
- Automatic flush interval (5 seconds)
- Bull queue integration
- Field-level change tracking

#### 2. WebhookService Tests (`src/webhook/webhook.service.spec.ts`)
**Coverage**: Debouncing, payload building, HTTP requests

Tests:
- ✅ Webhook triggering without debouncing
- ✅ Debounce delay implementation
- ✅ Debounce timer reset on rapid changes
- ✅ MaxWait enforcement for debouncing
- ✅ Multiple webhook configurations
- ✅ Error handling
- ✅ Payload building with property selection
- ✅ Change information for UPDATE actions
- ✅ HTTP request sending with headers
- ✅ Custom HTTP methods (POST, PUT, PATCH)
- ✅ Retry configuration
- ✅ Network failure handling

**Key Features Tested**:
- Debouncing with configurable delay
- MaxWait to prevent infinite debouncing
- Selective property transmission
- Retry logic with exponential backoff
- Custom headers and authentication

#### 3. JwtAuthGuard Tests (`src/common/guards/jwt-auth.guard.spec.ts`)
**Coverage**: JWT authentication, @Public() decorator

Tests:
- ✅ Public route access without authentication
- ✅ Protected route authentication requirement
- ✅ Request extraction from GraphQL context
- ✅ Successful authentication with valid token
- ✅ UnauthorizedException for missing token
- ✅ Error propagation
- ✅ Custom error messages

**Key Features Tested**:
- @Public() decorator handling
- GraphQL context extraction
- JWT validation
- Error handling

#### 4. RolesGuard Tests (`src/common/guards/roles.guard.spec.ts`)
**Coverage**: Role-based access control, hierarchy

Tests:
- ✅ Public route access
- ✅ Access when no roles required
- ✅ Access with exact role match
- ✅ Access with higher role in hierarchy
- ✅ Denial with lower role
- ✅ Multiple required roles handling
- ✅ User authentication check
- ✅ Error message with required roles
- ✅ Role hierarchy validation (8 roles)

**Key Features Tested**:
- Role hierarchy (PUBLIC → CUSTOMER → ... → ADMIN)
- Multiple role requirements
- Permission inheritance
- Detailed error messages

#### 5. @Watch Decorator Tests (`src/common/decorators/watch/watch.decorator.spec.ts`)
**Coverage**: Configuration storage, retrieval, triggering

Tests:
- ✅ Configuration storage on entity
- ✅ Multiple decorators on same entity
- ✅ Validation (name, watch, webhook required)
- ✅ Optional field storage
- ✅ Configuration retrieval from instances
- ✅ Empty array for non-watched entities
- ✅ hasWatchConfig check
- ✅ Triggered config filtering by changed properties
- ✅ Multiple matching configs
- ✅ Partial property matches
- ✅ Unwatched property exclusion

**Key Features Tested**:
- Metadata storage with Reflect
- Configuration validation
- Property change detection
- Multiple watch configs per entity

#### 6. @Auditable Decorator Tests (`src/common/decorators/auditable.decorator.spec.ts`)
**Coverage**: Metadata marking, entity checking

Tests:
- ✅ Entity marking as auditable
- ✅ Multiple entity support
- ✅ No side effects on properties/methods
- ✅ Instance checking
- ✅ Non-auditable entity detection
- ✅ Null/undefined handling
- ✅ Plain object rejection
- ✅ Inheritance behavior
- ✅ Entity type distinction
- ✅ TypeORM entity integration

**Key Features Tested**:
- Simple metadata marking
- Instance-based checking
- Inheritance support
- Integration with TypeORM

#### 7. CatalogBrandService Tests (`src/model/catalog-brand/catalog-brand.service.spec.ts`)
**Coverage**: CRUD operations, validation, business logic

Tests:
- ✅ Brand creation
- ✅ Slug uniqueness validation
- ✅ Finding all brands with pagination
- ✅ Active-only filtering
- ✅ Find by ID
- ✅ Find by slug
- ✅ Search by name/slug (case-insensitive)
- ✅ Brand updates
- ✅ Slug uniqueness on update
- ✅ Same slug update allowed
- ✅ Brand deletion
- ✅ Highlighted brands retrieval
- ✅ Recommended brands retrieval
- ✅ NotFoundException handling
- ✅ ConflictException handling

**Key Features Tested**:
- CRUD operations
- Business logic validation
- Case-insensitive search
- Error handling
- TypeORM repository integration

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:cov
```

### Run E2E Tests (when implemented)
```bash
npm run test:e2e
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
```javascript
{
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.interface.ts',
    '!**/*.dto.ts',
    '!**/*.input.ts',
    '!**/*.entity.ts',
    '!**/*.enum.ts',
    '!**/main.ts',
    '!**/*.module.ts',
  ],
  coverageDirectory: '../coverage',
  testTimeout: 10000,
}
```

### E2E Configuration (`test/jest-e2e.json`)
```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
```

## Test Structure

### Unit Test Pattern
```typescript
import { Test, TestingModule } from '@nestjs/testing';

describe('ServiceName', () => {
  let service: ServiceName;
  let dependency: jest.Mocked<Dependency>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceName,
        {
          provide: DependencyToken,
          useValue: mockDependency,
        },
      ],
    }).compile();

    service = module.get<ServiceName>(ServiceName);
    dependency = module.get(DependencyToken);

    jest.clearAllMocks();
  });

  describe('methodName', () => {
    it('should do something', async () => {
      // Arrange
      const input = { ... };
      mockDependency.method.mockResolvedValue({ ... });

      // Act
      const result = await service.methodName(input);

      // Assert
      expect(result).toEqual(expectedOutput);
      expect(mockDependency.method).toHaveBeenCalledWith(input);
    });
  });
});
```

## Mocking Strategies

### 1. Repository Mocking (TypeORM)
```typescript
const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

{
  provide: getRepositoryToken(Entity),
  useValue: mockRepository,
}
```

### 2. Queue Mocking (Bull)
```typescript
const mockQueue = {
  add: jest.fn(),
};

{
  provide: getQueueToken('queueName'),
  useValue: mockQueue,
}
```

### 3. Guard Mocking
```typescript
const mockReflector = {
  getAllAndOverride: jest.fn(),
};

{
  provide: Reflector,
  useValue: mockReflector,
}
```

### 4. GraphQL Context Mocking
```typescript
const mockExecutionContext = {
  switchToHttp: jest.fn(),
  getHandler: jest.fn(),
  getClass: jest.fn(),
  getType: jest.fn().mockReturnValue('graphql'),
} as unknown as ExecutionContext;

jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
  getContext: () => ({ req: mockRequest }),
} as any);
```

## Coverage Goals

- **Unit Tests**: ≥80% coverage
- **Critical Paths**: 100% coverage (guards, subscribers, decorators)
- **Services**: ≥90% coverage
- **Resolvers**: ≥80% coverage (E2E tests preferred)

## Current Test Results

```
Test Suites: 7 passed, 7 total
Tests:       111 passed, 111 total
Snapshots:   0 total
Time:        ~2.5s
```

### Test Files
1. ✅ `audit.service.spec.ts` - 22 tests
2. ✅ `webhook.service.spec.ts` - 26 tests
3. ✅ `jwt-auth.guard.spec.ts` - 5 tests
4. ✅ `roles.guard.spec.ts` - 14 tests
5. ✅ `watch.decorator.spec.ts` - 20 tests
6. ✅ `auditable.decorator.spec.ts` - 10 tests
7. ✅ `catalog-brand.service.spec.ts` - 14 tests

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Use `beforeEach` to reset state
- Clear all mocks between tests

### 2. Descriptive Test Names
```typescript
// ❌ Bad
it('should work', () => { ... });

// ✅ Good
it('should create a new brand when slug is unique', () => { ... });
```

### 3. Arrange-Act-Assert Pattern
```typescript
it('should calculate changes correctly', () => {
  // Arrange
  const oldValue = { name: 'BMW' };
  const newValue = { name: 'BMW Group' };

  // Act
  const changes = service.calculateChanges(oldValue, newValue);

  // Assert
  expect(changes).toEqual({ name: { old: 'BMW', new: 'BMW Group' } });
});
```

### 4. Test Error Scenarios
```typescript
it('should throw NotFoundException if brand not found', async () => {
  mockRepository.findOne.mockResolvedValue(null);

  await expect(service.findOne('non-existent')).rejects.toThrow(
    NotFoundException,
  );
});
```

### 5. Test Edge Cases
- Null/undefined inputs
- Empty arrays
- Boundary conditions
- Concurrent operations

## Future E2E Tests (Planned)

### CatalogBrand Resolver E2E
- GraphQL mutation/query execution
- Authentication integration
- Role-based access control
- Webhook triggering
- Audit log creation

### Authentication E2E
- Login flow
- Token generation
- Token validation
- Role assignment
- Unauthorized access

## Continuous Integration

Add to CI/CD pipeline:
```yaml
test:
  script:
    - npm install
    - npm run test:cov
  coverage: '/Statements\\s+:\\s+(\\d+\\.\\d+)%/'
```

## Debugging Tests

### Run Specific Test File
```bash
npm test -- audit.service.spec.ts
```

### Run Specific Test
```bash
npm test -- -t "should create a new brand"
```

### Verbose Output
```bash
npm test -- --verbose
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache", "${file}"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## Summary

✅ **111 passing tests** covering all major functionality
✅ **7 test suites** for services, guards, and decorators
✅ **Comprehensive coverage** of audit system, webhooks, authentication, and CRUD operations
✅ **Production-ready** testing infrastructure
✅ **Fast execution** (~2.5 seconds for full suite)

The test suite ensures reliability, maintainability, and confidence in the codebase for production deployment.
