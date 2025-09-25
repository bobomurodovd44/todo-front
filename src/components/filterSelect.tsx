"use client";

import { Select } from "antd";
import { useFilterStore } from "@/src/store/filterStore";

const { Option } = Select;

export default function FilterSelect() {
  const { filter, setFilter } = useFilterStore();

  return (
    <Select
      value={filter}
      onChange={(value) => setFilter(value)}
      style={{ width: 200 }}
    >
      <Option value="all">All</Option>
      <Option value="today">Today</Option>
      <Option value="completed">Completed</Option>
      <Option value="notCompleted">Not Completed</Option>
    </Select>
  );
}
