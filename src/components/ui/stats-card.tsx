import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
}

export function StatsCard({ icon: Icon, title, value }: StatsCardProps) {
  return (
    <div className="rounded-lg border p-4 card-hover">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary transition-colors" />
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}