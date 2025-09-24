import React, { useEffect, useState } from "react";
import { List, Checkbox, Spin } from "antd";
import loadTodos from "@/src/services/loadTodos";
import toggleTodo from "@/src/services/toggleTodo";
import useTodoStore from "@/src/store/todoStore";

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      await loadTodos(); // store-ga saqlaydi
      setLoading(false);
    };
    getTodos();
  }, []);

  if (loading) {
    // Centered Spin
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Agar loading false bo‘lsa, aynan List qaytariladi
  return (
    <List
      bordered
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item className="flex items-center gap-2 p-2 min-h-[48px]">
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => toggleTodo(todo._id)}
          />
          <span
            className={`flex-1 text-base ${
              todo.isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
        </List.Item>
      )}
    />
  );
};

export default TodoList;
