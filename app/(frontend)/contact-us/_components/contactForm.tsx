"use client";

import Input from "@/components/ui/input-light";
import React from "react";
import { Textarea } from "@nextui-org/react";
import Button from "@/components/main-button";
import { SiteData } from "@prisma/client";
import { getDataValue } from "@/lib/utils";
import { t } from "i18next";
import contactUsAction from "@/actions/contactUsAction";
import { contactUsSchema } from "@/lib/formSchemas";
import Swal from "sweetalert2";
import useGeneralStore from "@/store/generalStore";
import * as yup from "yup";
import { useRouter } from "next/navigation";

function ContactForm({ contactData }: { contactData: SiteData[] }) {
  let { generalIsLoading, setGeneralIsLoading } = useGeneralStore();
  let router = useRouter();
  return (
    <section className="bg-white dark:bg-zinc-900 mb-12 rounded-md">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          {getDataValue(contactData, `contact_sec1_title`)}
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          {getDataValue(contactData, `contact_sec1_desc`)}
        </p>
        <form
          action={async (formData: FormData) => {
            try {
              setGeneralIsLoading(true);

              let { email, subject, description } = Object.fromEntries(formData.entries());
              let contactData = {
                userEmail: email as string,
                subject: subject as string,
                message: description as string,
              };
              console.log(contactData);
              contactUsSchema.validateSync(contactData, { abortEarly: false });
              let msgSent = await contactUsAction(contactData);
              if (msgSent) {
                Swal.fire({
                  icon: "success",
                  title: "Congrats !",
                  text: "Your message has been sent to the admins. We will reply as soon as possible.",
                  timer: 20000,
                  showConfirmButton: false,
                });

                setTimeout(() => {
                  window.location.href = `/`;
                }, 1900);
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
          className="space-y-8"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t(`Your email`)}
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              //   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t(`Subject`)}
            </label>
            <Input
              type="text"
              name="subject"
              id="subject"
              placeholder={t("msg_subject")}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              {t(`Your message`)}
            </label>
            <Textarea
              name="description"
              labelPlacement="outside"
              placeholder={t("Let us know how we can help you")}
              className=" md:w-full border-none-child-textarea outline-none-child-textarea w-full-none-child-textarea h-full-child-textarea dark:text-white "
            />
          </div>
          <Button type="submit" className="m-auto py-2 px-5 w-full lg:w-1/2 ">
            {t(`Send message`)}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
