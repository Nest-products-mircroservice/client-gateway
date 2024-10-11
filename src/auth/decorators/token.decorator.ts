import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!request.token) {
    throw new InternalServerErrorException('token decorator error - undefined token. is it authGuard working? ');
  }

  return request.token;
});
