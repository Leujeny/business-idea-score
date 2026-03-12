'use client';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NodePaper from "@/components/atoms/papers/nodePapers";
import EditObjectionDialog from "@/components/organisms/dialogs/editObjectionDialog";
import ChildrenNode from "./childrenNode";
import NodeButttonsbar from "../nodeButtonsBar";

// TODO: fix the types
interface TreeNodeProps {
    node: any;
    objections: any;
    followUps: any;
    blocks: any;
    handleToggleFollowUp: any;
    onToggleInitial: any;
    onAddObjection: any;
    handleUpdateObjection: any;
    handleUpdateBlock: any;
    depth: any;
    isMobile: any;
}

export default function TreeNode({ node, objections, followUps, blocks, handleToggleFollowUp, onToggleInitial, onAddObjection, handleUpdateObjection, handleUpdateBlock, depth, isMobile }: TreeNodeProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isEditingObjection, setIsEditingObjection] = useState(false);
    const [editedObjectionText, setEditedObjectionText] = useState(node.text);
    const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
    const [editedBlockText, setEditedBlockText] = useState("");

    const childrenIds = followUps.filter((f: any) => f.parent_id === node.id).map((f: any) => f.child_id);
    const childrenNodes = objections.filter((o: any) => childrenIds.includes(o.id));

    // Get responses for this node
    const responseBlocks = node.objection_responses?.sort((a: any, b: any) => a.position - b.position).map((r: any) => blocks.find((b: any) => b.id === r.block_id)).filter(Boolean) || [];

    const handleAddClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSaveObjection = async () => {
        const blockIds = node.objection_responses?.sort((a: any, b: any) => a.position - b.position).map((r: any) => r.block_id) || [];
        await handleUpdateObjection(node.id, editedObjectionText, node.is_initial, blockIds);
        setIsEditingObjection(false);

        await handleUpdateBlock(editingBlockId, editedBlockText);
        setEditingBlockId(null);
    };

    const handleToggleConclusion = async (block: any) => {
        await handleUpdateBlock(block.id, block.text, !block.is_conclusion);
    };

    // Cycle detection or depth limit
    if (depth > 10) return <Typography variant="caption" color="error">Profondeur max atteinte</Typography>;

    return (
        <Box sx={{ position: 'relative' }}>
            <NodePaper isMobile={isMobile} depth={depth}>
                <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                    <Box sx={{ flex: 1 }}>
                        <NodeButttonsbar
                            depth={depth}
                            onToggleInitial={onToggleInitial}
                            node={node}
                            responseBlocks={responseBlocks}
                            handleAddClick={handleAddClick}
                            onAddObjection={onAddObjection}
                            setIsEditingObjection={setIsEditingObjection}
                            setEditingBlockId={setEditingBlockId}
                            setEditedBlockText={setEditedBlockText}
                            setIsCollapsed={setIsCollapsed}
                            isCollapsed={isCollapsed}
                            childrenNodes={childrenNodes}
                            handleToggleConclusion={handleToggleConclusion}
                        />
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 'bold', display: 'block', fontSize: '0.7rem' }}>
                                OBJECTION : {node.id.toUpperCase()}
                            </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1.5 }}>
                            "{node.text}"
                        </Typography>
                        <Divider sx={{ mb: 1.5 }} />

                        <Typography variant="caption" color="secondary.main" sx={{ fontWeight: 'bold', display: 'block', fontSize: '0.7rem', mb: 0.5 }}>
                            VOTRE RÉPONSE :
                        </Typography>
                        <Stack spacing={1}>
                            {responseBlocks.length > 0 ? responseBlocks.map((block: any, i: number) => (
                                <Box key={block.id}>
                                    <Stack direction="row" spacing={1} alignItems="flex-start">
                                        <Typography
                                            variant="body2"
                                            color={block.is_conclusion ? "error.main" : "text.secondary"}
                                            sx={{ fontSize: '0.85rem', fontStyle: 'italic', flex: 1, fontWeight: block.is_conclusion ? 'bold' : 'normal', whiteSpace: 'pre-wrap' }}
                                        >
                                            "{block.text}"
                                        </Typography>
                                    </Stack>
                                </Box>
                            )) : (
                                <Typography variant="caption" color="text.disabled">
                                    Aucun bloc de réponse configuré.
                                </Typography>
                            )}
                        </Stack>
                    </Box>
                </Stack>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{ sx: { maxHeight: 300, width: 250 } }}
                >
                    <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', fontWeight: 'bold', color: 'text.secondary' }}>
                        ENCHAÎNER SUR...
                    </Typography>
                    <Divider />
                    {objections
                        .filter((o: any) => o.id !== node.id && !childrenIds.includes(o.id))
                        .map((o: any) => (
                            <MenuItem key={o.id} onClick={() => {
                                handleToggleFollowUp(node.id, o.id);
                                handleClose();
                            }}>
                                <Typography variant="body2" noWrap>
                                    <strong>{o.id}</strong> - {o.text}
                                </Typography>
                            </MenuItem>
                        ))}
                    {objections.filter((o: any) => o.id !== node.id && !childrenIds.includes(o.id)).length === 0 && (
                        <MenuItem disabled>Aucun enchaînement possible</MenuItem>
                    )}
                </Menu>
            </NodePaper>

            {childrenNodes.length > 0 && !isCollapsed && (
                <ChildrenNode
                    isMobile={isMobile}
                    depth={depth}
                    childrenNodes={childrenNodes}
                    handleToggleFollowUp={handleToggleFollowUp}
                    node={node}
                    objections={objections}
                    followUps={followUps}
                    blocks={blocks}
                    onToggleInitial={onToggleInitial}
                    onAddObjection={onAddObjection}
                    handleUpdateObjection={handleUpdateObjection}
                    handleUpdateBlock={handleUpdateBlock}
                />
            )}
            {/* TODO: Maybe put it outside of the component, so outside the loop */}
            <EditObjectionDialog
                isEditingObjection={isEditingObjection}
                setIsEditingObjection={setIsEditingObjection}
                editedObjectionText={editedObjectionText}
                setEditedObjectionText={setEditedObjectionText}
                handleSaveObjection={handleSaveObjection}
                savingObjection={false}
                editedBlockText={editedBlockText}
                setEditedBlockText={setEditedBlockText}
            />
        </Box>
    );
}