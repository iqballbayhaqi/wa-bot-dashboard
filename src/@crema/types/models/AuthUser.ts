export type AuthUserType = {
  id?: number;
  nik?: string;
  displayName?: string;
  departmentCode?: string;
  role?: string[] | string;
  iat?: number;
  exp?: number;
};
