import socketIOClient from "socket.io-client";
import { ENDPOINT } from "./endpoint";

let socket = socketIOClient(ENDPOINT);
export { socket };
