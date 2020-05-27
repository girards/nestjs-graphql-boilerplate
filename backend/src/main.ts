import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GraphqlInterceptor } from "./interceptors/graphql.interceptor";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new GraphqlInterceptor());
  await app.listen(3000);
}
bootstrap().catch(console.error);
