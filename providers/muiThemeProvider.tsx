'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useMemo } from 'react';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class', // Matches Tailwind's default or system
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: '#fafafa', // zinc-50
                    // paper: '#ffffff',
                },
            },
        },
        dark: {
            palette: {
                background: {
                    default: '#09090b', // zinc-950
                    // paper: '#18181b', // zinc-900
                },
            },
        },
    },
});

export default function MuiThemeProvider({ children }: { children: ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme} defaultMode="system">
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
