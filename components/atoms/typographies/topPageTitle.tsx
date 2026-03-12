import Typography from "@mui/material/Typography";

interface TopPageTitleProps {
  title: string;
}

export default function TopPageTitle({ title }: TopPageTitleProps) {
  return (
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
  );
}
