import Paper from "@mui/material/Paper";
import { SxProps } from "@mui/material/styles";

interface NodePaperProps {
    children: React.ReactNode;
    isMobile: boolean;
    depth: number;
}

export default function NodePaper({ children, isMobile, depth }: NodePaperProps) {
    return (
        <Paper variant="outlined" sx={themeSx(isMobile, depth)}>
            {children}
        </Paper>
    );
}

const themeSx: (isMobile: boolean, depth: number) => SxProps = (isMobile: boolean, depth: number) => ({
    p: 2,
    width: isMobile ? '100%' : 'fit-content',
    minWidth: isMobile ? '100%' : 350,
    maxWidth: isMobile ? '100%' : 550,
    borderLeft: 4,
    borderLeftColor: depth === 0 ? 'primary.main' : 'secondary.main',
    bgcolor: 'background.paper',
    zIndex: 2,
    position: 'relative',
    '&:hover': {
        boxShadow: 2,
        borderColor: depth === 0 ? 'primary.main' : 'secondary.main',
    }
});