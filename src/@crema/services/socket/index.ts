import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
  transports: ["websocket"],
});

export default socket;
