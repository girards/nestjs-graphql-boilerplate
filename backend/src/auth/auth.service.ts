import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';
import { User } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';

export interface AuthJwtPayload {
  id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
  ) { }

  async activateUser(email: string, code: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ where: { email } });
    if (user.activationCode === code) {
      try {
        await this
          .mailerService
          .sendMail({
            to: email, // list of receivers
            from: 'noreply@lokal.com', // sender address
            subject: 'User Validated', // Subject line
            text: 'User Validated', // plaintext body
            html: '<b>User Validated</b>', // HTML body content
          })
      } catch (err) {
        console.log("Omitting error cause we don't care for now");
      }
      user.activated = true;
      await this.userRepository.save(user);
      return user;
    }
    throw new BadRequestException("activate.error.wrong_activation_code");
  }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser && existingUser.password === password) {
      if (existingUser.activated === false) {
        throw new BadRequestException("login.error.account_disabled");
      }
      const jwtPayload: AuthJwtPayload = { id: existingUser.id };
      return {
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: this.jwtService.sign(jwtPayload),
      };
    } else {
      throw new BadRequestException("login.error.wrong_email_or_password");
    }
  }

  async signup(email: string, password: string): Promise<void> {
    const isEmailAlreadyUsed = Boolean(await this.userRepository.findOne({ where: { email } }));
    if (!isEmailAlreadyUsed) {
      await this.userRepository.create({ email, password }).save();
      try {
        await this
          .mailerService
          .sendMail({
            to: email, // list of receivers
            from: 'noreply@lokal.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: '<b>welcome</b>', // HTML body content
          })
      } catch (err) {
        console.log("Omitting error cause we don't care for now");
      }
    } else {
      throw new BadRequestException('signup.error.email_already_used');
    }
  }
}
