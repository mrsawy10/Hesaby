import React from "react";
import PropTypes from "prop-types";

import DeleteIcon from "@mui/icons-material/Delete";

function DeleteButton({
  onClick,
  className = ``,
  key = ``,
}: {
  onClick: any;
  className?: string;
  key?: string;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={` delete_btn ${className} focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}
      style={{ backgroundColor: `#E02424` }}
    >
      <DeleteIcon />
    </button>
  );
}

export default DeleteButton;
