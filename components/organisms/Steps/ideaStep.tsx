import InputText from "@/components/atoms/forms/inputText";
import Stack from "@mui/material/Stack";

interface IdeaStepProps {
    title: string;
    description: string;
    tag: string;
    setTitle: (val: string) => void;
    setDescription: (val: string) => void;
    setTag: (val: string) => void;
}

export default function IdeaStep({ title, description, tag, setTitle, setDescription, setTag }: IdeaStepProps) {
    return (
        <Stack spacing={3}>
            <InputText
                value={title}
                setValue={setTitle}
                label="Titre de l'idée"
                placeholder="ex: Isolation 1€, Pompe à chaleur..."
            />
            <InputText
                value={description}
                setValue={setDescription}
                label="Description"
                placeholder="Décrivez brièvement l'objectif de ce script."
                multiline
                rows={10}
            />
            <InputText
                value={tag}
                setValue={setTag}
                label="Tag / Catégorie"
                placeholder="ex: Énergie, Administratif..."
            />
        </Stack>
    );
}