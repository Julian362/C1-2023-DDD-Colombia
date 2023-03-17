import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * filtro de excepcion de NotFoundException
 *
 * @export
 * @class NotFoundExceptionFilter
 * @implements {ExceptionFilter<NotFoundException>}
 */
@Catch(NotFoundException)
export class NotFoundExceptionFilter
  implements ExceptionFilter<NotFoundException>
{
  /**
   * captura la excepcion de NotFoundException
   *
   * @param {NotFoundException} exception excepcion de NotFoundException
   * @param {ArgumentsHost} host host de la excepcion
   * @memberof NotFoundExceptionFilter
   */
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.NOT_FOUND;
    const errors = exception.name;

    response.status(statusCode).json({
      statusCode,
      message,
      errors,
    });
  }
}
