import { createContext } from "react";
import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import { useState, useEffect } from "react";
import CartItems from "../components/CartItems";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      setLoading(true);
      const menuItemData = await axios.get("http://localhost:8333/menu-items");
      setData(menuItemData);
      setLoading(false);
    }
    fetchMenuItems();
  }, []);

  const Context = createContext(cartData);
  const contextValues = { cartData };

  // if (!menuItemData) return <div>Loading</div>;
  return (
    <Layout>
      <Context.Provider value={contextValues}>
        <Grid container spacing={2}>
          <Grid container item md={8} spacing={2}>
            <Grid item md={12}>
              <Typography>Menu Items</Typography>
            </Grid>
            <MenuItems data={data} />
          </Grid>
          <Grid container item md={4} spacing={2}>
            <Grid item md={12}>
              <Typography>Cart</Typography>
              <CartItems cartData={cartData} />
            </Grid>
          </Grid>
        </Grid>
      </Context.Provider>
    </Layout>
  );
}
