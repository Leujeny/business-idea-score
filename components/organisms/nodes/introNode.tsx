'use client';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TreeNode from "@/components/molecules/nodes/treeNode";
import { useEffect, useState } from "react";
import AddContinuationButton from "@/components/atoms/buttons/addContinuationButton";
import EditIntroductionDialog from "../dialogs/editIntroductionDialog";
import IntroNodePaper from "@/components/atoms/papers/introNodePapers";
import { Divider } from "@mui/material";

interface IntroNodeProps {
    text: string;
    introBlockId: number;
    roots: any[];
    objections: any[];
    followUps: any[];
    blocks: any[];
    handleToggleFollowUp: (parentId: string, childId: string) => void;
    onToggleInitial: (id: string, currentStatus: boolean) => void;
    onAddObjection: (type: string) => void;
    handleUpdateIntroBlock: (introBlockId: number, text: string) => void;
    handleUpdateObjection: (id: string, text: string, isInitial: boolean, blockIds: number[]) => Promise<void>;
    handleUpdateBlock: (id: number, text: string, isConclusion?: boolean | undefined) => Promise<void>;
    isMobile: boolean;
}

export default function IntroNode({ text, introBlockId, roots, objections, followUps, blocks, handleToggleFollowUp, onToggleInitial, onAddObjection, handleUpdateIntroBlock, handleUpdateObjection, handleUpdateBlock, isMobile }: IntroNodeProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState("");

    const handleSave = async () => {
        if (introBlockId) {
            await handleUpdateBlock(introBlockId, editedText);
        }
        setIsEditing(false);
    };

    useEffect(() => {
        setEditedText(text);
    }, [text]);

    return (
        <Box sx={{ position: 'relative' }}>
            <IntroNodePaper isMobile={isMobile}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                    <Typography variant="caption" color="success.main" sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}>
                        INTRODUCTION (Message principal)
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => setIsEditing(true)} color="success">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <EditIntroductionDialog isEditing={isEditing} setIsEditing={setIsEditing} editedText={editedText} setEditedText={setEditedText} handleSaveInfo={handleSave} savingIntro={false} />
                        <AddContinuationButton title="Nouvelle suite" onClick={() => onAddObjection('INTRO')} />
                    </Stack>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {text}
                </Typography>
            </IntroNodePaper>

            {roots.length > 0 && (
                <Box sx={{
                    pl: isMobile ? 2 : 6,
                    mt: 2,
                    borderLeft: isMobile ? 'none' : '2px dashed',
                    borderColor: 'success.light',
                    ml: isMobile ? 0 : 3,
                    position: 'relative'
                }}>
                    <Stack spacing={2}>
                        {roots.map((root: any) => (
                            <Box key={root.id} sx={{ position: 'relative' }}>
                                {!isMobile && (
                                    <Box sx={{
                                        position: 'absolute',
                                        left: -48,
                                        top: 24,
                                        width: 48,
                                        height: 2,
                                        borderTop: '2px dashed',
                                        borderColor: 'success.light'
                                    }} />
                                )}
                                <TreeNode
                                    node={root}
                                    objections={objections}
                                    followUps={followUps}
                                    blocks={blocks}
                                    handleToggleFollowUp={handleToggleFollowUp}
                                    onToggleInitial={onToggleInitial}
                                    onAddObjection={onAddObjection}
                                    handleUpdateObjection={handleUpdateObjection}
                                    handleUpdateBlock={handleUpdateBlock}
                                    depth={0}
                                    isMobile={isMobile}
                                />
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    );
}