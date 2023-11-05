import axios from "axios";

const apiConfig = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlrIjoiMTIzNDUiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE2OTkxNzExMDIsImV4cCI6MTY5OTE3NDcwMn0.vGbBoryaYRwLqm2ffgw5wI9avCl6N_kgjaa7CWEF42E",
  },
});

export default apiConfig;
