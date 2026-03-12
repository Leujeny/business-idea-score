import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface ClassicDialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    onClickSubmit: () => void;
    disabled: boolean;
    submitBtnLabel: string;
}

export default function ClassicDialog({
    open,
    onClose,
    children,
    title,
    onClickSubmit,
    disabled,
    submitBtnLabel
}: ClassicDialogProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit">Annuler</Button>
                <Button variant="contained" onClick={onClickSubmit} disabled={disabled}>{submitBtnLabel}</Button>
            </DialogActions>
        </Dialog>
    );
}