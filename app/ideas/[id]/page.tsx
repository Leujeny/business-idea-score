import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import { supabase } from "@/utils/supabase";
import GridIdeaDetail from "@/components/organisms/gridIdeaDetail";
import BoxIdeaProblems from "@/components/organisms/boxIdeaProblems";
import BoxIdeaPeople from "@/components/organisms/boxIdeaPeople";
import TopBarView from "@/components/organisms/topBarView";

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
      <TopBarView id={id} table="ideas" />
      <TopPageTitle title={card.title} />
      {card.tag && <Chip label={card.tag} size="small" color="primary" sx={{ mt: 1 }} />}

      <GridIdeaDetail card={card} />
      <BoxIdeaProblems />
      <BoxIdeaPeople />
    </>
  );
}
