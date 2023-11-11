export type ContactResponse = {
  id: number;
  phoneNumber: string;
};

export type BroadcastDataType = {
  id: string | number;
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

export type BroadcastData = {
  id: number;
  title: string | null;
  message: string;
  createdAt: string;
  totalMessage: number;
  isComplete: boolean;
};

export type BroadcastDetailResponse = {
  data: BroadcastData;
};
