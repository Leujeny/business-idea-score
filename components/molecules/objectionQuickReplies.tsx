"use client";

import React, { useState, useEffect } from "react";
import { Chip, Stack, Box, Button, Typography } from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UndoIcon from '@mui/icons-material/Undo';
import { supabase } from "@/utils/supabase";
import ChatBubble from "./chatBubble";
import ContentLoader from "./contentLoader";

interface ObjectionQuickRepliesProps {
    scriptId: string;
}

export default function ObjectionQuickReplies({ scriptId }: ObjectionQuickRepliesProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [introBlock, setIntroBlock] = useState<string | null>(null);
    const [objections, setObjections] = useState<any[]>([]);
    const [followUps, setFollowUps] = useState<any[]>([]);
    const [allBlocks, setAllBlocks] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFlowData = async () => {
            if (!scriptId) return;
            setLoading(true);
            try {
                // 1. Fetch Script (for intro_block_id)
                const { data: scriptData } = await supabase
                    .from('scripts')
                    .select('intro_block_id')
                    .eq('id', scriptId)
                    .single();

                // 2. Fetch all blocks for this script
                const { data: blocksData } = await supabase
                    .from('response_blocks')
                    .select('id, text')
                    .eq('script_id', scriptId);

                const blocksMap: Record<number, string> = {};
                blocksData?.forEach(b => blocksMap[b.id] = b.text);
                setAllBlocks(blocksMap);

                if (scriptData?.intro_block_id) {
                    setIntroBlock(blocksMap[scriptData.intro_block_id] || null);
                }

                // 3. Fetch all objections for this script + their responses
                const { data: objectionsData } = await supabase
                    .from('objections')
                    .select('*, objection_responses(block_id, position)')
                    .eq('script_id', scriptId);
                setObjections(objectionsData || []);

                // 4. Fetch follow-ups
                const { data: fuData } = await supabase
                    .from('follow_up_objections')
                    .select('*');
                setFollowUps(fuData || []);

            } catch (err) {
                console.error("Error fetching flow data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFlowData();
    }, [scriptId]);

    const handleClick = (objection: any) => {
        setHistory(prev => [...prev, objection]);
    };

    const handleUndo = () => {
        setHistory(prev => prev.slice(0, -1));
    };

    const handleReset = () => {
        setHistory([]);
    };

    if (loading) return <ContentLoader />;

    const lastObjection = history.length > 0 ? history[history.length - 1] : null;

    // Filter displayed objections:
    // If no history, show is_initial objections
    // If history, show follow-ups of the last objection
    const displayedObjections = lastObjection
        ? objections.filter(obj => followUps.some(fu => fu.parent_id === lastObjection.id && fu.child_id === obj.id))
        : objections.filter(obj => obj.is_initial);

    return (
        <Box sx={{ width: '100%' }}>
            {/* Introductory Message */}
            {introBlock ? (
                <ChatBubble sender="Moi" isUser>
                    {introBlock}
                </ChatBubble>
            ) : (
                <Typography color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                    Aucun message d'introduction défini pour ce script.
                </Typography>
            )}

            {/* Conversation History */}
            {history.map((objection, index) => {
                const responseText = (objection.objection_responses || [])
                    .sort((a: any, b: any) => a.position - b.position)
                    .map((r: any) => allBlocks[r.block_id] || "")
                    .join(" ");

                return (
                    <React.Fragment key={`${objection.id}-${index}`}>
                        <ChatBubble sender="Lui">
                            {objection.text}
                        </ChatBubble>
                        <ChatBubble sender="Moi" isUser>
                            {responseText}
                        </ChatBubble>
                    </React.Fragment>
                );
            })}

            {/* Current Options (Chips) */}
            <Box sx={{ mt: 2, p: 2, borderTop: history.length > 0 ? '1px dashed' : 'none', borderColor: 'divider' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {displayedObjections.map((obj) => (
                        <Chip
                            key={obj.id}
                            label={obj.text}
                            onClick={() => handleClick(obj)}
                            color="secondary"
                            variant="outlined"
                            clickable
                            sx={{
                                fontWeight: "medium",
                                fontSize: "1.05rem",
                                py: { xs: 0, md: 1 },
                                height: 'auto',
                                '& .MuiChip-label': {
                                    display: 'block',
                                    whiteSpace: 'normal',
                                    px: 2,
                                    py: 1,
                                },
                                "&:hover": {
                                    bgcolor: 'rgba(156, 39, 176, 0.04)',
                                    color: 'secondary.main',
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                },
                                transition: "all 0.2s"
                            }}
                        />
                    ))}
                    {displayedObjections.length === 0 && (
                        <Typography variant="body2" color="text.secondary">
                            Fin de la conversation ou aucune suite prévue.
                        </Typography>
                    )}
                </Stack>

                {/* Control Buttons */}
                {history.length > 0 && (
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button
                            size="small"
                            startIcon={<UndoIcon />}
                            onClick={handleUndo}
                            color="inherit"
                            sx={{ fontSize: '0.75rem', opacity: 0.7 }}
                        >
                            Dernière étape
                        </Button>
                        <Button
                            size="small"
                            startIcon={<RestartAltIcon />}
                            onClick={handleReset}
                            color="inherit"
                            sx={{ fontSize: '0.75rem', opacity: 0.7 }}
                        >
                            Réinitialiser
                        </Button>
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
