"use client";

import { useState } from "react";
import { Box, Paper } from "@mui/material";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import FormStepper from "@/components/molecules/formStepper";
import StepContent from "@/components/organisms/stepContent";
import { IDEA_STEPS } from "@/datas/ideaStep";
import BackButton from "@/components/atoms/buttons/backButton";
import { useIdeaForm } from "@/hook/useIdeaForm";

export default function NewIdeaPage() {
    const { state, setters, loading, fetching, error, saveIdea } = useIdeaForm();

    const [activeStep, setActiveStep] = useState(0);


    return (
        <>
            <BackButton title="Retour" link="/ideas" />
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 1 }}>
                <TopPageTitle title="Ajouter une nouvelle idée" />
                <TopPageSubtitle title="Créez une nouvelle idée." />
                <FormStepper steps={IDEA_STEPS} activeStep={activeStep} setActiveStep={setActiveStep} handleSubmit={saveIdea}>
                    <Paper sx={{ p: 4, mt: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                        <form>
                            <StepContent
                                activeStep={activeStep}
                                title={state.title}
                                setTitle={setters.setTitle}
                                description={state.description}
                                setDescription={setters.setDescription}
                                tag={state.tag}
                                setTag={setters.setTag}
                                selectedHumanNeeds={state.selectedHumanNeeds}
                                setSelectedHumanNeeds={setters.setSelectedHumanNeeds}
                                selectedMarketAssessments={state.selectedMarketAssessments}
                                setSelectedMarketAssessments={setters.setSelectedMarketAssessments}
                                selectedFormOfValues={state.selectedFormOfValues}
                                setSelectedFormOfValues={setters.setSelectedFormOfValues}
                            />
                        </form>
                    </Paper>
                </FormStepper>
            </Box>
        </>
    );
}
