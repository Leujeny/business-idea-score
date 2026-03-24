import IdeaStep from "./Steps/ideaStep";
import HumanNeedsStep from "./Steps/humanNeedsStep";
import { humanNeeds } from "@/datas/humanNeed";
import { marketAssessments } from "@/datas/marketAssessment";
import MarketAssessmentStep from "./Steps/marketAssessmentStep";
import FormOfValueStep from "./Steps/formOfValueStep";
import { formOfValues } from "@/datas/formOfValue";
import ContentLoader from "../molecules/contentLoader";
import AssociationStep from "./Steps/associationStep";

interface StepContentProps {
    activeStep: number;
    title: string;
    description: string;
    tag: string;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setTag: (tag: string) => void;
    selectedHumanNeeds: number[];
    setSelectedHumanNeeds: (selectedHumanNeeds: number[]) => void;
    selectedMarketAssessments: Record<number, number>;
    setSelectedMarketAssessments: (selectedMarketAssessments: Record<number, number>) => void;
    selectedFormOfValues: number[];
    setSelectedFormOfValues: (selectedFormOfValues: number[]) => void;
}
// TODO: fix the types
export default function StepContent({ activeStep, title, description, tag, setTitle, setDescription, setTag, selectedHumanNeeds, setSelectedHumanNeeds, selectedMarketAssessments, setSelectedMarketAssessments, selectedFormOfValues, setSelectedFormOfValues }: StepContentProps) {

    if (activeStep === 0) {
        return (
            <IdeaStep
                title={title}
                description={description}
                tag={tag}
                setTitle={setTitle}
                setDescription={setDescription}
                setTag={setTag}
            />
        );
    } else if (activeStep === 1) {
        return (
            <HumanNeedsStep
                humanNeeds={humanNeeds}
                selectedNeeds={selectedHumanNeeds}
                onToggleNeed={(id) => {
                    setSelectedHumanNeeds(prev =>
                        prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
                    );
                }}
            />
        );
    } else if (activeStep === 2) {
        return (
            <MarketAssessmentStep
                marketAssessments={marketAssessments}
                assessmentValues={selectedMarketAssessments}
                onChangeValue={(id, value) => {
                    setSelectedMarketAssessments(prev => ({ ...prev, [id]: value }));
                }}
            />
        );
    } else if (activeStep === 3) {
        return (
            <FormOfValueStep
                formOfValues={formOfValues}
                selectedValues={selectedFormOfValues}
                onToggleValue={(id) => {
                    setSelectedFormOfValues(prev =>
                        prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
                    );
                }}
            />
        );
    } else if (activeStep === 4) {
        return (
            <AssociationStep
                onChangeValue={(id, value) => {
                    setSelectedAssociations(prev => ({ ...prev, [id]: value }));
                }}
            />
        );
    }
    return (
        <ContentLoader />
    );
}