import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import RecentIcon from "@/components/atoms/recentIcon";
import WavingCard from "@/components/atoms/cards/wavingCard";

interface RecentCardProps {
  title: string;
  href: string;
  type: string;
}

export default function RecentCard({ title, href, type }: RecentCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
      <WavingCard>
        <Stack direction="row" spacing={2} alignItems="center">
          <RecentIcon type={type} />
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
        </Stack>
      </WavingCard>
    </Link>
  );
}