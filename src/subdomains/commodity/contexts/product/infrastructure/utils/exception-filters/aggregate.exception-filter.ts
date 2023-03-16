import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { AggregateRootException } from '@sofka';
import { Response } from 'express';

@Catch(AggregateRootException)
export class AggregateExceptionFilter
  implements ExceptionFilter<AggregateRootException>
{
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
