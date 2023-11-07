import { combineReducers } from "redux";
import Dashboard from "./Dashboard";
import Master from "./Master";
import Ticket from "./Ticket";

const reducers = () =>
  combineReducers({
    dashboard: Dashboard,
    master: Master,
    ticket: Ticket,
  });
export default reducers;
