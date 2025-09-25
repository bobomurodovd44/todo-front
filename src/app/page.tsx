"use client";
import { checkUser } from "@/src/services/checkUser";
import useUserStore from "@/src/store/userStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddTodo from "../components/addTodo/AddTodo";
import { Divider } from "antd";
import TodoList from "../components/todoList/TodoList";
import TodoPagination from "../components/todoPagination/todoPagination";
import FilterSelect from "../components/filterSelect";

const HomePage = () => {
  const [fullName, setFullName] = useState("");
  const { user } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    const authenticate = async () => {
      const user = await checkUser();
      if (!user) {
        router.push("/login");
      }
    };
    authenticate();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen max-w-[800px] p-3 flex flex-col gap-2 mx-auto">
        <AddTodo />
        <Divider>YOUR TODOS</Divider>
        <FilterSelect />
        <TodoPagination />
        <div className="w-full flex-1 overflow-y-auto">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
