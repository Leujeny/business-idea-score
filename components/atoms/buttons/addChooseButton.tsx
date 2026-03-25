import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

interface AddChooseButtonProps {
    title: string;
    onClick: () => void;
}

export default function AddChooseButton({ title, onClick }: AddChooseButtonProps) {
    return (
        <Box sx={{ mb: 5 }}>
            <Button
                onClick={onClick}
                color="success"
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                sx={{
                    borderRadius: 2
                }}
            >
                {title}
            </Button>
        </Box>
    );
}