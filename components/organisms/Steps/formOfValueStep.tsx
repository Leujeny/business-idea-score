import CheckboxWithInput from "@/components/molecules/CheckboxWithInput";
import { FormOfValue } from "@/datas/formOfValue";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface FormOfValueStepProps {
    formOfValues: FormOfValue[];
}

export default function FormOfValueStep({ formOfValues }: FormOfValueStepProps) {

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
                        />
                    </Grid>
                ))}
            </Grid>
        </FormGroup>
    );
}