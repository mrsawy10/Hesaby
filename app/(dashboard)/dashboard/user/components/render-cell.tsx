"use client";

import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Swal from "sweetalert2";
import Image from "next/image";
import {  Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useGeneralStore from "@/store/generalStore";
import { deleteUserAction } from "@/actions/admin/user/delete-user";
import { User } from "@prisma/client";

const BodyComponentRenderFunction = (ele: User) => {
  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);
  let imageUrl;
  try {
    imageUrl = ele?.profileImg ? ele?.profileImg : `/image_placeholder.jpg`;
  } catch (err) {
    console.log(err);
    imageUrl = null;
  }
  // let router = useRouter();
  return (
    <TableRow key={ele.id}>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          {imageUrl && isValidUrl(imageUrl) && (
            <Image
              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 75vw, 50vw"
              fill
              src={imageUrl}
              alt={`user image`}
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>{`${ele?.firstName} ${ele.lastName}  `}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.email}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.phoneNumber ?? ``}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.balance ?? ``}</div>
      </TableCell>

      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              <Tooltip content="Edit " color="secondary">
                <Link href={`/dashboard/user/${ele?.id}`}>
                  <button type="button">
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
                      "Do You Want To Delete This User ?  (all accounts associated will be deleted too)",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                  });

                  if (result.isConfirmed) {
                    // setIsLoading(true);
                    setGeneralIsLoading(true);

                    let deletedUser = await deleteUserAction(ele?.id);
                    // setIsLoading(false);
                    setGeneralIsLoading(false);

                    if (deletedUser) {
                      Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "User has been deleted.",
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
