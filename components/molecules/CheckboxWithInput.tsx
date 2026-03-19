
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
}

export default function CheckboxWithInput({ title, placeholder, infoContent }: CheckboxWithInputProps) {
    const [checked, setChecked] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    // Put InfoDialog outside the file, it should be mutualized
    return (
        <>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="button">{title}</Typography>
                    <IconButton aria-label="info" size="small" color="primary" onClick={() => setIsInfoOpen(true)}>
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                    <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                    <TextField
                        variant="standard"
                        size="small"
                        placeholder={placeholder}
                        disabled={!checked}
                        fullWidth
                    />
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