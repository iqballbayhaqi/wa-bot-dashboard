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
        setJWTAuthData({
          user: {
            id: 1,
            uid: "test",
            displayName: "test",
            email: "test@example.com",
          },
          isLoading: false,
          isAuthenticated: true,
        });
      }

      // jwtAxios
      //   .get("/auth")
      //   .then(({ data }) =>
      //     setJWTAuthData({
      //       user: data,
      //       isLoading: false,
      //       isAuthenticated: true,
      //     })
      //   )
      //   .catch((error) => {
      //     setJWTAuthData({
      //       user: undefined,
      //       isLoading: false,
      //       isAuthenticated: false,
      //     });
      //   });
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
    infoViewActionsContext.fetchStart();
    console.log(email, password);
    try {
      const { data } = await jwtAxios.post("/login", { nik: email, password });
      console.log(data);
      localStorage.setItem("token", data.data.token);
      setAuthToken(data.data.token);
      // const res = await jwtAxios.get("/login");
      setJWTAuthData({
        user: data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      infoViewActionsContext.fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...JWTData,
        isAuthenticated: false,
        isLoading: false,
      });
      infoViewActionsContext.fetchError("Something went wrong");
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
