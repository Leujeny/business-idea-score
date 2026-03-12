import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import TabTitle from "../../atoms/typographies/tabBlockTitle";
import TabSubtitle from "../../atoms/typographies/tabBlockSubtitle";
import BoxTabBlock from "../../atoms/boxTabBlock";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { supabase } from "@/utils/supabase";
import QuickAddObjectionDialog from "../dialogs/quickAddObjectionDialog";
import TreeNode from "@/components/molecules/nodes/treeNode";
import IntroNode from "../nodes/introNode";
import IntroductionDialog from "../dialogs/introductionDialog";

interface FlowTreeTabBlockProps {
    objections: any[];
    followUps: any[];
    blocks: any[];
    scriptId: string;
    introBlockId: number | null;
    handleToggleFollowUp: (parentId: string, childId: string) => void;
    onToggleInitial: (id: string, currentStatus: boolean) => void;
    // Creation handlers
    handleAddObjection: () => Promise<void>;
    handleAddBlock: () => Promise<void>;
    newObjectionId: string;
    setNewObjectionId: (val: string) => void;
    newObjectionText: string;
    setNewObjectionText: (val: string) => void;
    newBlockText: string;
    setNewBlockText: (val: string) => void;
    selectedBlocks: number[];
    toggleBlockSelection: (id: number) => void;
    savingObjection: boolean;
    savingBlock: boolean;
    // Update handlers
    handleUpdateObjection: (id: string, text: string, isInitial: boolean, blockIds: number[]) => Promise<void>;
    handleUpdateBlock: (id: number, text: string, isConclusion?: boolean) => Promise<void>;
    handleUpdateIntroBlock: (blockId: number | null) => Promise<void>;
}

