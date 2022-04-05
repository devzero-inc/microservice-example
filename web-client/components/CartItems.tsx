import CartItem from "./CartItem";
import { List } from "@mui/material";
export default function CartItems({ cartData }) {
  if (!cartData) return null;
  const cartArray = [];
  for (const [id, item] of Object.entries(cartData)) {
  }
  const cartItems = cartArray.map((item) => (
    <CartItem key={item.id} {...item} />
  ));
  console.log(cartArray);
  return <List>{cartItems}</List>;
}
