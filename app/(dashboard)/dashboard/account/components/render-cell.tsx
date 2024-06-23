"use client";

import { Button, Input, TableCell, TableRow } from "@nextui-org/react";
import Image from "next/image";
import { User, Tooltip, Chip } from "@nextui-org/react";
import { DeleteIcon } from "@/components/icons/table/delete-icon";
import { EditIcon } from "@/components/icons/table/edit-icon";
import { isValidUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import LoadingComponent from "@/components/is-loading";
import { useState } from "react";
import { deleteAccountAction } from "@/actions/admin/account/delete-account";
import truncateText from "@/lib/tranculateText";
import Link from "next/link";

type BodyComponentProps = {
  description: string;
  username: string;
  email: string;
  password: string;
  price: string | number;
  accountImg: string;
  title: string;
  platform: { title: string };
  game: { title: string };
  status: string;
  id: string;
  seller: any;
  isFeatured: any;
};
const BodyComponentRenderFunction: React.FunctionComponent<BodyComponentProps> = (ele) => {
  let imageUrl;
  try {
    imageUrl = ele?.accountImg ? ele?.accountImg : ``;
  } catch (err) {
    console.log(err);
    imageUrl = null;
  }
  //
  const [isLoading, setIsLoading] = useState(false);
  //

  const router = useRouter();
  return (
    // <LoadingComponent loading={isLoading}>
    <TableRow>
      <TableCell>
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          {imageUrl && isValidUrl(imageUrl) && (
            <Image
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
              fill
              src={imageUrl}
              alt={`platform image`}
            />
          )}
        </div>
      </TableCell>
      <TableCell>
        <div>{truncateText(ele?.title, 20)}</div>
      </TableCell>
      <TableCell>
        <div>{truncateText(ele?.description, 20)}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.platform?.title ?? ``}</div>
      </TableCell>
      <TableCell>
        <div>{ele?.game?.title ?? ``}</div>
      </TableCell>
      <TableCell>
        <Chip
          size="sm"
          variant="flat"
          color={
            ele?.status === "accepted"
              ? "success"
              : ele?.status === "declined"
              ? "danger"
              : ele?.status === "sold"
              ? `primary`
              : "warning"
          }
        >
          <span className="capitalize text-xs">{ele?.status}</span>
        </Chip>
        {/* <div>{ele?.status ?? ``}</div> */}
      </TableCell>

      <TableCell>
        <Link href={`/dashboard/user/${ele?.seller?.id}`}>
          <div>{`${ele.seller.firstName} ${ele.seller.lastName}`}</div>
        </Link>
      </TableCell>

      <TableCell>
        <div>{ele?.isFeatured ? "✔️" : "❌"}</div>
      </TableCell>

      <TableCell>
        <div>
          <div className="flex items-center gap-4 ">
            <div>
              <Tooltip content="Edit " color="secondary">
                <Link href={`/dashboard/account/${ele?.id}`}>
                  <button>
                    <EditIcon size={20} fill="#979797" />
                  </button>
                </Link>
              </Tooltip>
            </div>
            <form
              action={async () => {
                try {
                  let result = await Swal.fire({
                    title: "Do You Want To Delete The Account?",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                  });

                  if (result.isConfirmed) {
                    setIsLoading(true);

                    let deleteAccount = await deleteAccountAction(ele?.id);
                    setIsLoading(false);

                    if (deleteAccount) {
                      Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        timer: 2000,
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
              <LoadingComponent loading={isLoading} />
              <Tooltip content="Delete " color="danger" onClick={() => console.log("Delete ")}>
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
    // </LoadingComponent>
  );
};

export default BodyComponentRenderFunction;
