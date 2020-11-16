import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { ErrorResponse } from 'src/common/responses/errorResponse';
import { CustomLogger } from "src/common/logger/custom-logger.service";
import { throwError } from 'rxjs';
import { BaseExceptionFilter } from '@nestjs/core';


@Catch()
export class RuntimeExceptionFilter<T> implements ExceptionFilter {

  constructor( private readonly logger: CustomLogger){

  }
  catch(exception: T, host: ArgumentsHost) {

    let errorResponse: ErrorResponse = new ErrorResponse();
    let httpException = plainToClass(HttpException, exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

   
    
    errorResponse.statusCode =HttpStatus.INTERNAL_SERVER_ERROR;
    errorResponse.path = request.url;
    errorResponse.message = " Exception encountered! our engineers have been alerted"

    if ((exception instanceof HttpException)) {
      errorResponse.statusCode = httpException.getStatus();
      errorResponse.message = httpException.message;
      this.logger.error(errorResponse.errorId.toString(),httpException.stack)
    }else{
      let err: any =  exception;
      this.logger.error(errorResponse.errorId.toString(), err.stack);
      if(err.message != null && err.name != null ){
        errorResponse.message = err.name +":"+err.message;
      }
    }

    
    response
      .status( errorResponse.statusCode)
      .json(errorResponse);
  }
}