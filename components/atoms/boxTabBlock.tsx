import { Box, SxProps } from "@mui/material";

interface BoxTabBlockProps {
    children: React.ReactNode;
}

export default function BoxTabBlock({ children }: BoxTabBlockProps) {
    return (
        <Box sx={themeSx}>
            {children}
        </Box>
    );
}

const themeSx: SxProps = {
    py: 4
};