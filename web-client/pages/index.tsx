import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import MenuItems from "../components/MenuItems";

export default function Home() {
  // const menuItems = axios.get("http://localhost:8333/menu-items");
  // console.log(menuItems);
  const menuItemData = [
    { id: 1, name: "Drip coffee", description: "Fast, simple, delicious" },
    { id: 2, name: "Espresso", description: "The potent option" },
    { id: 3, name: "Cortado", description: "Espresso with a dash of milk" },
    { id: 4, name: "Gibraltar", description: "Like a Cortado, but different" },
    { id: 5, name: "Pour over", description: "Fancy drip made by a human" },
    { id: 6, name: "Americano", description: "Espresso cut with water" },
  ];
  return (
    <Layout>
      <Box>
        <Typography>Hello</Typography>
        <MenuItems data={menuItemData} />
      </Box>
    </Layout>
  );
}
