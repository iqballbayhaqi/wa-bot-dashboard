import { io } from "socket.io-client";

const socket = io("https://579d-114-124-130-0.ngrok.io", {
  transports: ["websocket"],
});

export default socket;
