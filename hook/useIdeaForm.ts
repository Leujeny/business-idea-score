import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

type MarketAssessments = Record<number, number>;

const computeRating = (assessments: MarketAssessments) =>
    Object.values(assessments).reduce((acc, curr) => acc + curr, 0);

export const useIdeaForm = (id?: string) => {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [selectedHumanNeeds, setSelectedHumanNeeds] = useState<number[]>([]);
    const [selectedMarketAssessments, setSelectedMarketAssessments] = useState<MarketAssessments>({});
    const [selectedFormOfValues, setSelectedFormOfValues] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [error, setError] = useState<string | null>(null);

    // --- CHARGEMENT (Mode Edition uniquement) ---
    useEffect(() => {
        if (!id) return;

        const fetchIdeaData = async () => {
            try {
                const [ideaRes, needsRes, marketRes, formsRes] = await Promise.all([
                    supabase.from("ideas").select("*").eq("id", id).single(),
                    supabase.from("human_needs").select("need_id").eq("idea_id", id),
                    supabase.from("market_assessments").select("market_id, rating").eq("idea_id", id),
                    supabase.from("form_values").select("form_id").eq("idea_id", id),
                ]);

                if (ideaRes.error) throw ideaRes.error;

                setTitle(ideaRes.data.title ?? "");
                setDescription(ideaRes.data.description ?? "");
                setTag(ideaRes.data.tag ?? "");
                if (needsRes.data) setSelectedHumanNeeds(needsRes.data.map((n) => n.need_id));
                if (formsRes.data) setSelectedFormOfValues(formsRes.data.map((f) => f.form_id));
                if (marketRes.data) {
                    const assessments: MarketAssessments = {};
                    marketRes.data.forEach((m) => (assessments[m.market_id] = m.rating));
                    setSelectedMarketAssessments(assessments);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setFetching(false);
            }
        };

        fetchIdeaData();
    }, [id]);

    // --- SAUVEGARDE DES RELATIONS ---
    const saveRelations = async (ideaId: string) => {
        await Promise.all([
            supabase.from("human_needs").delete().eq("idea_id", ideaId),
            supabase.from("market_assessments").delete().eq("idea_id", ideaId),
            supabase.from("form_values").delete().eq("idea_id", ideaId),
        ]);

        const inserts = [
            selectedHumanNeeds.length > 0 &&
            supabase.from("human_needs").insert(
                selectedHumanNeeds.map((needId) => ({ idea_id: ideaId, need_id: needId }))
            ),
            Object.keys(selectedMarketAssessments).length > 0 &&
            supabase.from("market_assessments").insert(
                Object.entries(selectedMarketAssessments).map(([marketId, rating]) => ({
                    idea_id: ideaId,
                    market_id: Number(marketId),
                    rating,
                }))
            ),
            selectedFormOfValues.length > 0 &&
            supabase.from("form_values").insert(
                selectedFormOfValues.map((formId) => ({ idea_id: ideaId, form_id: formId }))
            ),
        ].filter(Boolean);

        const results = await Promise.all(inserts);
        for (const res of results) {
            if (res && (res as any).error) throw (res as any).error;
        }
    };

    // --- SAUVEGARDE (Create ou Update) ---
    const saveIdea = async () => {
        setLoading(true);
        setError(null);

        try {
            const ideaPayload = {
                title,
                description,
                tag,
                rating: computeRating(selectedMarketAssessments),
            };

            let ideaId: string;

            if (id) {
                // Mode UPDATE
                const { error: sbError } = await supabase.from("ideas").update(ideaPayload).eq("id", id);
                if (sbError) throw sbError;
                ideaId = id;
            } else {
                // Mode CREATE
                const { data, error: sbError } = await supabase.from("ideas").insert(ideaPayload).select("id").single();
                if (sbError) throw sbError;
                ideaId = data.id;
            }

            await saveRelations(ideaId);

            router.push(`/ideas/${ideaId}`);
            router.refresh();
        } catch (err: any) {
            console.error("Error saving idea:", err);
            setError(err.message ?? "Une erreur est survenue lors de la sauvegarde de l'idée.");
        } finally {
            setLoading(false);
        }
    };

    return {
        state: { title, description, tag, selectedHumanNeeds, selectedMarketAssessments, selectedFormOfValues },
        setters: { setTitle, setDescription, setTag, setSelectedHumanNeeds, setSelectedMarketAssessments, setSelectedFormOfValues },
        loading, fetching, error, saveIdea,
    };
};