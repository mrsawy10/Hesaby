"use client";

import { Button } from "@/components/ui/button";
import { Input as LightInput } from "@/components/ui/input-light";
import { adminLogin } from "@/actions/admin/admin";
import { useFormState, useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from "sweetalert2";

//
const adminLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function LoginForm() {
  const adminLoginAction = (state: void | null, formData: FormData) => adminLogin(formData);
  //
  const [state, dispatchAction] = useFormState(adminLoginAction, null);
  const [loading, setLoading] = useState(false);
  const { pending, data, method, action } = useFormStatus();
 

  return (
    <form
      action={dispatchAction}
      onSubmit={(e) => {
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const emailInput = form.elements.namedItem("email") as HTMLInputElement;
        const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
        const email = emailInput.value;
        const password = passwordInput.value;

        // const { email, password } = getFormInputValues(e.target as HTMLFormElement, ["email", "password"]);

        try {
          adminLoginSchema.validateSync({ email, password }, { abortEarly: false });
        } catch (error: any) {
          e.preventDefault();
          setLoading(false);
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
        <LightInput id="email" type="email" name="email" placeholder="Email" />
      </div>
      <h6 className="text-sm pb-2 pt-3">Password</h6>
      <LightInput id="password" type="password" name="password" placeholder="password" />

      <Button
        disabled={state || pending || loading}
        className=" w-full mt-12 bg-blue-600 hover:bg-blue-900  dark:bg-white  dark:hover:bg-gray-300"
      >
        {state || pending || loading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          `Sign In`
        )}
      </Button>
    </form>
  );
}
