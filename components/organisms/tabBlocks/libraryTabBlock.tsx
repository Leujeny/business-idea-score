import BoxTabBlock from "../../atoms/boxTabBlock";
import TabSubtitle from "../../atoms/typographies/tabBlockSubtitle";
import TabTitle from "../../atoms/typographies/tabBlockTitle";
import FormPaperTabBlock from "../../atoms/formPaperTabBlock";
import InputText from "../../atoms/forms/inputText";
import { Button, Stack, List, Paper, Typography, IconButton, Box, Chip, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

interface LibraryTabBlockProps {
    newBlockText: string;
    setNewBlockText: (value: string) => void;
    handleAddBlock: () => void;
    savingBlock: boolean;
    blocks: any[];
    handleDeleteBlock: (id: number) => void;
    handleUpdateBlock: (id: number, text: string) => void;
    introBlockId: number | null;
    onSetIntroBlock: (id: number | null) => void;
}

export default function LibraryTabBlock({
    newBlockText,
    setNewBlockText,
    handleAddBlock,
    savingBlock,
    blocks,
    handleDeleteBlock,
    handleUpdateBlock,
    introBlockId,
    onSetIntroBlock
}: LibraryTabBlockProps) {
    const [editingBlockId, setEditingBlockId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");

    const startEditing = (block: any) => {
        setEditingBlockId(block.id);
        setEditingText(block.text);
    };

    const handleSave = async (id: number) => {
        await handleUpdateBlock(id, editingText);
        setEditingBlockId(null);
    };
    return (
        <BoxTabBlock>
            <TabTitle title="Mes Briques de Texte" />
            <TabSubtitle title="Créez ici les morceaux de phrases que vous pourrez ensuite assembler pour répondre aux objections." />

            <FormPaperTabBlock>
                <Stack direction="row" spacing={2}>
                    <InputText
                        multiline
                        rows={2}
                        placeholder="Entrez un nouveau bloc de texte (ex: 'Je comprends tout à fait...')"
                        value={newBlockText}
                        setValue={setNewBlockText} />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ height: 'fit-content' }}
                        onClick={handleAddBlock}
                        disabled={savingBlock || !newBlockText.trim()}
                    >
                        Ajouter
                    </Button>
                </Stack>
            </FormPaperTabBlock>

            <List>
                {blocks.map((block) => (
                    <Paper key={block.id} variant="outlined" sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        borderColor: introBlockId === block.id ? 'primary.main' : 'divider',
                        borderWidth: introBlockId === block.id ? 2 : 1
                    }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box sx={{ flex: 1 }}>
                                {editingBlockId === block.id ? (
                                    <Stack direction="row" spacing={1} sx={{ width: '100%', mr: 2 }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            size="small"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                        />
                                        <Button size="small" variant="contained" onClick={() => handleSave(block.id)}>OK</Button>
                                        <Button size="small" onClick={() => setEditingBlockId(null)}>X</Button>
                                    </Stack>
                                ) : (
                                    <Typography variant="body1">{block.text}</Typography>
                                )}
                            </Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                {!editingBlockId && (
                                    <>
                                        <Chip
                                            label={introBlockId === block.id ? "Introduction" : "Définir comme intro"}
                                            size="small"
                                            color={introBlockId === block.id ? "primary" : "default"}
                                            onClick={() => onSetIntroBlock(introBlockId === block.id ? null : block.id)}
                                            variant={introBlockId === block.id ? "filled" : "outlined"}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                        <IconButton size="small" color="primary" onClick={() => startEditing(block)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDeleteBlock(block.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    </Paper>
                ))}
                {blocks.length === 0 && (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        Aucun bloc créé pour le moment.
                    </Typography>
                )}
            </List>
        </BoxTabBlock>
    );
}
