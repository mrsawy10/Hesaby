"use client";

// import LoginCard from "./components/LoginCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

// import cookies from 'next-cookies';

function Error({ error, reset }: { error: Error; reset: Function }) {
  // const deleteAdminCookie = () => {
  //   if (getCookie(`admin-token`)) {
  //     let adminToken = getCookie(`admin-token`)?.toString() || null;
  //     if (typeof adminToken == `undefined`) {
  //       deleteCookie(`admin-token`);
  //     }
  //     if (typeof adminToken == `string`) {
  //       deleteCookie(`admin-token`);
  //     }
  //   }
  // };

  console.log(error);
  return (
    <div className="h-screen  w-full flex justify-center items-center">
      {/* error alert */}
      <div className="max-w-[600px]">
        <Alert>
          <GlobeIcon className="h-4 w-4" />
          <AlertTitle>Oops !</AlertTitle>
          <div className="flex gap-12 justify-between items-center">
            <AlertDescription>Error : Something went wrong.{error.message}</AlertDescription>
            <Button
              onClick={() => {
                // deleteAdminCookie();
                reset();
              }}
            >
              Try Again
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default Error;