export default function FlowTreeTabBlock({
    objections,
    followUps,
    blocks,
    scriptId,
    introBlockId,
    handleToggleFollowUp,
    onToggleInitial,
    handleAddObjection,
    handleAddBlock,
    newObjectionId,
    setNewObjectionId,
    newObjectionText,
    setNewObjectionText,
    newBlockText,
    setNewBlockText,
    selectedBlocks,
    toggleBlockSelection,
    savingObjection,
    savingBlock,
    handleUpdateObjection,
    handleUpdateBlock,
    handleUpdateIntroBlock
}: FlowTreeTabBlockProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [dialogOpen, setDialogOpen] = useState(false);
    const [introDialogOpen, setIntroDialogOpen] = useState(false);
    const [introText, setIntroText] = useState("");
    const [savingIntro, setSavingIntro] = useState(false);
    const [targetParentId, setTargetParentId] = useState<string | null>(null);

    const roots = objections.filter(o => o.is_initial);
    const nonRoots = objections.filter(o => !o.is_initial);

    const handleOpenQuickAdd = (parentId: string | null) => {
        setTargetParentId(parentId);
        setDialogOpen(true);
    };

    const handleQuickAddSuccess = async (newId: string) => {
        if (targetParentId && targetParentId !== 'INTRO') {
            await handleToggleFollowUp(targetParentId, newId);
        } else {
            // If intro or no parent, it's a root/initial point
            await onToggleInitial(newId, false);
        }
        setDialogOpen(false);
    };

    const handleCreateIntro = async () => {
        if (!introText.trim()) return;
        setSavingIntro(true);
        try {
            // Repurpose hook's newBlockText and handleAddBlock
            // Actually, handleAddBlock doesn't return the ID, so we do it manually or modify it.
            // Let's do it manually since we have supabase access via hooks being passed or imported.
            // But wait, it's better to use the script details hook.
            // Let's assume we can use supabase directly here as well if needed.

            // Get the script_id from objections or blocks if possible, or just parse it from URL.
            // But wait, useBlocks already has scriptId.
            // Let's just do the insert here:
            const { data, error: bError } = await supabase
                .from('response_blocks')
                .insert([{ text: introText, script_id: scriptId }]) // Fallback to finding script_id
                .select()
                .single();

            if (bError) throw bError;

            await handleUpdateIntroBlock(data.id);
            setIntroDialogOpen(false);
            setIntroText("");
            // Refreshing blocks will be handled by the hook
        } catch (err: any) {
            console.error("Intro creation error:", err);
        } finally {
            setSavingIntro(false);
        }
    };


    return (
        <BoxTabBlock>
            <TabTitle title="Structure de la Conversation (Arbre)" />
            <TabSubtitle title="Visualisez et gérez l'enchaînement des objections sous forme d'arbre." />

            <Stack spacing={4} sx={{ mt: 3 }}>
                {/* Available Pool */}
                {/* <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 1, display: 'block', color: 'text.secondary' }}>
                        BIBLIOTHÈQUE D'OBJECTIONS (Cliquez pour marquer comme point d'entrée)
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {nonRoots.map(obj => (
                            <Chip
                                key={obj.id}
                                label={obj.id}
                                onClick={() => onToggleInitial(obj.id, false)}
                                variant="outlined"
                                size="small"
                                icon={<AddIcon fontSize="small" />}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<AddCircleIcon fontSize="small" />}
                            onClick={() => handleOpenQuickAdd(null)}
                            sx={{ m: 0.5, textTransform: 'none', fontSize: '0.75rem' }}
                        >
                            Nouvelle Objection
                        </Button>
                    </Stack>
                </Paper> */}

                <Divider>
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        FLUX DE CONVERSATION
                    </Typography>
                </Divider>

                <Box sx={{ pl: 2 }}>
                    {objections.length === 0 && !introBlockId ? (
                        <Box sx={{ textAlign: 'center', py: 6, borderRadius: 2, border: '2px dashed', borderColor: 'grey.300' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Arbre de conversation vide
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Commencez par créer l'introduction du script pour visualiser la structure.
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddCircleIcon />}
                                onClick={() => setIntroDialogOpen(true)}
                            >
                                Créer l'introduction
                            </Button>
                        </Box>
                    ) : introBlockId ? (
                        <IntroNode
                            text={blocks.find(b => b.id === introBlockId)?.text || "Texte d'introduction non trouvé"}
                            introBlockId={introBlockId}
                            roots={roots}
                            objections={objections}
                            followUps={followUps}
                            blocks={blocks}
                            handleToggleFollowUp={handleToggleFollowUp}
                            onToggleInitial={onToggleInitial}
                            onAddObjection={handleOpenQuickAdd}
                            handleUpdateIntroBlock={handleUpdateIntroBlock}
                            handleUpdateObjection={handleUpdateObjection}
                            handleUpdateBlock={handleUpdateBlock}
                            isMobile={isMobile}
                        />
                    ) : roots.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                                Aucun message d'introduction ni point de départ défini.
                            </Typography>
                            <Button variant="outlined" onClick={() => handleOpenQuickAdd(null)}>
                                Ajouter une objection de départ
                            </Button>
                        </Box>
                    ) : (
                        <Stack spacing={4}>
                            {roots.map(root => (
                                <TreeNode
                                    key={root.id}
                                    node={root}
                                    objections={objections}
                                    followUps={followUps}
                                    blocks={blocks}
                                    handleToggleFollowUp={handleToggleFollowUp}
                                    onToggleInitial={onToggleInitial}
                                    onAddObjection={handleOpenQuickAdd}
                                    handleUpdateObjection={handleUpdateObjection}
                                    handleUpdateBlock={handleUpdateBlock}
                                    depth={0}
                                    isMobile={isMobile}
                                />
                            ))}
                        </Stack>
                    )}
                </Box>
            </Stack>
            <IntroductionDialog
                introDialogOpen={introDialogOpen}
                setIntroDialogOpen={setIntroDialogOpen}
                introText={introText}
                setIntroText={setIntroText}
                handleCreateIntro={handleCreateIntro}
                savingIntro={savingIntro}
            />

            <QuickAddObjectionDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSuccess={handleQuickAddSuccess}
                blocks={blocks}
                handleAddObjection={handleAddObjection}
                handleAddBlock={handleAddBlock}
                newId={newObjectionId}
                setNewId={setNewObjectionId}
                newText={newObjectionText}
                setNewText={setNewObjectionText}
                newBlockText={newBlockText}
                setNewBlockText={setNewBlockText}
                selectedBlocks={selectedBlocks}
                toggleBlockSelection={toggleBlockSelection}
                savingObjection={savingObjection}
                savingBlock={savingBlock}
            />
        </BoxTabBlock>
    );
}