import mock from "../MockConfig";
import {
  questions,
  ticketDetailData,
  ticketsData,
} from "@crema/mockapi/fakedb/tickets";

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

mock.onGet("/question").reply(() => {
  return [200, questions];
});
