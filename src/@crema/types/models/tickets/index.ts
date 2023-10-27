export type TicketResponseType = {
  id: number;
  ticketNumber: string;
  status: string;
  phoneNumber: string;
  startTime: string;
  endTime: string;
  issue: string | null;
  issuerName: string;
  issuerAfdeling: string;
  issuerUnit: string;
  department: number;
  category: number;
  chatState: number;
  chatHistory: string;
  createdTime: string;
  modifyStatus: string;
  lastModifiedTime: string;
  lastModifiedBy: string | null;
};

export type TicketDataType = {
  id?: number;
  ticketNumber: string;
  phoneNumber: string;
  startTime: string;
  endTime: string;
  issue: string | null;
  status: string;
  department: number | string;
  category: number | string;
};

export type TicketPayload = {
  id: number;
  departmentId: string | number;
  categoryId: string | number;
};

export type TicketSaveResponse = {
  status: string;
};
