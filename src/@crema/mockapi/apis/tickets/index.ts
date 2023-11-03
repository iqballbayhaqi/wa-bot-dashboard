import mock from "../MockConfig";
import { ticketDetailData, ticketsData } from "@crema/mockapi/fakedb/tickets";

let ticketList = ticketsData;
let ticketDetail = ticketDetailData;

mock.onGet("/tickets").reply(() => {
  return [200, ticketList];
});

mock.onGet(/\/ticket\/\d+/).reply(() => {
  return [200, ticketDetail];
});

mock.onPost("/moveTicket").reply(() => {
  return [200, { status: "success" }];
});
