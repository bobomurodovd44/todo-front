import { create } from "zustand";

export interface Todo {
  _id: string;
  text: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
}

interface TodoStore {
  todos: Todo[];
  toggleTodo: (id: string) => void; // yangi toggle funksiyasi
  removeTodo: (id: string) => void;
  setTodos: (todos: Todo[]) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === id
          ? { ...todo, isCompleted: !todo.isCompleted, updatedAt: new Date() }
          : todo
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id !== id),
    })),

  setTodos: (todos) => set({ todos }),
}));

export default useTodoStore;
