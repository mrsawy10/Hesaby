"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Input as LightInput } from "@/components/ui/input-light";
import { adminLogin } from "@/actions/admin/admin";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from "sweetalert2";
import useGeneralStore from "@/store/generalStore";
import sendForgetPasswordEmail from "@/actions/forget-password";

//

export default function ForgetPasswordForm() {
  let [email, setEmail] = useState(``);
  let [isTokenSent, sentIsTokenSent] = useState(false);
  //
  let generalIsLoading = useGeneralStore((s) => s.generalIsLoading);
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  return (
    <div>
      {!isTokenSent ? (
        <Card className="py-4 w-full m-2  md:w-[400px]   ">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="flex items-between justify-between w-full ">
              <h2 className="text-lg font-semibold">Enter Your Email Address .</h2>
              {/* <DarkModeSwitch /> */}
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <form
              action={async () => {
                setGeneralIsLoading(true);
                try {
                  //
                  await sendForgetPasswordEmail(email);
                  //
                  sentIsTokenSent(true);
                  setGeneralIsLoading(false);
                } catch (error: any) {
                  setGeneralIsLoading(false);
                  if (error instanceof yup.ValidationError) {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error.errors[0] ?? "",
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: error?.message ?? "",
                    });
                  }
                }
              }}
            >
              <div className="pb-4">
                <h6 className="text-sm pb-1 pt-3">Your email</h6>
                <LightInput
                  onChange={({ target }) => setEmail(`${target.value}`)}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required={true}
                />
              </div>

              <Button
                type="submit"
                disabled={generalIsLoading}
                className=" w-full mt-12 bg-blue-600 hover:bg-blue-900  dark:bg-white  dark:hover:bg-gray-300"
              >
                {generalIsLoading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  `Send Code`
                )}
              </Button>
            </form>
          </CardBody>
        </Card>
      ) : (
        <div className="p-5 px-7 text-gray-700 dark:text-gray-300 rounded-md border">
          Code Is Sent Please Go Check Your Email 👌
        </div>
      )}
    </div>
  );
}
