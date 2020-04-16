import { AuthService } from "../auth.service"
import { UserRepository } from "../../users/users.repository";
import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../users/users.entity";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";

const user: User = {
  id: "abd0250b-6cb4-4713-a53c-10dbb04624b7",
  createdAt: new Date("2020-04-08 20:53:58.824079"),
  updatedAt: new Date("2020-04-08 20:57:15.111273"),
  version: 2,
  email: "email",
  password: "password",
  activated: false,
  activationCode: "850018",
  hasId: () => true, save: () => Promise.resolve(user), remove: () => Promise.resolve(user), reload: () => Promise.resolve(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepository,
        },
        {
          provide: JwtService, useValue: {
            sign: () => 'sIgNeD'
          }
        },
        {
          provide: MailerService, useValue: {
            sendMail: () => Promise.resolve()
          }
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return access_token if user exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      // eslint-disable-next-line @typescript-eslint/camelcase
      expect(await authService.login('email', 'password')).toEqual({ access_token: "sIgNeD" });
    })

    it('should throw if password is wrong', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      await expect(authService.login('email', 'wrongPass')).rejects.toThrowError('login.error.wrong_email_or_password');
    })
    it('should throw if no user found with email', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      await expect(authService.login('email', 'password')).rejects.toThrowError('login.error.wrong_email_or_password');
    })
  })

  describe('signup', () => {
    it('should return user ', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(user);
      await expect(authService.signup('email', 'password')).resolves.not.toThrow();
    })

    it('should throw if user already xist ', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      await expect(authService.signup('email', 'password')).rejects.toThrowError('signup.error.email_already_used');
    })
  })

  describe('activateUser', () => {
    it('should activate user ', async () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockResolvedValueOnce(user);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user);
      expect(await authService.activateUser('email', '850018')).toEqual({ ...user, ...{ activated: true } });
    })

    it('should throw if code is incorrect ', async () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockResolvedValueOnce(user);
      await expect(authService.activateUser('email', 'wrongCode')).rejects.toThrowError('activate.error.wrong_activation_code')
    })

    it('should throw user doesnt exist ', async () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockImplementationOnce(() => {
        throw new Error();
      });
      await expect(authService.activateUser('email', 'wrongCode')).rejects.toThrow()
    })
  })

});