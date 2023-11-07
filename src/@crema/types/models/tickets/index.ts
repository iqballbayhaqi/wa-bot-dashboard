export type TicketData = {
  id: number;
  ticketNumber: string;
  status: string;
  phoneNumber: string;
  startTime: string;
  endTime: string;
  issue: string | null;
  issuerName?: string;
  issuerAfdeling?: string;
  issuerUnit?: string;
  department: number;
  category: number;
  chatState?: number;
  chatHistory?: string;
  createdTime?: string;
  modifyStatus?: string;
  lastModifiedTime?: string;
  lastModifiedBy?: string | null;
};

export type TicketResponseType = {
  data: TicketData[];
};

export type TicketDetail = {
  id: number;
  ticketNumber: string;
  phoneNumber: string;
  department: string | null | number;
  category: string | null | number;
  status: string;
  chatHistory: string;
};

export type TicketDetailResponseType = {
  data: TicketDetail;
};

export type ChatListType = {
  id: string;
  time?: string | number;
  type?: string;
  status?: string;
  chatType?: string;
  chat?: string;
  from?: string;
  name?: string;
  text?: string;
  fromMe?: boolean;
};

export type TicketDataType = {
  id?: number;
  ticketNumber: string;
  phoneNumber: string;
  startTime: string;
  endTime: string;
  issue: string | null;
  status: string;
  department: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
};

export type TicketPayload = {
  id: number;
  departmentId: string | number;
  categoryId: string | number;
};

export type TicketSaveResponse = {
  status: string;
};
