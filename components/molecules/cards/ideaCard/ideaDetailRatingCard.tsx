import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";

interface IdeaDetailRatingCardProps {
  title: string;
  rating: number;
}

export default function IdeaDetailRatingCard({ title, rating }: IdeaDetailRatingCardProps) {
  return (

    // <Link href={href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
    <Grid size={{ xs: 12 }}>
      <Card sx={scriptCardSx}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="text.secondary">{title}</Typography>
          <Typography variant="body2" component="p" sx={{ fontSize: 30, fontWeight: 'bold' }}>
            {rating} / 100
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    // </Link>
  );
}

const scriptCardSx: SxProps = {
  height: "100%",
};