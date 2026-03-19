import InputText from "@/components/atoms/forms/inputText";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface IdeaStepProps {
    title: string;
    description: string;
    tag: string;
    setTitle: (val: string) => void;
    setDescription: (val: string) => void;
    setTag: (val: string) => void;
    error: string | null;
    loading: boolean;
}

export default function IdeaStep({ title, description, tag, setTitle, setDescription, setTag, error, loading }: IdeaStepProps) {

    return (
        <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}
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
            {/* <Box sx={{ pt: 2, display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} color="inherit" />}
                        >
                            {loading ? "Création..." : "Créer l'idée"}
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => router.push('/ideas')}
                            disabled={loading}
                        >
                            Annuler
                        </Button>
                    </Box> */}
        </Stack>
    );
}