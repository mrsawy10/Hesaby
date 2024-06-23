"use client";

import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Image from "next/image";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { deleteGameAction } from "@/actions/admin/game/deleteGame";
import LoadingComponent from "@/components/is-loading";
import Swal from "sweetalert2";

import { useState } from "react";
import useGeneralStore from "@/store/generalStore";
import Link from "next/link";

//

const BodyComponentRenderFunction = (ele: {
  gameImg: string;
  title: string;
  description: string;
  id: string;
  isFeatured: any;
}) => {
  //

  // console.log(`gamer render cell =>=>`, ele);
  let imageUrl;
  try {
    imageUrl = ele?.gameImg ? ele?.gameImg : `/image_placeholder.jpg`;
  } catch (err) {
    console.log(err);
    imageUrl = null;
  }
  const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);

  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  return (
    <TableRow key={ele.id}>
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
        <div>{ele?.isFeatured ? "✔️" : "❌"}</div>
      </TableCell>

      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              {/* <LoadingComponent loading={isLoading} /> */}
              <Tooltip content="Edit " color="secondary">
                <Link href={`/dashboard/game/${ele?.id}`}>
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
                    title:
                      "Do You Want To Delete The Game ?  (all accounts associated will be deleted too)",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                  });

                  if (result.isConfirmed) {
                    // setIsLoading(true);
                    setGeneralIsLoading(true);

                    let deletedGame = await deleteGameAction(ele?.id);
                    // setIsLoading(false);
                    setGeneralIsLoading(false);

                    if (deletedGame) {
                      Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your file has been deleted.",
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
