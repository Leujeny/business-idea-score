import Typography from "@mui/material/Typography";

interface TopPageSubtitleProps {
  title: string;
}

export default function TopPageSubtitle({ title }: TopPageSubtitleProps) {
  return (
    <Typography variant="body1" component="p" color="textPrimary">
      {title}
    </Typography>
  );
}
