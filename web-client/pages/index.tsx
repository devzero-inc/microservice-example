import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMenuItems() {
      setLoading(true);
      const menuItemData = await axios.get("http://localhost:8333/menu-items");
      setData(menuItemData);
      setLoading(false);
    }
    fetchMenuItems();
  }, []);

  // if (!menuItemData) return <div>Loading</div>;
  return (
    <Layout>
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
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
