import { Box, Chip } from "@mui/material";
import BoxTabBlock from "../../atoms/boxTabBlock";
import TabSubtitle from "../../atoms/typographies/tabBlockSubtitle";
import TabTitle from "../../atoms/typographies/tabBlockTitle";
import FormPaperTabBlock from "../../atoms/formPaperTabBlock";
import InputText from "../../atoms/forms/inputText";
import { Button, Stack, List, Paper, Typography, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

interface ObjectionTabBlockProps {
    blocks: any[];
    objections: any[];
    newObjectionId: string;
    setNewObjectionId: (id: string) => void;
    newObjectionText: string;
    setNewObjectionText: (text: string) => void;
    newObjectionIsInitial: boolean;
    setNewObjectionIsInitial: (isInitial: boolean) => void;
    selectedBlocks: number[];
    toggleBlockSelection: (blockId: number) => void;
    handleAddObjection: () => void;
    handleUpdateObjection: (id: string, text: string, isInitial: boolean, blockIds: number[]) => void;
    handleDeleteObjection: (objectionId: string) => void;
    savingObjection: boolean;
}

export default function ObjectionTabBlock({
    blocks,
    objections,
    newObjectionId,
    setNewObjectionId,
    newObjectionText,
    setNewObjectionText,
    newObjectionIsInitial,
    setNewObjectionIsInitial,
    selectedBlocks,
    toggleBlockSelection,
    handleAddObjection,
    handleDeleteObjection,
    handleUpdateObjection,
    savingObjection,
}: ObjectionTabBlockProps) {
    const [editingObjectionId, setEditingObjectionId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState("");
    const [editingIsInitial, setEditingIsInitial] = useState(false);
    const [editingBlocks, setEditingBlocks] = useState<number[]>([]);

    const startEditing = (obj: any) => {
        setEditingObjectionId(obj.id);
        setEditingText(obj.text);
        setEditingIsInitial(obj.is_initial);
        setEditingBlocks(obj.objection_responses?.map((r: any) => r.block_id) || []);
    };

    const handleSave = async () => {
        if (!editingObjectionId) return;
        await handleUpdateObjection(editingObjectionId, editingText, editingIsInitial, editingBlocks);
        setEditingObjectionId(null);
    };

    const toggleEditingBlockSelection = (blockId: number) => {
        setEditingBlocks(prev =>
            prev.includes(blockId)
                ? prev.filter(id => id !== blockId)
                : [...prev, blockId]
        );
    };
    return (
        <BoxTabBlock>
            <TabTitle title="Gestion des Objections" />
            <TabSubtitle title="Créez les objections et assemblez les blocs de réponse ci-dessous." />

            <FormPaperTabBlock>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <InputText
                            label="ID Unique"
                            placeholder="ex: pas-interesse"
                            size="small"
                            value={newObjectionId}
                            setValue={setNewObjectionId}
                        />
                        <InputText
                            label="Texte de l'objection"
                            placeholder="ex: Je ne suis pas intéressé."
                            size="small"
                            value={newObjectionText}
                            setValue={setNewObjectionText}
                        />
                    </Stack>

                    <Box>
                        <Typography variant="subtitle2" gutterBottom>Sélectionnez les blocs pour la réponse (dans l'ordre) :</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {blocks.map(block => (
                                <Chip
                                    key={block.id}
                                    label={block.text.substring(0, 30) + (block.text.length > 30 ? '...' : '')}
                                    onClick={() => toggleBlockSelection(block.id)}
                                    color={selectedBlocks.includes(block.id) ? "primary" : "default"}
                                    variant={selectedBlocks.includes(block.id) ? "filled" : "outlined"}
                                    sx={{ m: 0.5 }}
                                />
                            ))}
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Chip
                                label="Objection Initiale"
                                onClick={() => setNewObjectionIsInitial(!newObjectionIsInitial)}
                                color={newObjectionIsInitial ? "secondary" : "default"}
                                variant={newObjectionIsInitial ? "filled" : "outlined"}
                                size="small"
                            />
                        </Box>
                        <Button
                            variant="contained"
                            onClick={handleAddObjection}
                            disabled={savingObjection || !newObjectionId || !newObjectionText || selectedBlocks.length === 0}
                        >
                            Ajouter l'Objection
                        </Button>
                    </Box>
                </Stack>
            </FormPaperTabBlock>

            <List>
                {objections.map((obj) => (
                    <Paper key={obj.id} variant="outlined" sx={{ mb: 3, p: 2, borderRadius: 2 }}>
                        {editingObjectionId === obj.id ? (
                            <Stack spacing={2}>
                                <TextField
                                    label="Texte de l'objection"
                                    fullWidth
                                    size="small"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom>Sélectionnez les blocs :</Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {blocks.map(block => (
                                            <Chip
                                                key={block.id}
                                                label={block.text.substring(0, 30) + (block.text.length > 30 ? '...' : '')}
                                                onClick={() => toggleEditingBlockSelection(block.id)}
                                                color={editingBlocks.includes(block.id) ? "primary" : "default"}
                                                variant={editingBlocks.includes(block.id) ? "filled" : "outlined"}
                                                sx={{ m: 0.5 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                                    <Chip
                                        label="Objection Initiale"
                                        onClick={() => setEditingIsInitial(!editingIsInitial)}
                                        color={editingIsInitial ? "secondary" : "default"}
                                        variant={editingIsInitial ? "filled" : "outlined"}
                                        size="small"
                                    />
                                    <Stack direction="row" spacing={1}>
                                        <Button onClick={() => setEditingObjectionId(null)}>Annuler</Button>
                                        <Button variant="contained" onClick={handleSave} disabled={savingObjection || !editingText || editingBlocks.length === 0}>Enregistrer</Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ) : (
                            <Stack direction="row" justifyContent="space-between" mb={1}>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{obj.text}</Typography>
                                        <Typography variant="caption" color="text.secondary">({obj.id})</Typography>
                                        {obj.is_initial && <Chip label="Initiale" size="small" color="secondary" sx={{ height: 18, fontSize: '0.65rem' }} />}
                                    </Stack>
                                </Box>
                                <Stack direction="row">
                                    <IconButton size="small" color="primary" onClick={() => startEditing(obj)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDeleteObjection(obj.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        )}


                        <Box sx={{ pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Réponse assemblée :</Typography>
                            {obj.objection_responses?.sort((a: any, b: any) => a.position - b.position).map((resp: any) => {
                                const block = blocks.find(b => b.id === resp.block_id);
                                return (
                                    <Typography key={resp.block_id} variant="body2" sx={{ mb: 0.5 }}>
                                        • {block?.text || "Bloc introuvable"}
                                    </Typography>
                                );
                            })}
                        </Box>
                    </Paper>
                ))}
            </List>
        </BoxTabBlock>
    );
}