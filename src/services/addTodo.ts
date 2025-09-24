import useTodoStore from "../store/todoStore";
import { checkUser } from "./checkUser";
import client from "./feathers/feathers-client";

const createTodo = async (text: string) => {
  try {
    const user = await checkUser();

    if (!user) return;

    const newTodo = await client.service("todos").create({
      text,
    });
  } catch (err) {
    console.error("Error creating todo:", err);
  }
};

export default createTodo;
