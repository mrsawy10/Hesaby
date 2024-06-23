import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import useCartStore, { setCart, setCartState } from "./cartStore";
import useWishlistStore, { setWishlist, setWishListState } from "./wishlistStore";

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

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
    }),

    { name: "auth-store", skipHydration: true }
  )
);

export default useAuthStore;

export const testAuth = async (token: string | undefined | null) => {
  try {
    useAuthStore.setState({ isLoading: true });
    let response = await fetch(`/api/auth/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token ? token : useAuthStore.getState().token }),
    });
    let { user, error } = await response.json();
    console.log(`testAuth`, { user, error });
    if (!response.ok) throw new Error();

    setLogin(user);

    // useCartStore.setState({ cart: user.cart.map((ele: any) => ele.account) });
    // useWishlistStore.setState({ wishlist: user.wishList.map((ele: any) => ele.account) });

    setCartState(user);
    setWishListState(user);

    // return user;
  } catch (error) {
    console.log(`test auth failed ==>`, error);
    if (error) {
      setLogout();
    }
  }
};

export const setLogin = (user: any) => {
  if (getCookie(`hesaby-user-token`)) {
    localStorage.setItem(`hesaby-user-token`, `${getCookie(`hesaby-user-token`)}`.toString());
  }
  useAuthStore.setState({
    isLoading: false,
    user,
    isSuccess: true,
    isError: false,
    isLogged: true,
    errorMsg: ``,
    error: undefined,
    token: getCookie(`hesaby-user-token`)?.toString(),
  });
};

export const setLogout = () => {
  getCookie(`hesaby-user-token`) && deleteCookie(`hesaby-user-token`);

  localStorage.removeItem(`hesaby-user-token`);

  useAuthStore.setState({
    isLoading: false,
    error: { error: true },
    isSuccess: false,
    isError: true,
    isLogged: false,
    token: undefined,
    user: null,
    errorMsg: `User logout`,
  });
};
