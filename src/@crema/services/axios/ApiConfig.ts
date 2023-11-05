import axios from "axios";

const apiConfig = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlrIjoiMTIzNDUiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJyb2xlIjoic3VwZXJfYWRtaW4iLCJpYXQiOjE2OTkwODE1NTYsImV4cCI6MTY5OTA4NTE1Nn0.PaP-yD05fC8hgJe3vaOSOe7eTwtZvVWIrqnUCnYtI3M ",
  },
});

export default apiConfig;
