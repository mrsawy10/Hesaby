"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";

import classes from "./LoginForm.module.css";
import * as yup from "yup";
import Swal from "sweetalert2";
import { CSSTransition } from "react-transition-group";
import { loginAction, signUpAction } from "@/actions/userAuth";
import IsLoadingComponent from "@/components/is-loading";
import { userLogin as userLoginSchema, userSignup as signupSchema } from "@/lib/formSchemas";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import useAuthStore, { setLogin } from "@/store/authStore";
import useGeneralStore from "@/store/generalStore";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import useCartStore, { setCart, setCartState } from "@/store/cartStore";
import useWishlistStore, { setWishlist, setWishListState } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

// import { useSession, signIn, signOut } from "next-auth/react";
// import { wait } from "@/lib/utils";

export default function LogInForm() {
  //
  let { t } = useTranslation();
  //
  let { isLoading, isSuccess, isError, user, isLogged } = useAuthStore();
  let { setGeneralIsLoading } = useGeneralStore();

  const router = useRouter();
  const [authState, setAuthState] = useState(`Log in`);
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  //
  const [loading, setLoading] = useState(false);
  //
  useEffect(() => {
    setGeneralIsLoading(isLoading);
  }, [isLoading]);

  return (
    <CSSTransition
      classNames={{
        enter: classes.formenter,
        enterActive: classes.formenterActive,
        enterDone: classes.formenterDone,
        exit: classes.formexit,
        exitActive: classes.formexitActive,
        exitDone: classes.formexitDone,
      }}
      timeout={{
        enter: 500,
        exit: 500,
      }}
      in={!inProp}
    >
      <form
        dir="rtl"
        onSubmit={() => {
          setLoading(true);
        }}
        action={async (formData) => {
          //
          console.log(loading);
          if (authState == `Log in`) {
            let { email, password } = Object.fromEntries(formData.entries());

            try {
              userLoginSchema.validateSync({ email, password }, { abortEarly: false });

              let { user } = await loginAction(formData);
              console.log(user);

              if (user) {
                setLoading(false);
                // authDispatch({ type: `LOGIN`, payload: { user } });
                setLogin(user);

                //
                
                setCartState(user);
                setWishListState(user); //
                Swal.fire({
                  icon: "success",
                  title: "Congrats !",
                  text: "You`ve been logged in successfully.",
                  timer: 2000,
                  showConfirmButton: false,
                });
                setTimeout(() => {
                  router.replace(`/`);
                }, 1300);
              }
            } catch (error: any) {
              setLoading(false);
              console.log(`err`, error);
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
          } else if (`${authState}`.toLowerCase() == `sign up`.toLowerCase()) {
            let {
              fname: firstName,
              lname: lastName,
              phone: phoneNumber,
              confirm_password,
              email,
              password,
            } = Object.fromEntries(formData.entries());
            try {
              signupSchema.validateSync(
                { firstName, lastName, phoneNumber, email, password, confirm_password },
                { abortEarly: false }
              );

              let { user } = await signUpAction(formData);

              // console.log(user);
              // authDispatch({ type: `LOGIN`, payload: { user } });
              setLogin(user);

              Swal.fire({
                icon: "success",
                title: "Congrats !",
                text: "You`ve been Signed Up successfully.",
                timer: 2000,
                showConfirmButton: false,
              });

              if (Array.isArray(useCartStore.getState().cart)) {
                await setCart(useCartStore.getState().cart);
              }
              if (Array.isArray(useWishlistStore.getState().wishlist)) {
                await setWishlist(useWishlistStore.getState().wishlist);
              }
            } catch (error: any) {
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
          }
        }}
        className={`${classes.form_container} ${classes.form} sm:p-4 h-[84%]  sm:h-[85%] `}
      >
        <div className={cn(classes.center_container , `mb-8`)} dir={`ltr`}>
          <div className={classes.login_signup}>
            <p
              onClick={() => {
                setAuthState(`Log in`);
                setInProp(false);
              }}
            >
              <span className={`${authState === "Log in" && classes.chosen}`}>{t(`login`)}</span>
            </p>
            <p
              onClick={() => {
                setAuthState(`Sign up`);
                setInProp(true);
              }}
            >
              <span className={`${authState === "Sign up" && classes.chosen}`}>{t(`signup`)}</span>
            </p>
          </div>
        </div>
        <CSSTransition
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            enterDone: classes.enterDone,
            exit: classes.exit,
            exitActive: classes.exitActive,
            exitDone: classes.exitDone,
          }}
          nodeRef={nodeRef}
          timeout={{
            enter: 500,
            exit: 500,
          }}
          unmountOnExit
          in={inProp}
        >
          <section ref={nodeRef} className={classes.name_section} dir="rtl">
            <div className={classes.name_container}>
              <input
                name="fname"
                type="name"
                className={classes.name_input}
                placeholder={t("firstName")}
              />
              <hr className={classes.hrPink} />
            </div>
            <div className={classes.name_container}>
              <input
                name="lname"
                type="name"
                className={classes.name_input}
                placeholder={t("lastName")}
              />
              <hr className={classes.hrPink} />
            </div>
          </section>
        </CSSTransition>
        <div>
          <input
            type="email"
            name="email"
            className={classes.email_input}
            placeholder={t("email")}
          />
          <hr />
        </div>

        <CSSTransition
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            enterDone: classes.enterDone,
            exit: classes.exit,
            exitActive: classes.exitActive,
            exitDone: classes.exitDone,
          }}
          timeout={{
            enter: 500,
            exit: 500,
          }}
          unmountOnExit
          in={inProp}
        >
          <div>
            <input
              type="text"
              pattern="[0-9]*"
              name="phone"
              className={classes.name_input}
              placeholder={t("phoneNumber")}
              onChange={(event) => {
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
              }}
            />
            <hr />
          </div>
        </CSSTransition>

        <div>
          <input
            name="password"
            type="password"
            className={classes.password_input}
            placeholder={t("password")}
          />
          <hr />
          <div className={classes.forget_password_container}>
            {authState === `Log in` && (
              <Link href={`/forget-password`}>
                <p className=" text-gray-500 hover:text-white">{t(`forgotPassword`)}</p>
              </Link>
            )}{" "}
          </div>
        </div>
        <CSSTransition
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            enterDone: classes.enterDone,
            exit: classes.exit,
            exitActive: classes.exitActive,
            exitDone: classes.exitDone,
          }}
          timeout={{
            enter: 500,
            exit: 500,
          }}
          unmountOnExit
          in={inProp}
        >
          <div>
            <input
              type="password"
              name="confirm_password"
              className={classes.password_input}
              placeholder={t(`confirmPassword`)}
            />
            <hr />
          </div>
        </CSSTransition>

        <div className={cn(classes.center_container , `mt-7`)}>
          <button disabled={loading} type="submit" className={classes.form_button}>
            {loading ? (
              <div className="flex justify-center items-center text-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              t(authState)
            )}
          </button>
        </div>
      </form>
    </CSSTransition>
  );
}
