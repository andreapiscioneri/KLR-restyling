import { redirect } from "next/navigation";
import { getAdminSessionUser } from "@/lib/admin-session";

export default async function AdminPage() {
  const user = await getAdminSessionUser();
  if (user) redirect("/admin/dashboard");
  redirect("/admin/login");
}
