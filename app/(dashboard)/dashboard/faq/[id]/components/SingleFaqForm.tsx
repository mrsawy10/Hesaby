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
import Swal from "sweetalert2";
// import { Switch } from "@nextui-org/react";
import useGeneralStore from "@/store/generalStore";
import { Faq } from "@prisma/client";
import { editFaq } from "@/actions/admin/faq";
// import Image from "next/image";

export default function SingleFaqForm(faq: Faq) {
  let { generalIsLoading, setGeneralIsLoading } = useGeneralStore();
  const [formInputs, setFormInputs] = useState({
    question: faq.question,
    answer: faq.answer,
  });

  const handleChange = (e: any) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };
  //
  // <IsLoading loading={loading} className="w-11/12 sm:w-10/12">
  return (
    <form
      action={async (formData: FormData) => {
        setGeneralIsLoading(true);
        try {
          let { question, answer } = Object.fromEntries(formData.entries());

          let updatedFaq = await editFaq({ question: `${question}`, answer: `${answer}` }, faq.id);
          if (updatedFaq) {
            Swal.fire({
              icon: "success",
              title: "Congrats !",
              text: "The Faq Is Edited Successfully.",
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
          label=" Question"
          placeholder="Enter The Question"
          name="question"
          value={formInputs?.question}
          onChange={handleChange}
        />
        <Textarea
          value={formInputs?.answer}
          onChange={handleChange}
          name="answer"
          label="Enter Your Answer"
          labelPlacement="outside"
          placeholder="Enter your Answer"
          className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea "
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
            <p className="md:text-lg">Edit Faq</p>
          )}
        </Button>
      </div>
    </form>
  );
}
