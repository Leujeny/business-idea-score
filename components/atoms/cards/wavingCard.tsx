import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SxProps, Theme } from "@mui/material/styles";

interface WavingCardProps {
    children: React.ReactNode;
}

export default function WavingCard({ children }: WavingCardProps) {
    return (
        <Card sx={scriptCardSx}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}


const scriptCardSx: SxProps<Theme> = (theme) => ({
    height: "100%",
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    "&:hover": {
        boxShadow: theme.shadows[6],
        transform: "translateY(-2px)",
        bgcolor: "action.hover",
    },
});