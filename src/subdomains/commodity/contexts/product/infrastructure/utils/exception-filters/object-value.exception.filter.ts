import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValueObjectException } from '@sofka';
import { Response } from 'express';

/**
 * filtro de excepcion de ValueObjectException
 *
 * @export
 * @class ObjectValueExceptionFilter
 * @implements {ExceptionFilter<ValueObjectException>}
 */
@Catch(ValueObjectException)
export class ObjectValueExceptionFilter
  implements ExceptionFilter<ValueObjectException>
{
  /**
   * captura la excepcion de ValueObjectException
   *
   * @param {ValueObjectException} exception excepcion de ValueObjectException
   * @param {ArgumentsHost} host host de la excepcion
   * @memberof ObjectValueExceptionFilter
   */
  catch(exception: ValueObjectException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const errors = exception.errors;

    response.status(statusCode).json({
      statusCode,
      message,
      errors,
    });
  }
}
