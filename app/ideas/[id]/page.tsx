import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import { notFound } from "next/navigation";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { supabase } from "@/utils/supabase";
import EditButton from "@/components/atoms/buttons/editButton";
import BackButton from "@/components/atoms/buttons/backButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getHumanNeedById } from "@/datas/humanNeed";
import IdeaDetailsCard from "@/components/molecules/cards/ideaDetailsCard";
import { getFormOfValueById } from "@/datas/formOfValue";

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
      {/* <TopPageSubtitle title={card.description} /> */}
      {card.tag && <Chip label={card.tag} size="small" color="primary" sx={{ mt: 1 }} />}

      <Typography sx={{ mt: 3, whiteSpace: 'pre-wrap' }}>
        {card.description}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 3 }}>

        <IdeaDetailsCard title={"Besoin humain"}>
          <Typography variant="body2" component="p" color="text.secondary">
            {card.human_needs.map((need: any, index: number) => (
              <span key={index}>
                - {getHumanNeedById(need.need_id)?.title}
                <br />
              </span>
            ))}
          </Typography>
        </IdeaDetailsCard>

        <IdeaDetailsCard title={"Evaluation du marché"}>
          <Typography variant="body2" component="p" color="text.secondary" sx={{ fontSize: 30, fontWeight: 'bold' }}>
            {card.rating} / 100
          </Typography>
        </IdeaDetailsCard>

        <IdeaDetailsCard title={"Forme de valeur"}>
          <Typography variant="body2" component="p" color="text.secondary">
            {card.form_values.map((need: any, index: number) => (
              <span key={index}>
                - {getFormOfValueById(need.form_id)?.title}
                <br />
              </span>
            ))}
          </Typography>
        </IdeaDetailsCard>
      </Grid >
    </>
  );
}
