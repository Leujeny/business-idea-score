import CheckboxWithInput from "@/components/molecules/CheckboxWithInput";
import { FormOfValue } from "@/datas/formOfValue";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface FormOfValueStepProps {
    formOfValues: FormOfValue[];
    selectedValues: number[];
    onToggleValue: (id: number) => void;
}

export default function FormOfValueStep({ formOfValues, selectedValues, onToggleValue }: FormOfValueStepProps) {

    return (
        <FormGroup sx={{ gap: 2 }}>
            <Typography variant="caption" sx={{ mb: 1 }}>Cocher les formes de valeur auxquelles répond cette idée</Typography>
            <Grid container spacing={2}>
                {formOfValues.map((formOfValue) => (
                    <Grid key={formOfValue.id} size={{ xs: 12, md: 6 }}>
                        <CheckboxWithInput
                            title={formOfValue.title}
                            placeholder={formOfValue.placeholder}
                            infoContent={formOfValue.content}
                            checked={selectedValues.includes(formOfValue.id)}
                            onChange={() => onToggleValue(formOfValue.id)}
                        />
                    </Grid>
                ))}
            </Grid>
        </FormGroup>
    );
}