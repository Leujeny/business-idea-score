'use client';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface EditButtonProps {
    title: string;
    onClick: () => void;
}

export default function EditButton2({ title, onClick }: EditButtonProps) {
    return (
        <Box>
            {/* Version MOBILE : IconButton visible uniquement sur xs */}
            <Tooltip title={title}>
                <IconButton
                    onClick={onClick}
                    color="primary"
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    aria-label={title}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>

            {/* Version DESKTOP : Button classique visible à partir de sm */}
            <Button
                onClick={onClick}
                variant="outlined"
                size="small"
                startIcon={<EditIcon />}
                sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    borderRadius: 2
                }}
            >
                {title}
            </Button>
        </Box>
    );
}