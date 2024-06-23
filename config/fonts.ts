import { Tajawal as FontMono, Tajawal as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: "400", // Specify a default weight (e.g., "400" for normal)
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  weight: "400", // Specify a default weight (e.g., "400" for normal)
  variable: "--font-mono",
});
