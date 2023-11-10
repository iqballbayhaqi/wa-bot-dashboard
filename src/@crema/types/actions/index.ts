import { DashboardActionTypes } from "./Dashboard.action";
import { AuthActions } from "./Auth.actions";
import { ChatActions } from "./Chat.actions";
import { MasterActionTypes } from "./Master.actions";
import { TicketActionTypes } from "./Ticket.actions";
import { BroadcastActionTypes } from "./Broadcast.action";

export type AppActions =
  | DashboardActionTypes
  | AuthActions
  | ChatActions
  | MasterActionTypes
  | TicketActionTypes
  | BroadcastActionTypes;
