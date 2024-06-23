"use client";

import Classes from "@/components/slider/SliderButton.module.css";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

export default function Button({
  type,
  children,
  className,
  
  disabled,
  onClick, // Include onClick prop
  href,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: Function;
  href?: string;
  props?: any;
}) {
  let router = useRouter();
  if (href && onClick) {
    return <p>Cant`t have both href and onClick</p>;
  }
  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      className={cn(Classes["button"], `bg-red-700 rounded-sm`, className)}
      onClick={(e) => {
        href && router.push(href);
        onClick && onClick(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
