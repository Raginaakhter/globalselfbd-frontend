import { redirect } from "next/navigation";

// The old order panel moved into the staff dashboard.
export default function AdminPage() {
  redirect("/admin-dashboard/orders");
}
