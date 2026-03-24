"use client";

import React, { useState, useEffect } from "react";
import { Box, Paper, CircularProgress } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import BackButton from "@/components/atoms/buttons/backButton";
import FormStepper from "@/components/molecules/formStepper";
import { IDEA_STEPS } from "@/datas/ideaStep";
import StepContent from "@/components/organisms/stepContent";

export default function EditIdeaPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

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
    const [fetching, setFetching] = useState(true);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (!id) return;
        const fetchIdea = async () => {
            try {
                const { data, error } = await supabase.from('ideas').select('*').eq('id', id).single();
                if (error) throw error;
                if (data) {
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                    setTag(data.tag || "");
                }

                // Fetch human needs
                const { data: needsData, error: needsError } = await supabase.from('human_needs').select('need_id').eq('idea_id', id);
                if (!needsError && needsData) {
                    setSelectedHumanNeeds(needsData.map((n: any) => n.need_id));
                }

                // Fetch market assessments
                const { data: marketData, error: marketError } = await supabase
                    .from('market_assessments')
                    .select('market_id, rating')
                    .eq('idea_id', id);

                if (!marketError && marketData) {
                    const assessments: Record<number, number> = {};
                    marketData.forEach((m: any) => {
                        assessments[m.market_id] = m.rating;
                    });
                    setSelectedMarketAssessments(assessments);
                }

                // Fetch form of values
                const { data: formValuesData, error: formValuesError } = await supabase
                    .from('form_values')
                    .select('form_id')
                    .eq('idea_id', id);

                if (!formValuesError && formValuesData) {
                    setSelectedFormOfValues(formValuesData.map((f: any) => f.form_id));
                }
            } catch (err: any) {
                console.error("Error fetching idea:", err);
                setError(err.message || "Impossible de charger l'idée.");
            } finally {
                setFetching(false);
            }
        };
        fetchIdea();
    }, [id]);

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error: sbError } = await supabase.from('ideas').update({
                title: title,
                description: description,
                tag: tag,
                rating: Object.values(selectedMarketAssessments).reduce((acc, curr) => acc + curr, 0)
            }).eq('id', id).select('id').single();
            if (sbError) throw sbError;

            // Delete existing relations
            await supabase.from('human_needs').delete().eq('idea_id', id);
            await supabase.from('market_assessments').delete().eq('idea_id', id);
            await supabase.from('form_values').delete().eq('idea_id', id);

            // Re-insert with new data
            if (selectedHumanNeeds.length > 0) {
                const { error: needsError } = await supabase.from('human_needs').insert(selectedHumanNeeds.map((needId) => ({ idea_id: data.id, need_id: needId })));
                if (needsError) throw needsError;
            }

            const marketAssessmentsToInsert = Object.entries(selectedMarketAssessments).map(([marketId, value]) => ({ idea_id: data.id, market_id: Number(marketId), rating: value }));
            if (marketAssessmentsToInsert.length > 0) {
                const { error: marketAssessmentError } = await supabase.from('market_assessments').insert(marketAssessmentsToInsert);
                if (marketAssessmentError) throw marketAssessmentError;
            }

            if (selectedFormOfValues.length > 0) {
                const { error: formOfValueError } = await supabase.from('form_values').insert(selectedFormOfValues.map((formId) => ({ idea_id: data.id, form_id: formId })));
                if (formOfValueError) throw formOfValueError;
            }

            // Success: redirect to the idea page
            router.push(`/ideas/${id}`);
            router.refresh();
        } catch (err: any) {
            console.error("Error updating idea:", err);
            setError(err.message || "Une erreur est survenue lors de la modification de l'idée.");
        } finally {
            setLoading(false);
        }
    };

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
