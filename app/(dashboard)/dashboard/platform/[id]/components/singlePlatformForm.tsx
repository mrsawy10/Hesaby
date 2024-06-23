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
import { editGameAndPlatformSchema } from "@/lib/formSchemas";
import Swal from "sweetalert2";
import { editGame } from "@/actions/admin/game/editGame";
import { editPlatform } from "@/actions/admin/platform/editPlatform";
import Image from "next/image";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function SinglePlatformForm({ platform }: any) {
  //
  const [loading, setLoading] = useState(false);

  const [formInputs, setFormInputs] = useState({
    title: platform.title,
    description: platform.description,
  });

  const handleChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  //
  const [mainImage, setMainImage] = useState<any[]>([]);
  //

  //

  const handleUpdateMainImage = (fileItems: any) => {
    setMainImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  //
  const [mainIndex, setMainIndex] = useState(-1);
  const handleMainClick = () => {
    setMainIndex(0);
  };

  // <IsLoading loading={loading} className="w-11/12 sm:w-10/12">
  return (
    <form
      onSubmit={() => {
        setLoading(true);
      }}
      action={async (formData: FormData) => {
        if (loading) return;
        try {
          let { title, description } = Object.fromEntries(formData.entries());
          editGameAndPlatformSchema.validateSync({ title, description, image: mainImage[0] });
          mainImage.forEach((image, index) => {
            formData.append(`mainImage`, image);
          });
          formData.append(`platformImgName`, platform.gameImg);
          formData.delete("filepond");
          let updatedPlatform = await editPlatform(formData, platform.id);
          if (updatedPlatform) {
            Swal.fire({
              icon: "success",
              title: "Congrats !",
              text: "The Platform Is Edited Successfully.",
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
      className="flex flex-col gap-4 w-11/12 md:w-6/12"
    >
      <IsLoading loading={loading} className="w-11/12 sm:w-10/12" />

      <div className="flex flex-col  gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" Title"
          placeholder="Account Title"
          name="title"
          value={formInputs?.title}
          onChange={handleChange}
        />
        <Textarea
          value={formInputs?.description}
          onChange={handleChange}
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea "
        />
      </div>

      <div className="w-full md:w-6/12 md:m-auto md:mt-0 ">
        <label className="text-center w-full block">Platform Image</label>

        <div>
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
                src: platform.imageUrl,
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
              <img
                alt="platform"
                // fill
                // className="h-full w-full object-cover"
                src={platform.imageUrl}
              />
            </div>
          </div>
        </div>

        <FilePond
          files={mainImage}
          onupdatefiles={handleUpdateMainImage}
          allowMultiple={false}
          maxFiles={1}
          acceptedFileTypes={["image/png"]}
          labelIdle='Drag & Drop Your Image or <span class="filepond--label-action">Browse</span>'
        />
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
  );
}
