"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Paper,
    Stack,
    Alert,
    CircularProgress
} from "@mui/material";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import InputText from "@/components/atoms/forms/inputText";

export default function EditProblemPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchProblem = async () => {
            try {
                const { data, error } = await supabase
                    .from('problems')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                    setTag(data.tag || "");
                }
            } catch (err: any) {
                console.error("Error fetching problem:", err);
                setError(err.message || "Impossible de charger le problème.");
            } finally {
                setFetching(false);
            }
        };
        fetchProblem();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: sbError } = await supabase
                .from('problems')
                .update({ title, description, tag })
                .eq('id', id);

            if (sbError) throw sbError;

            // Success: redirect to the idea page
            router.push(`/problems/${id}`);
            router.refresh();
        } catch (err: any) {
            console.error("Error updating problem:", err);
            setError(err.message || "Une erreur est survenue lors de la modification du problème.");
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
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Link href={`/problems/${id}`} style={{ display: "inline-block", marginBottom: 16 }}>
                ← Retour au problème
            </Link>

            <TopPageTitle title="Éditer le problème" />
            <TopPageSubtitle title="Modifiez les informations du problème." />

            <Paper sx={{ p: 4, mt: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <InputText
                            value={title}
                            setValue={setTitle}
                            label="Titre du problème"
                            placeholder="ex: Isolation 1€, Pompe à chaleur..."
                        />
                        <InputText
                            value={description}
                            setValue={setDescription}
                            label="Description"
                            placeholder="Décrivez brièvement le problème."
                            multiline
                            rows={10}
                        />
                        <InputText
                            value={tag}
                            setValue={setTag}
                            label="Tag / Catégorie"
                            placeholder="ex: Énergie, Administratif..."
                        />

                        <Box sx={{ pt: 2, display: 'flex', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} color="inherit" />}
                            >
                                {loading ? "Modification..." : "Enregistrer les modifications"}
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => router.push(`/problems/${id}`)}
                                disabled={loading}
                            >
                                Annuler
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
