import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface AddContinuationButtonProps {
    title: string;
    onClick: () => void;
}

export default function AddContinuationButton({ title, onClick }: AddContinuationButtonProps) {
    return (
        <Box>
            {/* Version MOBILE : IconButton visible uniquement sur xs */}
            <Tooltip title={title}>
                <IconButton
                    onClick={onClick}
                    color="success"
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    aria-label={title}
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>

            {/* Version DESKTOP : Button classique visible à partir de sm */}
            <Button
                onClick={onClick}
                color="success"
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
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