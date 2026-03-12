import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FlagIcon from "@mui/icons-material/Flag";
import AddCircleIcon from '@mui/icons-material/AddCircle';

// TODO: fix the types

interface NodeButttonsbarProps {
    depth: number,
    onToggleInitial: any,
    node: any,
    responseBlocks: any,
    handleAddClick: any,
    onAddObjection: any,
    setIsEditingObjection: any,
    setEditingBlockId: any,
    setEditedBlockText: any,
    setIsCollapsed: any,
    isCollapsed: any,
    childrenNodes: any,
    handleToggleConclusion: any
}

export default function NodeButttonsbar({ depth, onToggleInitial, node, responseBlocks, handleAddClick, onAddObjection, setIsEditingObjection, setEditingBlockId, setEditedBlockText, setIsCollapsed, isCollapsed, childrenNodes, handleToggleConclusion }: NodeButttonsbarProps) {

    return (
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" justifyContent="space-between" spacing={0.5}>
                {depth === 0 && (
                    <Tooltip title="Retirer des points d'entrée">
                        <IconButton size="small" onClick={() => onToggleInitial(node.id, true)} color="error">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
                {/* TODO: maybe i shouldn't have many blocks for one response... */}
                <Tooltip title={responseBlocks[0].is_conclusion ? "Retirer le tag conclusion" : "Marquer comme conclusion"}>
                    <IconButton size="small" onClick={() => handleToggleConclusion(responseBlocks[0])} color={responseBlocks[0].is_conclusion ? "error" : "default"}>
                        <FlagIcon fontSize="inherit" style={{ fontSize: '0.8rem' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Lier une objection existante">
                    <IconButton size="small" onClick={handleAddClick} color="primary">
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Créer une nouvelle suite">
                    <IconButton size="small" onClick={() => onAddObjection(node.id)} color="primary">
                        <AddCircleIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                {/* TODO: maybe i shouldn't have many blocks for one response... */}
                <IconButton size="small" onClick={() => { setIsEditingObjection(true); setEditingBlockId(responseBlocks[0].id); setEditedBlockText(responseBlocks[0].text); }} color="primary">
                    <EditIcon fontSize="inherit" />
                </IconButton>
            </Stack>

            <IconButton color="primary" onClick={() => setIsCollapsed(!isCollapsed)} disabled={childrenNodes.length === 0}>
                {isCollapsed ? <ChevronRightIcon sx={{ fontSize: "2.2rem" }} /> : <ExpandMoreIcon sx={{ fontSize: "2.2rem" }} />}
            </IconButton>
        </Stack>
    );
}