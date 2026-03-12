import BoxTabBlock from "../../atoms/boxTabBlock";
import TabSubtitle from "../../atoms/typographies/tabBlockSubtitle";
import TabTitle from "../../atoms/typographies/tabBlockTitle";
import FormPaperTabBlock from "../../atoms/formPaperTabBlock";
import InputText from "../../atoms/forms/inputText";
import { Button, Stack, List, Paper, Typography, IconButton, Box, CircularProgress, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface InfoTabBlockProps {
    generalObjections: any[];
    editingGO: any;
    newGOCategory: string;
    newGOTitle: string;
    newGODescription: string;
    savingGO: boolean;
    startEditingGO: (go: any) => void;
    handleAddOrUpdateGO: () => void;
    handleDeleteGO: (id: string) => void;
    setEditingGO: (go: any) => void;
    setNewGOCategory: (category: string) => void;
    setNewGOTitle: (title: string) => void;
    setNewGODescription: (description: string) => void;
}

export default function InfoTabBlock({ generalObjections, editingGO, newGOCategory, newGOTitle, newGODescription, savingGO, startEditingGO, handleAddOrUpdateGO, handleDeleteGO, setEditingGO, setNewGOCategory, setNewGOTitle, setNewGODescription }: InfoTabBlockProps) {
    return (
        <BoxTabBlock>
            <TabTitle title="Infos Générales" />
            <TabSubtitle title="Ces informations sont spécifiques à ce script et visibles lors de l'utilisation." />

            <FormPaperTabBlock>
                <Typography variant="subtitle2" gutterBottom>
                    {editingGO ? "Modifier l'info générale" : "Ajouter une info générale"}
                </Typography>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <InputText
                            label="Catégorie"
                            placeholder="ex: Administratif"
                            size="small"
                            value={newGOCategory}
                            setValue={setNewGOCategory}
                        />
                        <InputText
                            label="Titre"
                            placeholder="ex: Certification RGE"
                            size="small"
                            value={newGOTitle}
                            setValue={setNewGOTitle}
                        />
                    </Stack>
                    <InputText
                        label="Description / Argumentaire"
                        placeholder="Contenu détaillé de l'info..."
                        multiline
                        rows={7}
                        size="small"
                        value={newGODescription}
                        setValue={setNewGODescription}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        {editingGO && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setEditingGO(null);
                                    setNewGOCategory("");
                                    setNewGOTitle("");
                                    setNewGODescription("");
                                }}
                            >
                                Annuler
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={handleAddOrUpdateGO}
                            disabled={savingGO || !newGOCategory || !newGOTitle || !newGODescription}
                        >
                            {savingGO ? <CircularProgress size={24} /> : (editingGO ? "Mettre à jour" : "Ajouter")}
                        </Button>
                    </Box>
                </Stack>
            </FormPaperTabBlock>

            <List>
                {generalObjections.map((go) => (
                    <Paper key={go.id} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                            <Box sx={{ flexGrow: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                    <Chip label={go.category} size="small" variant="outlined" color="primary" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{go.title}</Typography>
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {go.description}
                                </Typography>
                            </Box>
                            <Stack direction="row">
                                <IconButton size="small" color="primary" onClick={() => startEditingGO(go)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error" onClick={() => handleDeleteGO(go.id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Paper>
                ))}
                {generalObjections.length === 0 && (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        Aucune info générale créée pour le moment.
                    </Typography>
                )}
            </List>
        </BoxTabBlock>
    );
}