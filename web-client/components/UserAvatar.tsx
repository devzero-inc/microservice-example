import { Card } from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";

export default function UserAvatar() {
  const [height, width] = [48, 48];
  return (
    <Card
      sx={{
        width,
        height,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CoffeeIcon
        sx={{
          fontSize: width * 0.75,
        }}
      />
    </Card>
  );
}
