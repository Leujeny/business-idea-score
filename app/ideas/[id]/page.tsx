import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { supabase } from "@/utils/supabase";
import EditButton from "@/components/atoms/buttons/editButton";
import BackButton from "@/components/atoms/buttons/backButton";
import GridIdeaDetail from "@/components/organisms/gridIdeaDetail";
import BoxIdeaProblems from "@/components/organisms/boxIdeaProblems";
import BoxIdeaPeople from "@/components/organisms/boxIdeaPeople";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ScriptPage({ params }: PageProps) {
  const { id } = await params;

  const { data: card, error } = await supabase.from('ideas').select('*, human_needs (*), form_values (*)')
    .eq('id', id)
    .single();
  if (!card || error) {
    notFound();
  }


  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <BackButton title="Retour" link="/ideas" />
        <EditButton title="Éditer l'idée" link={`/ideas/${id}/edit`} />
      </Box>
      <TopPageTitle title={card.title} />
      {card.tag && <Chip label={card.tag} size="small" color="primary" sx={{ mt: 1 }} />}

      <GridIdeaDetail card={card} />
      <BoxIdeaProblems />
      <BoxIdeaPeople />
    </>
  );
}
