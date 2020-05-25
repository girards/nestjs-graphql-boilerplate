import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../users/users.entity';

export const CurrentUser = createParamDecorator(
  (context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: { user: User } }>().req.user;
  },
);
