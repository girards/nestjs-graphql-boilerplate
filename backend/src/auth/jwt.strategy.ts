import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../users/users.repository';
import { AuthJwtPayload } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test',
    });
  }

  async validate(payload: AuthJwtPayload): Promise<{ id: string }> {
    const user = await this.userRepository.findOneOrFail(payload.id);
    if (!user.activated) {
      throw new UnauthorizedException('User not activated');
    }
    return { id: payload.id };
  }
}
