import { io } from "socket.io-client";

const socket = io("http://192.168.16.19:3002", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;
