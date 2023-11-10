import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthUserType } from "@crema/types/models/AuthUser";
import jwtAxios, { setAuthToken } from "../../axios/ApiConfig";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
import jwt from "jsonwebtoken";
import Router from "next/router";
import { initialUrl } from "@crema/constants/AppConst";

interface JWTAuthContextProps {
  user: AuthUserType | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignInProps {
  email: string;
  password: string;
}

interface JWTAuthActionsProps {
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signInUser: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [JWTData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const infoViewActionsContext = useInfoViewActionsContext();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }

      setAuthToken(token);

      if (token) {
        const decodeToken = jwt.decode(token) as AuthUserType;

        setJWTAuthData({
          user: decodeToken,
          isLoading: false,
          isAuthenticated: true,
        });
      }
    };

    getAuthUser();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await jwtAxios.post("/login", { nik: email, password });

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      const decodeToken = jwt.decode(data.data.accessToken) as AuthUserType;

      setAuthToken(data.data.accessToken);
      setJWTAuthData({
        user: decodeToken,
        isAuthenticated: true,
        isLoading: false,
      });

      infoViewActionsContext.showMessage("Sukses Login");

      Router.replace({
        pathname: initialUrl,
      });
    } catch (error) {
      setJWTAuthData({
        ...JWTData,
        isAuthenticated: false,
        isLoading: false,
      });
      infoViewActionsContext.showMessage("Gagal Login");
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...JWTData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
