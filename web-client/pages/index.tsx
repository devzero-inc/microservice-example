import { useReducer, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import CartItems from "../components/CartItems";
import CART_STATUS from "../constants/cartStatus";
import OrderSuccessDialog from "../components/OrderSuccessDialog";

export type CartItemType = {
  id: string;
  name: string;
  description: string;
  quantity: number;
};
export type CartDataType =
  | {}
  | {
      [key: string]: CartItemType;
    };

export default function Home() {
  const cartInitialState: CartDataType = {};

  const cartReducer = (state: any, action: { type: string; data: any }) => {
    const newState = state && JSON.parse(JSON.stringify(state));
    const { type, data } = action;

    const addItemToCart = () => {
      let quantity;
      const keyExists = state && data.id in state;
      if (keyExists) {
        const currQuantity = newState[data.id].quantity;
        quantity = currQuantity + 1;
      } else {
        quantity = 1;
      }
      return { [data.id]: { ...data, quantity } };
    };

    const decrementItem = () => {
      if (newState[data.id].quantity === 1) {
        delete newState[data.id];
      } else {
        newState[data.id].quantity -= 1;
      }
    };

    switch (type) {
      case "ADD":
        const newItem = addItemToCart();
        return { ...newState, ...newItem };
      case "INCREMENT":
        newState[data.id].quantity += 1;
        return { ...newState };
      case "DECREMENT":
        decrementItem();
        return { ...newState };
      case "EMPTY":
        return {};
    }
  };
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [cartData, setCartData] = useReducer(cartReducer, cartInitialState);
  const [cartStatus, setCartStatus] = useState(CART_STATUS.SHOPPING);

  useEffect(() => {
    async function fetchMenuItems() {
      setLoading(true);

      await axios
        .get("/api/get-menu-items")
        .then((res) => setMenuData(res.data))
        .catch((err) => console.log(err));
      setLoading(false);
    }
    fetchMenuItems();
  }, []);

  if (isLoading) return <div>Loading</div>;
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid container item md={8} spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">Jaswenny's Menu Items</Typography>
          </Grid>
          <MenuItems menuData={menuData} setCartData={setCartData} />
        </Grid>
        <Grid container item md={4} spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">Cart</Typography>
            <CartItems
              cartData={cartData}
              setCartData={setCartData}
              setCartStatus={setCartStatus}
            />
          </Grid>
        </Grid>
      </Grid>
      <OrderSuccessDialog
        cartStatus={cartStatus}
        setCartStatus={setCartStatus}
      />
    </Layout>
  );
}
