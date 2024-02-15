import { branchData } from "../../fakedb/branch";
import mock from "../MockConfig";

mock.onGet("/branch").reply(() => {
  return [200, branchData];
});
