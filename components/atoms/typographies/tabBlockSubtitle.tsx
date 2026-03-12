import Typography from "@mui/material/Typography";

interface TabSubtitleProps {
  title: string;
}

export default function TabSubtitle({ title }: TabSubtitleProps) {
  return (
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      {title}
    </Typography>
  );
}
