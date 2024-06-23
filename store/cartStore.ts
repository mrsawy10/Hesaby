import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Account } from "@prisma/client"; // Import Product type from your application
import Cart from "@/types/Cart";
import useAuthStore from "./authStore";

interface CartState {
  cart: Account[];
  cartTotalPrice: number;
  addToCart: (account: Account) => void;
  removeFromCart: (account: Account) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartTotalPrice: 0,
      addToCart: async (account: Account) => {
        set((state) => {
          const accountExists = state.cart.some((item) => item.id === account.id);
          if (!accountExists) {
            return {
              cart: [...state.cart, account],
              cartTotalPrice: [...state.cart, account].reduce((acc, curr) => acc + +curr.price, 0),
            };
          }
          return state;
        });
        if (useAuthStore.getState().isLogged) {
          let response = await fetch(`/api/user/cart`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ account_id: account.id }),
          });
          let user = await response.json();
          console.log({ user });
        }
      },
      removeFromCart: async (account: Account) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== account.id),
          cartTotalPrice: state.cart
            .filter((item) => item.id !== account.id)
            .reduce((acc, curr) => acc + +curr.price, 0),
        }));
        if (useAuthStore.getState().isLogged) {
          let response = await fetch(`/api/user/cart`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ account_id: account.id }),
          });
          let res = await response.json();
          console.log({ res });
        }
      },
      clearCart: () => {
        set({ cart: [], cartTotalPrice: 0 });
      },
    }),

    { name: "cart-store", skipHydration: true }
  )
);

export const setCart = async (data: any[]) => {
  console.log(`data when login ==> `, { data });

  let response = await fetch(`/api/user/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data.map((d) => d.id)),
  });
  let res = await response.json();
  console.log({ res });
};

export const setCartState = (user: any) => {
  useCartStore.setState({
    cart: user.cart,
    cartTotalPrice: user.cart.reduce((acc: number, curr: any) => acc + +curr.price, 0),
  });
};

export default useCartStore;
