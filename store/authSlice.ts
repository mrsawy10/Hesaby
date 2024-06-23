import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface AuthState {
  user: any;
  error: any;
  isLogged: boolean;
  token: string | undefined;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  errorMsg: string;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLogged: false,
  token: getCookie(`hesaby-user-token`)?.toString(),
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: "",
  
};

// const useAuthStore = create<AuthState>()((set, get) => ({
//   ...initialState,
//   testAuth: async (user: any) => {
//     try {
//       set({ isLoading: true });
//       let response = await fetch(`/api/auth/check-token`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: get().token }),
//       });
//       let { user, error } = await response.json();
//       if (!response.ok) throw new Error();
//       set({ isLoading: false, user, isSuccess: true, isError: false, isLogged: true });
//     } catch (error) {
//       console.log(error);
//       set({ isLoading: false, error, isSuccess: false, isError: true, isLogged: false });
//     }
//   },
//   setLogin: (user: any) => {
//     set({ isLoading: false, user, isSuccess: true, isError: false, isLogged: true });
//   },
//   setLogout: () => {
//     set({
//       isLoading: false,
//       error: { error: true },
//       isSuccess: false,
//       isError: true,
//       isLogged: false,
//     });
//   },
// }));

// export default useAuthStore;

export const createAuthSlice = (set: any, get: any, third: any) => ({
  ...initialState,
  testAuth: async (user: any) => {
    try {
      set({ isLoading: true });
      let response = await fetch(`/api/auth/check-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: get().token }),
      });
      let { user } = await response.json();
      if (!response.ok) throw new Error();
      set({ isLoading: false, user, isSuccess: true, isError: false, isLogged: true });
    } catch (error) {
      console.log(error);
      set({ isLoading: false, error, isSuccess: false, isError: true, isLogged: false });
    }
  },
  setLogin: (user: any) => {
    set({ isLoading: false, user, isSuccess: true, isError: false, isLogged: true });
  },
  setLogout: () => {
    set({
      isLoading: false,
      error: { error: true },
      isSuccess: false,
      isError: true,
      isLogged: false,
    });
  },
});
