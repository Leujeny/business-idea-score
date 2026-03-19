import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface InfoDialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

export default function InfoDialog({
    open,
    onClose,
    children,
    title,
}: InfoDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="primary">Fermer</Button>
            </DialogActions>
        </Dialog>
    );
}