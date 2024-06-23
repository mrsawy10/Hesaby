"use client";

import React, { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 5000
  );

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      window.addEventListener("resize", updateScreenWidth);
    }
    return () => {
      if (typeof window !== "undefined") {
        // Client-side-only code
        window.removeEventListener("resize", updateScreenWidth);
      }
    };
  }, []);

  return screenWidth;
};

export default useScreenWidth;
