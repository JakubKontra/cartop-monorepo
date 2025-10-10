# Backend TODO & Future Improvements

This document tracks security, performance, and code quality improvements that should be addressed before production deployment or as the application matures.

## Critical for Production

### 3. CORS Configuration
**Status:** TODO
**Priority:** High
**Location:** `src/main.ts:21`

Currently using `app.enableCors()` with no restrictions, which allows all origins.

**Required Changes:**
```typescript
app.enableCors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

**Environment Variables to Add:**
- `CORS_ORIGINS` - Comma-separated list of allowed origins

**References:**
- [NestJS CORS Documentation](https://docs.nestjs.com/security/cors)

---

### 5. Public Marketing Endpoints
**Status:** TODO
**Priority:** High
**Location:** `src/marketing/marketing.controller.ts`

Marketing endpoints are currently public (using `@Public()` decorator) for development convenience.

**Required Changes:**
- Remove `@Public()` decorator from marketing endpoints
- Add proper JWT authentication
- Consider API key authentication for external services
- Update Swagger documentation to reflect authentication requirements

**Security Implications:**
Without authentication, anyone can:
- Create templates in your Ecomail account
- Consume API resources
- Potentially cause rate limiting issues

**References:**
- See `src/marketing/SWAGGER.md` for implementation details

---

### 6. Database Auto-Synchronize
**Status:** TODO
**Priority:** High
**Location:** `src/app.module.ts` (TypeORM configuration)

Currently using `synchronize: true` which auto-creates/updates database schema.

**Required Changes:**
```typescript
TypeOrmModule.forRoot({
  // ...
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: process.env.NODE_ENV === 'production',
}),
```

**Action Items:**
1. Generate initial migration from current schema
2. Set up migration scripts in package.json
3. Document migration workflow in README
4. Disable synchronize in production

**References:**
- [TypeORM Migrations](https://typeorm.io/migrations)

---

## Code Quality & Maintenance

### 13. Test Coverage
**Status:** TODO
**Priority:** Medium

Current test coverage is minimal. Need comprehensive test suite.

**Areas to Cover:**
- Unit tests for services (Marketing, Ecomail, Auth, etc.)
- Integration tests for API endpoints
- E2E tests for critical user flows
- GraphQL resolver tests
- Authentication/Authorization tests

**Target Coverage:** 80%+ for critical paths

**Tools:**
- Jest (already configured)
- `@nestjs/testing`
- Supertest for E2E

**Commands:**
```bash
npm run test           # Unit tests
npm run test:e2e       # E2E tests
npm run test:cov       # Coverage report
```

---

### 21. Passport + Fastify Best Practices
**Status:** TODO
**Priority:** Medium
**Location:** `src/auth/` directory

Current setup uses Passport.js with Fastify, which has compatibility issues that were worked around using `@Public()` decorators.

**Current Issues:**
- Passport.js expects Express-style request objects (`req.logIn`, `req.logout`, etc.)
- Fastify doesn't have these methods by default
- Authentication errors occurred when trying to use JWT guard on REST endpoints
- Temporary fix: Using `@Public()` decorator to bypass authentication

**Recommended Solutions:**

1. **Option A: Use @fastify/passport (Recommended)**
   ```bash
   yarn add @fastify/passport @fastify/secure-session
   ```
   - Provides Fastify-native Passport adapter
   - Fully compatible with existing Passport strategies
   - Maintains current JWT strategy code
   - Better integration with Fastify lifecycle

2. **Option B: Custom JWT Validation**
   - Remove Passport.js dependency entirely
   - Implement custom Fastify hooks for JWT validation
   - Lighter weight, more control
   - Requires rewriting authentication logic

3. **Option C: Keep Current Approach + Document**
   - Current workaround is functional for now
   - Document that REST endpoints need `@Public()` decorator
   - Plan migration to @fastify/passport for future sprint

**Implementation Steps (Option A):**
```typescript
// main.ts
import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';

// Register Fastify plugins before NestJS app
await app.register(fastifySecureSession, {
  key: Buffer.from(process.env.SESSION_SECRET, 'hex'),
  cookie: { secure: process.env.NODE_ENV === 'production' }
});

await app.register(fastifyPassport.initialize());
await app.register(fastifyPassport.secureSession());
```

**References:**
- [@fastify/passport Documentation](https://github.com/fastify/fastify-passport)
- [NestJS + Fastify Authentication](https://docs.nestjs.com/techniques/authentication#request-scoped-strategies)
- [Fastify Plugins](https://www.fastify.io/docs/latest/Reference/Plugins/)

**Related Issues:**
- Marketing endpoints currently using `@Public()` (see #5)
- JWT guard architecture needs review (see #22)

---

### 22. JWT Guard Architecture
**Status:** TODO
**Priority:** Medium
**Location:** `src/auth/guards/`, `src/app.module.ts`

Current global JWT guard architecture causes issues with public endpoints and may not be optimal for mixed REST/GraphQL API.

**Current Architecture:**
```typescript
// app.module.ts - Global guards applied to ALL endpoints
providers: [
  { provide: APP_GUARD, useClass: JwtAuthGuard },
  { provide: APP_GUARD, useClass: RolesGuard },
]
```

**Issues:**
1. **Global Application**: Every endpoint requires authentication by default
2. **@Public() Workaround**: Need decorator to opt-out of authentication
3. **GraphQL vs REST**: Different auth patterns but same guard applies to both
4. **Development Friction**: Harder to test endpoints, need JWT tokens for everything

**Proposed Solutions:**

**Option A: Remove Global Guard + Explicit Protection (Recommended)**
```typescript
// app.module.ts - Remove global guards
providers: []

