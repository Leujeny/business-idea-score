import { Paper, SxProps } from "@mui/material";

interface FormPaperTabBlockProps {
    children: React.ReactNode;
}

export default function FormPaperTabBlock({ children }: FormPaperTabBlockProps) {
    return (
        <Paper sx={themeSx}>
            {children}
        </Paper>
    );
}

const themeSx: SxProps = {
    p: 3,
    mb: 4,
    // bgcolor: 'grey.50'
};