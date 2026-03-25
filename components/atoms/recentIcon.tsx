import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface RecentIconProps {
    type: string;
}

export default function RecentIcon({ type }: RecentIconProps) {
    if (type === "ideas") {
        return (
            <TipsAndUpdatesIcon color="warning" sx={{ fontSize: "2rem" }} />
        );
    } else if (type === "problems") {
        return (
            <ReportProblemIcon color="error" sx={{ fontSize: "2rem" }} />
        );
    } else if (type === "people") {
        return (
            <SentimentSatisfiedAltIcon color="success" sx={{ fontSize: "2rem" }} />
        );
    }
    return (
        <QuestionMarkIcon color="primary" sx={{ fontSize: "2rem" }} />
    );
}