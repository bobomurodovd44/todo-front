import io from "socket.io-client";
import { feathers } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";
import Cookies from "js-cookie";

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(socketio(socket));
client.configure(
  authentication({
    storage: {
      getItem: (key: string) => Cookies.get(key) || null,
      setItem: (key: string, value: string) => {
        Cookies.set(key, value);
        return value;
      },
      removeItem: (key: string) => {
        Cookies.remove(key);
      },
    },
    path: "/authentication",
  })
);

export default client;
