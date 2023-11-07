import JWTAuthProvider from "@crema/services/auth/jwt-auth/JWTAuthProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const AppAuthProvider = ({ children }: Props) => {
  return <JWTAuthProvider>{children}</JWTAuthProvider>;
};

export default AppAuthProvider;
