import { Card, Typography } from "@mui/material";

interface MentItemInterface {
  id: number;
  name: string;
  description: string;
}
export default function MenuItem({ id, name, description }: MentItemInterface) {
  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <Typography>{name}</Typography>
      <Typography>{description}</Typography>
    </Card>
  );
}
