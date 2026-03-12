import InputText from "@/components/atoms/forms/inputText";
import ClassicDialog from "@/components/molecules/dialogs/classicDialog";
import Divider from "@mui/material/Divider";

interface EditObjectionDialogProps {
    isEditingObjection: boolean;
    setIsEditingObjection: (val: boolean) => void;
    editedObjectionText: string;
    setEditedObjectionText: (val: string) => void;
    handleSaveObjection: () => void;
    savingObjection: boolean;
    editedBlockText: string;
    setEditedBlockText: (val: string) => void;
}

export default function EditObjectionDialog({ isEditingObjection, setIsEditingObjection, editedObjectionText, setEditedObjectionText, handleSaveObjection, savingObjection, editedBlockText, setEditedBlockText }: EditObjectionDialogProps) {

    return (
        <ClassicDialog
            open={isEditingObjection}
            onClose={() => setIsEditingObjection(false)}
            title="Editer l'objection"
            onClickSubmit={handleSaveObjection}
            disabled={!editedObjectionText.trim() || savingObjection}
            submitBtnLabel={savingObjection ? "Editer..." : "Enregistrer"}>
            <InputText
                label="Objection"
                value={editedObjectionText}
                setValue={setEditedObjectionText}
            />
            <Divider sx={{ my: 3 }} />

            <InputText
                multiline
                rows={7}
                value={editedBlockText}
                setValue={setEditedBlockText}
            />
        </ClassicDialog>
    );
}