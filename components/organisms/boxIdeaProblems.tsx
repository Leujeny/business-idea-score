import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import IdeaProblemCard from "../molecules/cards/ideaCard/ideaProblemCard";


interface BoxIdeaProblemsProps {
    // card: any;
}

export default function BoxIdeaProblems({ }: BoxIdeaProblemsProps) {

    return (
        <Box sx={{ mt: 3 }}>
            <Typography gutterBottom variant="h6" component="h2">{"Problèmes associés"}</Typography>
            <Grid container spacing={2}>
                <IdeaProblemCard title="Probleme 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non tempus augue." />
                <IdeaProblemCard title="Probleme 2" description="Vivamus placerat posuere ligula vitae sodales." />
                <IdeaProblemCard title="Probleme 3" description="Donec placerat purus eleifend felis elementum, a tempus orci auctor." />
                <IdeaProblemCard title="Probleme 4" description="Sed ac elementum neque. Donec porttitor rutrum cursus. Integer vulputate consectetur augue, non scelerisque odio hendrerit et." />
            </Grid>
        </Box>
    );

}