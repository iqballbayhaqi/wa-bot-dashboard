export type SuccessLoginResponse = {
  status: string;
  data: {
    token: string;
    user: AuthUserType;
  };
};

export type AuthUserType = {
  id?: number;
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  role?: string[] | string;
};
