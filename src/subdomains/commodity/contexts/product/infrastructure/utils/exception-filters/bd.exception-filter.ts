import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter
  implements ExceptionFilter<NotFoundException>
{
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
