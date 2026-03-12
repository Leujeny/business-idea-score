import Box from "@mui/material/Box";
import { SxProps } from "@mui/material/styles";

interface ChildrenNodeBoxProps {
    children: React.ReactNode;
    isMobile: boolean;
    depth: number;
}

export default function ChildrenNodeBox({ children, isMobile, depth }: ChildrenNodeBoxProps) {
    return (
        <Box sx={themeSx(isMobile, depth)}>
            {children}
        </Box>
    );
}

const themeSx: (isMobile: boolean, depth: number) => SxProps = (isMobile: boolean, depth: number) => ({
    pl: isMobile ? 2 : 6,
    mt: 2,
    borderLeft: isMobile ? 'none' : '2px dashed',
    borderColor: 'grey.300',
    ml: isMobile ? 0 : 3,
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: -16,
        left: -2,
        width: 2,
        height: 16,
        bgcolor: 'grey.300',
        display: depth === 0 || isMobile ? 'none' : 'block'
    }
});