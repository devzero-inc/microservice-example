import { useReducer, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import CartItems from "../components/CartItems";

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
    const newState = JSON.parse(JSON.stringify(state));
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
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      setLoading(true);

      const menuItemData = await axios.get("/proxy/8333/menu-items");
      const { data } = menuItemData;
      setMenuData(data);
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
            <Typography variant="h5">Menu Items</Typography>
          </Grid>
          <MenuItems menuData={menuData} setCartData={setCartData} />
        </Grid>
        <Grid container item md={4} spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">Cart</Typography>
            <CartItems cartData={cartData} setCartData={setCartData} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
