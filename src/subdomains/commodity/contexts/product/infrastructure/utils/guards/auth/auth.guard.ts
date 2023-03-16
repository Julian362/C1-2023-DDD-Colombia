import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.access_token;
    const access_token = 'SnVsaWFu';
    if (authHeader === access_token) {
      return true;
    }
    throw new HttpException(
      {
        status: 'error',
        message: 'Error de autenticación: token inválido o faltante',
      },
      403,
    );
  }
}
