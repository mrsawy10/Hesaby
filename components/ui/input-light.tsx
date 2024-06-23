// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label prop
  containerClassName?: string; // Optional className prop
  isNumber?: boolean; // Optional isNumber prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, containerClassName, isNumber, ...props }, ref) => {
    const radius = 100; // change this to increase the radius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    // Handle input change for allowing only numbers
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (isNumber) {
        console.log(value)
        // Allow only numbers
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        event.target.value = onlyNumbers;
      }
      // Call any additional onChange handler
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <div className={"relative flex flex-col " + containerClassName}>
        {label && (
          <label className="block text-sm text-neutral-600 dark:text-neutral-400 mb-1 text-start">{label}</label>
        )}
        <motion.div
          style={{
            background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            var(--blue-500),
            transparent 80%
          )
        `,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className="p-[2px] rounded-lg transition duration-300 group/input"
        >
          <input
            type={type}
            className={cn(
              `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
            file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
            focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
             disabled:cursor-not-allowed disabled:opacity-50
             dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
             group-hover/input:shadow-none transition duration-400 
             `,
              className
            )}
            ref={ref}
            onChange={handleChange} // Call the custom handleChange function
            {...props}
          />
        </motion.div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export default Input;
