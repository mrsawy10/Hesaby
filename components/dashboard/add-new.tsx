import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import InputLight from "@/components/ui/input-light";
import { getFormInputValues, getFormData } from "@/lib/utils";
import Swal from "sweetalert2";
import addNewSubmitHandler from "@/lib/addNewSubmitHandler";
import addNewAction from "@/actions/admin/addNew";
import TableName from "@/types/table-names";
import { Select, SelectItem } from "@nextui-org/select";
import useGeneralStore from "@/store/generalStore";

export const AddNew = ({
  label,
  inputs,
  tableName,
}: // addOpt,
{
  label: string;
  // addOpt?: any;
  tableName: TableName;
  inputs: { name: string; title: string; type: string; multiple?: boolean }[];
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let setGeneralIsLoading = useGeneralStore((s) => s.setGeneralIsLoading);

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary" className="p-3">
          {label}
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <form
                  id="add-new-form"
                  action={async (formData: FormData) => {
                    // console.log(`add new form data`, formData);
                    try {
                      if (
                        // Object.values(Object.fromEntries(formData.entries())).some((v: any) => {
                        //   console.log(v);
                        //   return !v || v?.length === 0;
                        // })
                        Object.entries(Object.fromEntries(formData.entries())).some(
                          ([key, value]: any) =>
                            key !== "description" && (!value || value.length === 0)
                        )
                      ) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "All Fields Are Required !",
                        });
                        return;
                      }
                      onClose();
                      setGeneralIsLoading(true);
                      await addNewAction(tableName, formData);
                      setGeneralIsLoading(false);

                      Swal.fire({
                        icon: "success",
                        title: "Created Successfully!",
                        // text: "the Platform has been deleted.",
                        timer: 20000,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1800);
                    } catch (err) {
                      setGeneralIsLoading(false);

                      console.log(err);
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong (Please Refresh and try again)!",
                      });
                    }
                  }}
                >
                  <ModalHeader className="flex flex-col gap-1 "> {label}</ModalHeader>
                  <ModalBody>
                    {inputs.map((input) => {
                      return (
                        <>
                          {input?.type == `file` && <label>{input?.title}</label>}
                          <InputLight
                            key={input?.name}
                            placeholder={input?.title}
                            type={input?.type}
                            name={input?.name}
                            multiple={input?.multiple ? input.multiple : false}
                          />
                        </>
                      );
                    })}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      id="add-new-form"
                      form="add-new-form"
                      color="danger"
                      variant="flat"
                      // onClick={onClose}

                      className="p-2 px-3"
                    >
                      Close
                    </Button>
                    <Button form="add-new-form" color="primary" type="submit" className="p-2 px-3">
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default AddNew;
