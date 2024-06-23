"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import SunIcon from "@mui/icons-material/WbSunny";
// import MoonIcon from "@mui/icons-material/NightsStay";
import MoonIcon from "@mui/icons-material/DarkMode";
import { Switch } from "@nextui-org/react";
import useThemeStore, { setTheme } from "@/store/themeStore";

export const DarkModeSwitch = () => {
  let { currentTheme } = useThemeStore();
  return (
    <Switch
      isSelected={!(currentTheme == "light")}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      thumbIcon={({ isSelected, className }) =>
        currentTheme == `light` ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  );
};

export default DarkModeSwitch;
