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
  
  export const AddNew = ({
    label,
    inputs,
    tableName,
    addOpt,
  }: {
    label: string;
    addOpt?: any;
    tableName: TableName;
    inputs: { name: string; title: string; type: string; multiple?: boolean }[];
  }) => {
    // _
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // _
  
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
                    action={addNewAction.bind(null, tableName)}
                    onSubmit={async (e) => {
                      const formValues = getFormInputValues(
                        e.target as HTMLFormElement,
                        inputs?.map((i) => i?.name)
                      );
  
                      if (Object.values(formValues).some((v) => !v || v?.length === 0)) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "All Fields Are Required !",
                        });
                        e.preventDefault();
                        return;
                      }
                      addOpt(formValues);
                      onClose();
                    }}
                  >
                    <ModalHeader className="flex flex-col gap-1 "> {label}</ModalHeader>
                    <ModalBody>
                      {inputs.map((input) => {
                        return (
                          <InputLight
                            key={input?.name}
                            placeholder={input?.title}
                            type={input?.type}
                            name={input?.name}
                            multiple={input?.multiple ? input.multiple : false}
                          />
                        );
                      })}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onClick={onClose} className="p-2 px-3">
                        Close
                      </Button>
                      <Button color="primary" type="submit" className="p-2 px-3">
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
  