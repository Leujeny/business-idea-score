import CheckboxWithInput from "@/components/molecules/CheckboxWithInput";
import { HumanNeed } from "@/datas/humanNeed";
import { Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

interface HumanNeedsStepProps {
    humanNeeds: HumanNeed[];
    selectedNeeds: number[];
    onToggleNeed: (id: number) => void;
}

export default function HumanNeedsStep({ humanNeeds, selectedNeeds, onToggleNeed }: HumanNeedsStepProps) {

    return (
        <FormGroup sx={{ gap: 2 }}>
            <Typography variant="caption" sx={{ mb: 1 }}>Cocher les besoins humains auxquels répond cette idée</Typography>
            <Grid container spacing={2}>
                {humanNeeds.map((need) => (
                    <Grid key={need.id} size={{ xs: 12, md: 6 }}>
                        <CheckboxWithInput
                            title={need.title}
                            placeholder={need.placeholder}
                            infoContent={need.content}
                            checked={selectedNeeds.includes(need.id)}
                            onChange={() => onToggleNeed(need.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </FormGroup>
    );
}