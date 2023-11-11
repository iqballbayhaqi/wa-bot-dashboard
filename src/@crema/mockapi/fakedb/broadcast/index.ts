import {
  BroadcastDataType,
  BroadcastDetailResponse,
  BroadcastResponse,
  ContactResponse,
} from "@crema/types/models/broadcast";

export const contactData: ContactResponse[] = [
  {
    id: 1,
    phoneNumber: "6281260220821",
  },
  {
    id: 2,
    phoneNumber: "6281260220822",
  },
];

export const broadcastDetailData: BroadcastDetailResponse = {
  data: {
    id: 30,
    title: null,
    message: "Pesan broadcast",
    createdAt: "2023-11-08T23:26:14.643Z",
    totalMessage: 1,
    isComplete: true,
  },
};

export const broadcastData: BroadcastResponse = {
  data: [
    {
      id: 30,
      title: null,
      message: "Pesan broadcast",
      createdAt: "2023-11-08T23:26:14.643Z",
      totalMessage: 1,
    },
  ],
};
