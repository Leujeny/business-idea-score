import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface TagBarProps {
    tags: string[];
    selectedTag: string | null;
    setSelectedTag: (tag: string | null) => void;
}

export default function TagBar({ tags, selectedTag, setSelectedTag }: TagBarProps) {

    return (
        <Box sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip
                    label="Tous"
                    onClick={() => setSelectedTag(null)}
                    color={selectedTag === null ? "primary" : "default"}
                    variant={selectedTag === null ? "filled" : "outlined"}
                    clickable
                />
                {tags.map(tag => (
                    <Chip
                        key={tag}
                        label={tag}
                        onClick={() => setSelectedTag(tag)}
                        color={selectedTag === tag ? "primary" : "default"}
                        variant={selectedTag === tag ? "filled" : "outlined"}
                        clickable
                    />
                ))}
            </Stack>
        </Box>
    );
}