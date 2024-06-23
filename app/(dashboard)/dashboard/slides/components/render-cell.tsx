"use client";

import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Image from "next/image";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/is-loading";
import Swal from "sweetalert2";

import { useState } from "react";
import useGeneralStore from "@/store/generalStore";
import Link from "next/link";
import { deleteSlide } from "@/actions/admin/slide";

//

const BodyComponentRenderFunction = (ele: {
  imageUrl: string;
  titleImageUrl: string;
  btnTxt: string;
  id: string;
  btnUrl: any;
}) => {
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  return (
    <TableRow key={ele.id}>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
            fill
            src={ele.imageUrl && isValidUrl(ele.imageUrl) ? ele.imageUrl : `/image_placeholder.jpg`}
            alt={`Slide image`}
            className={`object-cover`}
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          <Image
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
            fill
            src={
              ele.titleImageUrl && isValidUrl(ele.titleImageUrl)
                ? ele.titleImageUrl
                : `/image_placeholder.jpg`
            }
            className={`object-cover`}
            alt={`Slide Title Image`}
          />
        </div>{" "}
      </TableCell>
      <TableCell>
        <div>{ele?.btnTxt}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.btnUrl}</div>
      </TableCell>

      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              {/* <LoadingComponent loading={isLoading} /> */}
              <Tooltip content="Edit " color="secondary">
                <Link href={`/dashboard/slides/${ele?.id}`}>
                  <button>
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Link>
              </Tooltip>
            </div>
            <form
              action={async () => {
                console.log(`delete ${ele?.id}`);
                try {
                  let result = await Swal.fire({
                    title: "Do You Want To Delete The Slide ?",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                  });

                  if (result.isConfirmed) {
                    // setIsLoading(true);
                    setGeneralIsLoading(true);

                    let deleted = await deleteSlide(ele?.id);
                    // setIsLoading(false);
                    setGeneralIsLoading(false);

                    if (deleted) {
                      Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your S;ide has been deleted.",
                        timer: 20000,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1800);
                    }
                  }
                } catch (e) {
                  console.log(e);
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong (Please Refresh and try again)!",
                  });
                }
              }}
            >
              <Tooltip content="Delete " color="danger">
                <button type="submit">
                  <DeleteIcon size={20} fill="#FF0080" />
                </button>
              </Tooltip>
            </form>
          </div>
          {/*  */}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BodyComponentRenderFunction;
