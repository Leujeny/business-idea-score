"use client";

import IdeaCard from "@/components/molecules/cards/ideaCard";
import { supabase } from "@/utils/supabase";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

export default function Home() {

  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScripts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('ideas')
      .select('*')
      .order('updated_at', { ascending: true });

    if (data) setScripts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchScripts();
  }, []);

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          {"Mes dernières idées"}
        </Typography>

        <Grid container spacing={2}>
          {scripts.map((card) => (
            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <IdeaCard title={card.title} description={card.description} href={`/ideas/${card.id}`} tag={card.tag} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" component="h2">
          {"Mes derniers problèmes"}
        </Typography>

        <Grid container spacing={2}>
          {scripts.map((card) => (
            <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <IdeaCard title={card.title} description={card.description} href={`/ideas/${card.id}`} tag={card.tag} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
