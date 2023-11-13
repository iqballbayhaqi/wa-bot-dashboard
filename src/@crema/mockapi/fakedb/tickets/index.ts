import {
  QuestionResponse,
  TicketDetailResponseType,
  TicketResponseType,
} from "@crema/types/models/tickets";

const ticketsData: TicketResponseType = {
  data: [
    {
      id: 59,
      ticketNumber: "#2023111-00001",
      status: "OPEN",
      phoneNumber: "6281260220821",
      startTime: "2023-11-01T23:09:39.013Z",
      endTime: "2023-11-01T23:10:53.290Z",
      issue: "Halo",
      department: null,
      category: null,
    },
    {
      id: 60,
      ticketNumber: "#2023111-00001",
      status: "OPEN",
      phoneNumber: "6281260220821",
      startTime: "2023-11-01T23:09:39.013Z",
      endTime: "2023-11-01T23:10:53.290Z",
      issue: "Halo",
      department: 2,
      category: 3,
    },
  ],
};

const ticketDetailData: TicketDetailResponseType = {
  data: {
    id: 59,
    ticketNumber: "#2023111-00001",
    phoneNumber: "6281260220821",
    whatsappName: "Yazid Yasykur",
    department: null,
    category: null,
    status: "OPEN",
    chatHistory:
      '[{"id":"7538D3F744E6D72513","time":1698854977000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"Halo"},{"id":"BAE53AA181C023D8","to":"6281260220821","time":1698854980000,"status":"delivered","text":"Apakah anda karyawan Best Agro International? [Ya/Tidak]","fromMe":true,"deliveredTime":1698854980986,"readTime":1698854980902},{"id":"D7546398B5FE07BAA2","time":1698854982000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"ya"},{"id":"BAE5D9DDEB52902F","to":"6281260220821","time":1698854985000,"status":"delivered","text":"Silahkan info data anda: Nama/Afdeling/Unit Usaha (PT)","fromMe":true,"readTime":1698854986033,"deliveredTime":1698854986088},{"id":"6D8E2F89EA22A512C7","time":1698854999000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"Yazid / AFD 123 / PT Best"},{"id":"BAE59DB73DB58F99","to":"6281260220821","time":1698855053000,"status":"pending","text":"Pengaduan anda perlu ditindak lanjuti oleh agent","fromMe":true}]',
  },
};

const questions: QuestionResponse[] = [
  {
    question: "Pengaduan anda perlu ditindak lanjuti oleh agent",
    forState: 4,
  },
  {
    question:
      "Apakah solusi kami menyelesaikan permasalahan anda? [Sudah/Belum]",
    forState: null,
  },
];

const ticketCount = {
  data: 5,
};

export { ticketDetailData, ticketsData, questions, ticketCount };
