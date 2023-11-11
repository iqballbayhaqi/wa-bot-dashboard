import {
  broadcastData,
  broadcastDetailData,
  contactData,
} from "@crema/mockapi/fakedb/broadcast";
import mock from "../MockConfig";

mock.onGet("/contact").reply(() => {
  return [200, contactData];
});

mock.onGet("/broadcast").reply(() => {
  return [200, broadcastData];
});

mock.onGet(/\/broadcast\/\d+/).reply(() => {
  return [200, broadcastDetailData];
});
