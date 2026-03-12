import InputText from "@/components/atoms/forms/inputText";
import ClassicDialog from "@/components/molecules/dialogs/classicDialog";

interface EditIntroductionDialogProps {
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    editedText: string;
    setEditedText: (val: string) => void;
    handleSaveInfo: () => void;
    savingIntro: boolean;
}

export default function EditIntroductionDialog({ isEditing, setIsEditing, editedText, setEditedText, handleSaveInfo, savingIntro }: EditIntroductionDialogProps) {

    return (
        <ClassicDialog
            open={isEditing}
            onClose={() => setIsEditing(false)}
            title="Editer l'introduction"
            onClickSubmit={handleSaveInfo}
            disabled={!editedText.trim() || savingIntro}
            submitBtnLabel={savingIntro ? "Editer..." : "Enregistrer"}>
            {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                L'introduction est le message principal qui démarre la conversation.
            </Typography> */}
            <InputText
                multiline
                rows={7}
                // label="Texte de l'introduction"
                value={editedText}
                setValue={setEditedText}
            />
        </ClassicDialog>
    );
}