import type { Metadata } from "next";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Admin Dashboard - Global Shelf BD",
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
