// store/useFilterStore.ts
import { create } from "zustand";

export type Filter = "all" | "today" | "completed" | "notCompleted";

interface FilterState {
  filter: Filter;
  setFilter: (f: Filter) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
