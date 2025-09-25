import { useFilterStore } from "../store/filterStore";
import useTodoStore from "../store/todoStore";
import client from "./feathers/feathers-client";
import loadTodos from "./loadTodos";

const toggleTodo = async (todoId: string) => {
  try {
    const todo = useTodoStore.getState().todos.find((t) => t._id === todoId);
    const filter = useFilterStore.getState().filter;
    if (!todo) return;

    const updatedTodo = await client
      .service("todos")
      .patch(todoId, { isCompleted: !todo.isCompleted });

    useTodoStore.getState().toggleTodo(todoId);
    if (filter != "all" && filter != "today") {
      await loadTodos(true);
    }
  } catch (err) {
    console.error("Error toggling todo:", err);
  }
};

export default toggleTodo;
