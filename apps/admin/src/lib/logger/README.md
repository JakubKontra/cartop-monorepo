# Logger Service

Centralized logging abstraction for the admin application.

## Features

- **Multiple log levels**: debug, info, warn, error
- **Structured logging**: Add context objects to any log
- **Environment-aware**: Different behavior in dev vs production
- **External service integration**: Easy integration with Sentry, LogRocket, etc.
- **Type-safe**: Full TypeScript support

## Usage

### Basic Logging

```typescript
import { logger } from '@/lib/logger'

// Debug logging (dev only)
logger.debug('Component rendered', { componentName: 'UserProfile' })

// Info logging
logger.info('User logged in successfully', { userId: '123' })

// Warning logging
logger.warn('API rate limit approaching', { remaining: 10 })

// Error logging
logger.error('Failed to fetch user data', error, { userId: '123' })
```

### With Context

Add structured context to any log for better debugging:

```typescript
logger.info('File uploaded', {
  fileId: '123',
  fileName: 'avatar.png',
  fileSize: 1024,
  userId: 'user-456',
})
```

### Error Logging

Pass error objects for better stack traces:

```typescript
try {
  await uploadFile(file)
} catch (error) {
  logger.error('Upload failed', error, {
    fileName: file.name,
    fileSize: file.size,
  })
}
```

## Configuration

### Default Configuration

- **Development**:
  - Min level: `DEBUG`
  - Console: Enabled
  - External logging: Disabled

- **Production**:
  - Min level: `INFO`
  - Console: Enabled
  - External logging: Enabled (when configured)

### Custom Logger

Create a custom logger with specific configuration:

```typescript
import { createLogger, LogLevel } from '@/lib/logger'

const apiLogger = createLogger({
  minLevel: LogLevel.WARN,
  enableConsole: false,
  enableExternalLogging: true,
})

apiLogger.warn('API slow response', { duration: 5000 })
```

### Runtime Configuration

Update the default logger configuration:

```typescript
import { logger, LogLevel } from '@/lib/logger'

// Disable console logging in production
if (import.meta.env.PROD) {
  logger.configure({
    enableConsole: false,
    enableExternalLogging: true,
  })
}
```

## Integration with Sentry

To integrate with Sentry, update the `sendToExternalService` method in `logger.ts`:

```typescript
import * as Sentry from '@sentry/react'

private sendToExternalService(
  level: LogLevel,
  message: string,
  error?: Error | unknown,
  context?: LogContext
): void {
  if (!this.config.enableExternalLogging) return

  if (level === LogLevel.ERROR && error) {
    Sentry.captureException(error, {
      level: 'error',
      extra: { message, ...context },
    })
  } else {
    Sentry.captureMessage(message, {
      level: level as Sentry.SeverityLevel,
      extra: context,
    })
  }
}
```

## Best Practices

### 1. Use Appropriate Log Levels

- **DEBUG**: Detailed information for debugging (dev only)
- **INFO**: General informational messages
- **WARN**: Warning messages for potentially harmful situations
- **ERROR**: Error messages for failures

### 2. Add Context

Always add relevant context to help with debugging:

```typescript
// Bad
logger.error('Upload failed', error)

// Good
logger.error('Upload failed', error, {
  fileName: file.name,
  fileSize: file.size,
  userId: currentUser.id,
})
```

### 3. Don't Log Sensitive Data

Never log passwords, tokens, or other sensitive information:

```typescript
// Bad
logger.info('User logged in', { password: user.password })

// Good
logger.info('User logged in', { userId: user.id })
```

### 4. Use Structured Context

Use objects for context instead of string concatenation:

```typescript
// Bad
logger.info(`User ${userId} uploaded ${fileName}`)

// Good
logger.info('User uploaded file', { userId, fileName })
```

## Migration from console.*

Replace all `console.*` calls with the logger:

```typescript
// Before
console.log('User logged in')
console.error('Failed to fetch data:', error)
console.warn('Deprecated API usage')
console.debug('State:', state)

// After
logger.info('User logged in')
logger.error('Failed to fetch data', error)
logger.warn('Deprecated API usage')
logger.debug('State', { state })
```

## Log Levels

| Level | When to Use | Production | Development |
|-------|-------------|------------|-------------|
| DEBUG | Detailed debugging info | ❌ Filtered | ✅ Visible |
| INFO  | General information | ✅ Visible | ✅ Visible |
| WARN  | Potential issues | ✅ Visible | ✅ Visible |
| ERROR | Actual errors | ✅ Visible | ✅ Visible |

## Future Enhancements

- [ ] Add log batching for external services
- [ ] Add log filtering by tags/categories
- [ ] Add performance metrics logging
- [ ] Add user session tracking
- [ ] Add breadcrumb tracking for error context
