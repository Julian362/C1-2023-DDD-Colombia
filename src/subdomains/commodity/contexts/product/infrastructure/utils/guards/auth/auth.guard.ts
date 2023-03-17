import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

/**
 * clase que representa el guard de autenticación
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * método que verifica si el usuario está autenticado
   *
   * @param {ExecutionContext} context
   * @return {*}  {Promise<boolean>}
   * @memberof AuthGuard
   */
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
