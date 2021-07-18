import React from "react";
import { Snackbar } from "@material-ui/core";

const Prompt = ({ trigger }) => {
  const [open, setOpen] = React.useState(false);
  if (!trigger) return null;
  setOpen(true);

  const handleClose = (reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={1000}
        message="trying to figure this SnackBar Component"
        onClose={handleClose}
      />
    </div>
  );
};

export default Prompt;
