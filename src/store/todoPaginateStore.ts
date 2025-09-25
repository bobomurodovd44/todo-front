import { create } from "zustand";

interface Pagination {
  limit: number;
  skip: number;
  total: number;
  setLimit: (limit: number) => void;
  setSkip: (skip: number) => void;
  setTotal: (total: number) => void;
  resetPagination: () => void;
}

const usePaginationStore = create<Pagination>((set) => ({
  limit: 4,
  skip: 0,
  total: 0,
  setLimit: (limit) => set({ limit }),
  setSkip: (skip) => set({ skip }),
  setTotal: (total) => set({ total }),
  resetPagination: () =>
    set({
      limit: 10,
      skip: 0,
      total: 0,
    }),
}));

export default usePaginationStore;
