import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";

interface IdeaProblemCardProps {
  title: string;
  description: string;
}

export default function IdeaProblemCard({ title, description }: IdeaProblemCardProps) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper sx={scriptCardSx} variant="outlined">
        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="body2" component="p" color="text.secondary">{description}</Typography>
      </Paper>
    </Grid>
  );
}

const scriptCardSx: SxProps = {
  height: "100%",
  padding: 2,
};