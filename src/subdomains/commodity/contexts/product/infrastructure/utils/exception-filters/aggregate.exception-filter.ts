import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AggregateRootException } from '@sofka';
import { Response } from 'express';

/**
 * filtro de excepcion de AggregateRootException
 *
 * @export
 * @class AggregateExceptionFilter
 * @implements {ExceptionFilter<AggregateRootException>}
 */
@Catch(AggregateRootException)
export class AggregateExceptionFilter
  implements ExceptionFilter<AggregateRootException>
{
  /**
   * captura la excepcion de AggregateRootException
   *
   * @param {AggregateRootException} exception excepcion de AggregateRootException
   * @param {ArgumentsHost} host host de la excepcion
   * @memberof AggregateExceptionFilter
   */
  catch(exception: AggregateRootException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const errors = exception.name;

    response.status(statusCode).json({
      statusCode,
      message,
      errors,
    });
  }
}
