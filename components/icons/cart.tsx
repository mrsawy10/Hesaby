"use client";

import { cn } from "@/lib/utils";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { Account } from "@prisma/client"; // Import Product type from your application
import useScreenWidth from "@/hooks/useScreenWidth";
import useCartStore from "@/store/cartStore";

function CartIcon({
  smallAspects = ``,
  className = ``,
  account,
}: {
  smallAspects?: string;
  account: Account;
  className?: string;
}) {
  let { cart, addToCart, removeFromCart } = useCartStore();
  let width = useScreenWidth();

  useEffect(() => {
    setSelected(
      !!cart.find((ele) => {
        // console.log({ele});
        return ele?.id == account.id;
      })
    );
  }, [cart]);

  const [selected, setSelected] = useState(
    !!cart.find((ele) => {
      // console.log({ele});
      return ele?.id == account.id;
    })
  );

  return (
    <button
      type="button"
      className={cn(`flex justify-center`)}
      onClick={(e) => {
        e.stopPropagation();
        !selected && addToCart(account);
        selected && removeFromCart(account);
      }}
    >
      <AddShoppingCartIcon
        sx={{
          ...buttonStyle,
          ...(selected && cartSelectedStyleDark),
          ...(width < 400 && smallAspects && { width: smallAspects, height: smallAspects }),
        }}
      />
    </button>
  );
}

export default CartIcon;

const cartSelectedStyleDark = {
  backgroundColor: "#1c1917", // bg-gray-900
  color: "#ffffff", // text-white
};
const buttonStyle = {
  padding: "0.55rem", // adjusted from 0.5rem and md:p-[0.55rem]
  height: "2.75rem", // xl:h-11
  fontSize: 70,
  width: "2.75rem", // xl:w-11
  border: "1px solid #1c1917", // border-zinc-950
  // fontSize: "2.3rem", // md:text-[2.3rem]
  borderRadius: "9999px", // rounded-full
  zIndex: 38, // z-[38]
  transition: "all 0.7s", // transition-all duration-700
  display: "flex", // flex
  justifyContent: "center", // justify-center
  backgroundColor: "rgba(209, 213, 219, 0.5)", // bg-gray-100/50
  color: "#27272a", // text-zinc-900
};
