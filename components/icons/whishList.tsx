"use client";

import { cn } from "@/lib/utils";
import useWishlistStore from "@/store/wishlistStore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect, useState } from "react";
import { Account } from "@prisma/client"; // Import Product type from your application
import { string } from "yup";
import useScreenWidth from "@/hooks/useScreenWidth";

function WishListIcon({
  smallAspects = ``,
  className = ``,
  account,
}: {
  smallAspects?: string;
  account: Account;
  className?: string;
}) {
  let width = useScreenWidth();

  const [selected, setSelected] = useState(false);
  let { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    setSelected(
      !!wishlist.find((ele) => {
        // console.log({ ele });
        return ele?.id == account.id;
      })
    );
  }, [wishlist]);

  return (
    <button
      type="button"
      className={cn(`flex justify-center`)}
      onClick={(e) => {
        e.stopPropagation();
        // setSelected((p) => !p);

        !selected && addToWishlist(account);
        selected && removeFromWishlist(account);
      }}
    >
      <FavoriteBorderIcon
        sx={{
          ...buttonStyle,
          ...(selected && cartSelectedStyleDark),
          // ...(width < 400 && smallAspects && { width: smallAspects, height: smallAspects }),
        }}
      />
    </button>
  );
}

export default WishListIcon;

const cartSelectedStyleDark = {
  backgroundColor: "#1c1917", // bg-gray-900
  color: "#ffffff", // text-white
};
const buttonStyle = {
  padding: "0.55rem", // adjusted from 0.5rem and md:p-[0.55rem]
  height: "2.75rem", // xl:h-11
  fontSize: 50,
  width: "2.75rem", // xl:w-11
  border: "1px solid #1c1917", // border-zinc-950
  borderRadius: "9999px", // rounded-full
  zIndex: 38, // z-[38]
  transition: "all 0.7s", // transition-all duration-700
  display: "flex", // flex
  justifyContent: "center", // justify-center
  backgroundColor: "rgba(209, 213, 219, 0.5)", // bg-gray-100/50
  color: "#27272a", // text-zinc-900
};
