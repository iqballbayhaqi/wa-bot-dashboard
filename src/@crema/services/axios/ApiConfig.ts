import axios, { AxiosResponse } from "axios";

const apiConfig = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

apiConfig.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  async (error: any) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem("token", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
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
