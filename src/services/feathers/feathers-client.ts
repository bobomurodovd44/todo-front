import io from "socket.io-client";
import { feathers } from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";
import Cookies from "js-cookie";
import loadTodos from "../loadTodos";

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(socketio(socket));
client.configure(
  authentication({
    storage: {
      getItem: (key: string) => Cookies.get(key) || null,
      setItem: (key: string, value: string) => {
        Cookies.set(key, value, { expires: 7 });
        return value;
      },
      removeItem: (key: string) => {
        Cookies.remove(key);
      },
    },
    path: "/authentication",
  })
);

const todosService = client.service("todos");

todosService.on("created", async (data: any) => {
  try {
    await loadTodos(); // async funksiyani chaqiramiz
    console.log("Todo created, todos reloaded");
  } catch (err) {
    console.error("Error loading todos after creation:", err);
  }
});

export default client;
