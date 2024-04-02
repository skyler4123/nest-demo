import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './decorators/public';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic || this.isValidatedToken(context)) {
      return true
    } else {
      return false
    }
  }

  private extractTokenFromHeader(request: Request|any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isValidatedToken(context) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const isValidatedToken = this.authService.isValidatedToken({token: token})
    return !!isValidatedToken
  }
}
