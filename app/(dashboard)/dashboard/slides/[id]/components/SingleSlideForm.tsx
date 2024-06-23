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
import { slideSchema } from "@/lib/formSchemas";
import Swal from "sweetalert2";
import { Switch } from "@nextui-org/react";
import Image from "next/image";
import useGeneralStore from "@/store/generalStore";
import { Slide } from "@prisma/client";
import { editSlide } from "@/actions/admin/slide";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface Props extends Slide {
  imageUrl: string;
  titleImageUrl: string;
}

export default function SingleSlideForm(slide: Props) {
  let { generalIsLoading, setGeneralIsLoading } = useGeneralStore();

  const [formInputs, setFormInputs] = useState({
    btnTxt: slide.btnTxt,
    btnUrl: slide.btnUrl,
  });

  const handleChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  //
  const [mainImage, setMainImage] = useState<any[]>([]);

  const handleUpdateMainImage = (fileItems: any) => {
    setMainImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  const [mainIndex, setMainIndex] = useState(-1);
  const handleMainClick = () => {
    setMainIndex(0);
  };
  //

  const [titleImage, setTitleImage] = useState<any[]>([]);

  const handleUpdateTitleImage = (fileItems: any) => {
    setTitleImage(fileItems.map((fileItem: any) => fileItem.file));
  };
  const [titleIndex, setTitleIndex] = useState(-1);
  const handleTitleClick = () => {
    setTitleIndex(0);
  };
  //

  // <IsLoading loading={loading} className="w-11/12 sm:w-10/12">
  return (
    <form
      action={async (formData: FormData) => {
        try {
          setGeneralIsLoading(true);
          mainImage[0] && formData.append(`image`, mainImage[0]);
          formData.append(`imageName`, slide.image);
          //
          titleImage[0] && formData.append(`titleImage`, titleImage[0]);
          formData.append(`titleImageName`, slide.titleImage);
          //
          slideSchema.validateSync({
            btnTxt: formInputs.btnTxt,
            btnUrl: formInputs.btnUrl,
            image: mainImage[0],
            titleImage: titleImage[0],
          });
          //
          //
          formData.delete("filepond");
          console.log(Object.fromEntries(formData.entries()));
          let updatedSlide = await editSlide(formData, slide.id);
          if (updatedSlide) {
            Swal.fire({
              icon: "success",
              title: "Congrats !",
              text: "The Slide Is Edited Successfully.",
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
      <div className="flex flex-col  gap-2">
        <Input
          containerClassName="w-full flex-grow"
          label=" Button Text"
          placeholder=" Button Text"
          name="btnTxt"
          value={formInputs?.btnTxt}
          onChange={handleChange}
        />

        <Input
          containerClassName="w-full flex-grow"
          label=" Button Url"
          placeholder=" Button Url"
          name="btnUrl"
          value={formInputs?.btnUrl}
          onChange={handleChange}
        />
      </div>

      <div className="w-full md:w-6/12 md:m-auto md:mt-0 ">
        <label className="text-center w-full block">Slide Image</label>

        <div>
          <Lightbox
            noScroll={{ disabled: true }}
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
                src: slide.imageUrl,
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
                alt="slide"
                // fill
                // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                // className="h-full w-full object-cover"
                src={slide.imageUrl}
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
      <div className="w-full md:w-6/12 md:m-auto md:mt-0 ">
        <label className="text-center w-full block">Slide Title Image</label>

        <div>
          <Lightbox
            noScroll={{ disabled: true }}
            open={titleIndex >= 0}
            index={titleIndex}
            on={{
              view: ({ index: i }) => {
                setTitleIndex(i);
              },
            }}
            close={() => {
              setTitleIndex(-1);
            }}
            slides={[
              {
                src: slide.titleImageUrl,
                width: 1000,
                height: 1000,
              },
            ]}
          />
          <div className=" w-full mt-5 mb-2 text-center">
            <div
              onClick={() => handleTitleClick()}
              className=" w-10/12  cursor-pointer relative  text-center m-auto"
            >
              <img
                alt="slide"
                // fill
                // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                // className="h-full w-full object-cover"
                src={slide.titleImageUrl}
              />
            </div>
          </div>
        </div>

        <FilePond
          files={titleImage}
          onupdatefiles={handleUpdateTitleImage}
          allowMultiple={false}
          maxFiles={1}
          acceptedFileTypes={["image/png"]}
          labelIdle='Drag & Drop Your Image or <span class="filepond--label-action">Browse</span>'
        />
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
            <p className="md:text-lg">Edit Slide</p>
          )}
        </Button>
      </div>
    </form>
  );
}
