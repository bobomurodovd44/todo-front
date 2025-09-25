import useTodoStore from "../store/todoStore";
import usePaginationStore from "../store/todoPaginateStore";
import { checkUser } from "./checkUser";
import client from "./feathers/feathers-client";

const loadTodos = async () => {
  try {
    const user = await checkUser();
    const { limit, skip, setTotal } = usePaginationStore.getState();

    if (user) {
      const todos = await client.service("todos").find({
        query: {
          createdBy: user._id,
          $sort: { createdAt: -1 },
          $limit: limit,
          $skip: skip,
        },
      });

      useTodoStore.getState().setTodos(todos.data);
      setTotal(todos.total);
    }
  } catch (err) {
    console.error(err);
  }
};

export default loadTodos;
