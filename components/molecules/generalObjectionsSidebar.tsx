"use client";
import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Chip,
    Stack,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    CircularProgress
} from "@mui/material";
import { supabase } from "@/utils/supabase";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface GeneralObjection {
    id: string;
    category: string;
    title: string;
    description: string;
}

interface GeneralObjectionsSidebarProps {
    scriptId?: string;
}

export default function GeneralObjectionsSidebar({ scriptId }: GeneralObjectionsSidebarProps) {
    const [selectedObjection, setSelectedObjection] = useState<GeneralObjection | null>(null);
    const [groupedObjections, setGroupedObjections] = useState<Record<string, GeneralObjection[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGeneralObjections = async () => {
            if (!scriptId) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('general_objections')
                    .select('*')
                    .eq('script_id', scriptId)
                    .order('category', { ascending: true });

                if (error) throw error;

                // Group by category
                const groups: Record<string, GeneralObjection[]> = {};
                (data || []).forEach(obj => {
                    if (!groups[obj.category]) groups[obj.category] = [];
                    groups[obj.category].push(obj);
                });
                setGroupedObjections(groups);
            } catch (err: any) {
                console.error("Sidebar Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGeneralObjections();
    }, []);

    const handleOpen = (objection: GeneralObjection) => {
        setSelectedObjection(objection);
    };

    const handleClose = () => {
        setSelectedObjection(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    // bgcolor: 'grey.50'
                }}
            >
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        color: 'text.primary'
                    }}
                >
                    <InfoOutlinedIcon fontSize="small" color="primary" />
                    Infos Générales
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : Object.keys(groupedObjections).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                        Aucune info disponible.
                    </Typography>
                ) : (
                    Object.entries(groupedObjections).map(([category, objections]) => (
                        <Box key={category} sx={{ mb: 3 }}>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'text.secondary',
                                    letterSpacing: 1
                                }}
                            >
                                {category}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                                {objections.map((obj) => (
                                    <Chip
                                        key={obj.id}
                                        label={obj.title}
                                        onClick={() => handleOpen(obj)}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        clickable
                                        sx={{
                                            borderRadius: '8px',
                                            '&:hover': {
                                                bgcolor: 'rgba(25, 118, 210, 0.04)',
                                                color: 'primary.main',
                                                borderColor: 'primary.main'
                                            },
                                            transition: 'all 0.2s'
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    ))
                )}
            </Paper>

            {/* Objection Detail Modal */}
            <Dialog open={!!selectedObjection} onClose={handleClose} sx={{ borderRadius: 3, p: 1 }}>
                <DialogTitle sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {selectedObjection?.title}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mt: 1, lineHeight: 1.7, whiteSpace: 'pre-wrap', }}>
                        {selectedObjection?.description}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} variant="contained" sx={{ borderRadius: 2 }}>
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
