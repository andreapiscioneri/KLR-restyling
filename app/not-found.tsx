import { getPages } from "@/lib/content";
import { NotFoundClient } from "./_not-found-client";

export default async function NotFound() {
  const pages = await getPages();
  const notFoundCms = (pages as Record<string, unknown>)?.notFound as Parameters<typeof NotFoundClient>[0]["initialCms"];
  return <NotFoundClient initialCms={notFoundCms} />;
}
