"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import InputLight from "@/components/ui/input-light";
import Button from "@/components/main-button";
import useGeneralStore from "@/store/generalStore";
import controlSiteData from "@/actions/admin/controlSiteData";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Main({ structure, pageTitle }: { pageTitle: string; structure: any[] }) {
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  let [content, setContent] = useState(
    structure
      .filter((ele) => ele?.name && ele?.name?.includes(`content`))
      .map((e) => ({ identifier: e.name, value: e.defaultValue }))
  );

  const updateContent = (identifier: string, value: string) => {
    setContent((prev) => [
      ...prev.filter((e) => e.identifier !== identifier),
      { identifier, value },
    ]);
  };

  return (
    <div className="container">
      <h1 className="text-2xl m-auto text-center mt-10">{pageTitle}</h1>
      <form
        action={async (formData: FormData) => {
          try {
            setGeneralIsLoading(true);

            console.log(`++++----->>>>>>>`, { content });
            content?.forEach((ele) => {
              formData.append(ele.identifier, `${ele.value}`);
            });

            const formDataObject = Object.fromEntries(formData.entries());

            console.log(`formDataObject =====--->>`, { formDataObject });
            if (Object.values(formDataObject).some((v: any) => !v || v?.length === 0)) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "All Fields Are Required !",
              });
              setGeneralIsLoading(false);
              return;
            } else {
              // control logic

              for (let key in formDataObject) {
                const value = formDataObject[key];
                console.log(key);
                if (value instanceof File && (!value.name || !value.size)) {
                  formData.delete(key);
                }
              }

              await controlSiteData(formData);
              setGeneralIsLoading(false);
              Swal.fire({
                icon: "success",
                title: "Updated Successfully!",
                timer: 4000,
                allowOutsideClick: false,
                showConfirmButton: false,
              });
              setTimeout(() => {
                window.location.reload();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }, 2000);
            }
          } catch (error: any) {
            setGeneralIsLoading(false);
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong (Please Refresh and try again)!",
            });
          }
        }}
      >
        <div className="flex flex-col gap-y-8">
          {structure.map((item: any, index: any) => {
            switch (item.element) {
              case "label":
                return <label key={index}>{item?.text}</label>;
              case "input":
                if (item?.type == `file`) {
                  return (
                    <div
                      className={cn(
                        "flex gap-8 w-full justify-between items-center",
                        item?.fileContainerClassName ?? ``
                      )}
                    >
                      <InputLight
                        containerClassName={cn("w-full", item?.className ?? `unique__`)}
                        // defaultValue={item?.defaultValue ?? ``}

                        key={item?.name}
                        placeholder={item?.title}
                        type={item?.type}
                        name={item?.name}
                        multiple={item?.multiple ? item.multiple : false}
                      />
                      {item?.defaultValue && (
                        <Image width={200} height={150} src={item?.defaultValue} alt={item?.name} />
                      )}
                    </div>
                  );
                }
                if (item?.type == `editor`) {
                  return (
                    <ReactQuill
                      theme="snow"
                      // style={{direction:`rtl`}}
                      value={content?.find((e) => e.identifier == item.name)?.value ?? ``}
                      onChange={(v) => {
                        console.log(`------______------>>>`, v);
                        updateContent(item.name, v);
                      }}
                    />
                  );
                }
                return (
                  <InputLight
                    containerClassName={cn("w-full", item?.className ?? `unique__`)}
                    defaultValue={item?.defaultValue ?? ``}
                    key={item?.name}
                    placeholder={item?.title}
                    type={item?.type}
                    name={item?.name}
                    multiple={item?.multiple ? item.multiple : false}
                  />
                );
              case "hr":
                return <hr />;
              default:
                return <div>Wrong element type</div>;
            }
          })}
          <Button type="submit" className="lg:w-1/2 xl:w-3/12 m-auto lg:py-1 mb-36">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Main;
