import usePaginationStore from "@/src/store/todoPaginateStore";
import { Pagination } from "antd";
import React from "react";

const TodoPagination = () => {
  const { total, skip, limit, setSkip } = usePaginationStore();

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const goToPage = (page: number) => {
    setSkip((page - 1) * limit);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={limit}
      onChange={goToPage}
    />
  );
};

export default TodoPagination;
