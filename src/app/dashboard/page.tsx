import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session.user?.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Recent Conversions</h3>
          <p className="text-sm text-muted-foreground">
            Your recent file conversions will appear here.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Storage Usage</h3>
          <p className="text-sm text-muted-foreground">
            Track your storage usage and limits.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account preferences and settings.
          </p>
        </Card>
      </div>
    </div>
  );
}