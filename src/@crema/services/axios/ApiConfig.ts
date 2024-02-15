import axios, { AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: "http://192.168.16.19:3002/api/v1",
  withCredentials: true,
});

apiConfig.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const OldRefreshToken = localStorage.getItem("refreshToken");

        const response = await axios.post(
          "http://192.168.16.19:3002/api/v1/refresh-token",
          {
            refreshToken: OldRefreshToken,
          }
        );

        const { accessToken, refreshToken } = response.data.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // apiConfig.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
        // return axios(originalRequest);
      } catch (error) {
        console.log("ada error nih", error);
        // Handle refresh token error or redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
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
