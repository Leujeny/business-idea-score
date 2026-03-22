
import { IconButton, Slider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import InfoDialog from "./infoDialog";

interface SliderWithInputProps {
    title: string;
    placeholder: string;
    infoContent: React.ReactNode;
}
const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 10,
        label: '10',
    },
];
export default function SliderWithInput({ title, placeholder, infoContent }: SliderWithInputProps) {
    const [checked, setChecked] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    // Put InfoDialog outside the file, it should be mutualized

    function valuetext(value: number) {
        return `${value}°C`;
    }


    return (
        <>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, height: '100%' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>
                    <Typography variant="button">{title}</Typography>
                    <IconButton aria-label="info" size="small" color="primary" onClick={() => setIsInfoOpen(true)}>
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={0}
                    getAriaValueText={valuetext}
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={0}
                    max={10}
                    sx={{ mx: 'auto', mt: 2 }}
                />
                {/* <TextField
                    variant="standard"
                    size="small"
                    placeholder={placeholder}
                    // disabled={!checked}
                    fullWidth
                    sx={{ mt: 2 }}
                /> */}
                {/* </Stack> */}
            </Box>
            <InfoDialog open={isInfoOpen} onClose={() => setIsInfoOpen(false)} title={title}>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                    {infoContent}
                </Typography>
            </InfoDialog>
        </>
    );
}