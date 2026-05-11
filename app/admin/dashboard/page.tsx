import { redirect } from "next/navigation";
import { AdminDashboardClient } from "./client";
import { getAdminSessionUser } from "@/lib/admin-auth";

export default async function DashboardPage() {
  const currentUser = await getAdminSessionUser();
  if (!currentUser) redirect("/admin/login");
  return <AdminDashboardClient currentUser={currentUser} />;
}
