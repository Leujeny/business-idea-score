"use client";

import { useState } from "react";
import { Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import FormStepper from "@/components/molecules/formStepper";
import StepContent from "@/components/organisms/stepContent";
import { IDEA_STEPS } from "@/datas/ideaStep";
import BackButton from "@/components/atoms/buttons/backButton";

export default function NewIdeaPage() {
    const router = useRouter();
    // ------------ form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    // Human Needs
    const [selectedHumanNeeds, setSelectedHumanNeeds] = useState<number[]>([]);
    // Market Assessment
    const [selectedMarketAssessments, setSelectedMarketAssessments] = useState<Record<number, number>>({});
    // Form of Value
    const [selectedFormOfValues, setSelectedFormOfValues] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeStep, setActiveStep] = useState(0);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error: sbError } = await supabase.from('ideas').insert([{
                title: title,
                description: description,
                tag: tag,
                rating: Object.values(selectedMarketAssessments).reduce((acc, curr) => acc + curr, 0)
            }]).select('id').single();
            if (sbError) throw sbError;

            const { error: needsError } = await supabase.from('human_needs').insert(selectedHumanNeeds.map((id) => ({ idea_id: data.id, need_id: id })));
            if (needsError) throw needsError;

            const marketAssessmentsToInsert = Object.entries(selectedMarketAssessments).map(([id, value]) => ({ idea_id: data.id, market_id: Number(id), rating: value }));
            const { error: marketAssessmentError } = await supabase.from('market_assessments').insert(marketAssessmentsToInsert);
            if (marketAssessmentError) throw marketAssessmentError;

            const { error: formOfValueError } = await supabase.from('form_values').insert(selectedFormOfValues.map((id) => ({ idea_id: data.id, form_id: id })));
            if (formOfValueError) throw formOfValueError;

            router.push('/ideas');
            router.refresh();
        } catch (err: any) {
            console.error("Error adding idea:", err);
            setError(err.message || "Une erreur est survenue lors de l'ajout de l'idée.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <BackButton title="Retour" link="/ideas" />
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 1 }}>
                <TopPageTitle title="Ajouter une nouvelle idée" />
                <TopPageSubtitle title="Créez une nouvelle idée." />
                <FormStepper steps={IDEA_STEPS} activeStep={activeStep} setActiveStep={setActiveStep} handleSubmit={handleSubmit}>
                    <Paper sx={{ p: 4, mt: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                        <form>
                            <StepContent
                                activeStep={activeStep}
                                title={title}
                                description={description}
                                tag={tag}
                                setTitle={setTitle}
                                setDescription={setDescription}
                                setTag={setTag}
                                selectedHumanNeeds={selectedHumanNeeds}
                                setSelectedHumanNeeds={setSelectedHumanNeeds}
                                selectedMarketAssessments={selectedMarketAssessments}
                                setSelectedMarketAssessments={setSelectedMarketAssessments}
                                selectedFormOfValues={selectedFormOfValues}
                                setSelectedFormOfValues={setSelectedFormOfValues}
                            />
                        </form>
                    </Paper>
                </FormStepper>
            </Box>
        </>
    );
}
