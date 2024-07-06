"use client";

import { Fragment, useEffect } from "react";
import Button from "@/components/main-button";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SignedOut, SignedIn } from "@/components/auth";
import { useRouter } from "next/navigation";
import useAuthStore, { testAuth, setLogout, setLogin } from "@/store/authStore";

import { getCookie, setCookie, deleteCookie } from "cookies-next";
import DarkModeSwitch from "@/components/dark-mode-front/DarkModeSwitcher";
import useThemeStore from "@/store/themeStore";
import IsLoadingComponent from "@/components/is-loading";
import Link from "next/link";
import useGeneralStore from "@/store/generalStore";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
// import Image from "next/image";

import { Image } from "@nextui-org/react";
import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";
import { CartSheet } from "../cart/CartSheet";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  //
  const { t, i18n } = useTranslation();
  let { siteData, getSingleValue, generalIsLoading } = useGeneralStore();

  //
  const pathname = usePathname();
  const navigation = [
    { name: t("Home"), href: "/", current: pathname == `/` },
    { name: t("about"), href: "/about-us", current: pathname == `/about-us` },
    { name: t("contact"), href: "/contact-us", current: pathname == `/contact-us` },
    { name: t("all Games"), href: "/games", current: pathname.includes(`games`) },
    { name: t("all Accounts"), href: "/accounts", current: pathname.includes(`accounts`) },
  ];
  let currentTheme = useThemeStore((s) => s.currentTheme);
  // let { cart } = useCartStore();
  // let router = useRouter();
  // useEffect(() => {
  //   console.log({ cart });
  // }, [cart]);

  useEffect(() => {
    if (currentTheme == `dark`) {
      document?.querySelector(`body`)?.classList.add(`dark`);
    } else {
      document?.querySelector(`body`)?.classList.remove(`dark`);
    }
  }, [currentTheme]);

  let { user, token: authToken } = useAuthStore();

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useCartStore.persist.rehydrate();
    useThemeStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    let token: any;
    if (getCookie(`hesaby-user-token`)) {
      token = getCookie(`hesaby-user-token`)?.toString();
    } else if (localStorage.getItem(`hesaby-user-token`)) {
      token = localStorage.getItem(`hesaby-user-token`);
    } else if (authToken) {
      token = authToken;
    }
    testAuth(token)

    // console.log({ token });
  }, []);

  // authDispatch
  return (
    <Disclosure
      as="nav"
      className="bg-gray-200 fixed top-0 z-40 w-full dark:bg-zinc-900 "
      dir="ltr"
    >
      {({ open }: { open: any }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-2">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-sm p-2 text-gray-400 hover:bg-zinc-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href={`/`}>
                  <div className="flex flex-shrink-0 items-center w-14 h-14 ">
                    <Image
                      width={400}
                      height={400}
                      loading="lazy"
                      className="h-full w-full object-cover rounded-none hidden sm:block"
                      src={getSingleValue(`general_logo_img`)}
                      alt="Hesaby"
                    />
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:flex justify-center items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          `transition-all  duration-500`,
                          `  dark:text-gray-300 `,
                          item.current
                            ? "bg-zinc-800 text-white dark:bg-zinc-300 dark:text-zinc-950"
                            : " text-zinc-950 hover:bg-zinc-700 hover:text-white",
                          "rounded-sm px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <IsLoadingComponent loading={generalIsLoading} />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <DarkModeSwitch />
                <CartSheet />
                <SignedOut className="flex">
                  <Link href="/auth">
                    <Button className="py-1 px-4 text-md">
                      <div>{t(`login`)}</div>
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn className="flex">
                  <div className="flex justify-center items-center">
                    <Link href="/sell-your-account">
                      <Button className=" py-[0.4rem] px-2 text-sm  sm:px-4 sm:py-1 sm:text-lg">
                        <div>{t(`sell_your_account`)}</div>
                      </Button>
                    </Link>
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          dir="rtl"
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/profile/${user.id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-zinc-700"
                                )}
                              >
                                {t(`profile`)}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/profile/${user.id}?path=edit_profile`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-zinc-700"
                                )}
                              >
                                {t(`settings`)}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={`/profile/${user.id}?path=wishlist`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-zinc-700"
                                )}
                              >
                                {t(`wishlist`)}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-zinc-700"
                                )}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLogout();
                                  setTimeout(() => {
                                    window.location.href = "/";
                                  }, 200);
                                }}
                              >
                                {t(`signout`)}
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  dir={`rtl`}
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-zinc-700 text-white"
                      : "text-zinc-800 dark:text-zinc-400 hover:bg-zinc-700 hover:text-white",
                    "block rounded-sm px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
