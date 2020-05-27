import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoginResponse } from "../graphql";
import { User } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { GqlAuthGuard } from "./gql-auth.guard";

@Resolver("Auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  public async login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<LoginResponse> {
    return this.authService.login(email, password);
  }

  @Mutation()
  public async signup(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<void> {
    return this.authService.signup(email, password);
  }

  @Mutation()
  public async activateUser(
    @Args("email") email: string,
    @Args("activationCode") activationCode: string,
  ): Promise<void> {
    await this.authService.activateUser(email, activationCode);
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  public async me(@CurrentUser() user: User): Promise<string> {
    return user.id;
  }
}
