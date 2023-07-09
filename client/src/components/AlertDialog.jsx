import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";

const AlertDialog = ({
  open,
  setOpen,
  handleConfirm,
  confirmBtn,
  confirmText,
  confirmTitle,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "header" });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box zIndex={999} position="absolute" display={open ? "block" : "none"}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          {confirmTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around" }}>
          <Button
            onClick={handleClose}
            sx={{ px: 2, bgcolor: "background.main", color: "text.secondary" }}
          >
            {t("cancelBtn")}
          </Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            sx={{ px: 2, bgcolor: "background.main", color: "text.secondary" }}
          >
            {confirmBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
