'use client';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface EditButtonProps {
    title: string;
    link: string;
}

export default function EditButton({ title, link }: EditButtonProps) {
    return (
        <Box>
            {/* Version MOBILE : IconButton visible uniquement sur xs */}
            <Tooltip title={title}>
                <IconButton
                    component={Link}
                    href={link}
                    color="primary"
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    aria-label={title}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>

            {/* Version DESKTOP : Button classique visible à partir de sm */}
            <Button
                component={Link}
                href={link}
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