import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Dispatch } from "react";

export type ModelMenuItem = {
  id: number;
  name: string;
  description: string;
  setCartData: Dispatch<any>;
price: number;
};

export default function MenuItem({
  id,
  name,
  description,
  setCartData,
price
}: ModelMenuItem) {
  return (
    <Grid item md={4} lg={4}>
      <Card
        sx={{
          mt: 2,
          p: 2,
          height: 200,
          borderTop: `8px solid #444`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name} ${price}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() =>
              setCartData({ type: "ADD", data: { id, name, description } })
            }
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
