import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import IdeaPersonCard from "../molecules/cards/ideaCard/ideaPersonCard";


interface BoxIdeaPeopleProps {
    // card: any;
}

export default function BoxIdeaPeople({ }: BoxIdeaPeopleProps) {

    return (
        <Box sx={{ mt: 3 }}>
            <Typography gutterBottom variant="h6" component="h2">{"Personnes associées"}</Typography>
            <Grid container spacing={2}>
                <IdeaPersonCard title="Personne 1" />
                <IdeaPersonCard title="Personne 2" />
                <IdeaPersonCard title="Personne 3" />
                <IdeaPersonCard title="Personne 4" />
            </Grid>
        </Box>
    );
}