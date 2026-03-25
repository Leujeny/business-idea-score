import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import { supabase } from "@/utils/supabase";
import TopBarView from "@/components/organisms/topBarView";
import Typography from "@mui/material/Typography";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProblemPage({ params }: PageProps) {
  const { id } = await params;
  const { data: card, error } = await supabase.from('problems').select('*').eq('id', id).single();

  if (!card || error) {
    notFound();
  }

  return (
    <>
      <TopBarView id={id} table="problems" />
      <TopPageTitle title={card.title} />
      {card.tag && <Chip label={card.tag} size="small" color="primary" sx={{ mt: 1 }} />}

      <Typography sx={{ mt: 5, whiteSpace: 'pre-wrap' }}>
        {card.description}
      </Typography>
    </>
  );
}
