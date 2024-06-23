"use client";
import { MaskContainer } from "@/components/ui/mask-effect";

export default function SVGMaskEffectDemo() {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center  overflow-hidden">
      <MaskContainer
        // className="w-full"
        revealText={
          <p className="max-w-4xl mx-auto text-slate-800 text-center  text-2xl font-bold">
            The first rule of Hesaby platform is you do not talk about Hesaby platform. The second
            rule of Hesaby platform is you DO NOT talk about Hesaby platform.
          </p>
        }
        className="h-[40rem] w-full  border rounded-md"
      >
        <div className="text-2xl ">
          The first rule of <span className="text-red-500">Hesaby platform</span> is you do not talk
          about Hesaby platform. The second rule of Hesaby platform is you DO NOT talk about{" "}
          <span className="text-red-500">Hesaby platform</span>.
        </div>
      </MaskContainer>
    </div>
  );
}
