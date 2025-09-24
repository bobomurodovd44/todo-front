import useTodoStore from "../store/todoStore";
import { checkUser } from "./checkUser";
import client from "./feathers/feathers-client";

const loadTodos = async () => {
  try {
    const user = await checkUser();

    if (user) {
      const todos = await client.service("todos").find({
        query: {
          createdBy: user._id,
          $sort: { createdAt: -1 },
        },
      });

      // todos store-ga saqlash
      useTodoStore.getState().setTodos(todos); // agar Feathers response da .data bo‘lsa
    }
  } catch (err) {
    console.error(err);
  }
};

export default loadTodos;
