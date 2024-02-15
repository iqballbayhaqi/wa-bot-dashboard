export type SuccessLoginResponse = {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
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
