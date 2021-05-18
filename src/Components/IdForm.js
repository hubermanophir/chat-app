import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { IconButton, Paper } from "@material-ui/core";
import userEvent from "@testing-library/user-event";

export default function IdForm({ user }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(user.uid);
    handleClose();
  };
  console.log(user);
  return (
    <div className='my-id-div'>
      <Button
        className="id-button"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        What's my Id
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Your ID"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{user.uid}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton autoFocus onClick={copyText} color="primary">
            <FileCopyIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
