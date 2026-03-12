import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

interface DeleteButtonProps {
    title: string;
    onClick: () => void;
}

export default function DeleteButton({ title, onClick }: DeleteButtonProps) {
    return (
        <Box>
            {/* Version MOBILE : IconButton visible uniquement sur xs */}
            <Tooltip title={title}>
                <IconButton
                    onClick={onClick}
                    color="error"
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    aria-label={title}
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

            {/* Version DESKTOP : Button classique visible à partir de sm */}
            <Button
                onClick={onClick}
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
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
