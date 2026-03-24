import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress
} from "@mui/material";

interface DeleteScriptDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export default function DeleteScriptDialog({ open, onClose, onConfirm, loading }: DeleteScriptDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={() => !loading && onClose()}
        >
            <DialogTitle>Supprimer l'élément</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Êtes-vous sûr de vouloir supprimer cet élément ?
                </DialogContentText>
                <DialogContentText>
                    Cette action est irréversible
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Annuler</Button>
                <Button onClick={onConfirm} color="error" autoFocus disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Supprimer"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
