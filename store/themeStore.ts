import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface ThemeState {
  currentTheme: string;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      currentTheme: `dark`,
    }),

    { name: "theme-store", skipHydration: true }
  )
);

export default useThemeStore;

export const setTheme = async (theme: string) => {
  let currTheme = localStorage.getItem(`hesaby-theme`) ?? `light`;
  useThemeStore.setState({ currentTheme: theme });
  localStorage.setItem(`hesaby-theme`, `${theme}`);
  setCookie(`hesaby-theme`, `${theme}`);
  setCookie(`theme`, `${theme}`);
};
