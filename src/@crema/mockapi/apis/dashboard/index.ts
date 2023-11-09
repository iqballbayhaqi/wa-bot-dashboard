import dashboard, { dashboardData } from "../../fakedb/dashboard";
import mock from "../MockConfig";

mock.onGet("/dashboard").reply(() => {
  return [200, dashboardData];
});
// mock.onGet("/dashboard").reply(() => {
//   return [200, dashboard(7)];
// });
