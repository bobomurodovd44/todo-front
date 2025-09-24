import { Button, Input, message } from "antd";
import React, { useState } from "react";
import createTodo from "@/src/services/addTodo";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  const handleAddTodo = async () => {
    if (!text.trim()) {
      message.warning("Please enter a todo text!");
      return;
    }

    if (loading) return; // agar hozirgi submit ishlayotgan bo‘lsa, qayta yubormaslik

    try {
      setLoading(true);
      await createTodo(text);
      setText(""); // inputni tozalash
    } catch (err) {
      console.error(err);
      message.error("Failed to add todo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 flex gap-2 items-center mt-8">
      <Input
        className="flex-1"
        size="large"
        allowClear
        placeholder="Add new Todo here ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={handleAddTodo} // Enter bosilganda ham qo‘shish
        disabled={loading} // loading paytida inputni disable qilish
      />
      <Button
        type="primary"
        size="large"
        onClick={handleAddTodo}
        loading={loading} // button loading effekt
      >
        Add New
      </Button>
    </div>
  );
};

export default AddTodo;
