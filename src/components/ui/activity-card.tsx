import { FileText } from "lucide-react";

interface ActivityItemProps {
  type: string;
  filename: string;
  date: string;
  status: string;
}

export function ActivityCard({ type, filename, date, status }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-accent/5 transition-colors">
      <div className="flex items-center gap-4">
        <FileText className="h-5 w-5 text-muted-foreground transition-colors" />
        <div>
          <p className="font-medium">{type}</p>
          <p className="text-sm text-muted-foreground">{filename}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground transition-colors">{date}</p>
        <p className="text-sm font-medium text-primary">{status}</p>
      </div>
    </div>
  );
}