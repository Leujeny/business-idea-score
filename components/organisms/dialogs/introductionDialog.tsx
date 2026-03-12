import InputText from "@/components/atoms/forms/inputText";
import ClassicDialog from "@/components/molecules/dialogs/classicDialog";
import Typography from "@mui/material/Typography";

interface IntroductionDialogProps {
    introDialogOpen: boolean;
    setIntroDialogOpen: (val: boolean) => void;
    introText: string;
    setIntroText: (val: string) => void;
    handleCreateIntro: () => void;
    savingIntro: boolean;
}

export default function IntroductionDialog({ introDialogOpen, setIntroDialogOpen, introText, setIntroText, handleCreateIntro, savingIntro }: IntroductionDialogProps) {

    return (
        <ClassicDialog open={introDialogOpen} onClose={() => setIntroDialogOpen(false)} title="Créer l'introduction" onClickSubmit={handleCreateIntro} disabled={!introText.trim() || savingIntro} submitBtnLabel={savingIntro ? "Création..." : "Enregistrer"}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                L'introduction est le message principal qui démarre la conversation.
            </Typography>
            <InputText
                multiline
                rows={4}
                label="Texte de l'introduction"
                value={introText}
                setValue={setIntroText}
                placeholder="Ex: Bonjour, je vous appelle suite à votre demande..."
            />
        </ClassicDialog>
    );
}