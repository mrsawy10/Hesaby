"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
// import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
// import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Textarea, Button as UiButton } from "@nextui-org/react";
//
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { Switch } from "@nextui-org/react";
import Lightbox from "yet-another-react-lightbox";
import Image from "next/image";

//
import Button from "@/components/main-button";
import Input from "@/components/ui/input-light";
import { accountSchema, editAccountSchema } from "@/lib/formSchemas";
import IsLoading from "@/components/is-loading";
import AutocompleteWithCondition from "./AutoCompleteCondition";
import { editAccountAction } from "@/actions/admin/account/edit-account";
import StatusGroup from "./StatusGroup";
//
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
//

export default function SingleAccountForm({
  platforms,
  games,
  account,
  originalAccountImg,
}: {
  platforms: readonly any[] | undefined;
  games: readonly any[] | undefined;
  account: any;
  originalAccountImg: string;
}) {
  const [isFeatured, setIsFeatured] = useState<boolean>(!!account?.isFeatured);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //
  const [mainImage, setMainImage] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  //
  const [galleryToBeRemoved, setGalleryToBeRemoved] = useState<any[]>([]);
  const [imgsState, setImgState] = useState(account.accountImages);
  const slides = account.accountImages.map(
    ({ image = `auto`, width = `auto`, height = `auto` }) => ({
      src: image,
      width,
      height,
    })
  );
  const [gamesState, setGamesState] = useState<any[]>([]);
  const [platformsState, setPlatformsState] = useState<any[]>([]);
  const [game_id, setGame_id] = useState(null);
  const [platform_id, setPlatform_id] = useState(null);
  const [editPlatform, setEditPlatform] = useState(false);
  const [editGame, setEditGame] = useState(false);
  const [statusState, setStatusState] = useState(account.status);
  const [formInputs, setFormInputs] = useState({
    username: account.username,
    email: account.email,
    title: account.title,
    description: account.description,
    password: account.password,
    price: account.price,
    game_email: account?.game_email ?? ``,
    game_password: account?.game_password ?? ``,
  });
  const handleChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  //
  useEffect(() => {
    setPlatform_id(account.platform_id);
    setGame_id(account.game_id);
  }, [account.platform_id, account.game_id]);

  //
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

  //
  const [index, setIndex] = useState(-1);
  const [mainIndex, setMainIndex] = useState(-1);

  const handleClick = (i: any, item?: any) => {
    setIndex(i);
  };
  const handleMainClick = () => {
    setMainIndex(0);
  };

  //   /

  const handleRemoveGalleryImage = (imgId: any) => {
    setGalleryToBeRemoved((prev: any) => [...prev, imgId]);
    document.querySelector(`#${imgId}`)?.classList.add(`hide_account_img`);
    setTimeout(() => {
      setImgState((prev: any) => prev.filter(({ id }: { id: any }) => id !== imgId));
    }, 500);
  };
  return (
    <IsLoading loading={loading} className="w-11/12 sm:w-10/12">
      <form
        onSubmit={() => {
          setLoading(true);
        }}
        action={async (formData: FormData) => {
          if (loading) return;
          try {
            let {
              email,
              password,
              title,
              description,
              username,
              price,
              game_email,
              game_password,
            } = Object.fromEntries(formData.entries());
            let accountData = {
              username,
              email,
              title,
              description,
              password,
              price,
              game_id,
              platform_id,
              account_id: account.id,
              gallery,
              finalGallery: [...imgsState, ...gallery],
              mainImage: Array.isArray(mainImage) && mainImage.length > 0 ? mainImage[0] : null,
              game_email,
              game_password,
            };
            editAccountSchema.validateSync(accountData, { abortEarly: false });
            gallery.forEach((image, index) => {
              formData.append(`gallery[${index}]`, image);
            });
            mainImage.forEach((image, index) => {
              formData.append(`mainImage`, image);
            });
            formData.append(`platform_id`, `${platform_id ?? ``}`);
            formData.append(`game_id`, `${game_id ?? ``}`);
            formData.append(`account_id`, `${account.id ?? ``}`);
            formData.append(`accountImg`, `${originalAccountImg ?? ``}`);

            Array.isArray(galleryToBeRemoved) &&
              galleryToBeRemoved.forEach((image_id, index) => {
                formData.append(`galleryToBeRemoved[${index}]`, `${image_id ?? ``}`);
              });
            // galleryToBeRemoved;
            formData.append(`status`, `${statusState ?? ``}`);
            //
            formData.delete("filepond");
            formData.append(`isFeatured`, `${isFeatured}`);
            // console.log(Object.fromEntries(formData.entries()));
            let updatedAccount = await editAccountAction(formData);

            //
            if (updatedAccount) {
              Swal.fire({
                icon: "success",
                title: "Congrats !",
                text: "The Account Is Edited Successfully.",
                timer: 20000,
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1800);
            }
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
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
        className="flex flex-col gap-4"
      >
        {/*  */}

        <StatusGroup
          status={account.status}
          onChange={(e: string) => {
            setStatusState(e);
          }}
        />
        <hr className="w-9/12 dark:border-gray-500 mx-auto mb-6 mt-2" />
        <div className="flex flex-col  gap-2 w-full">
          <Switch
            // defaultSelected
            isSelected={isFeatured}
            onClick={() => {
              setIsFeatured((p) => !p);
            }}
            aria-label="The Game Is Featured (This Will Show It On The Front Page)"
          >
            <p className="text-center text-black dark:text-gray-200">
              The Account Is Featured{` `}
              <span className="text-sm">(This Will Show It On The Front Page)</span>
            </p>
          </Switch>
        </div>

        <hr className="w-9/12 dark:border-gray-500 mx-auto mb-6 mt-2" />

        {/*  */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            className="w-full flex-grow"
            label=" Username"
            placeholder="Enter Username"
            name="username"
            value={formInputs.username}
            onChange={handleChange}
          />
          <Input
            containerClassName="w-full flex-grow"
            label=" Email"
            className="w-full"
            placeholder="Enter Email"
            name="email"
            value={formInputs?.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            className="w-full flex-grow"
            label=" Game Email"
            placeholder="Enter game email"
            name="game_email"
            value={formInputs.game_email}
            onChange={handleChange}
          />
          <Input
            containerClassName="w-full flex-grow"
            label=" Game Password"
            className="w-full"
            placeholder="Enter Game Password"
            name="game_password"
            value={formInputs?.game_password}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label=" Title"
            placeholder="Account Title"
            name="title"
            value={formInputs?.title}
            onChange={handleChange}
          />
          <div className="flex flex-col w-full">
            <label htmlFor="description">Description:</label>

            <Textarea
              value={formInputs?.description}
              onChange={handleChange}
              name="description"
              // label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea "
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label=" Password"
            placeholder="Account Password"
            name="password"
            value={formInputs?.password}
            onChange={handleChange}
          />
          <Input
            containerClassName="w-full flex-grow"
            label=" Price"
            placeholder="Account Price"
            name="price"
            isNumber={true}
            type="number"
            value={formInputs?.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-8 w-full ">
          <AutocompleteWithCondition
            condition={editPlatform}
            onChange={(event: any, newValue: any) => {
              setPlatform_id(newValue?.id);
            }}
            options={platformsState}
            onEditClick={() => {
              setEditPlatform(true);
            }}
            displayTitle={account?.platform?.title}
            buttonTitle={`Edit Platform`}
            label="Platform"
          />
          <AutocompleteWithCondition
            label="Game"
            condition={editGame}
            onChange={(event: any, newValue: any) => {
              setGame_id(newValue?.id);
            }}
            onEditClick={() => {
              setEditGame(true);
            }}
            displayTitle={account?.game?.title}
            buttonTitle={`Edit Game`}
            options={gamesState}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-2 mt-6 ">
          <div className="w-full md:w-6/12 md:m-auto md:mt-0">
            <label>Main Image</label>

            {account.accountImg && (
              <div>
                <Lightbox
                  slides={[
                    {
                      src: account.accountImg,
                      width: 1000,
                      height: 1000,
                    },
                  ]}
                  open={mainIndex >= 0}
                  index={mainIndex}
                  on={{
                    view: ({ index: i }) => {
                      setMainIndex(i);
                    },
                  }}
                  close={() => {
                    setMainIndex(-1);
                  }}
                />
                <div className=" w-full mt-5 mb-2">
                  <div
                    onClick={() => handleMainClick()}
                    className=" w-10/12  cursor-pointer relative  "
                  >
                    <img
                      alt="account"
                      // fill
                      // className="h-full w-full object-cover"
                      src={account.accountImg}
                    />
                  </div>
                </div>
              </div>
            )}

            <FilePond
              files={mainImage}
              onupdatefiles={handleUpdateMainImage}
              allowMultiple={true}
              maxFiles={1}
              acceptedFileTypes={["image/*"]}
              labelIdle='Drag & Drop  Account Main Image or <span class="filepond--label-action">Browse</span>'
            />
          </div>

          <div className="w-full md:w-6/12 md:m-auto md:mt-0">
            <label>
              Gallery <span className="text-gray-500">({5 - imgsState.length} max)</span>
            </label>

            {account.accountImages && (
              <div>
                <Lightbox
                  slides={slides}
                  open={index >= 0}
                  index={index}
                  on={{
                    view: ({ index: i }) => {
                      setIndex(i);
                    },
                  }}
                  close={() => {
                    setIndex(-1);
                  }}
                />
                <div className="grid grid-cols-3 gap-4 mt-5 mb-2">
                  {imgsState.map((image: any, i: number) => (
                    <div
                      onClick={() => handleClick(i)}
                      className=" w-10/12 h-[150px] cursor-pointer relative  "
                      id={image?.id}
                      key={image?.id}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveGalleryImage(image?.id);
                        }}
                        className=" z-10 absolute bg-red-500 text-white p-1 rounded-full top-1 left-1  border-red-700 text-[0.7rem] px-2"
                      >
                        X
                      </button>
                      <Image
                        alt="account"
                        fill
                        className="h-full w-full object-cover"
                        src={image.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <FilePond
              files={gallery}
              onupdatefiles={handleUpdateGallery}
              allowMultiple={true}
              maxFiles={5 - imgsState.length}
              acceptedFileTypes={["image/*"]}
              // name="account_gallery"
              labelIdle='Drag & Drop Account Gallery or <span class="filepond--label-action">Browse</span>'
            />
          </div>
        </div>
        <div className="w-full  text-center mt-8">
          <Button
            disabled={loading}
            className="m-auto bg-slate-900 w-11/12 md:w-9/12 lg:w-6/12 xl:w-4/12 mb-16 py-3"
            type="submit"
          >
            {loading ? (
              <div className="flex justify-center items-center text-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              <p className="md:text-lg">Edit Account</p>
            )}
          </Button>
        </div>
      </form>
    </IsLoading>
  );
}
