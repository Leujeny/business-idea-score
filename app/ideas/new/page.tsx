"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Paper,
    Stack,
    Alert,
    CircularProgress
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import TopPageTitle from "@/components/atoms/typographies/topPageTitle";
import TopPageSubtitle from "@/components/atoms/typographies/topPageSubtitle";
import InputText from "@/components/atoms/forms/inputText";

export default function NewIdeaPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
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
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
            <Link href="/ideas" style={{ display: "inline-block", marginBottom: 16 }}>
                ← Retour à l'accueil
            </Link>

            <TopPageTitle title="Ajouter une nouvelle idée" />
            <TopPageSubtitle title="Créez une nouvelle idée." />

            <Paper sx={{ p: 4, mt: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <InputText
                            value={title}
                            setValue={setTitle}
                            label="Titre de l'idée"
                            placeholder="ex: Isolation 1€, Pompe à chaleur..."
                        />
                        <InputText
                            value={description}
                            setValue={setDescription}
                            label="Description"
                            placeholder="Décrivez brièvement l'objectif de ce script."
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
                                {loading ? "Création..." : "Créer l'idée"}
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={() => router.push('/ideas')}
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
