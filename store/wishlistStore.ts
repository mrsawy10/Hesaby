import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Account } from "@prisma/client";
import useAuthStore from "./authStore";

interface WishlistState {
  wishlist: Account[];
  addToWishlist: (account: Account) => void;
  removeFromWishlist: (account: Account) => void;
  clearWishlist: () => void;
}

const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: async (account: Account) => {
        set((state) => {
          const accountExists = state.wishlist.some((item) => item.id === account.id);
          if (!accountExists) {
            return { wishlist: [...state.wishlist, account] };
          }
          return state;
        });
        if (useAuthStore.getState().isLogged) {
          let response = await fetch(`/api/user/wishlist`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ account_id: account.id }),
          });
          let user = await response.json();
          // console.log({ user });
        }
      },
      removeFromWishlist: async (account: Account) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== account.id),
        }));
        if (useAuthStore.getState().isLogged) {
          let response = await fetch(`/api/user/wishlist`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ account_id: account.id }),
          });
          let res = await response.json();
          // console.log({ res });
        }
      },
      clearWishlist: () => {
        set({ wishlist: [] });
      },
    }),

    { name: "wishlist-store", skipHydration: true }
  )
);

export const setWishlist = async (data: any[]) => {
  // console.log(`wishlist data when sign up ==> `, { data });

  let response = await fetch(`/api/user/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data.map((d) => d.id)),
  });
  let res = await response.json();
  // console.log(`set signup res`, { res });
};

export const setWishListState = (user: any) => {
  // console.log({ user });
  useWishlistStore.setState({ wishlist: user.wishList });
};

export default useWishlistStore;
