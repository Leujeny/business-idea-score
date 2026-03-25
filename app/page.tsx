"use client";

import BestIdeaCard from "@/components/molecules/cards/bestIdeaCard";
import RecentCard from "@/components/molecules/cards/recentCard";
import { useHome } from "@/hook/use.tsHome";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";


export default function Home() {

  const { state: { scripts, scripts2, loading }, setters: { fetchScripts } } = useHome();

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {"Mes meilleures idées"}
        </Typography>
        <Grid container spacing={2}>
          {scripts.map((card, index) => (
            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <BestIdeaCard title={card.title} href={`/ideas/${card.id}`} rank={index + 1} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {"Dernière mise à jour"}
        </Typography>
        <Grid container spacing={2}>
          {scripts2.map((card, index) => (
            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <RecentCard title={card.title} href={`/${card.type}/${card.id}`} type={card.type} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
