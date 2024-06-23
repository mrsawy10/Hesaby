import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HoverBorderGradient
      containerClassName="text-3xl font-bold bg-slate-50 shadow-md   text-black m-auto text-center  mb-20  rounded"
      className={"bg-white text-black px-9 py-4 text-lg " + className}
      as="button"
    >
      {children}
    </HoverBorderGradient>
  );
}
