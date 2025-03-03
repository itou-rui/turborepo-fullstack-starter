import type { IUser, IUserProviders } from './IUser';

export interface APIUser extends Omit<IUser, 'providers'> {
  providers?: Omit<IUserProviders, 'local'> & {
    local: { email?: string };
  };
}
