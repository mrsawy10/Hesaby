"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";

// import { Textarea } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

//
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
//
import Button from "@/components/main-button";
import Input from "@/components/ui/input-light";
import { accountSchema } from "@/lib/formSchemas";
import { sellAccountAction } from "@/actions/sell-acount";
import useAuthStore from "@/store/authStore";
import useGeneralStore from "@/store/generalStore";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";
import { t } from "i18next";
import LoginFirst from "@/components/LoginFirst";
import Panel from "@/components/text-panel";

//
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
//

export default function AccountForm({
  platforms,
  sellAlert,
  games,
}: {
  sellAlert: string;
  platforms: readonly any[] | undefined;
  games: readonly any[] | undefined;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //
  const [mainImage, setMainImage] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [gamesState, setGamesState] = useState<any[]>([]);
  const [platformsState, setPlatformsState] = useState<any[]>([]);
  const [game_id, setGame_id] = useState(null);
  const [platform_id, setPlatform_id] = useState(null);

  useEffect(() => {
    if (games) {
      setGamesState(games.slice());
    }
    if (platforms) {
      setPlatformsState(platforms.slice());
    }
  }, [games, platforms]);
  const handleUpdateMainImage = (fileItems: any) => {
    setMainImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  const handleUpdateGallery = (fileItems: any) => {
    setGallery(fileItems.map((fileItem: any) => fileItem.file));
  };
  let { user, isSuccess, isError, error, isLoading } = useAuthStore();
  useEffect(() => {
    setTimeout(() => {
      if (!isSuccess && isError && !user && !isLoading && error) {
        console.log({ user, isSuccess, isError, error, isLoading });
        // router.replace(`/auth`);
      }
    }, 1000);
  }, [isSuccess, isError, user, router]);

  let { generalIsLoading, setGeneralIsLoading } = useGeneralStore();
  return isSuccess && !isError ? (
    <form
      action={async (formData: FormData) => {
        try {
          let { email, password, title, description, username, price, game_email, game_password } =
            Object.fromEntries(formData.entries());
          let accountData = {
            username,
            email,
            title,
            description,
            password,
            price,
            game_id,
            platform_id,
            gallery,
            mainImage: Array.isArray(mainImage) && mainImage.length > 0 ? mainImage[0] : null,
            game_email,
            game_password,
          };

          accountSchema.validateSync(accountData, { abortEarly: false });
          gallery.forEach((image, index) => {
            formData.append(`gallery[${index}]`, image);
          });

          mainImage.forEach((image, index) => {
            formData.append(`mainImage`, image);
          });
          formData.append(`platform_id`, `${platform_id ?? ``}`);
          formData.append(`game_id`, `${game_id ?? ``}`);
          //
          // console.log(Object.fromEntries(formData.entries()));
          // console.log(`====------->>>> sellAlert`, { sellAlert });
          let result = await Swal.fire({
            icon: "question",
            title: `هل توافق على الشروط ؟`,
            html: sellAlert,
            showCancelButton: true,
            confirmButtonText: `أقبل`,
            cancelButtonText: `أرفض`,
            reverseButtons: true,
          });
          {
            /* <div dangerouslySetInnerHTML={{ __html: `${sellAlert}` }} /> */
          }
          if (result.isConfirmed) {
            setGeneralIsLoading(true);

            let createdAccount = await sellAccountAction(user, formData);
            if (createdAccount) {
              Swal.fire({
                icon: "success",
                title: "Congrats !",
                text: "You`re Account is sent to the admins to review.",
                timer: 2000,
                showConfirmButton: false,
              });

              setTimeout(() => {
                router.push("/");
              }, 1900);
            }

            setGeneralIsLoading(false);
          }
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
      }}
      className="flex flex-col gap-4 rounded-sm pt-24 px-6 lg:mb-9 lg:mt-3 dark:bg-zinc-900"
    >
      {/* <Panel>{t(`sell_your_account`)}</Panel> */}

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          className="w-full flex-grow"
          placeholder={t(`username`)}
          // placeholder={t(`enter`) + ` ` + t(`Username`)}
          name="username"
        />
        <Input
          containerClassName="w-full flex-grow"
          placeholder={t(`email`)}
          className="w-full"
          // placeholder={t(`enter`) + ` ` + t(`email`)}
          name="email"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          className="w-full flex-grow"
          placeholder={t(`game_email`)}
          name="game_email"
        />
        <Input
          containerClassName="w-full flex-grow"
          placeholder={t(`game_password`)}
          className="w-full"
          name="game_password"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input containerClassName="w-full flex-grow" placeholder={t(`title`)} name="title" />
        <div className="flex flex-col w-full">
          {/* <label className="description text-zinc-900 dark:text-zinc-400  ">
            {t(`description`)}
          </label> */}
          <Textarea
            name="description"
            labelPlacement="outside"
            placeholder={t(`description`)}
            className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea dark:text-white "
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          // label=" Password"
          placeholder={t(`password`)}
          name="password"
        />
        <Input
          containerClassName="w-full flex-grow"
          // label=" Price"
          placeholder={t(`price`)}
          name="price"
          isNumber={true}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 pt-8">
        <Autocomplete
          onChange={(event: any, newValue: any) => {
            setPlatform_id(newValue?.id);
          }}
          disablePortal
          id="combo-box-demo"
          className="w-full  dark:bg-white"
          options={platformsState}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={t("platform")} />}
        />
        <Autocomplete
          className="w-full  dark:bg-white"
          onChange={(event: any, newValue: any) => {
            setGame_id(newValue?.id);
          }}
          disablePortal
          id="combo-box-demo"
          options={gamesState}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={t("game")} />}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 mt-6 ">
        <div className="w-full md:w-6/12 md:m-auto md:mt-0">
          <label className="dark:text-gray-400">{t(`main_image`)}</label>
          <FilePond
            files={mainImage}
            onupdatefiles={handleUpdateMainImage}
            allowMultiple={true}
            maxFiles={1}
            acceptedFileTypes={["image/*"]}
            // name="main_image"
            labelIdle={t(
              "Drag & Drop  Account Main Image or <span class='filepond--label-action'>Browse</span>"
            )}
          />
        </div>

        <div className="w-full md:w-6/12 md:m-auto md:mt-0">
          <label className=" dark:text-gray-400">
            {t(`Gallery`)} <span className="text-gray-500">(5 {t(`max`)})</span>
          </label>

          <FilePond
            files={gallery}
            onupdatefiles={handleUpdateGallery}
            allowMultiple={true}
            maxFiles={5}
            acceptedFileTypes={["image/*"]}
            // name="account_gallery"
            labelIdle={t(
              "Drag & Drop  Account Galley or <span class='filepond--label-action'>Browse</span>"
            )}
          />
        </div>
      </div>
      <div className="w-full  text-center mt-8">
        <Button
          disabled={generalIsLoading}
          // bg-slate-900
          className="m-auto md:w-9/12 lg:w-6/12 xl:w-4/12 mb-16 py-3"
          type="submit"
        >
          {generalIsLoading ? (
            <div className="flex justify-center items-center text-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            <p className="md:text-lg">{t(`sell_your_account`)}</p>
          )}
        </Button>
      </div>
    </form>
  ) : (
    <LoginFirst />
  );
}
