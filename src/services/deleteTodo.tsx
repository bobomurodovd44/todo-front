import useTodoStore from "../store/todoStore";
import usePaginationStore from "../store/todoPaginateStore";
import client from "./feathers/feathers-client";

const deleteTodo = async (todoId: string) => {
  try {
    const todo = useTodoStore.getState().todos.find((t) => t._id === todoId);
    if (!todo) return;

    await client.service("todos").remove(todoId);

    useTodoStore.getState().removeTodo(todoId);

    const { total, limit, skip, setTotal, setSkip } =
      usePaginationStore.getState();
    const newTotal = total - 1;
    setTotal(newTotal);

    const newTotalPages = Math.ceil(newTotal / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    if (currentPage > newTotalPages) {
      setSkip(Math.max(0, (newTotalPages - 1) * limit));
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
  }
};

export default deleteTodo;
