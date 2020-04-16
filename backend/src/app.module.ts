import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
    }),
    MailerModule.forRoot({
      transport:
        'smtps://postmaster@sandboxd9e0c0c51f254e35a8f3c545e4635e6f.mailgun.org:5bad66d071c46459d32b160de9f21c46-aa4b0867-e72024d9@smtp.mailgun.org',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.3.247.204',
      port: 5432,
      username: 'nicolasgirardot',
      password: '',
      database: 'tracks',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule { }
