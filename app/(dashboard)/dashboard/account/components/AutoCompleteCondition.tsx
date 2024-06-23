import { Autocomplete, TextField } from "@mui/material";
import { Textarea, Button as UiButton } from "@nextui-org/react";

export default function AutocompleteWithCondition({
  onChange,
  onEditClick,
  condition,
  options,
  displayTitle,
  buttonTitle,
  label,
}: {
  condition: boolean;
  onChange: any;
  onEditClick: any;
  options: any[];
  displayTitle: string;
  buttonTitle: string;
  label: string;
}) {
  return condition ? (
    <Autocomplete
      className="w-full "
      onChange={onChange}
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  ) : (
    <div className="flex gap-6 items-center w-full">
      <p>{displayTitle ?? ``}</p>
      <UiButton
        onClick={onEditClick}
        variant="faded"
        color="primary"
        className="px-4 py-2 hover:bg-slate-300 hover:text-slate-950"
      >
        {buttonTitle}
      </UiButton>{" "}
    </div>
  );
}

// (event: any, newValue: any) => {
//     setGame_id(newValue?.id);
//   }

// () => {
//     setEditGame(true);
//   }
