import WavingCard from "@/components/atoms/cards/wavingCard";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface ScriptCardProps {
  title: string;
  description: string;
  href: string;
  tag: string;
}

export default function IdeaCard({
  title,
  description,
  href,
  tag,
}: ScriptCardProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
      <WavingCard>
        <Typography gutterBottom variant="h6" component="h2">
          {title}
        </Typography>
        <Chip label={tag} size="small" color="default" sx={{ marginBottom: 2 }} />
        {/* <Typography variant="body2" component="p" color="text.secondary">
            {description}
          </Typography> */}
      </WavingCard>
    </Link>
  );
}