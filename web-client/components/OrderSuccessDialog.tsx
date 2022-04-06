import CART_STATUS from "../constants/cartStatus";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import {Dispatch} from "react";

interface OrderSuccessDialogIx {
    cartStatus: string;
    setCartStatus: Dispatch<any>;
}

export default function OrderSuccessDialog({cartStatus, setCartStatus}: OrderSuccessDialogIx) {
    const open = cartStatus === CART_STATUS.ORDER_PLACED;
    const handleClose = () => {
        setCartStatus(CART_STATUS.SHOPPING);
    }
   return(
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{"We got your order!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Close this window to place another.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
) 

}