import { useReducer, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import CartItems from "../components/CartItems";

export default function Home() {
  const cartInitialState = {};

  const cartReducer = (state, action) => {
    const newState = { ...state };
    const { data } = action;
    const { id } = data;
    let count;

    const addItemToCart = () => {
      const keyExists = state && id in state;
      if (keyExists) {
        const currCount = newState[id].count;
        count = currCount + 1;
      } else {
        count = 1;
      }
    };

    const incrementItemInCart = () => {};

    const decrementItemInCart = () => {};

    switch (action.type) {
      case "ADD":
        addItemToCart();
      case "INCREMENT":
        incrementItemInCart();
      case "DECREMENT":
        decrementItemInCart();
    }

    return { ...newState, [id]: { ...data, count } };
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
  console.log("CART DATA", cartData);
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
            <CartItems cartData={cartData} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
