import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { type Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['session-token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: { uuid: string; username: string; email: string }) {
    return { uuid: payload.uuid, username: payload.username, email: payload.email };
  }
}
