import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

const uneSemaineGrossoModo = new Date();
uneSemaineGrossoModo.setDate(uneSemaineGrossoModo.getDate() - 7);

export const useHome = () => {

    const [scripts, setScripts] = useState<any[]>([]);
    const [scripts2, setScripts2] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const fetchScripts = async () => {
        setLoading(true);

        const { data: topData, error: topError } = await supabase
            .from('ideas')
            .select('*')
            .order('rating', { ascending: false })
            .limit(5);

        if (topData) setScripts(topData);

        // 1. Récupération des idées avec ajout du type "idea"
        const { data: ideasData } = await supabase
            .from('ideas')
            .select('id, title, updated_at, tag')
            .gte('updated_at', uneSemaineGrossoModo.toISOString());

        // On transforme les données pour ajouter la propriété 'type'
        const ideasWithType = (ideasData || []).map(item => ({
            ...item,
            type: 'ideas' // On met 'ideas' au pluriel pour correspondre à ton URL /ideas/id
        }));

        // 2. Récupération des problèmes avec ajout du type "problems"
        const { data: problemsData } = await supabase
            .from('problems')
            .select('id, title, updated_at, tag')
            .gte('updated_at', uneSemaineGrossoModo.toISOString());

        const problemsWithType = (problemsData || []).map(item => ({
            ...item,
            type: 'problems'
        }));

        // 3. Fusion et Tri global par date
        const combined = [...ideasWithType, ...problemsWithType];

        const sortedData = combined.sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        setScripts2(sortedData);

        if (topError) {
            console.error("Erreur Supabase:", topError);
        }
    };
    useEffect(() => {
        fetchScripts();
    }, []);

    return {
        state: { scripts, scripts2, loading, open },
        setters: { fetchScripts, setOpen },
    };
};