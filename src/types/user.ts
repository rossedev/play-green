export interface IUser {
  isLogged: boolean;
  isPending: boolean;
}

export interface IAction {
  type: string;
  payload: Partial<IUser>;
}

export interface IUserContext {
  state: IUser;
  dispatch: React.Dispatch<IAction>;
}
