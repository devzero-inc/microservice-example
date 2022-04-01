import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export type ModelMenuItem = {
  id: number;
  name: string;
  description: string;
};

const devZeroYellow2 = "#C3B146";
const devZeroYellow1 = "#D3BD5A";
export default function MenuItem({ id, name, description }: ModelMenuItem) {
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
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="success">
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
