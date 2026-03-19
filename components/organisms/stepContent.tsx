import IdeaStep from "./Steps/ideaStep";
import HumanNeedsStep from "./Steps/humanNeedsStep";
import { humanNeeds } from "@/datas/humanNeed";
import { marketAssessments } from "@/datas/marketAssessment";
import Typography from "@mui/material/Typography";
import MarketAssessmentStep from "./Steps/marketAssessmentStep";

interface StepContentProps {
    activeStep: number;
    title: string;
    description: string;
    tag: string;
    setTitle: (val: string) => void;
    setDescription: (val: string) => void;
    setTag: (val: string) => void;
    error: string | null;
    loading: boolean;
}

export default function StepContent({ activeStep, title, description, tag, setTitle, setDescription, setTag, error, loading }: StepContentProps) {

    if (activeStep === 0) {
        return (
            <IdeaStep
                title={title}
                description={description}
                tag={tag}
                setTitle={setTitle}
                setDescription={setDescription}
                setTag={setTag}
                error={error}
                loading={loading}
            />
        );
    } else if (activeStep === 1) {
        return (
            <HumanNeedsStep humanNeeds={humanNeeds} />
        );
    } else if (activeStep === 2) {
        return (
            <MarketAssessmentStep marketAssessments={marketAssessments} />
        );
    }
    return (
        <Typography>Step {activeStep}</Typography>
    );
}