import Paper from "@mui/material/Paper";
import { SxProps } from "@mui/material/styles";

interface IntroNodePaperProps {
    children: React.ReactNode;
    isMobile: boolean;
}

export default function IntroNodePaper({ children, isMobile }: IntroNodePaperProps) {
    return (
        <Paper variant="outlined" sx={themeSx(isMobile)}>
            {children}
        </Paper>
    );
}

const themeSx: (isMobile: boolean) => SxProps = (isMobile: boolean) => ({
    p: 2,
    width: isMobile ? '100%' : 'fit-content',
    minWidth: isMobile ? '100%' : 350,
    maxWidth: isMobile ? '100%' : 550,
    borderLeft: 6,
    borderLeftColor: 'success.main',
    bgcolor: 'success.50',
    fontWeight: 'bold'
});