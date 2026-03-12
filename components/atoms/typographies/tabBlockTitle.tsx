import Typography from "@mui/material/Typography";

interface TabTitleProps {
  title: string;
}

export default function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
  );
}
