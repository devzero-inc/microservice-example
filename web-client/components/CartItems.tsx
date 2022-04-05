import { Dispatch } from "react";
import CartItem from "./CartItem";
import { Stack, Typography } from "@mui/material";
import { CartItemType, CartDataType } from "../pages/index";

type CartArrayType = [] | CartItemType[];
interface CartItemsIx {
  cartData: CartDataType;
  setCartData: Dispatch<any>;
}
export default function CartItems({ cartData, setCartData }: CartItemsIx) {
  if (!cartData || Object.keys(cartData).length < 1)
    return <Typography>Your cart is empty :(</Typography>;

  const cartArray: CartArrayType = [];

  // @ts-ignore
  for (const [id, item] of Object.entries(cartData)) {
    // @ts-ignore
    cartArray.push(item);
  }
  const cartItems = cartArray.map((item: CartItemType) => (
    <CartItem key={item.id} {...item} setCartData={setCartData} />
  ));
  return <Stack>{cartItems}</Stack>;
}
