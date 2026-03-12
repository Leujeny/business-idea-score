import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";
import Link from "next/link";

interface ScriptCardProps {
  title: string;
  description: string;
  href: string;
  tag: string;
}

export default function ScriptCard({
  title,
  description,
  href,
  tag,
}: ScriptCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
      <Card sx={scriptCardSx}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Chip label={tag} size="small" color="default" sx={{ marginBottom: 2 }} />
          <Typography variant="body2" component="p" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

const scriptCardSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
  "&:hover": {
    boxShadow: theme.shadows[6],
    transform: "translateY(-2px)",
    bgcolor: "action.hover",
  },
});