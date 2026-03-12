import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ContentLoader() {
    return (
        <Box sx={oBxSx}>
            <CircularProgress />
        </Box>
    );
}

const oBxSx: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
};