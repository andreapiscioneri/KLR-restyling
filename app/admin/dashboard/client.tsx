"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutGrid, FileText, BarChart3, Tags, Users, FolderOpen,
  PenLine, LogOut, Menu, X, Save, ChevronRight, Globe,
  Home, Info, Wrench, Phone, Footprints, Star, Palette, Settings,
  Lightbulb, Paperclip, ArrowRight, CheckCircle, Folder, MapPin, 
  Link as LinkIcon, Calendar, MessageSquare
} from "lucide-react";
import type { AdminUser } from "@/lib/admin-auth";
import type { LucideIcon } from "lucide-react";
import klrLogo from "@/src/imports/KLR-Logosito.png";

type TopSection = "overview" | "pages" | "stats" | "brands" | "leadership" | "studies" | "posts" | "colors" | "users" | "settings";
type PageKey = "site" | "nav" | "home" | "about" | "services" | "contact" | "team" | "brands_page" | "footer";

const TOP_NAV: { id: TopSection; label: string; icon: LucideIcon }[] = [
  { id: "overview",    label: "Overview",       icon: LayoutGrid },
  { id: "pages",       label: "Pagine & Testi", icon: FileText   },
  { id: "stats",       label: "Statistiche",    icon: BarChart3  },
  { id: "brands",      label: "Brand Partners", icon: Tags       },
  { id: "leadership",  label: "Team",           icon: Users      },
  { id: "studies",     label: "Case Studies",   icon: FolderOpen },
  { id: "posts",       label: "Blog",           icon: PenLine    },
  { id: "colors",      label: "Colori & Tema",  icon: Palette   },
  { id: "users",       label: "Utenti",         icon: Users      },
  { id: "settings",    label: "Impostazioni",   icon: Settings  },
];

const PAGE_TABS: { id: PageKey; label: string; icon: LucideIcon }[] = [
  { id: "site",       label: "Globale",    icon: Globe     },
  { id: "nav",        label: "Navbar",     icon: Menu      },
  { id: "home",       label: "Home",       icon: Home      },
  { id: "about",      label: "About",      icon: Info      },
  { id: "services",   label: "Services",   icon: Wrench    },
  { id: "contact",    label: "Contact",    icon: Phone     },
  { id: "team",       label: "Team",       icon: Users     },
  { id: "brands_page",label: "Brands",     icon: Star      },
  { id: "footer",     label: "Footer",     icon: Footprints},
];

