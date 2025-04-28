import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ProviderType } from '@workspace/constants';
import { type LocalAuthProfile } from '@workspace/types';
import { LocalAuthService } from '../services';

type DoneUserSerializer = (error: Error | null, profile: LocalAuthProfile | null) => void;

@Injectable()
export class LocalAuthSessionSerializer extends PassportSerializer {
  constructor(private localAuthService: LocalAuthService) {
    super();
  }

  serializeUser(profile: LocalAuthProfile, done: DoneUserSerializer): void {
    done(null, profile);
  }

  async deserializeUser(_profile: LocalAuthProfile, done: DoneUserSerializer): Promise<void> {
    const user = await this.localAuthService.findUserByUid(_profile.uid);
    const profile = user ? { uid: user.uid, email: user.email!, username: user.username, provider: ProviderType.Local } : null;
    done(null, profile);
  }
}
