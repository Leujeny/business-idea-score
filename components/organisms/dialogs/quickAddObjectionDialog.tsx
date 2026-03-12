'use client';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import InputText from "@/components/atoms/forms/inputText";
import ClassicDialog from "@/components/molecules/dialogs/classicDialog";

interface QuickAddObjectionDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (newId: string) => Promise<void>;
    blocks: any[];
    handleAddObjection: () => Promise<void>;
    handleAddBlock: () => void;
    newId: string;
    setNewId: (id: string) => void;
    newText: string;
    setNewText: (text: string) => void;
    newBlockText: string;
    setNewBlockText: (text: string) => void;
    selectedBlocks: number[];
    toggleBlockSelection: (id: number) => void;
    savingObjection: boolean;
    savingBlock: boolean;
}

export default function QuickAddObjectionDialog({ open,
    onClose,
    onSuccess,
    blocks,
    handleAddObjection,
    handleAddBlock,
    newId,
    setNewId,
    newText,
    setNewText,
    newBlockText,
    setNewBlockText,
    selectedBlocks,
    toggleBlockSelection,
    savingObjection,
    savingBlock }: QuickAddObjectionDialogProps) {
    const [subTab, setSubTab] = useState(0); // 0: Select blocks, 1: Create block

    const handleSave = async () => {
        if (!newId.trim() || !newText.trim() || selectedBlocks.length === 0) return;
        await handleAddObjection();
        await onSuccess(newId);
    };

    return (
        <ClassicDialog open={open} onClose={onClose} title="Créer une nouvelle objection" onClickSubmit={handleSave} disabled={savingObjection || savingBlock} submitBtnLabel={savingObjection ? "Création..." : "Créer et lier"}>
            <Stack spacing={3} sx={{ mt: 1 }}>
                {/* TODO: maybe i should remove the id field, and generate it automatically */}
                <InputText
                    value={newId}
                    setValue={setNewId}
                    label="Identifiant unique (ex: prix-trop-eleve)"
                    placeholder="Utilisez des tirets, sans espaces"
                    size="small"
                    required={false}
                />
                <InputText
                    value={newText}
                    setValue={setNewText}
                    label="Texte de l'objection (ce que dit le client)"
                    rows={1}
                />

                <Divider sx={{ my: 1 }} />

                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            Sélectionner les blocs de réponse :
                        </Typography>
                        <Button size="small" onClick={() => setSubTab(subTab === 0 ? 1 : 0)} sx={{ textTransform: 'none' }}>
                            {subTab === 0 ? "+ Créer un nouveau bloc" : "Retour à la liste"}
                        </Button>
                    </Stack>

                    {subTab === 0 ? (
                        <Paper variant="outlined" sx={{ maxHeight: 200, overflow: 'auto', p: 1 }}>
                            {blocks.length === 0 ? (
                                <Typography variant="caption" color="text.disabled" sx={{ p: 2, display: 'block', textAlign: 'center' }}>
                                    Aucun bloc disponible. Créez-en un d'abord.
                                </Typography>
                            ) : (
                                <List disablePadding>
                                    {blocks.map((block: any) => (
                                        <ListItem key={block.id} dense sx={{ py: 0, mb: 2 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={selectedBlocks.includes(block.id)}
                                                        onChange={() => toggleBlockSelection(block.id)}
                                                    />
                                                }
                                                label={<Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{block.text}</Typography>}
                                                sx={{ width: '100%', ml: 0, mr: 0 }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    ) : (
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <InputText
                                value={newBlockText}
                                setValue={setNewBlockText}
                                label="Nouveau texte de réponse"
                                size="small"
                                required={false}
                                multiline
                                rows={7}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                disabled={savingBlock || !newBlockText.trim()}
                                onClick={async () => {
                                    await handleAddBlock();
                                    setSubTab(0);
                                }}
                                sx={{ py: 1 }}
                            >
                                Ajouter
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Stack>
        </ClassicDialog>
    );
}