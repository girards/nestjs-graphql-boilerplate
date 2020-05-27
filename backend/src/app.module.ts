import { HandlebarsAdapter, MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controler";
import { AuthModule } from "./auth/auth.module";
import { AppResolver } from "./app.resolver";
import { TrackModule } from "./tracks/tracks.module";
import { SnakeNamingStrategy } from "./naming-strategy";

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ["./**/*.graphql"],
      context: ({ req }) => ({ req }),
    }),
    MailerModule.forRoot({
      transport:
        "smtps://postmaster@sandboxd9e0c0c51f254e35a8f3c545e4635e6f.mailgun.org:5bad66d071c46459d32b160de9f21c46-aa4b0867-e72024d9@smtp.mailgun.org",
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DATABASE_URL") || "localhost",
        port: 5432,
        username: "nicolasgirardot",
        password: "root",
        database: "tracks",
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
    AuthModule,
    TrackModule,
  ],
  providers: [AppResolver],
  controllers: [AppController],
})
export class AppModule {}
