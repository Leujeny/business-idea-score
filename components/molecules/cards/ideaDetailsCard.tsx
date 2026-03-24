"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

interface IdeaDetailsCardProps {
  title: string;
  children: React.ReactNode;
}

export default function IdeaDetailsCard({ title, children }: IdeaDetailsCardProps) {
  return (

    // <Link href={href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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

const scriptCardSx: SxProps<Theme> = (theme) => ({
  height: "100%",
  // transition: "box-shadow 0.2s ease, transform 0.2s ease",
  // "&:hover": {
  //   boxShadow: theme.shadows[6],
  //   transform: "translateY(-2px)",
  //   bgcolor: "action.hover",
  // },
});