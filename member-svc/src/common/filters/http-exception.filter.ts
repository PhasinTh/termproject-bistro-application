import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();
    const exRespose = exception.getResponse() as any;

    if (
      Array.isArray(exRespose.message) &&
      exRespose.message[0] instanceof ValidationError
    ) {
      status = HttpStatus.UNPROCESSABLE_ENTITY;
      const validationErrors = exRespose.message as ValidationError[];
      this._validationFilter(validationErrors);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exRespose.message,
    });
  }

  private _validationFilter(validationErrors: ValidationError[]) {
    for (const validationError of validationErrors) {
      for (const [constraintKey, constraint] of Object.entries(
        validationError.constraints,
      )) {
        // convert default messages
        if (!constraint) {
          // convert error message to error.fields.{key} syntax for i18n translation
          validationError.constraints[constraintKey] =
            'error.fields.' + constraintKey;
        }
      }
      if (!(validationError.children)) {
        this._validationFilter(validationError.children);
      }
    }
  }
}
