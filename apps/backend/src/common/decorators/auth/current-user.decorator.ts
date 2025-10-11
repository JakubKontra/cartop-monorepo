import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * CurrentUser Decorator
 * Extracts the authenticated user from the request context
 * Works with both REST and GraphQL requests
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    // Check if this is a GraphQL request
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // Return the user object that was set by the JWT strategy
    return request.user;
  },
);
