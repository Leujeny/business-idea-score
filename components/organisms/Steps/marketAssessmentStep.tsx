import SliderWithInput from "@/components/molecules/dialogs/SliderWithInput";
import { MarketAssessment } from "@/datas/marketAssessment";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

interface MarketAssessmentStepProps {
    marketAssessments: MarketAssessment[];
}

export default function MarketAssessmentStep({ marketAssessments }: MarketAssessmentStepProps) {

    return (
        <FormGroup sx={{ gap: 2 }}>
            <Typography variant="caption" sx={{ mb: 1 }}>Évaluer le potentiel de cette idée</Typography>
            {marketAssessments.map((need) => (
                <SliderWithInput
                    key={need.id}
                    title={need.title}
                    placeholder={need.placeholder}
                    infoContent={need.content}
                />
            ))}
        </FormGroup>
    );
}