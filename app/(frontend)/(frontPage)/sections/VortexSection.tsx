import React from "react";
import { Vortex } from "@/components/ui/vortex";
import Button from "@/components/main-button";
import { SignedOut, SignedIn } from "@/components/auth";
import Link from "next/link";

export function VortexSection() {
  return (
    <div className="w-full mx-auto rounded-md  h-[30rem] lg:h-[50rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">Hesaby</h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center capitalize">
          Best Gaming accounts Trading Website in the middle east .
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          {/* <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Order now
          </button> */}
          <SignedOut className="">
            <Button href="/auth" className="py-1 px-4 text-md">
              <div>Sign Up / Log in</div>
            </Button>
          </SignedOut>
          <SignedIn>
            {/* <div className="flex justify-center items-center"> */}
            <Link href="/sell-your-account">
              <Button className="py-2 px-4 text-md">
                <div>Sell Your Account</div>
              </Button>
            </Link>
          </SignedIn>

          <Link href="/accounts">
            <Button className="py-2 px-4 text-lg bg-none bg-transparent">
              <div>See All Account</div>
            </Button>
          </Link>
          {/* <button className="px-4 py-2  text-white ">Watch trailer</button> */}
        </div>
      </Vortex>
    </div>
  );
}