export function AdminDashboardClient({ currentUser }: { currentUser: AdminUser }) {
  const router = useRouter();
  const [section, setSection]       = useState<TopSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [colors,     setColors]     = useState<Record<string,string>|null>(null);
  const [settings,   setSettings]   = useState<Record<string,unknown>|null>(null);
  const [stats,      setStats]      = useState<Record<string,string>|null>(null);
  const [brands,     setBrands]     = useState<BrandItem[]|null>(null);
  const [leadership, setLeadership] = useState<LeaderItem[]|null>(null);
  const [studies,    setStudies]    = useState<StudyItem[]|null>(null);
  const [posts,      setPosts]      = useState<PostItem[]|null>(null);
  const [pages,      setPages]      = useState<PagesData|null>(null);
  const [users,      setUsers]      = useState<UserItem[]|null>(null);
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);

  const load = useCallback(async (type: string) => {
    const res  = await fetch(`/api/admin/content?type=${type}`);
    const json = await res.json();
    if (!json.data) return;
    if (type === "stats")      setStats(json.data);
    if (type === "brands")     setBrands(json.data);
    if (type === "leadership") setLeadership(json.data);
    if (type === "studies")    setStudies(json.data);
    if (type === "posts")      setPosts(json.data);
    if (type === "pages")      setPages(json.data);
    if (type === "colors")     setColors(json.data);
    if (type === "users")      setUsers(json.data);
    if (type === "settings")   setSettings(json.data);
  }, []);

  useEffect(() => {
    if (section === "colors"     && !colors)     load("colors");
    if (section === "users"      && !users)      load("users");
    if (section === "settings"   && !settings)   load("settings");
    if (section === "stats"      && !stats)      load("stats");
    if (section === "brands"     && !brands)     load("brands");
    if (section === "leadership" && !leadership) load("leadership");
    if (section === "studies"    && !studies)    load("studies");
    if (section === "posts"      && !posts)      load("posts");
    if (section === "pages"      && !pages)      load("pages");
  }, [section, stats, brands, leadership, studies, posts, pages, load]);

  async function save(type: string, payload: unknown) {
    setSaving(true); setSaved(false);
    try {
      const res = await fetch(`/api/admin/content?type=${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Save failed:", res.status);
        setSaving(false);
        setTimeout(() => setSaved(false), 3000);
        return;
      }
      setSaving(false); setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/");
  }


  // Cursore giallo (stesso del login)
  useEffect(() => {
    document.body.dataset.cursorTheme = "yellow";
    return () => { delete document.body.dataset.cursorTheme; };
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5F5FA", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* ── OVERLAY mobile ── */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 30, backdropFilter: "blur(3px)" }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        style={{
          width: 230, position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40,
          background: "linear-gradient(175deg, #1e1a6e 0%, #2E2784 60%, #231e72 100%)",
          display: "flex", flexDirection: "column",
          boxShadow: "4px 0 24px rgba(46,39,132,0.25)",
          transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Image src={klrLogo} alt="KLR" width={96} height={30} style={{ height: 24, width: "auto" }} />
          <button
            className="admin-mobile-bar"
            onClick={() => setSidebarOpen(false)}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 7, color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, flexShrink: 0 }}
          >
            <X size={16} />
          </button>
        </div>

        {/* User */}
        <div style={{ padding: "14px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #F8AE01, #f59e0b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 800, color: "#000", flexShrink: 0,
            boxShadow: "0 2px 8px rgba(248,174,1,0.4)",
          }}>
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{currentUser.name}</div>
            <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 10, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.07em" }}>{currentUser.role}</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
          {TOP_NAV.map(item => {
            const active = section === item.id;
            return (
              <button key={item.id}
                onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  width: "100%", padding: "10px 12px", marginBottom: 2,
                  border: "none", borderRadius: 10,
                  background: active ? "rgba(248,174,1,0.15)" : "transparent",
                  color: active ? "#F8AE01" : "rgba(255,255,255,0.55)",
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                }}
              >
                <item.icon size={15} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {active && <ChevronRight size={13} style={{ opacity: 0.6 }} />}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "12px 10px 20px" }}>
          <button onClick={logout}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              width: "100%", padding: "10px 12px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "rgba(255,255,255,0.45)", fontSize: 12,
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="md:ml-[230px]" style={{ flex: 1, minWidth: 0 }}>

        {/* Top bar — solo mobile */}
        <div className="admin-mobile-bar" style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "rgba(245,245,250,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
          padding: "0 20px",
          height: 52,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Hamburger SOLO mobile */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(v => !v)}
              style={{ width: 36, height: 36, background: "#2E2784", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              {sidebarOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{TOP_NAV.find(n => n.id === section)?.label}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {saving && (
              <span style={{ fontSize: 12, color: "#F8AE01", fontWeight: 600, background: "rgba(248,174,1,0.1)", padding: "4px 12px", borderRadius: 20 }}>
                Salvataggio…
              </span>
            )}
            {saved && (
              <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#16a34a", fontWeight: 600, background: "rgba(22,163,74,0.1)", padding: "4px 12px", borderRadius: 20 }}>
                <CheckCircle size={12} />
                Salvato
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Titolo sezione desktop */}
          <div className="hidden md:flex" style={{ alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111" }}>{TOP_NAV.find(n => n.id === section)?.label}</h1>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {saving && <span style={{ fontSize: 12, color: "#F8AE01", fontWeight: 600, background: "rgba(248,174,1,0.1)", padding: "4px 12px", borderRadius: 20 }}>Salvataggio…</span>}
              {saved  && <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#16a34a", fontWeight: 600, background: "rgba(22,163,74,0.1)", padding: "4px 12px", borderRadius: 20 }}><CheckCircle size={12} /> Salvato</span>}
            </div>
          </div>
          {section === "overview"   && <Overview />}
          {section === "colors"     && <ColorsEditor    data={colors}     onSave={d => { setColors(d);      save("colors",     d); }} />}
          {section === "users"      && <UsersEditor     data={users}      onSave={d => { setUsers(d);      save("users",      d); }} />}
          {section === "settings"   && <SettingsEditor  data={settings}   onSave={d => { setSettings(d as Record<string,unknown>); save("settings",   d); }} />}
          {section === "stats"      && <StatsEditor    data={stats}      onSave={d => { setStats(d);      save("stats",      d); }} />}
          {section === "brands"     && <BrandsEditor   data={brands}     onSave={d => { setBrands(d);     save("brands",     d); }} />}
          {section === "leadership" && <LeadershipEditor data={leadership} onSave={d => { setLeadership(d); save("leadership", d); }} />}
          {section === "studies"    && <StudiesEditor  data={studies}    onSave={d => { setStudies(d);    save("studies",    d); }} />}
          {section === "posts"      && <PostsEditor    data={posts}      onSave={d => { setPosts(d);      save("posts",      d); }} />}
          {section === "pages"      && <PagesEditor    data={pages}      onSave={d => { setPages(d as PagesData); save("pages", d); }} />}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════ */
function Overview() {
  const cards = [
    { label: "Pagine gestibili",   value: "8",   color: "#2E2784" },
    { label: "Sezioni editabili",  value: "50+", color: "#2E2784" },
    { label: "Case Studies",       value: "6",   color: "#F8AE01" },
    { label: "Blog Posts",         value: "7",   color: "#F8AE01" },
    { label: "Brand Partners",     value: "9",   color: "#2E2784" },
    { label: "Membri Team",        value: "13",  color: "#2E2784" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: "#fff", borderRadius: 16, padding: "22px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderTop: `3px solid ${c.color}` }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 16, padding: "22px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#2E2784", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>Guida rapida</div>
        {[
          ["Colori & Tema", "personalizza i colori primari, accenti, logo e URL del sito"],
          ["Impostazioni", "configura nome sito, contatti, social, SEO e informazioni globali"],
          ["Pagine & Testi", "modifica ogni testo, titolo, CTA e immagine di ogni pagina del sito"],
          ["Statistiche",    "aggiorna i numeri KLR (campagne, paesi, retailer…)"],
          ["Brand Partners", "aggiungi, modifica o elimina brand con immagini e descrizioni"],
          ["Team",           "gestisci tutti i membri del team (nome, ruolo, bio, foto)"],
          ["Case Studies",   "aggiungi e modifica le campagne (case studies)"],
          ["Blog",           "gestisci i post di Insights con titolo, data, categoria, immagine e contenuto"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: 13, color: "#444", alignItems: "flex-start" }}>
            <span style={{ fontWeight: 700, color: "#2E2784", minWidth: 120 }}>{k}</span>
            <ArrowRight size={14} style={{ marginTop: 2, color: "#999", flexShrink: 0 }} />
            <span style={{ color: "#666" }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 20, padding: "16px 18px", background: "linear-gradient(135deg, #F8AE01/10, #2E2784/10)", borderRadius: 12, border: "1px solid rgba(248,174,1,0.2)", fontSize: 12, color: "#333" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700, color: "#2E2784", marginBottom: 8 }}>
            <FileText size={16} />
            Come usare il CMS:
          </div>
          <ul style={{ margin: "0 0 0 20px", padding: 0 }}>
            <li style={{ marginBottom: 6 }}>Clicca su una sezione nel menu a sinistra per modificare i contenuti</li>
            <li style={{ marginBottom: 6 }}>Cambia qualsiasi testo, colore, immagine secondo le tue necessità</li>
            <li style={{ marginBottom: 6 }}>Per aggiungere elementi (brand, team, case studies, blog): premi il pulsante <strong>Aggiungi</strong></li>
            <li style={{ marginBottom: 6 }}>Per modificare un elemento: premi il pulsante <strong>Modifica</strong> sulla card</li>
            <li style={{ marginBottom: 6 }}>Per eliminare un elemento: premi il pulsante <strong>Elimina</strong> sulla card</li>
            <li>Una volta completate le modifiche, premi <strong>Salva</strong> per salvare i cambiamenti</li>
          </ul>
        </div>
        <div style={{ marginTop: 14, padding: "12px 16px", background: "#F5F5FA", borderRadius: 10, fontSize: 12, color: "#666", display: "flex", gap: 8, alignItems: "flex-start" }}>
          <CheckCircle size={14} style={{ marginTop: 2, flexShrink: 0, color: "#16a34a" }} />
          <span><strong>Salvataggio automatico:</strong> Ogni modifica viene salvata nei file JSON. Il sito rifletterà i cambiamenti senza necessità di rebuild o deploy.</span>
        </div>
      </div>
      
      {/* Tips aggiuntivi */}
      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: "4px solid #2E2784" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, fontWeight: 700, color: "#2E2784", marginBottom: 8 }}>
            <Lightbulb size={14} />
            Colori Globali
          </div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>Modifica i colori primari e accenti per cambiare l'aspetto di tutto il sito istantaneamente.</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: "4px solid #F8AE01" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, fontWeight: 700, color: "#F8AE01", marginBottom: 8 }}>
            <Paperclip size={14} />
            URL delle Immagini
          </div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>Incolla URL complete di immagini (es: https://example.com/image.jpg) nei campi immagine.</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: "4px solid #2E2784" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12, fontWeight: 700, color: "#2E2784", marginBottom: 8 }}>
            <LinkIcon size={14} />
            Link Interni
          </div>
          <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>Usa percorsi relativi: /about, /services, /blog, /contact per i link interni.</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   COLORS & THEME EDITOR
══════════════════════════════════════════════════ */
type GlobalColors = {
  primaryColor: string;
  accentColor: string;
  logoUrl: string;
  siteUrl: string;
  defaultEmail: string;
};

const COLORS_LABELS: Record<keyof GlobalColors, string> = {
  primaryColor: "Colore Primario",
  accentColor: "Colore Accento",
  logoUrl: "URL Logo",
  siteUrl: "URL Sito",
  defaultEmail: "Email Principale",
};

function ColorsEditor({ data, onSave }: { data: Record<string,string>|null; onSave: (d: Record<string,string>) => void }) {
  const [form, setForm] = useState<Record<string,string>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader />;
  
  return (
    <Panel title="Colori e Impostazioni Globali">
      <Grid>
        {Object.entries(COLORS_LABELS).map(([key, lbl]) => {
          const value = form[key] || "";
          const isColor = key === "primaryColor" || key === "accentColor";
          const isImage = key === "logoUrl";
          
          return (
            <Field key={key} label={lbl} full={false}>
              {isColor ? (
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input 
                    type="color" 
                    value={value} 
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    style={{ width: 45, height: 40, border: "1.5px solid #E8E8F0", borderRadius: 9, cursor: "pointer", padding: 2, flexShrink: 0 }} 
                  />
                  <Input value={value} onChange={v => setForm(p => ({ ...p, [key]: v }))} />
                </div>
              ) : (
                <Input value={value} onChange={v => setForm(p => ({ ...p, [key]: v }))} />
              )}
              {isImage && value && (
                <img src={value} alt="Logo" style={{ marginTop: 8, height: 40, objectFit: "contain", borderRadius: 8, border: "1px solid #eee" }} />
              )}
            </Field>
          );
        })}
      </Grid>
      
      <div style={{ marginTop: 24, padding: "18px", background: "#F5F5FA", borderRadius: 12, border: "1px solid #E8E8F0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#666", textTransform: "uppercase", marginBottom: 12 }}>Anteprima Colori</div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: form.primaryColor || "#2E2784", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)" }} />
            <div style={{ fontSize: 12, color: "#555" }}>Primario: {form.primaryColor || "#2E2784"}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: form.accentColor || "#F8AE01", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)" }} />
            <div style={{ fontSize: 12, color: "#555" }}>Accento: {form.accentColor || "#F8AE01"}</div>
          </div>
        </div>
      </div>
      
      <FooterBar><SaveBtn onClick={() => onSave(form)} /></FooterBar>
    </Panel>
  );
}

/* ══════════════════════════════════════════════════
   SETTINGS EDITOR
══════════════════════════════════════════════════ */
function SettingsEditor({ data, onSave }: { data: Record<string,unknown>|null; onSave: (d: unknown) => void }) {
  const [form, setForm] = useState<Record<string,unknown>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader />;
  
  const updateField = (key: string, value: unknown) => setForm(p => ({ ...p, [key]: value }));
  const updateNested = (section: string, key: string, value: string) => {
    setForm(p => ({
      ...p,
      [section]: { ...(p[section] as Record<string,unknown>), [key]: value }
    }));
  };
  
  const socialLinks = form.socialLinks as Record<string,string> || {};
  const hq = form.hq as Record<string,string> || {};
  
  return (
    <div>
      {/* SEO & Metadata */}
      <Panel title="Informazioni Sito">
        <Grid>
          <Field label="Nome Sito" full={false}>
            <Input value={String(form.siteName || "")} onChange={v => updateField("siteName", v)} />
          </Field>
          <Field label="URL Sito" full={false}>
            <Input value={String(form.siteUrl || "")} onChange={v => updateField("siteUrl", v)} />
          </Field>
          <Field label="Descrizione Sito" full={true}>
            <Textarea value={String(form.siteDescription || "")} onChange={v => updateField("siteDescription", v)} rows={3} />
          </Field>
          <Field label="Keywords (comma-separated)" full={true}>
            <Textarea value={String(form.siteKeywords || "")} onChange={v => updateField("siteKeywords", v)} rows={2} />
          </Field>
        </Grid>
      </Panel>

      {/* Contact & Communication */}
      <Panel title="Contatti">
        <Grid>
          <Field label="Email Principale">
            <Input type="email" value={String(form.defaultEmail || "")} onChange={v => updateField("defaultEmail", v)} />
          </Field>
          <Field label="Email Support">
            <Input type="email" value={String(form.supportEmail || "")} onChange={v => updateField("supportEmail", v)} />
          </Field>
          <Field label="Telefono">
            <Input value={String(form.phone || "")} onChange={v => updateField("phone", v)} />
          </Field>
        </Grid>
      </Panel>

      {/* Headquarters */}
      <Panel title="Sede Principale">
        <Grid>
          <Field label="Indirizzo" full={true}>
            <Input value={String(hq.address || "")} onChange={v => updateNested("hq", "address", v)} />
          </Field>
          <Field label="Città">
            <Input value={String(hq.city || "")} onChange={v => updateNested("hq", "city", v)} />
          </Field>
          <Field label="Paese">
            <Input value={String(hq.country || "")} onChange={v => updateNested("hq", "country", v)} />
          </Field>
        </Grid>
      </Panel>

      {/* Social Links */}
      <Panel title="Social Media">
        <Grid>
          <Field label="LinkedIn">
            <Input value={String(socialLinks.linkedin || "")} onChange={v => updateNested("socialLinks", "linkedin", v)} />
          </Field>
          <Field label="Instagram">
            <Input value={String(socialLinks.instagram || "")} onChange={v => updateNested("socialLinks", "instagram", v)} />
          </Field>
          <Field label="Twitter">
            <Input value={String(socialLinks.twitter || "")} onChange={v => updateNested("socialLinks", "twitter", v)} />
          </Field>
          <Field label="Facebook">
            <Input value={String(socialLinks.facebook || "")} onChange={v => updateNested("socialLinks", "facebook", v)} />
          </Field>
        </Grid>
      </Panel>

      {/* Advanced */}
      <Panel title="Avanzate">
        <Grid>
          <Field label="Google Analytics ID" full={false}>
            <Input value={String(form.googleAnalyticsId || "")} onChange={v => updateField("googleAnalyticsId", v)} />
          </Field>
          <Field label="Custom CSS" full={true}>
            <Textarea value={String(form.customCss || "")} onChange={v => updateField("customCss", v)} rows={6} />
          </Field>
        </Grid>
      </Panel>

      <FooterBar><SaveBtn onClick={() => onSave(form)} /></FooterBar>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════ */
const STATS_LABELS: Record<string, string> = {
  campaigns: "Campagne",
  retailers: "Retailer / Catene",
  countries: "Paesi",
  years: "Anni attività",
  combinedExperience: "Anni Esperienza Combinata",
  people: "Persone nel Team",
  nationalities: "Nazionalità",
};

function StatsEditor({ data, onSave }: { data: Record<string,string>|null; onSave: (d: Record<string,string>) => void }) {
  const [form, setForm] = useState<Record<string,string>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader />;
  return (
    <Panel title="Numeri KLR">
      <Grid>
        {Object.entries(STATS_LABELS).map(([key, lbl]) => (
          <Field key={key} label={lbl}>
            <Input value={form[key] || ""} onChange={v => setForm(p => ({ ...p, [key]: v }))} />
          </Field>
        ))}
      </Grid>
      <FooterBar><SaveBtn onClick={() => onSave(form)} /></FooterBar>
    </Panel>
  );
}

/* ══════════════════════════════════════════════════
   PAGES EDITOR
══════════════════════════════════════════════════ */
type PagesData = Record<string, Record<string, unknown>>;

const IMAGE_FIELDS    = ["image","mapImage","image1","image2","logoUrl"];
const TEXTAREA_FIELDS = ["subtitle","mainText","text","bodyText","description","companyDesc","tagline","hq1","hq2","messagePlaceholder","item1","item2","item3","intro"];
const COLOR_FIELDS    = ["primaryColor","accentColor"];

const FIELD_LABELS: Record<string,string> = {
  primaryColor:"Colore primario",accentColor:"Colore accento",logoUrl:"URL Logo",siteUrl:"URL Sito",defaultEmail:"Email principale",
  ctaLabel:"Testo CTA",ctaHref:"Link CTA",eyebrow:"Eyebrow",title:"Titolo",titleLine1:"Titolo riga 1",titleLine2:"Titolo riga 2",
  subtitle:"Sottotitolo",image:"Immagine (URL)",mapImage:"Mappa (URL)",image1:"Immagine 1 (URL)",image2:"Immagine 2 (URL)",
  mainText:"Testo principale",text:"Testo",bodyText:"Corpo testo",tagline:"Tagline",description:"Descrizione",
  companyDesc:"Descrizione azienda",copyright:"Copyright",hqTitle:"Titolo sede",hq1:"Indirizzo 1",hq2:"Indirizzo 2",
  email:"Email",emailNote:"Nota email",linkedinUrl:"LinkedIn URL",youtubeUrl:"YouTube URL",
  badge1:"Badge 1",badge2:"Badge 2",intro:"Intro",closing:"Chiusura",partnerEmail:"Email partner",
  contactEmail:"Email contatti",submitLabel:"Testo pulsante invio",
  namePlaceholder:"Placeholder nome",emailPlaceholder:"Placeholder email",
  companyPlaceholder:"Placeholder azienda",rolePlaceholder:"Placeholder ruolo",messagePlaceholder:"Placeholder messaggio",
  step1Title:"Step 1 Titolo",step1Desc:"Step 1 Descrizione",step2Title:"Step 2 Titolo",step2Desc:"Step 2 Descrizione",
  step3Title:"Step 3 Titolo",step3Desc:"Step 3 Descrizione",item1:"Testo 1",item2:"Testo 2",item3:"Testo 3",
};

const PAGE_SECTION_LABELS: Record<string,string> = {
  site:"Impostazioni Globali",nav:"Navigazione",home:"Home Page",about:"Pagina About",
  services:"Pagina Services",contact:"Pagina Contact",team:"Pagina Team",brands_page:"Pagina Brands",footer:"Footer",
};

function PagesEditor({ data, onSave }: { data: PagesData|null; onSave: (d: unknown) => void }) {
  const [form,       setForm]       = useState<PagesData>({});
  const [activePage, setActivePage] = useState<PageKey>("site");
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader />;

  function update(pageKey: string, sectionKey: string, fieldKey: string, value: string) {
    setForm(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [sectionKey]: { ...(prev[pageKey]?.[sectionKey] as Record<string,unknown>), [fieldKey]: value },
      },
    }));
  }
  function updateTop(pageKey: string, fieldKey: string, value: string) {
    setForm(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [fieldKey]: value } }));
  }

  const pageData = form[activePage] || {};

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
      {/* Page tab list */}
      <div style={{ width: 140, flexShrink: 0, background: "#fff", borderRadius: 14, padding: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        {PAGE_TABS.map(tab => {
          const active = activePage === tab.id;
          return (
            <button key={tab.id} onClick={() => setActivePage(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                width: "100%", padding: "9px 10px", marginBottom: 2,
                background: active ? "#2E2784" : "transparent",
                color: active ? "#fff" : "#555",
                border: "none", borderRadius: 9,
                fontSize: 12, fontWeight: active ? 600 : 400,
                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
              }}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Fields */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>{PAGE_SECTION_LABELS[activePage]}</h2>
          <SaveBtn onClick={() => onSave(form)} />
        </div>

        {/* Top-level strings */}
        {(() => {
          const topStrings = Object.entries(pageData).filter(([, v]) => typeof v === "string");
          if (!topStrings.length) return null;
          return (
            <Panel title="Generali">
              <Grid>
                {topStrings.map(([fieldKey, fieldVal]) => renderField(
                  fieldKey, String(fieldVal),
                  v => updateTop(activePage, fieldKey, v)
                ))}
              </Grid>
            </Panel>
          );
        })()}

        {/* Nested sections */}
        {Object.entries(pageData).map(([sectionKey, sectionVal]) => {
          if (typeof sectionVal !== "object" || sectionVal === null || Array.isArray(sectionVal)) return null;
          const obj = sectionVal as Record<string, unknown>;
          const label = sectionKey.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
          return (
            <Panel key={sectionKey} title={label}>
              <Grid>
                {Object.entries(obj).map(([fk, fv]) => {
                  if (Array.isArray(fv)) return null;
                  if (typeof fv === "object") return null;
                  return renderField(fk, String(fv ?? ""), v => update(activePage, sectionKey, fk, v));
                })}
              </Grid>
              {Array.isArray(obj.challenges) && (
                <div style={{ marginTop: 14 }}>
                  <Field label="Challenge (una per riga)">
                    <Textarea
                      value={(obj.challenges as string[]).join("\n")}
                      onChange={v => setForm(prev => ({
                        ...prev,
                        [activePage]: {
                          ...prev[activePage],
                          [sectionKey]: { ...obj, challenges: v.split("\n").filter(Boolean) },
                        },
                      }))}
                    />
                  </Field>
                </div>
              )}
            </Panel>
          );
        })}

        <SaveBtn onClick={() => onSave(form)} />
      </div>
    </div>
  );
}

function renderField(fieldKey: string, value: string, onChange: (v: string) => void) {
  const label    = FIELD_LABELS[fieldKey] || fieldKey;
  const isImg    = IMAGE_FIELDS.includes(fieldKey);
  const isTa     = TEXTAREA_FIELDS.includes(fieldKey);
  const isColor  = COLOR_FIELDS.includes(fieldKey);
  return (
    <Field key={fieldKey} label={label} full={isTa || isImg}>
      {isColor ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="color" value={value} onChange={e => onChange(e.target.value)}
            style={{ width: 38, height: 36, border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", padding: 2, flexShrink: 0 }} />
          <Input value={value} onChange={onChange} />
        </div>
      ) : isTa ? (
        <Textarea value={value} onChange={onChange} />
      ) : (
        <Input value={value} onChange={onChange} />
      )}
      {isImg && value && (
        <img src={value} alt="" style={{ marginTop: 8, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid #eee", maxWidth: "100%" }} />
      )}
    </Field>
  );
}

/* ══════════════════════════════════════════════════
   BRANDS
══════════════════════════════════════════════════ */
type BrandItem  = { id:string;name:string;tag:string;img:string;since:string;campaigns:string;countries:string;desc:string };
type LeaderItem = { id:string;name:string;role:string;img:string;bio:string;quote:string };
type StudyItem  = { id:string;title:string;client:string;year:string;location:string;img:string;summary:string;cat:string;brand:string };
type PostItem   = { id:number;slug:string;title:string;date:string;excerpt:string;img:string;category:string;contentHtml?:string };
type UserItem   = { id:string;name:string;email:string;password:string;role:string };

const BRAND_FIELDS:  FieldDef[] = [
  {key:"id",label:"ID Slug",type:"text"},{key:"name",label:"Nome",type:"text"},{key:"tag",label:"Categoria",type:"text"},
  {key:"img",label:"Immagine (URL)",type:"url"},{key:"since",label:"Anno inizio",type:"text"},
  {key:"campaigns",label:"N° Campagne",type:"text"},{key:"countries",label:"N° Paesi",type:"text"},
  {key:"desc",label:"Descrizione",type:"textarea"},
];
const LEADER_FIELDS: FieldDef[] = [
  {key:"id",label:"ID Slug",type:"text"},{key:"name",label:"Nome",type:"text"},{key:"role",label:"Ruolo",type:"text"},
  {key:"img",label:"Foto (URL)",type:"url"},{key:"bio",label:"Bio",type:"textarea"},{key:"quote",label:"Citazione",type:"textarea"},
];
const STUDY_FIELDS:  FieldDef[] = [
  {key:"id",label:"ID Slug",type:"text"},{key:"title",label:"Titolo",type:"text"},{key:"client",label:"Cliente",type:"text"},
  {key:"brand",label:"Brand",type:"text"},{key:"year",label:"Anno",type:"text"},{key:"location",label:"Paese",type:"text"},
  {key:"cat",label:"Categoria (retail/petrol)",type:"text"},{key:"img",label:"Immagine (URL)",type:"url"},
  {key:"summary",label:"Sommario",type:"textarea"},
];
const POST_FIELDS:   FieldDef[] = [
  {key:"slug",label:"Slug (URL)",type:"text"},{key:"title",label:"Titolo",type:"text"},
  {key:"date",label:"Data (YYYY-MM-DD)",type:"text"},{key:"category",label:"Categoria",type:"text"},
  {key:"img",label:"Immagine (URL)",type:"url"},{key:"excerpt",label:"Estratto",type:"textarea"},
  {key:"contentHtml",label:"Contenuto HTML",type:"textarea-lg"},
];
const USER_FIELDS:   FieldDef[] = [
  {key:"id",label:"Username",type:"text"},{key:"name",label:"Nome Completo",type:"text"},
  {key:"email",label:"Email",type:"email"},{key:"password",label:"Password",type:"password"},
  {key:"role",label:"Ruolo (admin/editor)",type:"text"},
];

function BrandsEditor    ({ data, onSave }: { data: BrandItem[]  | null; onSave: (d: BrandItem[])  => void }) {
  return <ListEditor<BrandItem>  title="Brand"       data={data} fields={BRAND_FIELDS}  nameKey="name"  imgKey="img" onSave={onSave} blank={{id:"",name:"",tag:"",img:"",since:"",campaigns:"",countries:"",desc:""}} />;
}
function UsersEditor    ({ data, onSave }: { data: UserItem[]   | null; onSave: (d: UserItem[])   => void }) {
  return <ListEditor<UserItem>   title="Utente"      data={data} fields={USER_FIELDS}   nameKey="name" imgKey="" onSave={onSave} blank={{id:"",name:"",email:"",password:"",role:"editor"}} />;
}
function LeadershipEditor({ data, onSave }: { data: LeaderItem[] | null; onSave: (d: LeaderItem[]) => void }) {
  return <ListEditor<LeaderItem> title="Membro"      data={data} fields={LEADER_FIELDS} nameKey="name"  imgKey="img" onSave={onSave} blank={{id:"",name:"",role:"",img:"",bio:"",quote:""}} />;
}
function StudiesEditor   ({ data, onSave }: { data: StudyItem[]  | null; onSave: (d: StudyItem[])  => void }) {
  return <ListEditor<StudyItem>  title="Case Study"  data={data} fields={STUDY_FIELDS}  nameKey="title" imgKey="img" onSave={onSave} blank={{id:"",title:"",client:"",year:String(new Date().getFullYear()),location:"",img:"",summary:"",cat:"retail",brand:""}} />;
}
function PostsEditor     ({ data, onSave }: { data: PostItem[]   | null; onSave: (d: PostItem[])   => void }) {
  return <ListEditor<PostItem>   title="Post"        data={data} fields={POST_FIELDS}   nameKey="title" imgKey="img" onSave={onSave} blank={{id:Date.now(),slug:"",title:"",date:new Date().toISOString().slice(0,10),excerpt:"",img:"",category:"Loyalty Marketing"}} />;
}

/* ══════════════════════════════════════════════════
   GENERIC LIST EDITOR
══════════════════════════════════════════════════ */
type FieldDef = { key: string; label: string; type: string };

function ListEditor<T extends Record<string, unknown>>({
  title, data, fields, nameKey, imgKey, onSave, blank,
}: {
  title: string; data: T[]|null; fields: FieldDef[]; nameKey: string; imgKey: string;
  onSave: (d: T[]) => void; blank: T;
}) {
  const [items,   setItems]   = useState<T[]>([]);
  const [editing, setEditing] = useState<number|null>(null);
  const [form,    setForm]    = useState<Record<string,string>>({});
  const [isNew,   setIsNew]   = useState(false);

  useEffect(() => { if (data) setItems(data); }, [data]);
  if (!data) return <Loader />;

  function open(idx: number) {
    setIsNew(false);
    setEditing(idx);
    setForm(Object.fromEntries(Object.entries(items[idx]).map(([k,v]) => [k, String(v ?? "")])));
  }
  function commit() {
    if (editing === null) return;
    if (isNew) {
      // Aggiungi il nuovo item solo ora
      const newItem = { ...blank, id: typeof blank.id === "number" ? Date.now() : "" } as T;
      const m = { ...newItem };
      for (const [k, v] of Object.entries(form)) {
        (m as Record<string,unknown>)[k] = typeof newItem[k] === "number" ? Number(v) : v;
      }
      const updated = [...items, m];
      setItems(updated);
      setEditing(null);
      setIsNew(false);
      onSave(updated);
    } else {
      // Modifica item esistente
      const updated = items.map((item, i) => {
        if (i !== editing) return item;
        const m = { ...item };
        for (const [k, v] of Object.entries(form)) {
          (m as Record<string,unknown>)[k] = typeof item[k] === "number" ? Number(v) : v;
        }
        return m;
      });
      setItems(updated);
      setEditing(null);
      onSave(updated);
    }
  }
  function del(idx: number) {
    if (!confirm(`Eliminare questo ${title}?`)) return;
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated); onSave(updated);
  }
  function add() {
    setIsNew(true);
    setEditing(items.length); // Index di quello che sarà aggiunto
    setForm(Object.fromEntries(Object.entries(blank).map(([k,v]) => [k, String(v ?? "")])));
  }

  return (
    <div>
      {/* Modal */}
      {editing !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 640, maxHeight: "88vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111" }}>Modifica {title}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4 }}><X size={18} /></button>
            </div>
            <Grid>
              {fields.map(f => (
                <Field key={f.key} label={f.label} full={f.type.startsWith("textarea")}>
                  {f.type.startsWith("textarea")
                    ? <Textarea rows={f.type === "textarea-lg" ? 10 : 3} value={form[f.key] || ""} onChange={v => setForm(p => ({...p,[f.key]:v}))} />
                    : <Input type={f.type} value={form[f.key] || ""} onChange={v => setForm(p => ({...p,[f.key]:v}))} />
                  }
                  {f.type === "url" && form[f.key] && (
                    <img src={form[f.key]} alt="" style={{ marginTop: 6, height: 52, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }} />
                  )}
                </Field>
              ))}
            </Grid>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <SaveBtn onClick={commit} />
              <SecBtn onClick={() => { setEditing(null); setIsNew(false); }}>Annulla</SecBtn>
            </div>
          </div>
        </div>
      )}

      {/* Item list */}
      <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: "#fff", borderRadius: 14, padding: "14px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
            {item[imgKey]
              ? <img src={String(item[imgKey])} alt="" style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
              : <div style={{ width: 52, height: 52, background: "#F5F5FA", borderRadius: 10, flexShrink: 0 }} />
            }
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, color: "#111", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{String(item[nameKey] || "(vuoto)")}</div>
              <div style={{ color: "#aaa", fontSize: 11, marginTop: 2 }}>{String(item.id || "")}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => open(idx)}
                style={{ padding: "7px 16px", background: "#2E2784", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                Modifica
              </button>
              <button onClick={() => del(idx)}
                style={{ padding: "7px 14px", background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add}
        style={{ padding: "10px 20px", background: "#F8AE01", color: "#000", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
        + Aggiungi {title}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SHARED UI
══════════════════════════════════════════════════ */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#2E2784", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>{title}</div>
      {children}
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 14 }}>{children}</div>;
}
function FooterBar({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid #f0f0f6" }}>{children}</div>;
}
function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : undefined }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {children}
    </div>
  );
}
function Input({ value, onChange, type = "text" }: { value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px", border: "1.5px solid #E8E8F0", borderRadius: 9, fontSize: 13, color: "#111", background: "#FAFAFA", outline: "none", fontFamily: "inherit", transition: "border 0.15s" }}
      onFocus={e => e.target.style.borderColor = "#2E2784"}
      onBlur={e => e.target.style.borderColor = "#E8E8F0"}
    />
  );
}
function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
      style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px", border: "1.5px solid #E8E8F0", borderRadius: 9, fontSize: 13, color: "#111", background: "#FAFAFA", outline: "none", fontFamily: "inherit", resize: "vertical", transition: "border 0.15s" }}
      onFocus={e => e.target.style.borderColor = "#2E2784"}
      onBlur={e => e.target.style.borderColor = "#E8E8F0"}
    />
  );
}
function Loader() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60, color: "#bbb", fontSize: 13, gap: 8 }}>
      <div style={{ width: 18, height: 18, border: "2px solid #E8E8F0", borderTopColor: "#2E2784", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
      Caricamento...
    </div>
  );
}
function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 20px", background: "#2E2784", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
      <Save size={14} /> Salva
    </button>
  );
}
function SecBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      style={{ padding: "10px 18px", background: "#F5F5FA", color: "#555", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
      {children}
    </button>
  );
}
