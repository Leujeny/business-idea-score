import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ChatBubbleProps {
    children: React.ReactNode;
    sender?: string;
    isUser?: boolean;
}

export default function ChatBubble({ children, sender, isUser = false }: ChatBubbleProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isUser ? "flex-end" : "flex-start",
                mb: 2,
                width: "100%",
            }}
        >
            {sender && (
                <Typography
                    variant="caption"
                    sx={{
                        // mb: 0.5,
                        ml: isUser ? 0 : 2,
                        mr: isUser ? 2 : 0,
                        color: "text.secondary",
                        fontWeight: "medium",
                    }}
                >
                    {sender}
                </Typography>
            )}
            <Box
                sx={{
                    maxWidth: "85%",
                    p: 2,
                    borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    bgcolor: isUser ? "primary.main" : "background.paper",
                    color: isUser ? "primary.contrastText" : "text.primary",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    border: (theme) =>
                        isUser ? "none" : `1px solid ${theme.palette.divider}`,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.01)",
                    },
                }}
            >
                <Typography
                    variant="body1"
                    component="div"
                    sx={{
                        whiteSpace: 'pre-wrap',
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        lineHeight: 1.6
                    }}
                >
                    {children}
                </Typography>
            </Box>
        </Box>
    );
}
