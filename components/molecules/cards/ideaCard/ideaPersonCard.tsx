import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";

interface IdeaPersonCardProps {
  title: string;
}

export default function IdeaPersonCard({ title }: IdeaPersonCardProps) {
  return (

    <Grid size={{ xs: 12, md: 3 }}>
      <Card sx={scriptCardSx}>
        <CardContent>
          <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>{title}</Typography>
          <Typography variant="body2" component="p" color="text.secondary">
            <span>- Charactérisque 1<br /></span>
            <span>- Charactérisque 2<br /></span>
            <span>- Charactérisque 3<br /></span>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

const scriptCardSx: SxProps = {
  height: "100%",
};