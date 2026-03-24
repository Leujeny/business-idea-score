import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";


interface BoxIdeaProblemsProps {
    // card: any;
}

export default function BoxIdeaProblems({ }: BoxIdeaProblemsProps) {

    return (
        <Box sx={{ mt: 3 }}>
            <Typography gutterBottom variant="h6" component="h2">{"Problèmes associés"}</Typography>
            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>Probleme 1</Typography>
                        <Typography variant="body2" component="p" color="text.secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non tempus augue.</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>Probleme 2</Typography>
                        <Typography variant="body2" component="p" color="text.secondary">Vivamus placerat posuere ligula vitae sodales.</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>Probleme 3</Typography>
                        <Typography variant="body2" component="p" color="text.secondary">Donec placerat purus eleifend felis elementum, a tempus orci auctor.</Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>Probleme 4</Typography>
                        <Typography variant="body2" component="p" color="text.secondary">Sed ac elementum neque. Donec porttitor rutrum cursus. Integer vulputate consectetur augue, non scelerisque odio hendrerit et.</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );

}