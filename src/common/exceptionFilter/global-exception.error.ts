import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let message = (exception as any).message.message;
        let code = 'HttpException';

        //Logger.error(message, (exception as any).stack, `${request.method} ${request.url}`);

        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        switch (exception.constructor) {
          case HttpException:
            status = (exception as HttpException).getStatus();
            if ((exception as any).message)
              message = (exception as any).message
            break;
          case QueryFailedError:  // this is a TypeOrm error
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as QueryFailedError).message;
            code = (exception as any).code;
            break;
          case EntityNotFoundError:  // this is another TypeOrm error
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as EntityNotFoundError).message;
            code = (exception as any).code;
            break;
          case CannotCreateEntityIdMapError: // and another
            status = HttpStatus.UNPROCESSABLE_ENTITY
            message = (exception as CannotCreateEntityIdMapError).message;
            code = (exception as any).code;
            break;
          case BadRequestException:
            status = HttpStatus.BAD_REQUEST
            if ((exception as any).response && (exception as any).response.message) {
              message = (exception as any).response.message;
            } else if ((exception as any).message) {
              message = (exception as any).message;
            }
            code = (exception as any).code;
            break;
          default:
            console.error(exception)
            status = HttpStatus.INTERNAL_SERVER_ERROR
            if ((exception as any).message) {
              message = (exception as any).message;
            }
        }

        response.status(status).json(GlobalResponseError(status, message, code, request));
    }
}




export const GlobalResponseError: (statusCode: number, message: string | string[], code: string, request: Request) => IResponseError = (
    statusCode: number,
    message: string,
    code: string,
    request: Request
): IResponseError => {
    return {
        statusCode: statusCode,
        message,
        code,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method
    };
};


export interface IResponseError {
    statusCode: number;
    message: string | string[];
    code: string;
    timestamp: string;
    path: string;
    method: string;
}