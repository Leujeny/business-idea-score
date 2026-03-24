import SliderWithInput from "@/components/molecules/dialogs/SliderWithInput";
import { MarketAssessment } from "@/datas/marketAssessment";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface MarketAssessmentStepProps {
    marketAssessments: MarketAssessment[];
    assessmentValues: Record<number, number>;
    onChangeValue: (id: number, value: number) => void;
}

export default function MarketAssessmentStep({ marketAssessments, assessmentValues, onChangeValue }: MarketAssessmentStepProps) {

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
                            value={assessmentValues[need.id] || 0}
                            onChange={(val) => onChangeValue(need.id, val)}
                        />
                    </Grid>
                ))}
            </Grid>
        </FormGroup>
    );
}