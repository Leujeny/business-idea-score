import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Stack } from "@mui/material";

interface AddChooseDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function AddChooseDialog({ open, onClose }: AddChooseDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
        >
            <DialogTitle>Que voulez-vous ajouter ?</DialogTitle>
            <DialogContent>
                <Stack spacing={2} direction="column" alignItems={"flex-start"}>
                    <Button href="/ideas/new">Une idée</Button>
                    <Button href="/problems/new">Un problème</Button>
                    <Button disabled href="/people/new">Une personne</Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}
