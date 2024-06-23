"use client";

import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { CollapseItemsComponents } from "@/components/sidebar/collapse-items-component";
import { Checkbox } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
// import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Swal from "sweetalert2";
import * as yup from "yup";

import Button from "@/components/main-button";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { filterAccountSchema } from "@/lib/formSchemas";
import useGeneralStore from "@/store/generalStore";

import "flowbite";
import { t } from "i18next";

export default function SideBar({ asideClassName, platforms, games }: any) {
  const asideRef = useRef(null);

  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);
  let [selectedGames, setSelectedGames] = useState<string[]>([]);
  let [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  let [price, setPrice] = useState({ from: 0, to: 1000000 });

  let router = useRouter();
  const handleSubmit = (e: any) => {
    try {
      setGeneralIsLoading(true);
      e.preventDefault();

      filterAccountSchema.validateSync({ selectedGames, selectedPlatforms, price });

      setGeneralIsLoading(false);

      router.replace(
        `/accounts/?games=${selectedGames.join(`,`)}&platforms=${selectedPlatforms.join(
          `,`
        )}&price_from=${price.from}&price_to=${price.to}$filter=1`
      );
    } catch (error: any) {
      setGeneralIsLoading(false);
      console.log(`error`, error);
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
  };
  const handleChangeGame = (e: any) => {
    if (e.target.checked && !selectedGames.some((game) => game == e.target.value)) {
      setSelectedGames((prev: string[]) => [...prev, `${e.target.value as string}`]);
    } else {
      setSelectedGames((prev) => prev.filter((g) => g !== e.target.value));
    }
  };
  const handleChangePlatform = (e: any) => {
    if (e.target.checked && !selectedPlatforms.some((game) => game == e.target.value)) {
      setSelectedPlatforms((prev: string[]) => [...prev, `${e.target.value as string}`]);
    } else {
      setSelectedPlatforms((prev) => prev.filter((g) => g !== e.target.value));
    }
  };

  const openAside = () => {
    (asideRef?.current as any).classList.remove(`-translate-x-full`);

    (asideRef?.current as any).add(`translate-x-none`);
  };
  return (
    <>
      <div className="flex justify-center items-center" dir="ltr">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-900 dark:focus:ring-gray-600"
          onClick={openAside}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <span className="text-gray-500 dark:text-gray-400 sm:hidden">تصفية</span>
      </div>

      <aside
        id="default-sidebar"
        className={
          "fixed top-0 left-0 z-[39] w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 " +
          asideClassName
        }
        aria-label="Sidebar"
        ref={asideRef}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-zinc-900 mt-9 pt-16">
          <ul className="space-y-2 font-medium">
            <li>
              <CollapseItemsComponents
                icon={<VideogameAssetIcon className="text-gray-400" />}
                items={games.map((game: any, i: number) => (
                  <Checkbox key={i} value={game?.id} onChange={handleChangeGame}>
                    {/* <span className="px-2">{game.title}</span> */}
                    <div className="px-2">
                      <span>{game.title}</span>
                    </div>
                  </Checkbox>
                ))}
                title={t("games")}
              />
            </li>
            <li>
              <CollapseItemsComponents
                icon={<SportsEsportsIcon className="text-gray-400" />}
                items={platforms.map((platform: any, i: number) => (
                  <Checkbox key={i} value={platform?.id} onChange={handleChangePlatform}>
                    <div className="px-2">
                      <span>{platform.title}</span>
                    </div>
                  </Checkbox>
                ))}
                title={t("platforms")}
              />
            </li>
            <li className="flex flex-col gap-2">
              <CollapseItemsComponents
                icon="$"
                items={[
                  <div key={`price_from`} className="flex flex-col gap-1">
                    <label className="text-gray-600 dark:text-gray-400">{t(`From`)}</label>
                    <Input
                      value={`${price.from}`}
                      onChange={({ target }) => {
                        setPrice((p) => ({ ...p, from: +target.value }));
                      }}
                      type="number"
                      className="border-none-child-input"
                      placeholder="0.00"
                      labelPlacement="outside"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                    />
                  </div>,
                  <div key={`price_to`} className="flex flex-col gap-1">
                    <label className="text-gray-600 dark:text-gray-400">{t(`To`)}</label>
                    <Input
                      value={price.to.toString()}
                      onChange={({ target }) => {
                        setPrice((p) => ({ ...p, to: +target.value }));
                      }}
                      type="number"
                      className="border-none-child-input"
                      placeholder="0.00"
                      labelPlacement="outside"
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                    />
                  </div>,
                ]}
                title={t("price")}
              />
            </li>
            <li className="pt-4 mb-16">
              <Button onClick={handleSubmit} className="py-1 px-3 w-full">
                {t(`filter`)}
              </Button>
            </li>
            <li className="mt-16"></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </aside>
    </>
  );
}
