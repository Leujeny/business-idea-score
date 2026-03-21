import CheckboxWithInput from "@/components/molecules/CheckboxWithInput";
import { FormOfValue } from "@/datas/formOfValue";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";

interface FormOfValueStepProps {
    formOfValues: FormOfValue[];
}

export default function FormOfValueStep({ formOfValues }: FormOfValueStepProps) {

    return (
        <FormGroup sx={{ gap: 2 }}>
            <Typography variant="caption" sx={{ mb: 1 }}>Cocher les formes de valeur auxquelles répond cette idée</Typography>
            {formOfValues.map((formOfValue) => (
                <CheckboxWithInput
                    key={formOfValue.id}
                    title={formOfValue.title}
                    placeholder={formOfValue.placeholder}
                    infoContent={formOfValue.content}
                />
            ))}
        </FormGroup>
    );
}