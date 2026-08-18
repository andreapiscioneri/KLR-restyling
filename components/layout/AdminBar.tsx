"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutGrid, Pencil, X } from "lucide-react";

// Shared by Nav.tsx too, so the floating pill nav shifts down out of the
// admin bar's way instead of being covered by it.
export function useAdminBarVisible(): boolean {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/auth", { credentials: "include" })
      .then((r) => r.json())
      .then((j) => { if (!cancelled) setAuthenticated(Boolean(j.authenticated)); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  return authenticated;
}

// WordPress-style admin bar: shown automatically to any logged-in admin on
// any page, with a one-click toggle into the inline "edit on the real page"
// mode (see src/app/components/inline-edit.tsx) for case studies and blog
// posts. It only checks session state — it doesn't require coming in
// through the admin dashboard's "Modifica in pagina" link.
export function AdminBar() {
  const pathname = usePathname();
  const authenticated = useAdminBarVisible();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditing(new URLSearchParams(window.location.search).get("edit") === "1");
  }, [pathname]);

  if (!authenticated || pathname?.startsWith("/admin")) return null;

  const editable = pathname?.startsWith("/work/") || pathname?.startsWith("/blog/");

  function toggleEdit() {
    const url = new URL(window.location.href);
    if (editing) {
      url.searchParams.delete("edit");
    } else {
      url.searchParams.set("preview", "1");
      url.searchParams.set("edit", "1");
    }
    window.location.href = url.toString();
  }

  return (
    <div className="fixed top-0 inset-x-0 z-[200] h-9 flex items-center justify-between px-4 text-white" style={{ background: "#1a1752", fontSize: "0.72rem" }}>
      <div className="flex items-center gap-4">
        <a href="/admin/dashboard" className="flex items-center gap-1.5 font-bold opacity-90 hover:opacity-100">
          <LayoutGrid size={13} /> KLR Admin
        </a>
        {editable && (
          <button type="button" onClick={toggleEdit} className="flex items-center gap-1.5 font-semibold" style={{ color: editing ? "#F8AE01" : "#fff", opacity: editing ? 1 : 0.85 }}>
            {editing ? <><X size={13} /> Esci da modifica</> : <><Pencil size={13} /> Modifica questa pagina</>}
          </button>
        )}
      </div>
      <span className="opacity-60 hidden sm:inline">Solo tu vedi questa barra</span>
    </div>
  );
}
