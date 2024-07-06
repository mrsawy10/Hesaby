//

import AccountForm from "./components/account-form";
import prisma from "@/prisma/db";
import Panel from "@/components/text-panel";
import { Divider } from "@nextui-org/divider";
import Breadcrumb from "@/components/Breadcrumb";
// export Breadcrumb

export default async function Page() {
  let platforms = await prisma.platform.findMany();
  let games = await prisma.game.findMany();

  let sellAlert = (
    await prisma.siteData.findFirst({
      where: {
        identifier: `general_sell_alert_content`,
      },
    })
  )?.value;
  // console.log({ games, platforms });

  return (
    <div className=" pt-24  text-center">
      {/* <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 m-auto mb-4 pb-4 ">بيع حسابك</h1> */}
      <div className="container">
        <Divider />
      </div>
      <div className=" font-bold  text-black m-auto w-11/12 md:w-9/12 ">
        <AccountForm
          sellAlert={`${sellAlert}`}
          platforms={platforms.map((e) => ({ ...e, label: e?.title }))}
          games={games.map((e) => ({ ...e, label: e?.title }))}
        />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
