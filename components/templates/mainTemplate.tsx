import Link from "next/link";
import TopPageSubtitle from "../atoms/typographies/topPageSubtitle";
import TopPageTitle from "../atoms/typographies/topPageTitle";
import Button from "@mui/material/Button";
import ContentLoader from "../molecules/contentLoader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface MainTemplateProps {
    pageTitle: string;
    pageSubtitle: string;
    loading: boolean;
    datas: any[];
    addLink: string;
    addTitle: string;
    children: React.ReactNode;
    emptyMessage?: string;
}

export default function MainTemplate({ pageTitle, pageSubtitle, loading, datas, addLink, addTitle, children, emptyMessage }: MainTemplateProps) {

    return (
        <>
            <TopPageTitle title={pageTitle} />
            <TopPageSubtitle title={pageSubtitle} />
            <Link href={addLink} passHref style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="small" sx={{ mt: 2, mb: 4 }}>
                    {addTitle}
                </Button>
            </Link>

            {loading ? (
                <ContentLoader />
            ) : datas.length > 0 ? (
                children
            ) : (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body1" color="textSecondary">
                        {emptyMessage}
                    </Typography>
                </Box>
            )}
        </>
    );
}
