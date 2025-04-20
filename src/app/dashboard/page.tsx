import { FileText, HardDrive, Clock, Activity } from "lucide-react";
import { StatsCard, ActivityCard } from "@/components/ui";

// This would typically come from an API or database
const recentActivity = [
  {
    id: 1,
    type: "PDF Merge",
    filename: "merged_document.pdf",
    date: "2025-04-08",
    status: "completed",
  },
  {
    id: 2,
    type: "Image Optimization",
    filename: "profile_picture.jpg",
    date: "2025-04-08",
    status: "completed",
  },
  {
    id: 3,
    type: "PDF to Image",
    filename: "document_pages.zip",
    date: "2025-04-07",
    status: "completed",
  },
];

const statsData = [
  {
    icon: FileText,
    title: "Processed Files",
    value: "24",
  },
  {
    icon: HardDrive,
    title: "Storage Used",
    value: "128 MB",
  },
  {
    icon: Clock,
    title: "Processing Time",
    value: "45m",
  },
  {
    icon: Activity,
    title: "Success Rate",
    value: "98%",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          View your recent file processing activities and storage usage
        </p>
      </section>

      <div className="card-grid lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <section className="rounded-lg border">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y">
          {recentActivity.map((activity) => (
            <ActivityCard
              key={activity.id}
              type={activity.type}
              filename={activity.filename}
              date={activity.date}
              status={activity.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
}