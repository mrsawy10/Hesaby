"use client";

import React, { useEffect, useState } from "react";
// import { useTheme as useNextTheme } from "next-themes";
import SunIcon from "@mui/icons-material/WbSunny";
// import MoonIcon from "@mui/icons-material/NightsStay";
import MoonIcon from "@mui/icons-material/DarkMode";
// import { Switch } from "@nextui-org/react";
import useThemeStore, { setTheme } from "@/store/themeStore";

// export const DarkModeSwitch = () => {
//   let { currentTheme } = useThemeStore();

//   return (
//     <Switch
//     //   classNames="bg-red"
//       color="primary"
//       isSelected={currentTheme == "dark"}
//       onClick={() => {
//         setTheme(currentTheme == `light` ? "dark" : "light");
//       }}
//       thumbIcon={({ isSelected, className }) =>
//         currentTheme == `light` ? (
//           <SunIcon className={className} />
//         ) : (
//           <MoonIcon className={className} />
//         )
//       }
//     />
//   );
// };

// import React from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";

const ThemeSwitch = (props: any) => {
  let { currentTheme } = useThemeStore();

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
    // onClick
  } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2  max-h-11">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          onClick={() => {
            setTheme(currentTheme == `light` ? "dark" : "light");
          }}
          className={slots.wrapper({
            class: [
              // `max-h-11`,
              "w-10 h-10",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
              `bg-gray-300`,
              ` dark:bg-default-800 dark:hover:bg-default-700`,
              "transition-colors",
              "cursor-pointer",
            ],
          })}
        >
          {currentTheme == `light` ? <SunIcon /> : <MoonIcon className="text-black " />}
        </div>
      </Component>
      {/* <p className="text-default-500 select-none">Lights: {isSelected ? "on" : "off"}</p> */}
    </div>
  );
};

export default function App() {
  return <ThemeSwitch />;
}
