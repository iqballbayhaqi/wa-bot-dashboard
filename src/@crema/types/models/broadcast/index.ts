export type ContactResponse = {
  id: number;
  phoneNumber: string;
};

export type BroadcastDataType = {
  id: string;
  title: string | null;
  message: string;
  createdAt: string;
  totalMessage: number;
};

export type BroadcastResponse = {
  data: BroadcastDataType[];
};

export type SendBroadcastSuccess = {
  message: string;
};
