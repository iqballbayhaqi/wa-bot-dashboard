import { SuccessLoginResponse } from "@crema/types/models/auth";

const auth: SuccessLoginResponse = {
  status: "success",
  data: {
    user: {
      id: 1,
      uid: "test",
      displayName: "test",
      email: "test@example.com",
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmlrIjoiMTIzNCIsIm5hbWUiOiJTb2JpcmluIiwiZGVwYXJ0bWVudENvZGUiOiJBR1IiLCJyb2xlIjoiYWdlbnQiLCJpYXQiOjE2OTc1NTc2OTIsImV4cCI6MTY5NzU2MTI5Mn0.Sf1NZWJPaYAm2E7GxAiw-uu4-VQKgEx6qG9sQMs_vPs",
  },
};

export default auth;
