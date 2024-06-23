import React from "react";
import Button from "@/components/main-button";
import Link from "next/link";
import { t } from "i18next";
import Panel from "@/components/text-panel";

function LoginFirst() {
  return (
    <div className=" flex justify-center items-center m-auto flex-col">
      <Panel>{t(`You Need To Be Signed In For this`)}</Panel>

      {/* <label className="dark:text-zinc-100">{t(`You Need To Be Signed In For this`)}</label> */}
      <Link href="/auth">
        <Button className="ml-2 py-1 px-6 m-12">{t("Log In")}</Button>
      </Link>
    </div>
  );
}

export default LoginFirst;
