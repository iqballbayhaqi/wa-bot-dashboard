import { TicketResponseType } from "@crema/types/models/tickets";

const ticketsData: TicketResponseType[] = [
  {
    id: 12,
    ticketNumber: "#20231023-66661",
    status: "OPEN",
    phoneNumber: "6281260220821",
    startTime: "2023-10-23T18:44:20.420Z",
    endTime: "2023-10-23T18:44:20.420Z",
    issue: null,
    issuerName: "yazid",
    issuerAfdeling: "afdeling 12",
    issuerUnit: "pt best",
    department: 2,
    category: 2,
    chatState: 1,
    chatHistory:
      '[{"id":"A2226350F317319F60","fromMe":false,"from":"6281260220821","status":"read","readTime":1698061459740},{"id":"06FBD4BA0358500E9C","fromMe":false,"from":"6281260220821","time":1698061459740,"status":"read"},{"id":"366924615F60251B1E9F18332032E7A6","time":1698061551000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"Halo"},{"id":"BAE574C2BD53A792","fromMe":true,"to":"6281260220821","status":"delivered","deliveredTime":1698061560109},{"id":"D68DB0A9F1DA161386","time":1698065732000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"Halo"},{"id":"BAE58CE98C1A1C34","fromMe":true,"to":"6281260220821","status":"delivered","deliveredTime":1698065740381},{"id":"05E61708CFFDF32885","time":1698065743000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"Ya"},{"id":"BAE56F1426B19B85","fromMe":true,"to":"6281260220821","status":"delivered","deliveredTime":1698065751225},{"id":"8D13E24FD545F83F8A","time":1698065768000,"type":"text","status":"none","chatType":"user","chat":"6281260220821","from":"6281260220821","name":"Yazid Yasykur","text":"yazid/afdeling 12/pt best"},{"id":"BAE5D35407D99C9E","fromMe":true,"to":"6281260220821","status":"delivered","deliveredTime":1698065774725}]',
    createdTime: "2023-10-23T18:44:20.420Z",
    modifyStatus: "U",
    lastModifiedTime: "2023-10-23T22:17:19.903Z",
    lastModifiedBy: null,
  },
];

export { ticketsData };
