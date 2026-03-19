"use client";

import { FormEvent, useState } from "react";
import { Box, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import FormStepper from "@/components/molecules/formStepper";
import StepContent from "@/components/organisms/stepContent";
import { IDEA_STEPS } from "@/datas/ideaStep";

export default function NewIdeaPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ------------ stepper
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    // ------------

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: sbError } = await supabase
                .from('ideas')
                .insert([
                    { title, description, tag }
                ])
                .select();

            if (sbError) throw sbError;

            // Success: redirect to home
            router.push('/ideas');
            router.refresh(); // Ensure the home page refetches
        } catch (err: any) {
            console.error("Error adding script:", err);
            setError(err.message || "Une erreur est survenue lors de l'ajout du script.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Link href="/ideas" style={{ display: "inline-block", marginBottom: 12 }}>
                ← Retour à l'accueil
            </Link>
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 1 }}>
                <TopPageTitle title="Ajouter une nouvelle idée" />
                <TopPageSubtitle title="Créez une nouvelle idée." />
                <FormStepper steps={IDEA_STEPS} activeStep={activeStep} setSkipped={setSkipped} setActiveStep={setActiveStep} skipped={skipped}>
                    <Paper sx={{ p: 4, mt: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                        <form onSubmit={handleSubmit}>
                            <StepContent
                                activeStep={activeStep}
                                title={title}
                                description={description}
                                tag={tag}
                                setTitle={setTitle}
                                setDescription={setDescription}
                                setTag={setTag}
                                error={error}
                                loading={loading}
                            />
                        </form>
                    </Paper>
                </FormStepper>

            </Box>
        </>
    );
}
