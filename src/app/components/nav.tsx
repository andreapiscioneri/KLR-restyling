import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../imports/KLR-Logosito.png";

type Page =
  | "home"
  | "about"
  | "services"
  | "brand"
  | "studies"
  | "blog"
  | "team"
  | "klr10"
  | "contact";

export function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  const primary: { id: Page; label: string }[] = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "brand", label: "Brands" },
    { id: "studies", label: "Case Studies" },
    { id: "blog", label: "Insights" },
    { id: "team", label: "Team" },
    { id: "klr10", label: "KLR 10 Years" },
  ];

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-6xl">
      <div
        className="rounded-full pl-5 pr-2 py-2 flex items-center justify-between border border-black/5"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(60px) saturate(180%)",
          WebkitBackdropFilter: "blur(60px) saturate(180%)",
          boxShadow: "0 30px 80px -20px rgba(46,39,132,0.15)",
        }}
      >
        <button onClick={() => setPage("home")} className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="KLR Europe" className="h-7 md:h-8 w-auto" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#F8AE01]" />
        </button>

        <div className="hidden lg:flex items-center gap-0.5">
          {primary.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`px-3 py-1.5 rounded-full transition-all duration-500 tracking-tight ${
                page === l.id ? "bg-[#2E2784] text-white" : "text-black hover:text-[#2E2784]"
              }`}
              style={{ fontSize: "0.82rem" }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage("contact")}
            className="inline-flex px-4 py-1.5 rounded-full bg-[#F8AE01] text-black tracking-tight hover:bg-[#2E2784] hover:text-white transition-all"
            style={{ fontSize: "0.85rem" }}
          >
            Keep in Touch!
          </button>
          <button className="lg:hidden text-black p-1" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden mt-3 rounded-3xl p-3 flex flex-col gap-1 border border-black/5"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(60px) saturate(180%)",
            WebkitBackdropFilter: "blur(60px) saturate(180%)",
          }}
        >
          {[{ id: "home" as Page, label: "Home" }, ...primary, { id: "contact" as Page, label: "Keep in Touch!" }].map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setPage(l.id);
                setOpen(false);
              }}
              className={`px-4 py-3 rounded-2xl text-left transition-all ${
                page === l.id ? "bg-[#2E2784] text-white" : l.id === "contact" ? "bg-[#F8AE01] text-black" : "text-black"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export type { Page };
