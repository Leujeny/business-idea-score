import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LinkOffIcon from '@mui/icons-material/LinkOff';
import Tooltip from "@mui/material/Tooltip";
import TreeNode from "./treeNode";
import ChildrenNodeBox from "@/components/atoms/boxes/childrenNodeBox";

// TODO: fix the types

interface ChildrenNodeProps {
    isMobile: boolean;
    depth: number;
    childrenNodes: any[];
    handleToggleFollowUp: (parentId: number, childId: number) => void;
    node: any;
    objections: any;
    followUps: any;
    blocks: any;
    onToggleInitial: any;
    onAddObjection: any;
    handleUpdateObjection: any;
    handleUpdateBlock: any;
}

export default function ChildrenNode({ isMobile, depth, childrenNodes, handleToggleFollowUp, node, objections, followUps, blocks, onToggleInitial, onAddObjection, handleUpdateObjection, handleUpdateBlock }: ChildrenNodeProps) {

    return (
        <ChildrenNodeBox isMobile={isMobile} depth={depth}>
            <Stack spacing={2}>
                {childrenNodes.map((child: any) => (
                    <Box key={child.id} sx={{ position: 'relative' }}>
                        {/* Horizontal branch line */}
                        {!isMobile && (
                            <Box sx={{
                                position: 'absolute',
                                left: -48,
                                top: 24,
                                width: 48,
                                height: 2,
                                borderTop: '2px dashed',
                                borderColor: 'grey.300'
                            }} />
                        )}

                        {/* Unlink button */}
                        <Tooltip title="Supprimer ce lien">
                            <IconButton
                                size="small"
                                onClick={() => handleToggleFollowUp(node.id, child.id)}
                                sx={{
                                    position: 'absolute',
                                    left: isMobile ? -24 : -32,
                                    top: 8,
                                    zIndex: 10,
                                    bgcolor: 'white',
                                    border: '1px solid',
                                    borderColor: 'grey.200',
                                    boxShadow: 1,
                                    '&:hover': { color: 'error.main', borderColor: 'error.light' }
                                }}
                            >
                                <LinkOffIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Tooltip>

                        <TreeNode
                            node={child}
                            objections={objections}
                            followUps={followUps}
                            blocks={blocks}
                            handleToggleFollowUp={handleToggleFollowUp}
                            onToggleInitial={onToggleInitial}
                            onAddObjection={onAddObjection}
                            handleUpdateObjection={handleUpdateObjection}
                            handleUpdateBlock={handleUpdateBlock}
                            depth={depth + 1}
                            isMobile={isMobile}
                        />
                    </Box>
                ))}
            </Stack>
        </ChildrenNodeBox>
    );
}