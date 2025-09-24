import React, { useEffect, useState } from "react";
import { List, Checkbox, Spin, Button } from "antd";
import loadTodos from "@/src/services/loadTodos";
import toggleTodo from "@/src/services/toggleTodo";
import useTodoStore from "@/src/store/todoStore";
import deleteTodo from "@/src/services/deleteTodo";
import { DeleteOutlined } from "@ant-design/icons";

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
      setLoading(true);
      await loadTodos();
      setLoading(false);
    };
    getTodos();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <List
      bordered
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item className="relative flex items-center gap-2 p-2 min-h-[48px] hover:bg-gray-50 group">
          <div className="flex gap-2">
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
          </div>

          {/* Delete button */}
          <Button
            size="small"
            type="primary"
            danger
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={() => deleteTodo(todo._id)}
          >
            <DeleteOutlined />
          </Button>
        </List.Item>
      )}
    />
  );
};

export default TodoList;
