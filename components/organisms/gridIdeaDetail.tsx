import Typography from "@mui/material/Typography";
import IdeaDetailDescriptionCard from "../molecules/cards/ideaCard/ideaDetailDescriptionCard";
import IdeaDetailRatingCard from "../molecules/cards/ideaCard/ideaDetailRatingCard";
import IdeaDetailsCard from "../molecules/cards/ideaCard/ideaDetailsCard";
import { getFormOfValueById } from "@/datas/formOfValue";
import { getHumanNeedById } from "@/datas/humanNeed";
import Grid from "@mui/material/Grid";


interface GridIdeaDetailProps {
    card: any;
}

export default function GridIdeaDetail({ card }: GridIdeaDetailProps) {

    return <Grid container spacing={2} sx={{ my: 3 }}>

        <IdeaDetailDescriptionCard title="Description" description={card.description} />

        <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={2}>
                <IdeaDetailRatingCard title={"Evaluation du marché"} rating={card.rating} />
                <IdeaDetailsCard title={"Besoin humain"}>
                    <Typography variant="body2" component="p" >
                        {card.human_needs.map((need: any, index: number) => (
                            <span key={index}>
                                - {getHumanNeedById(need.need_id)?.title}
                                <br />
                            </span>
                        ))}
                    </Typography>
                </IdeaDetailsCard>

                <IdeaDetailsCard title={"Forme de valeur"}>
                    <Typography variant="body2" component="p" >
                        {card.form_values.map((need: any, index: number) => (
                            <span key={index}>
                                - {getFormOfValueById(need.form_id)?.title}
                                <br />
                            </span>
                        ))}
                    </Typography>
                </IdeaDetailsCard>
            </Grid>
        </Grid>
    </Grid >
}