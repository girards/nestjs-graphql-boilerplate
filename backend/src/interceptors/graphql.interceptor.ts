import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { GqlExecutionContext, GraphQLExecutionContext } from "@nestjs/graphql";
import * as clc from "cli-color";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable()
export class GraphqlInterceptor implements NestInterceptor {
  fieldsToOmit: string[] = ["ocrFeedback", "password"];
  private readonly logger = new Logger(GraphqlInterceptor.name);
  constructor() { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const ctx = GqlExecutionContext.create(context);
    const hrstart = process.hrtime();
    this.requestGraphqlLog(ctx);


    return next.handle().pipe(
      tap((): void => {
        this.responseGraphqlLog(ctx, hrstart);
      }),
    );
  }

  private requestGraphqlLog(ctx: GraphQLExecutionContext): void {
    if (ctx.getContext() && ctx.getContext().req) {
      const { baseUrl, body, ip } = ctx.getContext().req;

      if (baseUrl === "/graphql") {
        const message = `${clc.green(ip)} ${clc.white("→")} ${clc.yellow(clc.bold(body.operationName))}`;
        this.logger.log(`${clc.white("[GraphqlRequest]")}  ${message}`);
      }
    }
  }

  private responseGraphqlLog(ctx: GraphQLExecutionContext, hrstart: [number, number]): void {
    if (ctx.getContext() && ctx.getContext().req) {
      const { baseUrl, body, ip } = ctx.getContext().req;
      const hrend = process.hrtime(hrstart);
      if (baseUrl === "/graphql") {
        const message = `${clc.green(ip)} ${clc.magenta("←")} ${clc.yellow(clc.bold(body.operationName))} (${hrend[1] / 1000000}ms)`;
        this.logger.log(`${clc.magenta("[GraphqlResponse]")} ${message}`);
      }
    }
  }
}
