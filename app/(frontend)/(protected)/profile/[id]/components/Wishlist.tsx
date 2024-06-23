"use client";

import React from "react";
import useWishlistStore from "@/store/wishlistStore";
import CardsContainer from "./cardsContainer";
import useTax from "@/hooks/useTax";
function Wishlist() {
  let { wishlist } = useWishlistStore();
  let finalResult = useTax(wishlist);
  return <CardsContainer data={finalResult} />;
}

export default Wishlist;
