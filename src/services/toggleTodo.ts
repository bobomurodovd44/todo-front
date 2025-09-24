import useTodoStore from "../store/todoStore";
import client from "./feathers/feathers-client";

const toggleTodo = async (todoId: string) => {
  try {
    const todo = useTodoStore.getState().todos.find((t) => t._id === todoId);
    if (!todo) return;

    // completed holatini teskarilash va serverga yuborish
    const updatedTodo = await client
      .service("todos")
      .patch(todoId, { isCompleted: !todo.isCompleted });

    // store-ni yangilash
    useTodoStore.getState().toggleTodo(todoId);
  } catch (err) {
    console.error("Error toggling todo:", err);
  }
};

export default toggleTodo;
