import { IconButton, Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Dispatch } from "react";
interface CartItemInterface {
  id: string;
  name: string;
  description: string;
  count: number;
  setCartData: Dispatch<any>;
}
export default function CartItem({
  id,
  name,
  description,
  count,
  setCartData,
}: CartItemInterface) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <IconButton
        onClick={() =>
          setCartData({
            type: "DECREMENT",
            data: { id, name, description, count },
          })
        }
      >
        <RemoveIcon />
      </IconButton>
      <Typography>
        {name} Qty: {count}
      </Typography>
      <IconButton
        onClick={() =>
          setCartData({
            type: "INCREMENT",
            data: { id, name, description, count },
          })
        }
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
