
import { IconButton, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import InfoDialog from "./dialogs/infoDialog";

interface CheckboxWithInputProps {
    title: string;
    placeholder: string;
    infoContent: React.ReactNode;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export default function CheckboxWithInput({ title, placeholder, infoContent, checked: propChecked, onChange: propOnChange }: CheckboxWithInputProps) {
    const [internalChecked, setInternalChecked] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const isControlled = propChecked !== undefined;
    const checked = isControlled ? propChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
        if (propOnChange) {
            propOnChange(newChecked);
        }
    };
    // Put InfoDialog outside the file, it should be mutualized
    return (
        <>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Checkbox checked={checked} onChange={handleChange} />
                        <Typography variant="button">{title}</Typography>
                    </Stack>
                    <IconButton aria-label="info" size="small" color="info" onClick={() => setIsInfoOpen(true)}>
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Box>
            <InfoDialog open={isInfoOpen} onClose={() => setIsInfoOpen(false)} title={title}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {infoContent}
                </Typography>
            </InfoDialog>
        </>
    );
}