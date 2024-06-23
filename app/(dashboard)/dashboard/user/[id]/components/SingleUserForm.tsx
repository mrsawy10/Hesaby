"use client";

import * as yup from "yup";
import { Textarea, Button as UiButton } from "@nextui-org/react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Lightbox from "yet-another-react-lightbox"; // , { useLightboxState }
import Button from "@/components/main-button";
import Input from "@/components/ui/input-light";
// import IsLoading from "@/components/is-loadi[ng";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useState } from "react";
import IsLoading from "@/components/is-loading";
import { editGameAndPlatformSchema, editUserSchema } from "@/lib/formSchemas";
import Swal from "sweetalert2";
import { Switch } from "@nextui-org/react";
import { editGame } from "@/actions/admin/game/editGame";
import Image from "next/image";
import useGeneralStore from "@/store/generalStore";
import { editUser } from "@/actions/admin/user/edit-user";
import { User } from "@prisma/client";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// _________________________

interface UserWithUrls extends User {
  profileUrl: string;
  coverUrl: string;
}

// _________________
export default function SingleUserForm({ user }: { user: UserWithUrls }) {
  let { generalIsLoading, setGeneralIsLoading } = useGeneralStore();
  const [isBlocked, setIsBlocked] = useState<boolean>(!!user?.isBlocked);
  const [isWithdrawRequested, setIsWithdrawRequested] = useState<boolean>(
    !!user?.isWithdrawRequested
  );
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(!!user?.isEmailVerified);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(!!user?.isPhoneVerified);
  const [profileImage, setProfileImage] = useState<any[]>([]);
  const [coverImage, setCoverImage] = useState<any[]>([]);

  // console.log({ user });

  const [formInputs, setFormInputs] = useState({
    firstName: user.firstName ?? ``,
    lastName: user.lastName ?? ``,
    email: user.email ?? ``,
    phoneNumber: user.phoneNumber ?? ``,
    bio: user.bio ?? ``,
    iban: user.iban ?? ``,
    password: `` ?? ``,
    card_holder_name: user.card_holder_name ?? ``,
    card_number: user.card_number ?? ``,
  });

  const handleChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  //

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

  // <IsLoading loading={loading} className="w-11/12 sm:w-10/12">
  return (
    <form
      action={async (formData: FormData) => {
        try {
          setGeneralIsLoading(true);

          let userData = {
            firstName: formInputs.firstName,
            lastName: formInputs.lastName,
            bio: formInputs.bio,
            password: formInputs.password,
            isBlocked,
            isWithdrawRequested,
            phoneNumber: formInputs.phoneNumber,
            isEmailVerified,
            isPhoneVerified,
            id: user.id,
            email: formInputs.email,
            profileImgKey: user?.profileImg,
            coverImgKey: user?.coverImg,
            iban: formInputs.iban,
            card_holder_name: formInputs.card_holder_name ?? ``,
            card_number: formInputs.card_number ?? ``,
          };
          profileImage.forEach((image, index) => {
            formData.append(`profileImg`, image);
          });
          coverImage.forEach((image, index) => {
            formData.append(`coverImg`, image);
          });
          editUserSchema.validateSync({
            ...userData,
            profileImg: Object.fromEntries(formData.entries()).profileImg,
            coverImg: Object.fromEntries(formData.entries()).coverImg,
          });
          //
          formData.delete(`filepond`);
          //   console.log({ formData: Object.fromEntries(formData.entries()) });
          //

          let updatedUser = await editUser(userData, formData);
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
      className="flex flex-col gap-4 w-11/12 md:w-6/12"
    >
      <IsLoading loading={generalIsLoading} className="w-11/12 sm:w-10/12" />

      <div className="flex flex-col  gap-2 w-full mb-3">
        <Switch
          // defaultSelected
          isSelected={isWithdrawRequested}
          onClick={() => {
            setIsWithdrawRequested((p) => !p);
          }}
          aria-label="The Game Is Featured (This Will Show It On The Front Page)"
        >
          <p className="text-center capitalize text-black dark:text-gray-200">
            The user Request a withdraw For his balance
          </p>
        </Switch>
      </div>
      <div className="flex flex-col  gap-2 w-full my-3">
        <Switch
          // defaultSelected
          isSelected={isBlocked}
          onClick={() => {
            setIsBlocked((p) => !p);
          }}
          aria-label="The Game Is Featured (This Will Show It On The Front Page)"
        >
          <p className="text-center capitalize text-black dark:text-gray-200">
            The user is blocked{` `}
            <span className="text-sm">
              (This Will disable the user to buy or sell on the website)
            </span>
          </p>
        </Switch>
      </div>
      <div className="flex flex-col  gap-2 w-full my-3">
        <Switch
          // defaultSelected
          isSelected={isEmailVerified}
          onClick={() => {
            setIsEmailVerified((p) => !p);
          }}
          aria-label="The Game Is Featured (This Will Show It On The Front Page)"
        >
          <p className="text-center capitalize text-black dark:text-gray-200">
            The user Email is verified{` `}
            <span className="text-sm">(user can`t buy or sell without verifying his account`)</span>
          </p>
        </Switch>
      </div>
      <div className="flex flex-col  gap-2 w-full my-3">
        <Switch
          // defaultSelected
          isSelected={isPhoneVerified}
          onClick={() => {
            setIsPhoneVerified((p) => !p);
          }}
          aria-label="The Game Is Featured (This Will Show It On The Front Page)"
        >
          <p className="text-center capitalize text-black dark:text-gray-200">
            The user phone is verified{` `}
            <span className="text-sm">(user can`t buy or sell without verifying his phone`)</span>
          </p>
        </Switch>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" IBAN"
          placeholder="User IBAN"
          name="iban"
          onChange={handleChange}
          value={formInputs?.iban}
          // disabled={tru/e}
        />
        <Input
          containerClassName="w-full flex-grow"
          label="User Current Balance"
          placeholder="User Balance"
          //   name="balance"
          value={user.balance}
          disabled={true}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" Card Holder name"
          placeholder="Card Holder name"
          name="card_holder_name"
          value={formInputs?.card_holder_name}
          onChange={handleChange}
        />
        <Input
          containerClassName="w-full flex-grow"
          label=" Card Number"
          placeholder="Card Number"
          name="card_number"
          value={formInputs?.card_number}
          onChange={handleChange}
          isNumber={true}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" Email"
          placeholder="User Email"
          name="email"
          value={formInputs?.email}
          onChange={handleChange}
          disabled={isEmailVerified}
        />
        <Input
          containerClassName="w-full flex-grow"
          label="User Phone Number"
          placeholder="User Phone Number"
          name="phoneNumber"
          value={formInputs.phoneNumber}
          disabled={isPhoneVerified}
          onChange={handleChange}
          isNumber={true}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label="User Password "
          placeholder="Password"
          name="password"
          value={formInputs.password}
          // disabled={isPhoneVerified}
          onChange={handleChange}
          // isNumber={true}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" Total Earnings"
          placeholder="Total Earnings"
          //   name="earnings"
          value={user?.earnings}
          disabled={true}
        />
        <Input
          containerClassName="w-full flex-grow"
          label=" Total Number Of Done Deals"
          placeholder="Deals"
          //   name="numberOfDeals"
          value={user?.numberOfDeals}
          disabled={true}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" First Name"
          placeholder="User First Name"
          name="firstName"
          value={formInputs?.firstName}
          //   disabled={true}
          onChange={handleChange}
        />
        <Input
          containerClassName="w-full flex-grow"
          label=" Last Name"
          placeholder="User Last Name"
          name="lastName"
          value={formInputs?.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col  gap-2">
        <label className="text-gray-700  dark:text-gray-200">User Bio</label>
        <Textarea
          value={formInputs?.bio}
          onChange={handleChange}
          name="bio"
          // label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea "
        />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-5/12 md:m-auto md:mt-0 ">
          <label className="text-center w-full block">Profile Image</label>

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
            labelIdle='Drag & Drop Your Image or <span class="filepond--label-action">Browse</span>'
          />
        </div>
        <div className="w-full md:w-5/12 md:m-auto md:mt-0 ">
          <label className="text-center w-full block">Cover Image</label>

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
            labelIdle='Drag & Drop Your Image or <span class="filepond--label-action">Browse</span>'
          />
        </div>
      </div>
      <div className="w-full  text-center mt-8">
        <Button
          disabled={generalIsLoading}
          className="m-auto bg-slate-900 w-11/12 md:w-9/12 lg:w-6/12 xl:w-4/12 mb-16 py-3"
          type="submit"
        >
          {generalIsLoading ? (
            <div className="flex justify-center items-center text-center">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            <p className="md:text-lg">Edit User</p>
          )}
        </Button>
      </div>
    </form>
  );
}
