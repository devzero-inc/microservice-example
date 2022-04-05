import { ListItem, ListItemButton, ListItemText } from "@mui/material";
interface CartItemInterface {
  key: React.Key;
  id: string;
  name: string;
  description: string;
  count: number;
}
export default function CartItem({
  id,
  key,
  name,
  description,
  count,
}: CartItemInterface) {
  const decrementItemInCart = () => {
    console.log("DOWN", id);
  };
  const incrementItemInCart = () => {
    console.log(id);
  };
  return (
    <ListItem sx={{ display: "flex", flexDirection: "row" }}>
      <ListItemText>
        {name} Qty: {count}
      </ListItemText>
      <ListItemButton onClick={decrementItemInCart}>+</ListItemButton>
      <ListItemButton onClick={incrementItemInCart}>-</ListItemButton>
    </ListItem>
  );
}
