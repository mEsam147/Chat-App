import { create } from "zustand";

interface State {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<State>((set) => ({
  theme: localStorage.getItem("theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
