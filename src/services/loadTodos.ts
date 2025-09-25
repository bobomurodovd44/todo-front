// lib/loadTodos.ts
import useTodoStore from "../store/todoStore";
import usePaginationStore from "../store/todoPaginateStore";
import { checkUser } from "./checkUser";
import client from "./feathers/feathers-client";
import { useFilterStore } from "../store/filterStore";

const loadTodos = async () => {
  try {
    const user = await checkUser();
    const { limit, skip, setTotal } = usePaginationStore.getState();
    const { filter } = useFilterStore.getState();

    if (user) {
      const query: any = {
        createdBy: user._id,
        $sort: { createdAt: -1 },
        $limit: limit,
        $skip: skip,
      };

      // filterga qarab query qo‘shamiz
      const today = new Date();
      const todayStart = new Date(today.setHours(0, 0, 0, 0)).getTime();
      const todayEnd = new Date(today.setHours(23, 59, 59, 999)).getTime();

      if (filter === "today") {
        query.createdAt = { $gte: todayStart, $lte: todayEnd };
      }
      if (filter === "completed") {
        query.isCompleted = true;
      }
      if (filter === "notCompleted") {
        query.isCompleted = { $ne: true };
      }

      const todos = await client.service("todos").find({ query });

      useTodoStore.getState().setTodos(todos.data);
      setTotal(todos.total);
    }
  } catch (err) {
    console.error(err);
  }
};

export default loadTodos;
