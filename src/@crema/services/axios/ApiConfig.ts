import axios, { AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

apiConfig.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  (err: any) => {
    if (err.response && err.response.data.msg === "Token is not valid") {
      console.log("Need to logout user");
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token?: string) => {
  if (token) {
    apiConfig.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete apiConfig.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  }
};

export default apiConfig;
