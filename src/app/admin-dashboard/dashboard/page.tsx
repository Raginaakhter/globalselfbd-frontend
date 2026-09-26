import { redirect } from "next/navigation";

// The backend menu links the dashboard home as /admin-dashboard/dashboard.
export default function DashboardAlias() {
  redirect("/admin-dashboard");
}
