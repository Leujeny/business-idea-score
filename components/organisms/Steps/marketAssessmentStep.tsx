import SliderWithInput from "@/components/molecules/dialogs/SliderWithInput";
import { MarketAssessment } from "@/datas/marketAssessment";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface MarketAssessmentStepProps {
    marketAssessments: MarketAssessment[];
}

export default function MarketAssessmentStep({ marketAssessments }: MarketAssessmentStepProps) {

    return (
        <FormGroup sx={{ gap: 2 }}>
            <Typography variant="caption" sx={{ mb: 1 }}>Évaluer le potentiel de cette idée</Typography>
            <Grid container spacing={2}>
                {marketAssessments.map((need) => (
                    <Grid key={need.id} size={{ xs: 12, md: 6 }}>
                        <SliderWithInput
                            title={need.title}
                            placeholder={need.placeholder}
                            infoContent={need.content}
                        />
                    </Grid>
                ))}
            </Grid>
        </FormGroup>
    );
}