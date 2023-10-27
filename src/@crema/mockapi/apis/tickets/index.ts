import mock from "../MockConfig";
import { ticketsData } from "@crema/mockapi/fakedb/tickets";

let ticketList = ticketsData;

mock.onGet("/tickets").reply(() => {
  return [200, ticketList];
});

mock.onPost("/moveTicket").reply(() => {
  return [200, { status: "success" }];
});
