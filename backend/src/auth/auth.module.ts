import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../users/users.repository";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { User } from "../users/users.entity";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: "test",
      signOptions: { expiresIn: "60m" },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
