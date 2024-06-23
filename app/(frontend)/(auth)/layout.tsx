"use client";
import useAuthStore, { setLogin } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  let { isLoading, isSuccess, isError, user, isLogged } = useAuthStore();
  const router = useRouter();
  if (isSuccess && router && isLogged) {
    // setLogin(user);
    router?.replace(`/`);
    return <></>;
  }
  return <div >{children}</div>;
}

