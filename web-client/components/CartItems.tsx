import CartForm from "./CartForm";
import { Dispatch } from "react";
import CartItem from "./CartItem";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { CartItemType, CartDataType } from "../pages/index";

export type CartArrayType = [] | CartItemType[];
interface CartItemsIx {
  cartData: CartDataType;
  setCartData: Dispatch<any>;
  setCartStatus: Dispatch<any>;
}

export default function CartItems({ cartData, setCartData, setCartStatus }: CartItemsIx) {
  if (!cartData || Object.keys(cartData).length < 1)
    return <Typography>Your cart is empty, so fill it up!</Typography>;

  const cartArray: CartArrayType = [];

  // @ts-ignore
  for (const [id, item] of Object.entries(cartData)) {
    // @ts-ignore
    cartArray.push(item);
  }
  const cartItems = cartArray.map((item: CartItemType) => (
    <CartItem key={item.id} {...item} setCartData={setCartData} />
  ));
  return (
    <>
      <Stack>{cartItems}</Stack>
      <CartForm orderData={cartArray} setCartData={setCartData} setCartStatus={setCartStatus}/>
    </>
  );
}
