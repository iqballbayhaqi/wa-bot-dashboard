import { ErrorResponseType } from "@crema/types/models/master";
import { createReducer } from "@reduxjs/toolkit";

import {
  ChatListType,
  TicketDataType,
  TicketDetail,
} from "@crema/types/models/tickets";
import {
  ReceiveChatAction,
  SaveTicketFailedAction,
  SaveTicketLoadingAction,
  SaveTicketSuccessAction,
  SendChatAction,
  TicketCountFailedAction,
  TicketCountLoadingAction,
  TicketCountSuccessAction,
  TicketDetailFailedAction,
  TicketDetailLoadingAction,
  TicketDetailSuccessAction,
  TicketListFailedAction,
  TicketListLoadingAction,
  TicketListSuccessAction,
  TicketNewDetailFailedAction,
  TicketNewDetailLoadingAction,
  TicketNewDetailSuccessAction,
} from "./ActionTypes/Ticket";
import moment from "moment";

const initialState: {
  isLoadingTicket: boolean;
  isLoadingSaveTicket: boolean;
  isLoadingDetailTicket: boolean;
  isSuccessSaveTicket: boolean;
  isLoadingNewDetailTicket: boolean;
  tickets: TicketDataType[];
  ticketsTemp: TicketDataType[];
  detailTicket: TicketDetail;
  errorTicket: ErrorResponseType;
  chatList: ChatListType[];
  questionList: [];
  isLoadingQuestion: boolean;
  message: string;
  dateFilter: {
    label: string;
    value: string;
  }[];
  departmentFilter: [];
  categoriesFilter: [];
  branchesFilter: [];
  isLoadingTicketCount: boolean;
  ticketCount: number;
} = {
  isLoadingTicket: true,
  isLoadingSaveTicket: false,
  isLoadingDetailTicket: true,
  isSuccessSaveTicket: false,
  tickets: null,
  ticketsTemp: null,
  detailTicket: null,
  errorTicket: null,
  chatList: [],
  questionList: [],
  isLoadingQuestion: false,
  message: "",
  dateFilter: [],
  departmentFilter: [],
  categoriesFilter: [],
  isLoadingNewDetailTicket: false,
  isLoadingTicketCount: false,
  ticketCount: 0,
  branchesFilter: [],
};

const ticketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(TicketListLoadingAction, (state) => {
      state.isLoadingTicket = true;
    })
    .addCase(TicketListSuccessAction, (state, action) => {
      state.isLoadingTicket = false;
      state.isSuccessSaveTicket = false;
      state.tickets = action.payload.data;

      const { categoryList, departementList, branchList } = action.payload;

      const currentDate = moment().format("YYYY-MM-DD");

      if (action.payload.fromUpdate) {
        state.ticketsTemp = action.payload.data;
      } else {
        const getTodayTicket = action.payload.data.filter((ticket) => {
          return moment(
            moment.utc(ticket.startTime).format("YYYY-MM-DD")
          ).isSame(currentDate);
        });

        state.ticketsTemp = getTodayTicket;
      }

      const uniqueDepartments = [];
      const uniqueIds = {};

      action.payload.data.forEach((data) => {
        if (!uniqueIds[data.department.id] && data.department.id !== null) {
          uniqueIds[data.department.id] = true;
          uniqueDepartments.push(data);
        }
      });

      const mapUniqueDepartement = uniqueDepartments.map((departement) => {
        const filterFromDepartement = departementList.filter(
          (data) => data.id === departement.department.id
        );

        return filterFromDepartement[0];
      });

      state.departmentFilter = mapUniqueDepartement;

      const uniqueCategories = [];
      const uniqueCatIds = {};

      action.payload.data.forEach((data) => {
        if (!uniqueCatIds[data.category.id] && data.category.id !== null) {
          uniqueCatIds[data.category.id] = true;
          uniqueCategories.push(data);
        }
      });

      const mapUniqueCategories = uniqueCategories.map((category) => {
        const filterFromCategory = categoryList.filter(
          (data) => data.id === category.category.id
        );

        return filterFromCategory[0];
      });

      state.categoriesFilter = mapUniqueCategories;

      const uniqueBranches = [];
      const uniqueBranchIds = {};

      action.payload.data.forEach((data) => {
        if (!uniqueBranchIds[data.branch.id] && data.branch.id !== null) {
          uniqueBranchIds[data.branch.id] = true;
          uniqueBranches.push(data);
        }
      });

      const mapUniqueBranches = uniqueBranches.map((branch) => {
        const filterFromBranch = branchList.filter(
          (data) => data.id === branch.branch.id
        );

        return filterFromBranch[0];
      });

      state.branchesFilter = mapUniqueBranches;
    })
    .addCase(TicketListFailedAction, (state, action) => {
      state.isLoadingTicket = false;
      state.errorTicket = action.payload;
    })
    .addCase(TicketDetailLoadingAction, (state) => {
      state.isLoadingDetailTicket = true;
    })
    .addCase(TicketDetailSuccessAction, (state, action) => {
      const { chatHistory } = action.payload;

      state.isLoadingDetailTicket = false;
      state.isSuccessSaveTicket = false;
      state.detailTicket = action.payload;
      state.chatList = JSON.parse(chatHistory);
    })
    .addCase(TicketDetailFailedAction, (state, action) => {
      state.isLoadingDetailTicket = false;
      state.errorTicket = action.payload;
    })
    .addCase(TicketNewDetailLoadingAction, (state) => {
      state.isLoadingNewDetailTicket = true;
    })
    .addCase(TicketNewDetailSuccessAction, (state, action) => {
      state.isLoadingNewDetailTicket = false;
      state.isSuccessSaveTicket = false;
      state.detailTicket = action.payload;
    })
    .addCase(TicketNewDetailFailedAction, (state, action) => {
      state.isLoadingNewDetailTicket = false;
      state.errorTicket = action.payload;
    })
    .addCase(TicketCountLoadingAction, (state) => {
      state.isLoadingTicketCount = true;
    })
    .addCase(TicketCountSuccessAction, (state, action) => {
      state.isLoadingTicketCount = false;
      state.ticketCount = action.payload;
    })
    .addCase(TicketCountFailedAction, (state, action) => {
      state.isLoadingTicketCount = false;
      state.errorTicket = action.payload;
    })
    .addCase(SaveTicketLoadingAction, (state) => {
      state.isLoadingSaveTicket = true;
      state.isSuccessSaveTicket = false;
    })
    .addCase(SaveTicketSuccessAction, (state) => {
      state.isLoadingSaveTicket = false;
      state.isSuccessSaveTicket = true;
    })
    .addCase(SaveTicketFailedAction, (state, action) => {
      state.isLoadingSaveTicket = false;
      state.isSuccessSaveTicket = false;

      state.errorTicket = action.payload;
    })
    .addCase(SendChatAction, (state, action) => {
      state.chatList = [...state.chatList, action.payload];
    })
    .addCase(ReceiveChatAction, (state, action) => {
      const sortChat = [...state.chatList, action.payload].sort(
        (a, b) => (a.time as number) - (b.time as number)
      );
      state.chatList = sortChat;
    })
    .addCase("GET_QUESTION_LOADING", (state) => {
      state.isLoadingQuestion = true;
    })
    .addCase("GET_QUESTION_SUCCESS", (state, action: any) => {
      state.isLoadingQuestion = false;
      state.questionList = action.payload;
    })
    .addCase("GET_QUESTION_FAILED", (state, action) => {
      state.isLoadingQuestion = false;
    })
    .addCase("COPY_MESSAGE", (state, action: any) => {
      state.message = action.payload;
    })
    .addCase("RESET_SUCCESS_SAVE", (state, action: any) => {
      state.isSuccessSaveTicket = false;
    })
    .addCase("SET_TICKETS", (state, action: any) => {
      state.ticketsTemp = action.payload;
    });
});

export default ticketReducer;
