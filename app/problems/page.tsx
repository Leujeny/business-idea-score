"use client";

import { useEffect, useState, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { supabase } from "@/utils/supabase";
import MainTemplate from "@/components/templates/mainTemplate";
import ProblemCard from "@/components/molecules/cards/problemCard";
import TagBar from "@/components/organisms/tagBar/tagBar";

export default function Problems() {
    const [scripts, setScripts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const fetchScripts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('problems')
            .select('*')
            .order('created_at', { ascending: true });

        if (data) setScripts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchScripts();
    }, []);

    const tags = useMemo(() => {
        const allTags = scripts.map(s => s.tag).filter(Boolean);
        return Array.from(new Set(allTags));
    }, [scripts]);

    const filteredScripts = useMemo(() => {
        if (!selectedTag) return scripts;
        return scripts.filter(s => s.tag === selectedTag);
    }, [scripts, selectedTag]);

    return (
        <MainTemplate
            pageTitle={"Mes problèmes"} pageSubtitle={"La liste des problèmes"}
            loading={loading} datas={scripts}
            addLink={"/problems/new"} addTitle={"Ajouter un problème"} emptyMessage={"Aucun problème trouvé"}>
            <TagBar tags={tags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
            <Grid container spacing={2}>
                {filteredScripts.map((card) => (
                    <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <ProblemCard title={card.title} description={card.description} href={`/problems/${card.id}`} tag={card.tag} />
                    </Grid>
                ))}
            </Grid>

        </MainTemplate>
    );
}
