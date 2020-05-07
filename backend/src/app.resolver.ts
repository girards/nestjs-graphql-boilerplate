import { ConfigService } from '@nestjs/config';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('App')
export class AppResolver {

  constructor(private readonly configService: ConfigService) { }
  @Query()
  public async branch(): Promise<string> {
    return this.configService.get<string>('BRANCH') || "localhost";
  }
}
