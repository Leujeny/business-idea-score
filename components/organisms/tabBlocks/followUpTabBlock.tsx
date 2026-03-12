import BoxTabBlock from "../../atoms/boxTabBlock";
import TabSubtitle from "../../atoms/typographies/tabBlockSubtitle";
import TabTitle from "../../atoms/typographies/tabBlockTitle";
import { Alert, Box, Chip, Paper, Typography, Stack, Divider } from "@mui/material";

interface FollowUpTabBlockProps {
    objections: any[];
    followUps: any[];
    handleToggleFollowUp: (parentId: string, childId: string) => void;
    onToggleInitial: (id: string, currentStatus: boolean) => void;
}

export default function FollowUpTabBlock({
    objections,
    followUps,
    handleToggleFollowUp,
    onToggleInitial
}: FollowUpTabBlockProps) {
    if (objections.length === 0) {
        return (
            <BoxTabBlock>
                <TabTitle title="Enchaînements (Follow-ups)" />
                <Alert severity="info" sx={{ mt: 2 }}>
                    Créez d'abord des objections dans l'onglet "Objections" pour configurer les enchaînements.
                </Alert>
            </BoxTabBlock>
        );
    }

    return (
        <BoxTabBlock>
            <TabTitle title="Enchaînements (Follow-ups)" />
            <TabSubtitle title="Définissez le flux de la conversation : quelles objections peuvent apparaître après chaque réponse." />

            <Stack spacing={4} sx={{ mt: 3 }}>
                {/* Section: Introduction */}
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'primary.50', borderColor: 'primary.light' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        Introduction & Point de départ
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Quelles objections peuvent être soulevées immédiatement après votre message d'introduction ?
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {objections.map(child => (
                            <Chip
                                key={`intro-${child.id}`}
                                label={`${child.text.substring(0, 40)}${child.text.length > 40 ? '...' : ''} (${child.id})`}
                                onClick={() => onToggleInitial(child.id, !!child.is_initial)}
                                color={child.is_initial ? "primary" : "default"}
                                variant={child.is_initial ? "filled" : "outlined"}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Stack>
                </Paper>

                <Divider>
                    <Typography variant="caption" color="text.secondary" sx={{ px: 2, fontWeight: 'bold' }}>
                        PUIS, APRÈS CHAQUE RÉPONSE...
                    </Typography>
                </Divider>

                {/* Section: Per Parent Objection */}
                {objections.map(parent => (
                    <Paper key={parent.id} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                                    SI LE CLIENT DIT :
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 'medium', mt: 0.5 }}>
                                    "{parent.text}"
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', display: 'block', mb: 1 }}>
                                    ALORS, IL POURRA ENSUITE DIRE :
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {objections.filter(o => o.id !== parent.id).map(child => {
                                        const isLinked = followUps.some(f => f.parent_id === parent.id && f.child_id === child.id);
                                        return (
                                            <Chip
                                                key={`${parent.id}-${child.id}`}
                                                label={`${child.text.substring(0, 40)}${child.text.length > 40 ? '...' : ''} (${child.id})`}
                                                onClick={() => handleToggleFollowUp(parent.id, child.id)}
                                                color={isLinked ? "secondary" : "default"}
                                                variant={isLinked ? "filled" : "outlined"}
                                                sx={{ m: 0.5 }}
                                            />
                                        );
                                    })}
                                </Stack>
                                {objections.length <= 1 && (
                                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.disabled' }}>
                                        Besoin d'autres objections pour créer un enchaînement.
                                    </Typography>
                                )}
                            </Box>
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </BoxTabBlock>
    );
}
