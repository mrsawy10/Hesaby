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
import sendForgetPasswordEmail, { resetPassword } from "@/actions/forget-password";
import { resetPasswordSchema } from "@/lib/formSchemas";
import { useRouter } from "next/navigation";

//

export default function LoginForm({ payload, token }: any) {
  // console.log(payload);
  let [password, setPassword] = useState(``);
  let [confirmPassword, setConfirmPassword] = useState(``);
  //
  let generalIsLoading = useGeneralStore((s) => s.generalIsLoading);
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  let router = useRouter();
  return (
    <Card className="py-4 w-full m-2  md:w-[400px]   ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex items-between justify-between w-full ">
          <h2 className="text-lg font-semibold mb-3">Change Your Password .</h2>
          {/* <DarkModeSwitch /> */}
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <form
          action={async () => {
            setGeneralIsLoading(true);
            try {
              //
              resetPasswordSchema.validateSync({
                password,
                confirmPassword,
                email: payload.email,
                id: payload.id,
                token: token,
              });
              await resetPassword({
                password,
                confirmPassword,
                email: payload.email,
                id: payload.id,
                token: token,
              });

              setGeneralIsLoading(false);
              Swal.fire({
                icon: "success",
                title: "Congrats !",
                text: "Your Password has been updated successfully 👍",
                timer: 2000,
                showConfirmButton: false,
              });
              setTimeout(() => {
                router.replace(`/auth`);
              }, 1500);
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
            <h6 className="text-sm pb-1 pt-3"> Password</h6>
            <LightInput
              onChange={({ target }) => setPassword(`${target.value}`)}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
            />
          </div>
          <div className="pb-4">
            <h6 className="text-sm pb-1 pt-3">Confirm Password</h6>
            <LightInput
              onChange={({ target }) => setConfirmPassword(`${target.value}`)}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required={true}
            />
          </div>

          <Button
            type="submit"
            disabled={generalIsLoading}
            className=" w-full mt-7 bg-blue-600 hover:bg-blue-900  dark:bg-white  dark:hover:bg-gray-300"
          >
            {generalIsLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : `Send Code`}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
