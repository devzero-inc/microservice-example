import PersonIcon from "@mui/icons-material/Person";
import { Card } from "@mui/material";

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
      <PersonIcon
        sx={{
          fontSize: width * 0.75,
        }}
      />
    </Card>
  );
}
