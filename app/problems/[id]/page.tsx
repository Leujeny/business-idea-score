import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { supabase } from "@/utils/supabase";
import EditButton from "@/components/atoms/buttons/editButton";
import BackButton from "@/components/atoms/buttons/backButton";
import Typography from "@mui/material/Typography";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProblemPage({ params }: PageProps) {
  const { id } = await params;

  const { data: card, error } = await supabase
    .from('problems')
    .select('*')
    .eq('id', id)
    .single();

  if (!card || error) {
    notFound();
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <BackButton title="Retour" link="/problems" />
        <EditButton title="Éditer le problème" link={`/problems/${id}/edit`} />
      </Box>

      <TopPageTitle title={card.title} />
      <TopPageSubtitle title={card.description} />
      {card.tag && <Chip label={card.tag} size="small" color="primary" sx={{ mt: 1 }} />}

      <Typography sx={{ mt: 5, whiteSpace: 'pre-wrap' }}>
        Here is my text
      </Typography>
    </>
  );
}
