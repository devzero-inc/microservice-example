import { Grid, Card, Typography } from "@mui/material";

export type ModelMenuItem = {
  id: number;
  name: string;
  description: string;
};
export default function MenuItem({ id, name, description }: ModelMenuItem) {
  return (
    <Grid item md={4} lg={4}>
      <Card sx={{ mt: 2, p: 2, height: 200 }}>
        <Typography>{name}</Typography>
        <Typography>{description}</Typography>
      </Card>
    </Grid>
  );
}
