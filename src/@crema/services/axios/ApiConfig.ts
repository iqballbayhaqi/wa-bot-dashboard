import axios from "axios";

const apiConfig = axios.create({
  baseURL: "https://579d-114-124-130-0.ngrok.io/api/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlrIjoiMTIzNDUiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE2OTkwMTY2ODMsImV4cCI6MTY5OTAyMDI4M30.FdvIuGv7V3h_Kd1j-dnFplc0yVvEhaqw89zOGGc9dmU",
  },
});

export default apiConfig;
