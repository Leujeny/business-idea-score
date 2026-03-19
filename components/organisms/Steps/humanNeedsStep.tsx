import CheckboxWithInput from "@/components/molecules/CheckboxWithInput";
import { HumanNeed } from "@/datas/humanNeed";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

interface HumanNeedsStepProps {
    humanNeeds: HumanNeed[];
}

export default function HumanNeedsStep({ humanNeeds }: HumanNeedsStepProps) {

    return (
        <FormGroup sx={{ gap: 2 }}>
            <Typography variant="caption" sx={{ mb: 1 }}>Cocher les besoins humains auxquels répond cette idée</Typography>
            {humanNeeds.map((need) => (
                <CheckboxWithInput
                    key={need.id}
                    title={need.title}
                    placeholder={need.placeholder}
                    infoContent={need.content}
                />
            ))}
        </FormGroup>
    );
}