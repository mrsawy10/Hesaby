"use client";

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Carousel from "@/components/carousel/";
import EditProfile from "./EditProfile";
import { AnyNode } from "postcss";
import Wishlist from "./Wishlist";
import { useRouter } from "next/navigation";
import CardsContainer from "./cardsContainer";
import { t } from "i18next";

function UserSittings({ user, sameUser, path }: { path?: string; user: any; sameUser: boolean }) {
  const [selected, setSelected] = React.useState<string>(path ? path : `accepted_accounts`);
  const router = useRouter();
  // const { query } = router;

  //  `edit_profile`  "accepted_accounts"
  const handleSelectionChange = (key: any) => {
    setSelected(key as string);
    router.push(`/profile/${user.id}?path=${key}`, { scroll: false });
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
        //  className={`flex flex-col w-full lg:flex-row lg:flex-nowrap`}

        className="w-full te child-w-full flex flex-col sm:flex-row flex-wrap-child-sm"
      >
        <Tab key="accepted_accounts" title={t("Accepted Accounts")}>
          <Card>
            <CardBody className="px-12 sm:px-20">
              {user.accounts.filter((a: any) => a.status == `accepted`).length ? (
                <CardsContainer data={user.accounts.filter((a: any) => a.status == `accepted`)} />
              ) : (
                <NoDataFound />
              )}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="sold_accounts" title={t("Sold Accounts")}>
          <Card>
            {user.accounts.filter((a: any) => a.status == `sold`).length ? (
              <CardsContainer data={user.accounts.filter((a: any) => a.status == `sold`)} />
            ) : (
              <NoDataFound />
            )}
          </Card>
        </Tab>
        {sameUser && (
          <Tab key="pending_accounts" title={t("Pending Accounts")}>
            <Card>
              {user.accounts.filter((a: any) => a.status == `pending`).length ? (
                <CardsContainer data={user.accounts.filter((a: any) => a.status == `pending`)} />
              ) : (
                <NoDataFound />
              )}
            </Card>
          </Tab>
        )}
        {sameUser && (
          <Tab key="edit_profile" title={t("Edit Profile")}>
            <Card>
              <CardBody>
                <EditProfile user={user} />
              </CardBody>
            </Card>
          </Tab>
        )}

        {sameUser && (
          <Tab key="wishlist" title={t("Wishlist")}>
            <Card>
              <CardBody>
                <Wishlist />
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export default UserSittings;
// []
export const NoDataFound = () => {
  return <CardBody>No Data Found ~</CardBody>;
};
