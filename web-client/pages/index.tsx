import Layout from "../components/Layout";
import { Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";

export default function Home() {
const menuItemData = axios.get("/proxy/8333/menu-items");
  console.log(menuItemData);
  // const menuItemData = [
  //   { id: 1, name: "Drip coffee", description: "Fast, simple, delicious" },
  //   { id: 2, name: "Espresso", description: "The potent option" },
  //   { id: 3, name: "Cortado", description: "Espresso with a dash of milk" },
  //   { id: 4, name: "Gibraltar", description: "Like a Cortado, but different" },
  //   { id: 5, name: "Pour over", description: "Fancy drip made by a human" },
  //   { id: 6, name: "Americano", description: "Espresso cut with water" },
  // ];
  ///D
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid container item md={8} spacing={2}>
          <Grid item md={12}>
            <Typography>Menu Items</Typography>
          </Grid>
          <MenuItems data={menuItemData} />
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
