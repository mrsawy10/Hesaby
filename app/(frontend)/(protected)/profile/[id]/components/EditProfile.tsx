"use client";

import { Textarea, Button as UiButton } from "@nextui-org/react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Lightbox from "yet-another-react-lightbox"; // , { useLightboxState }
import Button from "@/components/main-button";
import Input from "@/components/ui/input-light";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import * as yup from "yup";

import { editGameAndPlatformSchema, editProfileSchema, editUserSchema } from "@/lib/formSchemas";
import Swal from "sweetalert2";
import { Switch } from "@nextui-org/react";
// import useGeneralStore from "@/store/generalStore";
import useGeneralStore from "@/store/generalStore";
import "filepond/dist/filepond.min.css";
import "yet-another-react-lightbox/styles.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { editProfile } from "@/actions/edit-profile";
import { User } from "@prisma/client";
import { t } from "i18next";

//
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface UserWithUrls extends User {
  profileUrl: string;
  coverUrl: string;
}

export default function EditProfile({ user }: { user: UserWithUrls }) {
  let { generalIsLoading, setGeneralIsLoading } = useGeneralStore();

  const [profileImage, setProfileImage] = useState<any[]>([]);
  const [coverImage, setCoverImage] = useState<any[]>([]);

  const [formInputs, setFormInputs] = useState({
    firstName: user.firstName ?? ``,
    lastName: user.lastName ?? ``,
    bio: user.bio ?? ``,
    email: user.email ?? ``,
    phoneNumber: user.phoneNumber ?? ``,
    iban: user.iban ?? ``,
    card_holder_name: user.card_holder_name ?? ``,
    card_number: user.card_number ?? ``,
  });

  const handleChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfileImage = (fileItems: any) => {
    setProfileImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  const handleUpdateCoverImage = (fileItems: any) => {
    setCoverImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  //
  const [mainIndex, setMainIndex] = useState(-1);
  const [mainIndexCover, setMainIndexCover] = useState(-1);
  const handleMainClick = () => {
    setMainIndex(0);
  };
  const handleCoverClick = () => {
    setMainIndexCover(0);
  };

  // /__________________________________

  return (
    <div>
      <form
        className=" space-y-3"
        action={async (formData: FormData) => {
          try {
            setGeneralIsLoading(true);

            let userData = {
              firstName: formInputs.firstName,
              lastName: formInputs.lastName,
              bio: formInputs.bio,
              phoneNumber: formInputs.phoneNumber,
              id: user.id,
              email: formInputs.email,
              profileImgKey: user?.profileImg,
              coverImgKey: user?.coverImg,
              iban: formInputs.iban,
              card_holder_name: formInputs.card_holder_name,
              card_number: formInputs.card_number,
            };
            profileImage.forEach((image, index) => {
              formData.append(`profileImg`, image);
            });
            coverImage.forEach((image, index) => {
              formData.append(`coverImg`, image);
            });
            editProfileSchema.validateSync({
              ...userData,
              profileImg: Object.fromEntries(formData.entries()).profileImg,
              coverImg: Object.fromEntries(formData.entries()).coverImg,
            });

            //
            formData.delete(`filepond`);
            let updatedUser = await editProfile(userData, formData);
            if (updatedUser) {
              Swal.fire({
                icon: "success",
                title: "Congrats !",
                text: "The User Is Edited Successfully.",
                timer: 20000,
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1800);
            }
            setGeneralIsLoading(false);
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
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label={t("email")}
            placeholder={t("email")}
            name="email"
            value={formInputs?.email}
            onChange={handleChange}
            disabled={user.isEmailVerified}
          />
          <Input
            containerClassName="w-full flex-grow"
            label={t("phone")}
            placeholder={t("phone")}
            name="phoneNumber"
            value={formInputs.phoneNumber}
            disabled={user.isPhoneVerified}
            onChange={handleChange}
            isNumber={true}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label=" IBAN"
            placeholder=" IBAN"
            name="iban"
            onChange={handleChange}
            value={formInputs?.iban}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label={t(`card_holder_name`)}
            placeholder={t("card_holder_name")}
            name="card_holder_name"
            value={formInputs?.card_holder_name}
            //   disabled={true}
            onChange={handleChange}
          />
          <Input
            containerClassName="w-full flex-grow"
            label={t(`card_number`)}
            placeholder={t("card_number")}
            name="card_number"
            isNumber={true}
            value={formInputs?.card_number}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            containerClassName="w-full flex-grow"
            label={t("firstName")}
            placeholder={t("firstName")}
            name="firstName"
            value={formInputs?.firstName}
            //   disabled={true}
            onChange={handleChange}
          />
          <Input
            containerClassName="w-full flex-grow"
            label={t("lastName")}
            placeholder={t("lastName")}
            name="lastName"
            value={formInputs?.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700  dark:text-zinc-400 text-start">{t(`bio`)}</label>
          <Textarea
            value={formInputs?.bio}
            onChange={handleChange}
            name="bio"
            // label="Description"
            labelPlacement="outside"
            placeholder={t(`bio`)}
            className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea "
          />
        </div>
        <div className="w-full flex justify-center mt-8">
          <div className="w-full md:w-5/12 md:m-auto md:mt-0 ">
            <label className="text-center w-full block">{t(`profile_img`)}</label>

            <Lightbox
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
              slides={[
                {
                  src: user.profileUrl,
                  width: 1000,
                  height: 1000,
                },
              ]}
            />
            <div className=" w-full mt-5 mb-2 text-center">
              <div
                onClick={() => handleMainClick()}
                className=" w-10/12  cursor-pointer relative  text-center m-auto"
              >
                <img alt="game" src={user.profileUrl} className="m-auto" />
              </div>
            </div>

            <FilePond
              files={profileImage}
              onupdatefiles={handleUpdateProfileImage}
              allowMultiple={false}
              maxFiles={1}
              //   acceptedFileTypes={["image/png"]}
              labelIdle={t(
                "Drag & Drop  Account profile or <span class='filepond--label-action'>Browse</span>"
              )}
            />
          </div>
          <div className="w-full md:w-5/12 md:m-auto md:mt-0 ">
            <label className="text-center w-full block">{t(`cover_img`)}</label>

            <Lightbox
              open={mainIndexCover >= 0}
              index={mainIndexCover}
              on={{
                view: ({ index: i }) => {
                  setMainIndexCover(i);
                },
              }}
              close={() => {
                setMainIndexCover(-1);
              }}
              slides={[
                {
                  src: user.coverUrl,
                  width: 1000,
                  height: 1000,
                },
              ]}
            />
            <div className=" w-full mt-5 mb-2 text-center">
              <div
                onClick={() => handleCoverClick()}
                className=" w-10/12  cursor-pointer relative  text-center m-auto"
              >
                <img alt="game" src={user.coverUrl} className="m-auto" />
              </div>
            </div>

            <FilePond
              files={coverImage}
              onupdatefiles={handleUpdateCoverImage}
              allowMultiple={false}
              maxFiles={1}
              //   acceptedFileTypes={["image/png"]}
              labelIdle={t(
                "Drag & Drop  Account cover or <span class='filepond--label-action'>Browse</span>"
              )}
              // labelIdle='Drag & Drop Your Image or <span class="filepond--label-action">Browse</span>'
            />
          </div>
        </div>
        <div className="w-full  text-center mt-8">
          <Button
            disabled={generalIsLoading}
            className="m-auto  w-11/12 md:w-9/12 lg:w-6/12 xl:w-4/12 mb-16 py-3"
            type="submit"
          >
            {generalIsLoading ? (
              <div className="flex justify-center items-center text-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              <p className="md:text-lg">Edit Profile</p>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
