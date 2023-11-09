import { combineReducers } from "redux";
import Dashboard from "./Dashboard";
import Master from "./Master";
import Ticket from "./Ticket";
import Broadcast from "./Broadcast";

const reducers = () =>
  combineReducers({
    dashboard: Dashboard,
    master: Master,
    ticket: Ticket,
    broadcast: Broadcast,
  });
export default reducers;
