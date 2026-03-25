"use client";

import { Box, Stack } from "@mui/material";
import BackButton from "../atoms/buttons/backButton";
import DeleteButton from "../atoms/buttons/deleteButton";
import EditButton from "../atoms/buttons/editButton";
import DeleteScriptDialog from "../molecules/dialogs/deleteScriptDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/utils/supabase";


interface TopBarViewProps {
    id: string;
    table: string;
}

export default function TopBarView({ id, table }: TopBarViewProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingProblem, setDeletingProblem] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleDeleteProblem = async () => {
        if (!id) return;
        setDeletingProblem(true);
        try {
            const { error: dError } = await supabase.from(table).delete().eq('id', id);
            if (dError) throw dError;
            router.push(`/${table}`);
        } catch (err: any) {
            setError("Erreur lors de la suppression : " + err.message);
            setDeleteDialogOpen(false);
        } finally {
            setDeletingProblem(false);
        }
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <BackButton title="Retour" link={`/${table}`} />
            <Stack direction="row" spacing={1}>
                <DeleteButton title="Supprimer" onClick={() => setDeleteDialogOpen(true)} />
                <EditButton title="Éditer" link={`/${table}/${id}/edit`} />

                <DeleteScriptDialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    onConfirm={handleDeleteProblem}
                    loading={deletingProblem}
                />
            </Stack>
        </Box>
    );
}