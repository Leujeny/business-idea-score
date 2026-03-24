import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";

interface IdeaLargeDetailsCardProps {
  title: string;
  children: React.ReactNode;
}

export default function IdeaLargeDetailsCard({ title, children }: IdeaLargeDetailsCardProps) {
  return (

    // <Link href={href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
    <Grid size={{ xs: 12, sm: 6 }}>
      <Card sx={scriptCardSx}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">{title}</Typography>
          {children}
        </CardContent>
      </Card>
    </Grid>
    // </Link>
  );
}

const scriptCardSx: SxProps = {
  height: "100%",
};