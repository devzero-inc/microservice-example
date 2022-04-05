import { useReducer, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import CartItems from "../components/CartItems";

export default function Home() {
  const cartInitialState = {};

  const cartReducer = (state: any, action: { type: string; data: any }) => {
    const newState = JSON.parse(JSON.stringify(state));
    const { type, data } = action;
    const { id } = data;

    const addItemToCart = () => {
      let count;
      const keyExists = state && id in state;
      if (keyExists) {
        const currCount = newState[id].count;
        count = currCount + 1;
      } else {
        count = 1;
      }
      return { [id]: { ...data, count } };
    };

    const decrementItem = () => {
      if (newState[id].count === 1) {
        delete newState[id];
      } else {
        newState[id].count -= 1;
      }
    };

    switch (type) {
      case "ADD":
        const newItem = addItemToCart();
        return { ...newState, ...newItem };
      case "INCREMENT":
        newState[id].count += 1;
        return { ...newState };
      case "DECREMENT":
        decrementItem();
        return { ...newState };
    }
  };
  const [menuData, setMenuData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [cartData, setCartData] = useReducer(cartReducer, cartInitialState);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      setLoading(true);
      const menuItemData = await axios.get("http://localhost:8333/menu-items");
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
