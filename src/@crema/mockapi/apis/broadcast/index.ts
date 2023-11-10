import { contactData } from "@crema/mockapi/fakedb/broadcast";
import mock from "../MockConfig";

mock.onGet("/contact").reply(() => {
  return [200, contactData];
});
