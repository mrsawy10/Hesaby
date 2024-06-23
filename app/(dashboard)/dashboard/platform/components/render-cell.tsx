"use client";

import react, { useState } from "react";
import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Image from "next/image";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import LoadingComponent from "@/components/is-loading";
import { deletePlatformAction } from "@/actions/admin/platform/deletePlatform";
import useGeneralStore from "@/store/generalStore";

const BodyComponentRenderFunction = (ele: {
  platformImg: string;
  title: string;
  description: string;
  id: string;
}) => {
  let imageUrl;
  try {
    imageUrl = ele?.platformImg ? ele?.platformImg : `/image_placeholder.jpg`;
  } catch (err) {
    console.log(err);
    imageUrl = null;
  }
  // const [isLoading, setIsLoading] = useState(false);
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  let router = useRouter();
  return (
    <TableRow>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
        {imageUrl && isValidUrl(imageUrl) ? (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              fill
              src={imageUrl}
              alt={`game image`}
            />
          ) : (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              fill
              src={`/image_placeholder.jpg`}
              alt={`game image`}
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>{ele?.title}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.description}</div>
      </TableCell>
      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              <Tooltip content="Edit " color="secondary">
                <button
                  onClick={() => {
                    router.push(`/dashboard/platform/${ele?.id}`);
                    // console.log("Edit ");
                  }}
                >
                  <EditIcon size={20} fill="#979797" />
                </button>
              </Tooltip>
            </div>
            <form
              action={async () => {
                try {
                  let result = await Swal.fire({
                    title:
                      "Do You Want To Delete The Platform ? (all accounts associated will be deleted too)",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                  });

                  if (result.isConfirmed) {
                    setGeneralIsLoading(true);

                    let deletedPlatform = await deletePlatformAction(ele?.id);
                    setGeneralIsLoading(false);

                    if (deletedPlatform) {
                      Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "the Platform has been deleted.",
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

              <Tooltip content="Delete " color="danger" onClick={() => console.log("Delete ")}>
                <button>
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
