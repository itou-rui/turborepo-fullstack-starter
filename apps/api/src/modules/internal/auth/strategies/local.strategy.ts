import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { ProviderType } from '@workspace/constants';
import { type LocalAuthProfile } from '@workspace/types';
import { LocalAuthService } from '../services';

type Done = (error: Error | null, profile: LocalAuthProfile | null) => void;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly localAuthService: LocalAuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string, done: Done): Promise<void> {
    const user = await this.localAuthService.validateLoginUser(email, password);
    const profile: LocalAuthProfile = {
      uid: user.uid,
      username: user.username,
      email: user.email!,
      provider: ProviderType.Local,
    };
    done(null, profile);
  }
}
