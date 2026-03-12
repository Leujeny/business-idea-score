'use client';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Link from "next/link";

interface BackButtonProps {
    title: string;
    link: string;
}

export default function BackButton({ title, link }: BackButtonProps) {
    return (
        <Box>
            {/* Version MOBILE : IconButton visible uniquement sur xs */}
            <Tooltip title={title}>
                <IconButton
                    component={Link}
                    href={link}
                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    aria-label={title}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>

            {/* Version DESKTOP : Button classique visible à partir de sm */}
            <Button
                component={Link}
                href={link}
                color="inherit"
                variant="text"
                size="small"
                startIcon={<ArrowBackIcon />}
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