import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface GenericTabsProps {
    labels: string[];
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

export default function GenericTabs({ labels, activeTab, setActiveTab }: GenericTabsProps) {
    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                {labels.map((label, index) => (
                    <Tab key={index} label={label} />
                ))}
            </Tabs>
        </Box>
    );
}
