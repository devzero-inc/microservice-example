import CartItem from "./CartItem";
import { Stack, Typography } from "@mui/material";
type CartItemType = {
  id: string;
  name: string;
  description: string;
  count: number;
};
export default function CartItems({ cartData, setCartData }) {
  console.log(cartData);
  if (!cartData || Object.keys(cartData) < 1)
    return <Typography>Your cart is empty :(</Typography>;
  const cartArray = [];
  for (const [id, item] of Object.entries(cartData)) {
    cartArray.push(item);
  }
  const cartItems = cartArray.map((item: CartItemType) => (
    <CartItem key={item.id} {...item} setCartData={setCartData} />
  ));
  return <Stack>{cartItems}</Stack>;
}
