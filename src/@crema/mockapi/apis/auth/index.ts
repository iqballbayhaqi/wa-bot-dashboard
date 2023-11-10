import auth from "../../fakedb/auth";
import mock from "../MockConfig";

mock.onGet("/auth").reply(() => {
  return [200, auth];
});

mock.onPost("/login").reply(() => {
  return [200, auth];
});
