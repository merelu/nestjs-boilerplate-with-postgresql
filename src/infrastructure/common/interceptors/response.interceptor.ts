import {
  IBaseMetaResponseFormat,
  IResponseFormat,
} from '@domain/response/response.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

export class ResponseFormat implements IResponseFormat {
  meta: IBaseMetaResponseFormat;
  data: Record<string, any>;
}

export class BaseMetaResponseFormat implements IBaseMetaResponseFormat {
  // @ApiProperty()
  // is_array?: boolean;
  // @ApiProperty()
  // path?: string;
  // @ApiProperty()
  // duration?: string;
  // @ApiProperty()
  // method?: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<ResponseFormat>,
  ): Observable<ResponseFormat> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((result) => {
        this.logger.debug(
          'CONTEXT',
          `is_array=${Array.isArray(result.data)} duration=${
            Date.now() - now
          }ms ${request.method} ${request.path}`,
        );
        return {
          data: result.data,
          meta: {
            ...result.meta,
          },
        };
      }),
    );
  }
}
