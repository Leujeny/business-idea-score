"use client";

import React, { useState } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import BackButton from "@/components/atoms/buttons/backButton";
import FormStepper from "@/components/molecules/formStepper";
import { IDEA_STEPS } from "@/datas/ideaStep";
import StepContent from "@/components/organisms/stepContent";
import { useIdeaForm } from "@/hook/useIdeaForm";

export default function EditIdeaPage() {
    const params = useParams();
    const id = params.id as string;
    const { state, setters, loading, fetching, error, saveIdea } = useIdeaForm(id);

    const [activeStep, setActiveStep] = useState(0);

    if (fetching) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <BackButton title="Retour" link={`/ideas/${id}`} />
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
