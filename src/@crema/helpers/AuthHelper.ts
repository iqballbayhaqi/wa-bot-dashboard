import { authRole } from "@crema/constants/AppConst";

export const getUserFromJwtAuth = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user._id,
      displayName: user.name,
      email: user?.email,
      photoURL: user?.avatar,
      role: authRole?.User,
    };
  return user;
};
