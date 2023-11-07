import auth from "../../fakedb/auth";
import mock from "../MockConfig";

mock.onGet("/auth").reply(() => {
  return [200, auth];
});

mock.onPost("/auth").reply(() => {
  return [200, auth];
});
