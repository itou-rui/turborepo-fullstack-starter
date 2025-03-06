import type { APIBase, IBaseModel, OmitBaseModelFields } from './IBase';

export interface IUserModel extends IBaseModel {
  uuid: string;
  username: string;
  email?: string;
  password?: string;
}
export type OmitAPIUserResponseFields = 'password';
export type APIUser = Omit<IUserModel, OmitBaseModelFields | OmitAPIUserResponseFields> & APIBase;

export type RESTPostAPIUserJSON = Omit<APIUser, OmitBaseModelFields>;
export type RESTPutAPIUserJSON = Partial<Omit<APIUser, OmitBaseModelFields>>;

export type RESTGetAPIUserResult = APIUser;
export type RESTPostAPIUserResult = APIUser;
export type RESTPutAPIUserResult = APIUser;
export type RESTDeleteAPIUserResult = { result: boolean };
