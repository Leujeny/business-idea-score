import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";

interface IdeaDetailDescriptionCardProps {
  title: string;
  description: string;
}

export default function IdeaDetailDescriptionCard({ title, description }: IdeaDetailDescriptionCardProps) {
  return (


    <Grid size={{ xs: 12, md: 8 }}>
      <Card sx={scriptCardSx}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="text.secondary">{title}</Typography>
          <Typography sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const scriptCardSx: SxProps = {
  height: "100%",
};