// Protected REST Controller
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/users')
export class UserController {
  @Get()
  findAll() {} // Protected by default

  @Public() // Can still use @Public() for specific endpoints
  @Get('public-profile/:id')
  getPublicProfile() {}
}

// Protected GraphQL Resolver
@Resolver()
export class UserResolver {
  @UseGuards(GqlAuthGuard)
  @Query()
  me() {} // Protected

  @Query()
  publicUsers() {} // Public by default
}
```

**Benefits:**
- Explicit is better than implicit (Zen of Python)
- Easier to understand which endpoints are protected
- No need for @Public() decorator workaround
- Better separation between REST and GraphQL auth

**Option B: Keep Global + Improve @Public() Decorator**
```typescript
// Current approach, just document it better
// Acceptable for now if auth is required for most endpoints
```

**Option C: Separate Guards for REST and GraphQL**
```typescript
// Custom guard that checks route type
@Injectable()
export class SmartAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const type = context.getType();
    if (type === 'http') {
      // REST-specific logic
    } else if (type === 'graphql') {
      // GraphQL-specific logic
    }
  }
}
```

**Implementation Checklist (Option A):**
- [ ] Remove global guard registration from app.module.ts
- [ ] Add `@UseGuards(JwtAuthGuard, RolesGuard)` to protected controllers
- [ ] Add `@UseGuards(GqlAuthGuard)` to protected resolvers
- [ ] Update documentation
- [ ] Test all endpoints (both protected and public)
- [ ] Remove or keep @Public() decorator for future use

**GraphQL-Specific Guard:**
```typescript
// common/guards/gql-auth.guard.ts
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
```

**References:**
- [NestJS Global Guards](https://docs.nestjs.com/guards#binding-guards)
- [GraphQL Auth](https://docs.nestjs.com/graphql/other-features#execute-enhancers-at-the-field-resolver-level)
- [Explicit vs Implicit](https://peps.python.org/pep-0020/)

**Related:**
- See #21 for Passport + Fastify compatibility issues

---

### 23. TypeScript Error Suppressions
**Status:** TODO
**Priority:** Low
**Location:** Test files

Several test files use `@ts-expect-error` to suppress type checking.

**Action Items:**
1. Search for all `@ts-expect-error` comments
2. Fix underlying type issues
3. Remove suppressions or add proper type assertions

**Command:**
```bash
grep -r "@ts-expect-error" src/
```

---

### 24. HTML Input Sanitization
**Status:** TODO
**Priority:** Medium
**Location:** `src/marketing/`, email templates

HTML content from offers/templates should be sanitized to prevent XSS.

**Required Changes:**
```typescript
import * as DOMPurify from 'isomorphic-dompurify';

const sanitizedHtml = DOMPurify.sanitize(userInputHtml, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'img'],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
});
```

**Packages:**
- `isomorphic-dompurify` - Works in Node.js
- Consider validation at DTO level

---

## Observability & Monitoring

### 27. Performance Monitoring (APM)
**Status:** TODO
**Priority:** Medium

Add Application Performance Monitoring to track:
- Response times
- Database query performance
- External API calls (Ecomail, Mailgun)
- Memory usage
- CPU usage

**Options:**
- **New Relic** - Full-featured APM
- **Datadog** - APM + infrastructure
- **Elastic APM** - Open source
- **Sentry Performance** - Integrates with error tracking

**Implementation:**
```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
  ],
});
```

---

### 28. Metrics & Observability
**Status:** TODO
**Priority:** Medium

Add metrics collection for operational insights.

**Metrics to Track:**
- HTTP request count/duration by endpoint
- GraphQL query count/duration by type
- Database connection pool utilization
- Queue job processing times
- Email send success/failure rates
- Ecomail API call latency

**Recommended Stack:**
- **Prometheus** - Metrics collection
- **Grafana** - Visualization
- **@willsoto/nestjs-prometheus** - NestJS integration

**Example:**
```typescript
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
      path: '/metrics',
    }),
  ],
})
```

**Dashboards to Create:**
- API performance overview
- Database health
- Queue processing status
- Error rates by endpoint

---

## Completed

### ✅ 1. GraphQL Playground/Introspection
**Completed:** 2025-10-10
**Location:** `src/app.module.ts`

GraphQL playground and introspection now disabled in production.

---

### ✅ 2. JWT Secret Validation
**Completed:** 2025-10-10
**Location:** `src/config/config.validation.ts`

Application now fails fast in production if JWT_SECRET is not set, with clear error message and instructions.

---

## Notes

- Review this document regularly and update status
- Move completed items to "Completed" section with date
- Add new items as they're discovered
- Link to related issues/PRs when available
