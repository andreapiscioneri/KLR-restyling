"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutGrid, FileText, BarChart3, Tags, Users, FolderOpen,
  PenLine, LogOut, Menu, X, Save, ChevronRight, Globe,
  Home, Info, Wrench, Phone, Footprints, Star, Palette, Settings,
  Lightbulb, Paperclip, ArrowRight, CheckCircle, Folder, MapPin,
  Link as LinkIcon, Calendar, MessageSquare, BookOpen, Briefcase,
  Eye, EyeOff, Upload, Plus, Trash2, GripVertical, Navigation, Award, FileCode, Cookie, RefreshCw,
  Images, Search, Copy, FileVideo, FileAudio, File as FileIcon, Pencil
} from "lucide-react";
import type { AdminUser } from "@/lib/admin-auth";
import type { LucideIcon } from "lucide-react";
import klrLogo from "@/src/imports/KLR-Logosito.png";

type TopSection =
  | "overview" | "pages" | "stats" | "brands" | "leadership"
  | "studies" | "posts" | "colors" | "users" | "settings"
  | "positions" | "customPages" | "cookies" | "media";

const ROLE_SECTIONS: Record<string, TopSection[]> = {
  superadmin: ["overview","pages","stats","brands","leadership","studies","posts","colors","users","settings","positions","customPages","cookies","media"],
  admin:      ["overview","pages","stats","brands","leadership","studies","posts","colors","settings","positions","customPages","cookies","media"],
  editor:     ["overview","studies","posts","media"],
};

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
};

const GOOGLE_FONTS = [
  "Inter","Poppins","Montserrat","Raleway","Nunito","Open Sans","Roboto","Lato",
  "DM Sans","Plus Jakarta Sans","Playfair Display","Merriweather","Libre Baskerville","Source Sans 3",
];

type PageKey =
  | "site" | "nav" | "home" | "about" | "services" | "contact"
  | "team" | "brands" | "caseStudies" | "blog" | "work" | "footer"
  | "career" | "tenYears" | "geo" | "privacy" | "copyright" | "notFound";

const TOP_NAV: { id: TopSection; label: string; icon: LucideIcon }[] = [
  { id: "overview",    label: "Overview",       icon: LayoutGrid },
  { id: "pages",       label: "Pagine & Testi", icon: FileText   },
  { id: "stats",       label: "Statistiche",    icon: BarChart3  },
  { id: "brands",      label: "Brand Partners", icon: Tags       },
  { id: "leadership",  label: "Team",           icon: Users      },
  { id: "studies",     label: "Case Studies",   icon: FolderOpen },
  { id: "posts",       label: "Insights",       icon: PenLine    },
  { id: "positions",   label: "Posizioni Lavorative", icon: Award },
  { id: "customPages", label: "Pagine Custom",  icon: FileCode   },
  { id: "media",       label: "Media Library",  icon: Images     },
  { id: "colors",      label: "Colori & Tema",  icon: Palette    },
  { id: "cookies",     label: "Cookie & Privacy", icon: Cookie   },
  { id: "users",       label: "Utenti",         icon: Users      },
  { id: "settings",    label: "Impostazioni",   icon: Settings   },
];

const PAGE_TABS: { id: PageKey; label: string; icon: LucideIcon }[] = [
  { id: "site",       label: "Globale",      icon: Globe      },
  { id: "nav",        label: "Navbar",       icon: Navigation },
  { id: "home",       label: "Home",         icon: Home       },
  { id: "about",      label: "About",        icon: Info       },
  { id: "services",   label: "Services",     icon: Wrench     },
  { id: "contact",    label: "Contact",      icon: Phone      },
  { id: "team",       label: "Team",         icon: Users      },
  { id: "brands",     label: "Brands",       icon: Star       },
  { id: "caseStudies",label: "Case Studies", icon: Briefcase  },
  { id: "blog",       label: "Insights",     icon: BookOpen   },
  { id: "work",       label: "Work",         icon: Folder     },
  { id: "footer",     label: "Footer",       icon: Footprints },
  { id: "career",     label: "Career",       icon: Users      },
  { id: "tenYears",   label: "10 Years",     icon: Calendar   },
  { id: "geo",        label: "GEO Facts",    icon: MapPin     },
  { id: "privacy",    label: "Privacy",      icon: FileText   },
  { id: "copyright",  label: "Copyright",    icon: FileCode   },
  { id: "notFound",   label: "Pagina 404",   icon: X          },
];

/* ══════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════ */
type BrandItem    = { id:string;name:string;tag:string;img:string;since:string;campaigns:string;countries:string;desc:string };
type LeaderItem   = { id:string;name:string;role:string;img:string;bio:string;quote:string };
type StudyItem    = { id:string;title:string;client:string;year:string;location:string;img:string;summary:string;cat:string;brand:string };
type PostItem     = { id:number;slug:string;title:string;date:string;excerpt:string;img:string;category:string;contentHtml?:string };
type UserItem     = { id:string;name:string;email:string;password?:string;role:string;hasPassword?:boolean };
type PositionItem = { id:string;role:string;loc:string;description:string };
type NavLinkItem  = { href:string;label:string;sub?:{href:string;label:string}[] };
type BlockType    = "text" | "image" | "cta";
type Block        = { type:BlockType;title?:string;body?:string;url?:string;alt?:string;caption?:string;label?:string;href?:string;style?:string };
type CustomPageItem = { id:string;slug:string;title:string;description?:string;blocks:Block[] };
type PagesData    = Record<string, Record<string, unknown>>;

/* ══════════════════════════════════════════════════
   MAIN CLIENT
══════════════════════════════════════════════════ */
export function AdminDashboardClient({ currentUser }: { currentUser: AdminUser }) {
  const router = useRouter();
  const [section, setSection]         = useState<TopSection>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [colors,      setColors]      = useState<Record<string,string>|null>(null);
  const [settings,    setSettings]    = useState<Record<string,unknown>|null>(null);
  const [stats,       setStats]       = useState<Record<string,string>|null>(null);
  const [brands,      setBrands]      = useState<BrandItem[]|null>(null);
  const [leadership,  setLeadership]  = useState<LeaderItem[]|null>(null);
  const [studies,     setStudies]     = useState<StudyItem[]|null>(null);
  const [posts,       setPosts]       = useState<PostItem[]|null>(null);
  const [pages,       setPages]       = useState<PagesData|null>(null);
  const [users,       setUsers]       = useState<UserItem[]|null>(null);
  const [positions,   setPositions]   = useState<PositionItem[]|null>(null);
  const [customPages, setCustomPages] = useState<CustomPageItem[]|null>(null);
  const [cookieBanner, setCookieBanner] = useState<Record<string,unknown>|null>(null);
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [saveError,   setSaveError]   = useState(false);
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const load = useCallback(async (type: string) => {
    const res  = await fetch(`/api/admin/content?type=${type}`);
    const json = await res.json();
    if (!json.data) return;
    if (type === "stats")       setStats(json.data);
    if (type === "brands")      setBrands(json.data);
    if (type === "leadership")  setLeadership(json.data);
    if (type === "studies")     setStudies(json.data);
    if (type === "posts")       setPosts(json.data);
    if (type === "pages")       setPages(json.data);
    if (type === "colors")      setColors(json.data);
    if (type === "users")       setUsers(json.data);
    if (type === "settings")    setSettings(json.data);
    if (type === "positions")   setPositions(json.data);
    if (type === "customPages") setCustomPages(json.data);
    if (type === "cookieBanner") setCookieBanner(json.data);
  }, []);

  useEffect(() => {
    if (section === "colors"      && !colors)      load("colors");
    if (section === "users"       && !users)        load("users");
    if (section === "settings"    && !settings)     load("settings");
    if (section === "stats"       && !stats)        load("stats");
    if (section === "brands"      && !brands)       load("brands");
    if (section === "leadership"  && !leadership)   load("leadership");
    if (section === "studies"     && !studies)      load("studies");
    if (section === "posts"       && !posts)        load("posts");
    if (section === "pages"       && !pages)        load("pages");
    if (section === "positions"   && !positions)    load("positions");
    if (section === "customPages" && !customPages)  load("customPages");
    if (section === "cookies"     && !cookieBanner) load("cookieBanner");
  }, [section, stats, brands, leadership, studies, posts, pages, load, colors, users, settings, positions, customPages, cookieBanner]);

  async function save(type: string, payload: unknown) {
    setSaving(true); setSaved(false); setSaveError(false); setSaveErrorMessage(null);
    try {
      const res = await fetch(`/api/admin/content?type=${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        const message = json?.error || json?.details || `HTTP ${res.status}`;
        console.error("Admin save failed:", message, json);
        setSaveErrorMessage(String(message));
        setSaveError(true);
        setSaving(false);
        setTimeout(() => setSaveError(false), 4000);
        return;
      }
      setSaving(false); setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Admin save exception:", err);
      setSaveErrorMessage(err instanceof Error ? err.message : String(err));
      setSaveError(true);
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/");
  }

  useEffect(() => {
    document.body.dataset.cursorTheme = "yellow";
    return () => { delete document.body.dataset.cursorTheme; };
  }, []);

  const StatusBadge = () => (
    <>
      {saving    && <span style={{ fontSize: 12, color: "#F8AE01", fontWeight: 600, background: "rgba(248,174,1,0.1)", padding: "4px 12px", borderRadius: 20 }}>Salvataggio…</span>}
      {saved     && <span style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#16a34a",fontWeight:600,background:"rgba(22,163,74,0.1)",padding:"4px 12px",borderRadius:20 }}><CheckCircle size={12}/>Salvato</span>}
      {saveError && (
        <span style={{ display:"flex",flexDirection:"column",gap:4,fontSize:12,color:"#dc2626",fontWeight:600,background:"rgba(220,38,38,0.1)",padding:"8px 12px",borderRadius:20,maxWidth:360 }}>
          <span>✗ Errore salvataggio</span>
          {saveErrorMessage && <span style={{ fontSize:11,color:"#881111",opacity:0.9 }}>{saveErrorMessage}</span>}
        </span>
      )}
    </>
  );

  return (
    <div style={{ display:"flex",minHeight:"100vh",background:"#F5F5FA",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:30,backdropFilter:"blur(3px)" }}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        style={{
          width:230,position:"fixed",top:0,left:0,bottom:0,zIndex:40,
          background:"linear-gradient(175deg,#1e1a6e 0%,#2E2784 60%,#231e72 100%)",
          display:"flex",flexDirection:"column",
          boxShadow:"4px 0 24px rgba(46,39,132,0.25)",
          transition:"transform 0.28s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div style={{ padding:"22px 20px 18px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <Image src={klrLogo} alt="KLR" width={96} height={30} style={{ height:24,width:"auto" }} />
          <button className="admin-mobile-bar" onClick={() => setSidebarOpen(false)}
            style={{ background:"rgba(255,255,255,0.1)",border:"none",borderRadius:7,color:"rgba(255,255,255,0.7)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",width:30,height:30,flexShrink:0 }}>
            <X size={16}/>
          </button>
        </div>
        <div style={{ padding:"14px 20px 14px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#F8AE01,#f59e0b)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#000",flexShrink:0,boxShadow:"0 2px 8px rgba(248,174,1,0.4)" }}>
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ color:"#fff",fontSize:13,fontWeight:600,lineHeight:1.2 }}>{currentUser.name}</div>
            <div style={{ color:"rgba(255,255,255,0.38)",fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:"0.07em" }}>{ROLE_LABELS[currentUser.role] ?? currentUser.role}</div>
          </div>
          <button type="button" onClick={() => setChangePasswordOpen(true)} title="Cambia password"
            style={{ width:28,height:28,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,color:"rgba(255,255,255,0.6)",cursor:"pointer" }}>
            <Settings size={13}/>
          </button>
        </div>
        <nav style={{ flex:1,padding:"10px 10px",overflowY:"auto" }}>
          {TOP_NAV.filter(item => (ROLE_SECTIONS[currentUser.role] ?? ROLE_SECTIONS.editor).includes(item.id)).map(item => {
            const active = section === item.id;
            return (
              <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",marginBottom:2,border:"none",borderRadius:10,background:active?"rgba(248,174,1,0.15)":"transparent",color:active?"#F8AE01":"rgba(255,255,255,0.55)",fontSize:13,fontWeight:active?600:400,cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
                <item.icon size={15}/>
                <span style={{ flex:1 }}>{item.label}</span>
                {active && <ChevronRight size={13} style={{ opacity:0.6 }}/>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding:"12px 10px 20px" }}>
          <button onClick={logout}
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:7,width:"100%",padding:"10px 12px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"rgba(255,255,255,0.45)",fontSize:12,cursor:"pointer",transition:"all 0.15s" }}>
            <LogOut size={13}/> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="md:ml-[230px]" style={{ flex:1,minWidth:0 }}>
        <div className="admin-mobile-bar" style={{ position:"sticky",top:0,zIndex:20,background:"rgba(245,245,250,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(0,0,0,0.07)",padding:"0 20px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <button className="md:hidden" onClick={() => setSidebarOpen(v => !v)}
              style={{ width:36,height:36,background:"#2E2784",border:"none",borderRadius:8,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              {sidebarOpen ? <X size={17}/> : <Menu size={17}/>}
            </button>
            <div style={{ fontSize:15,fontWeight:700,color:"#111" }}>{TOP_NAV.find(n => n.id === section)?.label}</div>
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}><StatusBadge/></div>
        </div>

        <div style={{ padding:"24px" }}>
          <div className="hidden md:flex" style={{ alignItems:"center",justifyContent:"space-between",marginBottom:24 }}>
            <h1 style={{ margin:0,fontSize:20,fontWeight:700,color:"#111" }}>{TOP_NAV.find(n => n.id === section)?.label}</h1>
            <div style={{ display:"flex",gap:8 }}><StatusBadge/></div>
          </div>

          {section === "overview"    && <Overview />}
          {section === "colors"      && <ColorsEditor     data={colors}      onSave={d => { setColors(d);                         save("colors",      d); }} />}
          {section === "users"       && <UsersEditor      data={users}       onSave={d => { setUsers(d);                          save("users",       d); }} />}
          {section === "settings"    && <SettingsEditor   data={settings}    onSave={d => { setSettings(d as Record<string,unknown>); save("settings",   d); }} />}
          {section === "stats"       && <StatsEditor      data={stats}       onSave={d => { setStats(d);                          save("stats",       d); }} />}
          {section === "brands"      && <BrandsEditor     data={brands}      onSave={d => { setBrands(d);                         save("brands",      d); }} />}
          {section === "leadership"  && <LeadershipEditor data={leadership}  onSave={d => { setLeadership(d);                     save("leadership",  d); }} />}
          {section === "studies"     && <StudiesEditor    data={studies}     onSave={d => { setStudies(d);                        save("studies",     d); }} />}
          {section === "posts"       && <PostsEditor      data={posts}       onSave={d => { setPosts(d);                          save("posts",       d); }} />}
          {section === "positions"   && <PositionsEditor  data={positions}   onSave={d => { setPositions(d);                      save("positions",   d); }} />}
          {section === "customPages" && <CustomPagesEditor data={customPages} onSave={d => { setCustomPages(d);                   save("customPages", d); }} />}
          {section === "pages"       && <PagesEditor      data={pages}       onSave={d => { setPages(d as PagesData);             save("pages",       d); }} />}
          {section === "cookies"     && (
            <>
              <CookieBannerEditor data={cookieBanner} onSave={d => { setCookieBanner(d as Record<string,unknown>); save("cookieBanner", d); }} />
              <ConsentLogPanel />
            </>
          )}
          {section === "media"       && <MediaLibraryPanel />}
        </div>
      </main>
      {changePasswordOpen && <ChangePasswordModal onClose={() => setChangePasswordOpen(false)} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CHANGE PASSWORD MODAL (self-service, any role)
══════════════════════════════════════════════════ */
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword,     setNewPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting,      setSubmitting]      = useState(false);
  const [error,           setError]           = useState<string | null>(null);
  const [success,         setSuccess]         = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("La nuova password deve avere almeno 8 caratteri");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Le due password non coincidono");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setError(json?.error || `Errore (HTTP ${res.status})`);
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setSubmitting(false);
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(10,7,30,0.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:20 }}
      onClick={onClose}>
      <form onClick={e => e.stopPropagation()} onSubmit={submit}
        style={{ background:"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:380,boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18 }}>
          <h3 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111" }}>Cambia password</h3>
          <button type="button" onClick={onClose}
            style={{ width:26,height:26,display:"flex",alignItems:"center",justifyContent:"center",background:"#F2F2F6",border:"none",borderRadius:7,cursor:"pointer",color:"#666" }}>
            <X size={14}/>
          </button>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Field label="Password attuale">
            <Input type="password" value={currentPassword} onChange={setCurrentPassword}/>
          </Field>
          <Field label="Nuova password">
            <Input type="password" value={newPassword} onChange={setNewPassword}/>
          </Field>
          <Field label="Conferma nuova password">
            <Input type="password" value={confirmPassword} onChange={setConfirmPassword}/>
          </Field>
        </div>

        {error && (
          <div style={{ marginTop:12,padding:"8px 12px",background:"rgba(220,38,38,0.08)",color:"#dc2626",borderRadius:8,fontSize:12,fontWeight:600 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ marginTop:12,padding:"8px 12px",background:"rgba(22,163,74,0.1)",color:"#16a34a",borderRadius:8,fontSize:12,fontWeight:600 }}>
            Password aggiornata
          </div>
        )}

        <button type="submit" disabled={submitting || success}
          style={{ marginTop:16,width:"100%",padding:"11px",background:submitting||success?"#eee":"#F8AE01",color:submitting||success?"#999":"#000",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:submitting||success?"not-allowed":"pointer" }}>
          {submitting ? "Salvataggio…" : success ? "Fatto" : "Aggiorna password"}
        </button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════ */
function Overview() {
  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24 }}>
        {[
          { label:"Pagine gestibili",  value:"11",  color:"#2E2784" },
          { label:"Sezioni editabili", value:"60+", color:"#2E2784" },
          { label:"Immagini upload",   value:"✓",   color:"#16a34a" },
          { label:"Navbar da CMS",     value:"✓",   color:"#16a34a" },
          { label:"Deploy Netlify",    value:"✓",   color:"#16a34a" },
          { label:"Pagine Custom",     value:"∞",   color:"#F8AE01" },
        ].map(c => (
          <div key={c.label} style={{ background:"#fff",borderRadius:16,padding:"22px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${c.color}` }}>
            <div style={{ fontSize:28,fontWeight:800,color:c.color,lineHeight:1 }}>{c.value}</div>
            <div style={{ fontSize:12,color:"#777",marginTop:6 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#fff",borderRadius:16,padding:"22px 24px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize:12,fontWeight:700,color:"#2E2784",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:14 }}>Guida rapida</div>
        {[
          ["Colori & Tema",   "personalizza i colori primari, accenti, logo e font"],
          ["Impostazioni",    "configura nome sito, contatti, social, SEO e analytics"],
          ["Pagine & Testi",  "modifica ogni testo, titolo e CTA di ogni pagina — con visibilità sezioni"],
          ["Navbar",          "gestisci i link della navbar e il bottone CTA"],
          ["Statistiche",     "aggiorna i numeri KLR (campagne, paesi, retailer…)"],
          ["Brand Partners",  "aggiungi, modifica o elimina brand con immagini Firebase"],
          ["Team",            "gestisci tutti i membri del team"],
          ["Case Studies",    "aggiungi e modifica le campagne"],
          ["Insights",        "gestisci gli articoli del blog con editor rich text"],
          ["Posizioni Lavorative", "gestisci le posizioni aperte della pagina Career"],
          ["Pagine Custom",   "crea nuove pagine dal CMS senza codice — URL personalizzato"],
        ].map(([k, v]) => (
          <div key={k} style={{ display:"flex",gap:8,marginBottom:10,fontSize:13,color:"#444",alignItems:"flex-start" }}>
            <span style={{ fontWeight:700,color:"#2E2784",minWidth:120 }}>{k}</span>
            <ArrowRight size={14} style={{ marginTop:2,color:"#999",flexShrink:0 }}/>
            <span style={{ color:"#666" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:16,padding:"14px 18px",background:"rgba(22,163,74,0.07)",borderRadius:12,border:"1px solid rgba(22,163,74,0.2)",fontSize:12,color:"#16a34a",display:"flex",gap:8,alignItems:"center" }}>
        <CheckCircle size={14} style={{ flexShrink:0 }}/>
        <span><strong>Tutte le limitazioni risolte:</strong> Upload immagini Firebase Storage, navbar da CMS, pagine mancanti, sezioni visibili/nascoste, deploy Netlify, pagine custom.</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   IMAGE UPLOAD HOOK
══════════════════════════════════════════════════ */
function useImageUpload(onUrl: (url: string) => void) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true); setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json() as { url?: string; error?: string };
      if (json.url) { onUrl(json.url); }
      else          { setUploadError(json.error || "Upload fallito"); }
    } catch { setUploadError("Errore di rete"); }
    setUploading(false);
  }

  function open() { ref.current?.click(); }

  const inputEl = (
    <input ref={ref} type="file" accept="image/*" style={{ display:"none" }}
      onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
    />
  );

  return { open, uploading, uploadError, inputEl };
}

/* ══════════════════════════════════════════════════
   IMAGE FIELD with UPLOAD BUTTON
══════════════════════════════════════════════════ */
function ImageField({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const { open, uploading, uploadError, inputEl } = useImageUpload(onChange);
  return (
    <Field label={label} full>
      {inputEl}
      <div style={{ display:"flex",gap:8,alignItems:"center" }}>
        <Input value={value} onChange={onChange} />
        <button type="button" onClick={open}
          style={{ flexShrink:0,display:"flex",alignItems:"center",gap:6,padding:"9px 14px",background:uploading?"#ddd":"#2E2784",color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:uploading?"not-allowed":"pointer",whiteSpace:"nowrap",transition:"all 0.15s" }}
          disabled={uploading}>
          <Upload size={13}/>{uploading ? "Upload…" : "Carica"}
        </button>
      </div>
      {uploadError && <div style={{ fontSize:11,color:"#dc2626",marginTop:4 }}>{uploadError}</div>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ marginTop:8,height:60,objectFit:"cover",borderRadius:8,border:"1px solid #eee",maxWidth:"100%" }}/>
      )}
    </Field>
  );
}

/* ══════════════════════════════════════════════════
   COLORS & THEME
══════════════════════════════════════════════════ */
type GlobalColors = {
  primaryColor: string; accentColor: string; logoUrl: string;
  siteUrl: string; defaultEmail: string; headingFont?: string; bodyFont?: string;
};

const COLORS_LABELS: Record<string,string> = {
  primaryColor:"Colore Primario",accentColor:"Colore Accento",
  siteUrl:"URL Sito",defaultEmail:"Email Principale",
};

function ColorsEditor({ data, onSave }: { data: Record<string,string>|null; onSave:(d:Record<string,string>)=>void }) {
  const [form, setForm] = useState<Record<string,string>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader/>;
  return (
    <div>
      <Panel title="Colori e Impostazioni Globali">
        <Grid>
          {Object.entries(COLORS_LABELS).map(([key, lbl]) => {
            const value = form[key] || "";
            const isColor = key === "primaryColor" || key === "accentColor";
            return (
              <Field key={key} label={lbl}>
                {isColor ? (
                  <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                    <input type="color" value={value} onChange={e => setForm(p => ({...p,[key]:e.target.value}))}
                      style={{ width:45,height:40,border:"1.5px solid #E8E8F0",borderRadius:9,cursor:"pointer",padding:2,flexShrink:0 }}/>
                    <Input value={value} onChange={v => setForm(p => ({...p,[key]:v}))}/>
                  </div>
                ) : (
                  <Input value={value} onChange={v => setForm(p => ({...p,[key]:v}))}/>
                )}
              </Field>
            );
          })}
        </Grid>
        {/* Logo upload */}
        <div style={{ marginTop:16 }}>
          <ImageField value={form.logoUrl || ""} onChange={v => setForm(p => ({...p,logoUrl:v}))} label="Logo (URL o Upload)"/>
        </div>
        <div style={{ marginTop:16,padding:"14px",background:"#F5F5FA",borderRadius:12,border:"1px solid #E8E8F0" }}>
          <div style={{ fontSize:12,fontWeight:700,color:"#666",textTransform:"uppercase",marginBottom:10 }}>Anteprima Colori</div>
          <div style={{ display:"flex",gap:16,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:32,height:32,background:form.primaryColor||"#2E2784",borderRadius:8,border:"1px solid rgba(0,0,0,0.1)" }}/>
              <div style={{ fontSize:12,color:"#555" }}>Primario: {form.primaryColor||"#2E2784"}</div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:32,height:32,background:form.accentColor||"#F8AE01",borderRadius:8,border:"1px solid rgba(0,0,0,0.1)" }}/>
              <div style={{ fontSize:12,color:"#555" }}>Accento: {form.accentColor||"#F8AE01"}</div>
            </div>
          </div>
        </div>
      </Panel>
      <Panel title="Tipografia — Font Google">
        <Grid>
          <Field label="Font Titoli"><FontSelect value={form.headingFont||"Inter"} onChange={v => setForm(p => ({...p,headingFont:v}))}/></Field>
          <Field label="Font Testi"><FontSelect value={form.bodyFont||"Inter"} onChange={v => setForm(p => ({...p,bodyFont:v}))}/></Field>
        </Grid>
      </Panel>
      <FooterBar><SaveBtn onClick={() => onSave(form)}/></FooterBar>
    </div>
  );
}

function FontSelect({ value, onChange }: { value:string; onChange:(v:string)=>void }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,color:"#111",background:"#FAFAFA",outline:"none",fontFamily:"inherit",cursor:"pointer" }}>
      {GOOGLE_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
    </select>
  );
}

/* ══════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════ */
function SettingsEditor({ data, onSave }: { data:Record<string,unknown>|null; onSave:(d:unknown)=>void }) {
  const [form, setForm] = useState<Record<string,unknown>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader/>;
  const up  = (key: string, value: unknown) => setForm(p => ({...p,[key]:value}));
  const upN = (sec: string, key: string, value: string) =>
    setForm(p => ({...p,[sec]:{...(p[sec] as Record<string,unknown>),[key]:value}}));
  const socialLinks = form.socialLinks as Record<string,string> || {};
  const hq = form.hq as Record<string,string> || {};
  return (
    <div>
      <Panel title="Informazioni Sito">
        <Grid>
          <Field label="Nome Sito"><Input value={String(form.siteName||"")} onChange={v=>up("siteName",v)}/></Field>
          <Field label="URL Sito"><Input value={String(form.siteUrl||"")} onChange={v=>up("siteUrl",v)}/></Field>
          <Field label="Descrizione Sito" full><Textarea value={String(form.siteDescription||"")} onChange={v=>up("siteDescription",v)} rows={3}/></Field>
          <Field label="Keywords" full><Textarea value={String(form.siteKeywords||"")} onChange={v=>up("siteKeywords",v)} rows={2}/></Field>
        </Grid>
      </Panel>
      <Panel title="Contatti">
        <Grid>
          <Field label="Email Principale"><Input type="email" value={String(form.defaultEmail||"")} onChange={v=>up("defaultEmail",v)}/></Field>
          <Field label="Email Support"><Input type="email" value={String(form.supportEmail||"")} onChange={v=>up("supportEmail",v)}/></Field>
          <Field label="Telefono"><Input value={String(form.phone||"")} onChange={v=>up("phone",v)}/></Field>
        </Grid>
      </Panel>
      <Panel title="Sede Principale">
        <Grid>
          <Field label="Indirizzo" full><Input value={String(hq.address||"")} onChange={v=>upN("hq","address",v)}/></Field>
          <Field label="Città"><Input value={String(hq.city||"")} onChange={v=>upN("hq","city",v)}/></Field>
          <Field label="Paese"><Input value={String(hq.country||"")} onChange={v=>upN("hq","country",v)}/></Field>
        </Grid>
      </Panel>
      <Panel title="Social Media">
        <Grid>
          <Field label="LinkedIn"><Input value={String(socialLinks.linkedin||"")} onChange={v=>upN("socialLinks","linkedin",v)}/></Field>
          <Field label="Instagram"><Input value={String(socialLinks.instagram||"")} onChange={v=>upN("socialLinks","instagram",v)}/></Field>
          <Field label="Twitter"><Input value={String(socialLinks.twitter||"")} onChange={v=>upN("socialLinks","twitter",v)}/></Field>
          <Field label="Facebook"><Input value={String(socialLinks.facebook||"")} onChange={v=>upN("socialLinks","facebook",v)}/></Field>
        </Grid>
      </Panel>
      <Panel title="Avanzate">
        <Grid>
          <Field label="Google Analytics ID"><Input value={String(form.googleAnalyticsId||"")} onChange={v=>up("googleAnalyticsId",v)}/></Field>
          <Field label="Custom CSS" full><Textarea value={String(form.customCss||"")} onChange={v=>up("customCss",v)} rows={6}/></Field>
        </Grid>
      </Panel>
      <FooterBar><SaveBtn onClick={() => onSave(form)}/></FooterBar>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   COOKIE BANNER
══════════════════════════════════════════════════ */
type CookieLevelKey = "silver" | "gold" | "platinum";
type CookieCategoryKey = "content" | "optimization" | "ads";
const COOKIE_LEVEL_LABELS: Record<CookieLevelKey, string> = { silver: "Silver", gold: "Gold", platinum: "Platinum" };
const COOKIE_CATEGORY_LABELS: Record<CookieCategoryKey, string> = { content: "Content Personalization", optimization: "Site Optimization", ads: "Ad Personalization" };

function CookieBannerEditor({ data, onSave }: { data: Record<string,unknown>|null; onSave: (d: unknown) => void }) {
  const [form, setForm] = useState<Record<string,unknown>>({});
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader/>;

  const up  = (key: string, value: unknown) => setForm(p => ({...p,[key]:value}));
  const upLevel = (level: CookieLevelKey, value: string) =>
    setForm(p => ({...p, levelDescriptions: {...(p.levelDescriptions as Record<string,unknown>), [level]: value}}));
  const upCategory = (cat: CookieCategoryKey, key: "title"|"description", value: string) =>
    setForm(p => ({...p, categories: {...(p.categories as Record<string,unknown>), [cat]: {...((p.categories as Record<string,unknown>)?.[cat] as Record<string,unknown>), [key]: value}}}));

  const levelDescriptions = (form.levelDescriptions as Record<string,string>) || {};
  const categories = (form.categories as Record<string, {title?:string; description?:string}>) || {};
  const enabled = form.enabled !== false;

  return (
    <div>
      <Panel title="Banner Cookie" rightAction={
        <label style={{ display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:600,color: enabled ? "#16a34a" : "#999",cursor:"pointer" }}>
          <input type="checkbox" checked={enabled} onChange={e => up("enabled", e.target.checked)} style={{ width:16,height:16,cursor:"pointer" }}/>
          {enabled ? "Banner attivo" : "Banner disattivato"}
        </label>
      }>
        <Grid>
          <Field label="Titolo principale" full><Textarea value={String(form.headline||"")} onChange={v=>up("headline",v)} rows={2}/></Field>
          <Field label="Sottotitolo" full><Textarea value={String(form.subheadline||"")} onChange={v=>up("subheadline",v)} rows={2}/></Field>
          <Field label="Durata predefinita">
            <FieldSelect value={String(form.defaultDuration||"1m")} onChange={v=>up("defaultDuration",v)} options={["1m","6m","12m"]}/>
          </Field>
        </Grid>
      </Panel>

      <Panel title="Descrizioni per livello">
        <Grid>
          {(["silver","gold","platinum"] as CookieLevelKey[]).map(lvl => (
            <Field key={lvl} label={COOKIE_LEVEL_LABELS[lvl]} full>
              <Textarea value={levelDescriptions[lvl]||""} onChange={v=>upLevel(lvl,v)} rows={2}/>
            </Field>
          ))}
        </Grid>
      </Panel>

      <Panel title="Categorie di consenso (Basic Operations è sempre obbligatoria e non modificabile)">
        <Grid>
          {(["content","optimization","ads"] as CookieCategoryKey[]).map(cat => (
            <Field key={cat} label={COOKIE_CATEGORY_LABELS[cat]} full>
              <Input value={categories[cat]?.title||""} onChange={v=>upCategory(cat,"title",v)}/>
              <div style={{ height:8 }}/>
              <Textarea value={categories[cat]?.description||""} onChange={v=>upCategory(cat,"description",v)} rows={2}/>
            </Field>
          ))}
        </Grid>
      </Panel>

      <FooterBar><SaveBtn onClick={() => onSave(form)}/></FooterBar>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CONSENT LOG
══════════════════════════════════════════════════ */
type ConsentLogRecord = {
  id: string;
  level: string;
  duration: string;
  categories: { basic:boolean; content:boolean; optimization:boolean; ads:boolean };
  consentedAt: string;
  expiresAt: string;
  path?: string;
  userAgent?: string;
  loggedAt: string;
};

const LEVEL_BADGE_COLOR: Record<string,string> = { silver:"#8b8b98", gold:"#b8860b", platinum:"#6f5fae", custom:"#2E2784" };

function ConsentLogPanel() {
  const [log, setLog]         = useState<ConsentLogRecord[]|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string|null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/admin/consent", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setLog(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function removeOne(id: string) {
    if (!confirm("Eliminare questo record di consenso?")) return;
    await fetch(`/api/admin/consent?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    load();
  }

  async function removeAll() {
    if (!confirm("Eliminare TUTTI i record di consenso registrati? Questa azione non è reversibile.")) return;
    await fetch(`/api/admin/consent?id=all`, { method: "DELETE" });
    load();
  }

  const now = Date.now();
  const total   = log?.length ?? 0;
  const active  = log?.filter(r => new Date(r.expiresAt).getTime() > now).length ?? 0;
  const last24h = log?.filter(r => now - new Date(r.loggedAt).getTime() < 86400000).length ?? 0;
  const byLevel: Record<string, number> = {};
  log?.forEach(r => { byLevel[r.level] = (byLevel[r.level]||0) + 1; });

  return (
    <div>
      <Panel title="Registro Consensi" rightAction={
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={load} title="Aggiorna"
            style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"#F5F5FA",color:"#555",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer" }}>
            <RefreshCw size={13}/> Aggiorna
          </button>
          {total > 0 && (
            <button onClick={removeAll}
              style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 12px",background:"rgba(220,38,38,0.08)",color:"#dc2626",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer" }}>
              <Trash2 size={13}/> Cancella tutto
            </button>
          )}
        </div>
      }>
        {loading && !log && <Loader/>}
        {error && <div style={{ color:"#dc2626",fontSize:13,padding:"12px 0" }}>Errore: {error}</div>}

        {log && (
          <>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:18 }}>
              <MiniStat label="Consensi totali" value={String(total)} color="#2E2784"/>
              <MiniStat label="Attivi (non scaduti)" value={String(active)} color="#16a34a"/>
              <MiniStat label="Ultime 24h" value={String(last24h)} color="#F8AE01"/>
              {(["silver","gold","platinum","custom"] as const).filter(l => byLevel[l]).map(l => (
                <MiniStat key={l} label={COOKIE_LEVEL_LABELS[l as CookieLevelKey] ?? "Custom"} value={String(byLevel[l])} color={LEVEL_BADGE_COLOR[l]}/>
              ))}
            </div>

            {log.length === 0 ? (
              <div style={{ padding:"30px 0",textAlign:"center",color:"#999",fontSize:13 }}>Nessun consenso registrato finora.</div>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12.5 }}>
                  <thead>
                    <tr style={{ textAlign:"left",color:"#888",textTransform:"uppercase",fontSize:10.5,letterSpacing:"0.04em" }}>
                      <th style={{ padding:"8px 10px" }}>Data</th>
                      <th style={{ padding:"8px 10px" }}>Livello</th>
                      <th style={{ padding:"8px 10px" }}>Categorie attive</th>
                      <th style={{ padding:"8px 10px" }}>Durata</th>
                      <th style={{ padding:"8px 10px" }}>Scadenza</th>
                      <th style={{ padding:"8px 10px" }}>Pagina</th>
                      <th style={{ padding:"8px 10px" }}>Consent ID</th>
                      <th style={{ padding:"8px 10px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.map(r => {
                      const cats = (["basic","content","optimization","ads"] as const).filter(k => r.categories?.[k]);
                      const expired = new Date(r.expiresAt).getTime() < now;
                      return (
                        <tr key={r.id} style={{ borderTop:"1px solid #F0F0F6" }}>
                          <td style={{ padding:"9px 10px",color:"#444",whiteSpace:"nowrap" }}>{new Date(r.consentedAt).toLocaleString("it-IT")}</td>
                          <td style={{ padding:"9px 10px" }}>
                            <span style={{ padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,color:"#fff",background:LEVEL_BADGE_COLOR[r.level]||"#888",textTransform:"capitalize" }}>{r.level}</span>
                          </td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{cats.join(", ")}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.duration}</td>
                          <td style={{ padding:"9px 10px",color: expired ? "#dc2626" : "#666" }}>{new Date(r.expiresAt).toLocaleDateString("it-IT")}{expired ? " (scaduto)" : ""}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.path||"—"}</td>
                          <td style={{ padding:"9px 10px",color:"#999",fontFamily:"monospace",fontSize:11 }}>{r.id.slice(0,8)}…</td>
                          <td style={{ padding:"9px 10px" }}>
                            <button onClick={() => removeOne(r.id)} title="Elimina"
                              style={{ background:"none",border:"none",color:"#bbb",cursor:"pointer",display:"flex" }}>
                              <Trash2 size={14}/>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Panel>
    </div>
  );
}

function MiniStat({ label, value, color }: { label:string; value:string; color:string }) {
  return (
    <div style={{ background:"#FAFAFC",borderRadius:12,padding:"12px 14px",borderLeft:`3px solid ${color}` }}>
      <div style={{ fontSize:20,fontWeight:800,color,lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:10.5,color:"#888",marginTop:5 }}>{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MEDIA LIBRARY
══════════════════════════════════════════════════ */
type MediaRecord = {
  id: string; filename: string; title: string; alt: string; caption: string; description: string;
  mimeType: string; filesize?: number; width?: number; height?: number; sourceUrl?: string;
  uploadedAt: string; updatedAt: string; url: string;
};

const MEDIA_PAGE_SIZE = 24;

function formatBytes(n?: number) {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

function MediaThumb({ item, size = 64 }: { item: MediaRecord; size?: number }) {
  const style: React.CSSProperties = { width: size, height: size, borderRadius: 10, objectFit: "cover", background: "#F0F0F6", flexShrink: 0 };
  if (item.mimeType.startsWith("image/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.url} alt={item.alt || item.filename} style={style} />;
  }
  const Icon = item.mimeType.startsWith("video/") ? FileVideo : item.mimeType.startsWith("audio/") ? FileAudio : FileIcon;
  return (
    <div style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
      <Icon size={Math.round(size * 0.4)} />
    </div>
  );
}

function MediaLibraryPanel() {
  const [items, setItems]         = useState<MediaRecord[] | null>(null);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(false);
  const [query, setQuery]         = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [visible, setVisible]     = useState(MEDIA_PAGE_SIZE);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [editing, setEditing]     = useState<MediaRecord | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async (q: string, type: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (type !== "all") params.set("type", type);
      const res = await fetch(`/api/admin/media?${params.toString()}`, { cache: "no-store" });
      const json = await res.json();
      setItems(json.data || []);
      setTotal(json.total ?? (json.data || []).length);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(MEDIA_PAGE_SIZE); load(query, typeFilter); }, 300);
    return () => clearTimeout(t);
  }, [query, typeFilter, load]);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    let ok = 0, fail = 0;
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/media", { method: "POST", body: fd });
        if (res.ok) ok++; else fail++;
      } catch { fail++; }
    }
    setUploading(false);
    setUploadMsg(`${ok} caricati${fail ? `, ${fail} falliti` : ""}`);
    setTimeout(() => setUploadMsg(""), 4000);
    load(query, typeFilter);
  }

  async function saveEdit(record: MediaRecord, replaceFile?: File) {
    let res: Response;
    if (replaceFile) {
      const fd = new FormData();
      fd.append("file", replaceFile);
      fd.append("title", record.title);
      fd.append("alt", record.alt);
      fd.append("caption", record.caption);
      fd.append("description", record.description);
      res = await fetch(`/api/admin/media/${record.id}`, { method: "PUT", body: fd });
    } else {
      res = await fetch(`/api/admin/media/${record.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: record.title, alt: record.alt, caption: record.caption, description: record.description }),
      });
    }
    if (res.ok) {
      setEditing(null);
      load(query, typeFilter);
    }
  }

  async function remove(id: string) {
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.status === 409) {
      const json = await res.json();
      if (confirm(`${json.message}\n\nEliminare comunque?`)) {
        await fetch(`/api/admin/media/${id}?force=true`, { method: "DELETE" });
        setEditing(null);
        load(query, typeFilter);
      }
      return;
    }
    setEditing(null);
    load(query, typeFilter);
  }

  function copyUrl(url: string) {
    const full = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;
    navigator.clipboard?.writeText(full).catch(() => {});
  }

  const visibleItems = (items || []).slice(0, visible);

  return (
    <div>
      <Panel title={`Media Library (${total} asset)`} rightAction={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {uploadMsg && <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>{uploadMsg}</span>}
          <input ref={fileInputRef} type="file" multiple style={{ display: "none" }}
            onChange={e => { handleUpload(e.target.files); e.target.value = ""; }} />
          <button onClick={() => fileInputRef.current?.click()} disabled={uploading}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 16px", background: uploading ? "#ddd" : "#2E2784", color: "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: uploading ? "not-allowed" : "pointer" }}>
            <Upload size={14} /> {uploading ? "Caricamento…" : "Carica file"}
          </button>
        </div>
      }>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cerca per nome, alt, caption…"
              style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px 9px 34px", border: "1.5px solid #E8E8F0", borderRadius: 9, fontSize: 13, background: "#FAFAFA", outline: "none" }} />
          </div>
          <FieldSelect value={typeFilter} onChange={setTypeFilter} options={["all", "image", "video", "application"]} />
        </div>

        {loading && !items && <Loader />}

        {items && items.length === 0 && (
          <div style={{ padding: "40px 0", textAlign: "center", color: "#999", fontSize: 13 }}>
            Nessun asset trovato.
          </div>
        )}

        {items && items.length > 0 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
              {visibleItems.map(item => (
                <button key={item.id} onClick={() => setEditing(item)}
                  style={{ display: "flex", gap: 10, alignItems: "center", padding: 10, background: "#fff", border: "1px solid #EEEEF3", borderRadius: 12, cursor: "pointer", textAlign: "left" }}>
                  <MediaThumb item={item} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "#222", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title || item.filename}</div>
                    <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{item.mimeType} · {formatBytes(item.filesize)}</div>
                  </div>
                  <Pencil size={13} style={{ color: "#bbb", flexShrink: 0 }} />
                </button>
              ))}
            </div>
            {visible < items.length && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <button onClick={() => setVisible(v => v + MEDIA_PAGE_SIZE)}
                  style={{ padding: "9px 20px", background: "#F5F5FA", color: "#555", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
                  Carica altri ({items.length - visible} rimanenti)
                </button>
              </div>
            )}
          </>
        )}
      </Panel>

      {editing && (
        <div onClick={() => setEditing(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 16, padding: 24, maxWidth: 480, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
            <MediaEditForm item={editing} onCancel={() => setEditing(null)} onSave={saveEdit} onDelete={remove} onCopyUrl={copyUrl} />
          </div>
        </div>
      )}
    </div>
  );
}

function MediaEditForm({ item, onCancel, onSave, onDelete, onCopyUrl }: {
  item: MediaRecord;
  onCancel: () => void;
  onSave: (record: MediaRecord, replaceFile?: File) => void;
  onDelete: (id: string) => void;
  onCopyUrl: (url: string) => void;
}) {
  const [form, setForm] = useState(item);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const replaceRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>Modifica asset</div>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#999" }}><X size={18} /></button>
      </div>

      <MediaThumb item={item} size={140} />

      <div style={{ marginTop: 14 }}>
        <Field label="Titolo"><Input value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} /></Field>
      </div>
      <div style={{ marginTop: 10 }}>
        <Field label="Alt Text"><Input value={form.alt} onChange={v => setForm(p => ({ ...p, alt: v }))} /></Field>
      </div>
      <div style={{ marginTop: 10 }}>
        <Field label="Caption"><Input value={form.caption} onChange={v => setForm(p => ({ ...p, caption: v }))} /></Field>
      </div>
      <div style={{ marginTop: 10 }}>
        <Field label="Description"><Textarea value={form.description} onChange={v => setForm(p => ({ ...p, description: v }))} rows={3} /></Field>
      </div>

      <div style={{ marginTop: 14, padding: "10px 12px", background: "#FAFAFC", borderRadius: 10, fontSize: 11.5, color: "#888" }}>
        <div>File: {item.filename}</div>
        <div>Tipo: {item.mimeType} · Peso: {formatBytes(item.filesize)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <code style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.url}</code>
          <button onClick={() => onCopyUrl(item.url)} style={{ background: "none", border: "none", cursor: "pointer", color: "#2E2784", display: "flex" }}>
            <Copy size={13} />
          </button>
        </div>
      </div>

      <input ref={replaceRef} type="file" style={{ display: "none" }} onChange={e => setReplaceFile(e.target.files?.[0] || null)} />
      <button onClick={() => replaceRef.current?.click()}
        style={{ marginTop: 12, width: "100%", padding: "9px 12px", background: "#F5F5FA", color: "#555", border: "1px dashed #ddd", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
        {replaceFile ? `Sostituirà con: ${replaceFile.name}` : "Sostituisci file…"}
      </button>

      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        <button onClick={() => onDelete(item.id)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", background: "rgba(220,38,38,0.08)", color: "#dc2626", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
          <Trash2 size={13} /> Elimina
        </button>
        <div style={{ flex: 1 }} />
        <SecBtn onClick={onCancel}>Annulla</SecBtn>
        <SaveBtn onClick={() => onSave(form, replaceFile || undefined)} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STATS
══════════════════════════════════════════════════ */
const STATS_LABELS: Record<string,string> = {
  campaigns:"Campagne",retailers:"Retailer / Catene",countries:"Paesi",years:"Anni attività",
  combinedExperience:"Anni Esperienza Combinata",people:"Persone nel Team",nationalities:"Nazionalità",
};

function StatsEditor({ data, onSave }: { data:Record<string,string>|null; onSave:(d:Record<string,string>)=>void }) {
  const [form,setForm] = useState<Record<string,string>>({});
  useEffect(() => { if (data) setForm(data); },[data]);
  if (!data) return <Loader/>;
  return (
    <Panel title="Numeri KLR">
      <Grid>
        {Object.entries(STATS_LABELS).map(([key,lbl]) => (
          <Field key={key} label={lbl}>
            <Input value={form[key]||""} onChange={v=>setForm(p=>({...p,[key]:v}))}/>
          </Field>
        ))}
      </Grid>
      <FooterBar><SaveBtn onClick={() => onSave(form)}/></FooterBar>
    </Panel>
  );
}

/* ══════════════════════════════════════════════════
   PAGES EDITOR — with visibility toggle + navbar editor
══════════════════════════════════════════════════ */
type PagesDataLocal = Record<string, Record<string, unknown>>;

const IMAGE_FIELDS    = ["image","mapImage","image1","image2","logoUrl","img","bannerImage","videoUrl"];
const TEXTAREA_FIELDS = ["subtitle","mainText","text","bodyText","description","companyDesc","tagline","hq1","hq2","messagePlaceholder","item1","item2","item3","intro","closing","value1Desc","value2Desc","value3Desc","paragraph1","paragraph2","card1Text","card2Text","card3Text","card4Text","mapBody","point1","point2","point3","milestonesText","brandSubtitle","retailerSubtitle","badge3","companyAddress","what","how","out","itemsText","sourceMapLinksText"];
const COLOR_FIELDS    = ["primaryColor","accentColor","bgColor","bgAccent"];

const FIELD_LABELS: Record<string,string> = {
  primaryColor:"Colore primario",accentColor:"Colore accento",logoUrl:"URL Logo",siteUrl:"URL Sito",defaultEmail:"Email principale",
  ctaLabel:"Testo CTA",ctaHref:"Link CTA",eyebrow:"Eyebrow",title:"Titolo",titleLine1:"Titolo riga 1",titleLine2:"Titolo riga 2",
  subtitle:"Sottotitolo",image:"Immagine (URL)",mapImage:"Mappa (URL)",image1:"Immagine 1 (URL)",image2:"Immagine 2 (URL)",
  bannerImage:"Banner (URL)",videoUrl:"Video (URL)",
  mainText:"Testo principale",text:"Testo",bodyText:"Corpo testo",tagline:"Tagline",description:"Descrizione",
  companyDesc:"Descrizione azienda",copyright:"Copyright",hqTitle:"Titolo sede",hq1:"Indirizzo 1",hq2:"Indirizzo 2",
  email:"Email",emailNote:"Nota email",linkedinUrl:"LinkedIn URL",youtubeUrl:"YouTube URL",
  badge1:"Badge 1",badge2:"Badge 2",badge3:"Badge 3",intro:"Intro",closing:"Chiusura",partnerEmail:"Email partner",
  brandEyebrow:"Brand - Eyebrow",brandTitle:"Brand - Titolo",brandSubtitle:"Brand - Sottotitolo",brandCtaLabel:"Brand - Testo CTA",
  retailerEyebrow:"Retailer - Eyebrow",retailerTitle:"Retailer - Titolo",retailerSubtitle:"Retailer - Sottotitolo",retailerCtaLabel:"Retailer - Testo CTA",
  contactEmail:"Email contatti",submitLabel:"Testo pulsante invio",
  namePlaceholder:"Placeholder nome",emailPlaceholder:"Placeholder email",
  companyPlaceholder:"Placeholder azienda",rolePlaceholder:"Placeholder ruolo",messagePlaceholder:"Placeholder messaggio",
  paragraph1:"Paragrafo 1",paragraph2:"Paragrafo 2",
  card1Text:"Card 1 Testo",card2Text:"Card 2 Testo",card3Text:"Card 3 Testo",card4Text:"Card 4 Testo",
  mapBody:"Testo mappa",point1:"Punto 1",point2:"Punto 2",point3:"Punto 3",
  milestonesText:"Milestone 10 Years (year|testo, una riga per milestone)",
  step1Title:"Step 1 Titolo",step1Desc:"Step 1 Descrizione",step2Title:"Step 2 Titolo",step2Desc:"Step 2 Descrizione",
  step3Title:"Step 3 Titolo",step3Desc:"Step 3 Descrizione",
  item1:"Testo 1",item2:"Testo 2",item3:"Testo 3",
  value1Title:"Valore 1 Titolo",value1Desc:"Valore 1 Descrizione",
  value2Title:"Valore 2 Titolo",value2Desc:"Valore 2 Descrizione",
  value3Title:"Valore 3 Titolo",value3Desc:"Valore 3 Descrizione",
  lastReviewed:"Ultima revisione",factsTitle:"Titolo fatti",citationTitle:"Titolo citazioni",sourceMapTitle:"Titolo source map",
  fact1:"Fatto 1",fact1Source:"Fonte 1",fact2:"Fatto 2",fact2Source:"Fonte 2",
  fact3:"Fatto 3",fact3Source:"Fonte 3",fact4:"Fatto 4",fact4Source:"Fonte 4",
  fact5:"Fatto 5",fact5Source:"Fonte 5",
  citationLine1:"Citazione 1",citationLine2:"Citazione 2",citationLine3:"Citazione 3",citationLine4:"Citazione 4",
  companyName:"Ragione sociale",companyAddress:"Indirizzo",companyCity:"Città / Paese",vatNumber:"P.IVA / VAT",
  lastUpdate:"Ultimo aggiornamento",ctaLabel2:"Testo CTA 2",ctaHref2:"Link CTA 2",
  bgColor:"Colore sfondo Hero",bgAccent:"Colore sfumatura Hero",
  what:"Cosa è",how:"Come funziona",out:"Cosa ottieni",titleEm:"Titolo (evidenziato)",
  itemsText:"Elementi (un elemento per riga: etichetta|immagine URL)",
  sourceMapLinksText:"Source Map (un link per riga: etichetta|URL)",
};

const PAGE_SECTION_LABELS: Record<string,string> = {
  site:"Impostazioni Globali",nav:"Navigazione",home:"Home Page",about:"Pagina About",
  services:"Pagina Services",contact:"Pagina Contact",team:"Pagina Team",brands:"Pagina Brands",
  caseStudies:"Case Studies",blog:"Insights / Blog",work:"Work / Portfolio",footer:"Footer",
  career:"Pagina Career",tenYears:"10 Years",geo:"GEO Facts",
  privacy:"Privacy Policy",copyright:"Copyright & Termini",notFound:"Pagina 404",
};

/* ══════════════════════════════════════════════════
   SECTION ORDER EDITOR (reorder home-page sections)
══════════════════════════════════════════════════ */
function SectionOrderEditor({ order, onChange }: { order: string[]; onChange: (next: string[]) => void }) {
  function move(idx: number, dir: -1 | 1) {
    const next = [...order];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }
  return (
    <Panel title="Ordine Sezioni">
      <div style={{ display:"grid", gap:8 }}>
        {order.map((key, idx) => (
          <div key={key} style={{ display:"flex", alignItems:"center", gap:10, background:"#F8F8FC", borderRadius:10, padding:"8px 12px" }}>
            <span style={{ flex:1, fontSize:13, fontWeight:600, color:"#333" }}>{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</span>
            <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
              style={{ width:28,height:28,border:"none",borderRadius:7,cursor:idx===0?"not-allowed":"pointer",background:idx===0?"#eee":"#2E2784",color:idx===0?"#aaa":"#fff",fontSize:13 }}>↑</button>
            <button type="button" onClick={() => move(idx, 1)} disabled={idx === order.length - 1}
              style={{ width:28,height:28,border:"none",borderRadius:7,cursor:idx===order.length-1?"not-allowed":"pointer",background:idx===order.length-1?"#eee":"#2E2784",color:idx===order.length-1?"#aaa":"#fff",fontSize:13 }}>↓</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PagesEditor({ data, onSave }: { data:PagesDataLocal|null; onSave:(d:unknown)=>void }) {
  const [form,       setForm]       = useState<PagesDataLocal>({});
  const [activePage, setActivePage] = useState<PageKey>("site");
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader/>;

  function update(pageKey: string, sectionKey: string, fieldKey: string, value: string) {
    setForm(prev => ({
      ...prev,
      [pageKey]: { ...prev[pageKey], [sectionKey]: { ...(prev[pageKey]?.[sectionKey] as Record<string,unknown>), [fieldKey]: value } },
    }));
  }
  function updateTop(pageKey: string, fieldKey: string, value: string) {
    setForm(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], [fieldKey]: value } }));
  }
  function toggleVisible(pageKey: string, sectionKey: string, current: boolean) {
    setForm(prev => ({
      ...prev,
      [pageKey]: { ...prev[pageKey], [sectionKey]: { ...(prev[pageKey]?.[sectionKey] as Record<string,unknown>), _visible: !current } },
    }));
  }

  const pageData = form[activePage] || {};

  return (
    <div style={{ display:"flex",gap:18,alignItems:"flex-start" }}>
      {/* Page tab list */}
      <div style={{ width:145,flexShrink:0,background:"#fff",borderRadius:14,padding:8,boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        {PAGE_TABS.map(tab => {
          const active = activePage === tab.id;
          return (
            <button key={tab.id} onClick={() => setActivePage(tab.id)}
              style={{ display:"flex",alignItems:"center",gap:7,width:"100%",padding:"9px 10px",marginBottom:2,background:active?"#2E2784":"transparent",color:active?"#fff":"#555",border:"none",borderRadius:9,fontSize:12,fontWeight:active?600:400,cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
              <tab.icon size={12}/>{tab.label}
            </button>
          );
        })}
      </div>

      {/* Fields */}
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
          <h2 style={{ margin:0,fontSize:15,fontWeight:700,color:"#111" }}>{PAGE_SECTION_LABELS[activePage]}</h2>
          <SaveBtn onClick={() => onSave(form)}/>
        </div>

        {/* Special: Navbar links editor */}
        {activePage === "nav" && (
          <NavLinksEditor
            ctaLabel={String((pageData as Record<string,unknown>).ctaLabel || "Get in Touch")}
            ctaHref={String((pageData as Record<string,unknown>).ctaHref || "/contact")}
            links={(pageData as Record<string,unknown>).links as NavLinkItem[] | undefined || []}
            onChangeCtaLabel={v => updateTop(activePage, "ctaLabel", v)}
            onChangeCtaHref={v => updateTop(activePage, "ctaHref", v)}
            onChangeLinks={links => setForm(prev => ({...prev, nav: {...prev.nav, links}}))}
          />
        )}

        {/* Special: Footer link lists editor */}
        {activePage === "footer" && (
          <FooterLinksEditor
            exploreLinks={(pageData as Record<string,unknown>).exploreLinks as NavLinkItem[] | undefined || []}
            moreLinks={(pageData as Record<string,unknown>).moreLinks as NavLinkItem[] | undefined || []}
            onChangeExploreLinks={links => setForm(prev => ({...prev, footer: {...prev.footer, exploreLinks: links}}))}
            onChangeMoreLinks={links => setForm(prev => ({...prev, footer: {...prev.footer, moreLinks: links}}))}
          />
        )}

        {/* Section order (pages with an explicit _sectionOrder array, e.g. home) */}
        {Array.isArray((pageData as Record<string, unknown>)._sectionOrder) && (
          <SectionOrderEditor
            order={(pageData as Record<string, unknown>)._sectionOrder as string[]}
            onChange={next => setForm(prev => ({ ...prev, [activePage]: { ...prev[activePage], _sectionOrder: next } }))}
          />
        )}

        {/* Top-level strings (skip _visible, links) */}
        {activePage !== "nav" && (() => {
          const topStrings = Object.entries(pageData).filter(([k, v]) => typeof v === "string" && k !== "_visible");
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
        {activePage !== "nav" && Object.entries(pageData).map(([sectionKey, sectionVal]) => {
          if (typeof sectionVal !== "object" || sectionVal === null || Array.isArray(sectionVal)) return null;
          const obj = sectionVal as Record<string, unknown>;
          const label = sectionKey.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
          const isVisible = obj._visible !== false;

          return (
            <Panel key={sectionKey}
              title={label}
              rightAction={
                <button type="button"
                  onClick={() => toggleVisible(activePage, sectionKey, isVisible)}
                  style={{ display:"flex",alignItems:"center",gap:5,padding:"4px 10px",border:"none",borderRadius:8,fontSize:11,fontWeight:600,cursor:"pointer",background:isVisible?"rgba(22,163,74,0.1)":"rgba(220,38,38,0.1)",color:isVisible?"#16a34a":"#dc2626",transition:"all 0.15s" }}>
                  {isVisible ? <Eye size={12}/> : <EyeOff size={12}/>}
                  {isVisible ? "Visibile" : "Nascosta"}
                </button>
              }
            >
              {!isVisible && (
                <div style={{ padding:"10px 14px",background:"rgba(220,38,38,0.06)",borderRadius:8,fontSize:12,color:"#dc2626",marginBottom:12 }}>
                  Questa sezione è nascosta nel sito.
                </div>
              )}
              <Grid>
                {Object.entries(obj).map(([fk, fv]) => {
                  if (fk === "_visible") return null;
                  if (Array.isArray(fv)) return null;
                  if (typeof fv === "object") return null;
                  return renderField(fk, String(fv ?? ""), v => update(activePage, sectionKey, fk, v));
                })}
              </Grid>
              {/* Nested objects */}
              {Object.entries(obj).map(([subKey, subVal]) => {
                if (typeof subVal !== "object" || subVal === null || Array.isArray(subVal)) return null;
                const subObj = subVal as Record<string, unknown>;
                const subLabel = subKey.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
                return (
                  <div key={subKey} style={{ marginTop:16 }}>
                    <div style={{ fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8 }}>{subLabel}</div>
                    <Grid>
                      {Object.entries(subObj).map(([fk, fv]) => {
                        if (typeof fv === "object") return null;
                        return renderField(fk, String(fv ?? ""), v => setForm(prev => ({
                          ...prev,
                          [activePage]: { ...prev[activePage], [sectionKey]: { ...obj, [subKey]: { ...subObj, [fk]: v } } },
                        })));
                      })}
                    </Grid>
                  </div>
                );
              })}
              {Array.isArray(obj.challenges) && (
                <div style={{ marginTop:14 }}>
                  <Field label="Challenge (una per riga)">
                    <Textarea
                      value={(obj.challenges as string[]).join("\n")}
                      onChange={v => setForm(prev => ({
                        ...prev,
                        [activePage]: { ...prev[activePage], [sectionKey]: { ...obj, challenges: v.split("\n").filter(Boolean) } },
                      }))}
                    />
                  </Field>
                </div>
              )}
            </Panel>
          );
        })}
        <SaveBtn onClick={() => onSave(form)}/>
      </div>
    </div>
  );
}

function renderField(fieldKey: string, value: string, onChange: (v: string) => void) {
  const label   = FIELD_LABELS[fieldKey] || fieldKey;
  const isImg   = IMAGE_FIELDS.includes(fieldKey);
  const isTa    = TEXTAREA_FIELDS.includes(fieldKey);
  const isColor = COLOR_FIELDS.includes(fieldKey);
  if (isImg) {
    return <ImageField key={fieldKey} value={value} onChange={onChange} label={label}/>;
  }
  return (
    <Field key={fieldKey} label={label} full={isTa}>
      {isColor ? (
        <div style={{ display:"flex",gap:8,alignItems:"center" }}>
          <input type="color" value={value} onChange={e => onChange(e.target.value)}
            style={{ width:38,height:36,border:"1px solid #ddd",borderRadius:6,cursor:"pointer",padding:2,flexShrink:0 }}/>
          <Input value={value} onChange={onChange}/>
        </div>
      ) : isTa ? (
        <Textarea value={value} onChange={onChange}/>
      ) : (
        <Input value={value} onChange={onChange}/>
      )}
    </Field>
  );
}

/* ══════════════════════════════════════════════════
   NAVBAR LINKS EDITOR
══════════════════════════════════════════════════ */
function NavLinksEditor({ ctaLabel, ctaHref, links, onChangeCtaLabel, onChangeCtaHref, onChangeLinks }: {
  ctaLabel: string; ctaHref: string;
  links: NavLinkItem[];
  onChangeCtaLabel: (v:string)=>void;
  onChangeCtaHref: (v:string)=>void;
  onChangeLinks: (l:NavLinkItem[])=>void;
}) {
  function addLink() {
    onChangeLinks([...links, { href: "/nuova-pagina", label: "Nuova Pagina" }]);
  }
  function removeLink(i: number) {
    onChangeLinks(links.filter((_, idx) => idx !== i));
  }
  function updateLink(i: number, key: keyof NavLinkItem, value: string) {
    const updated = links.map((l, idx) => idx === i ? { ...l, [key]: value } : l);
    onChangeLinks(updated);
  }
  function addSub(i: number) {
    const updated = links.map((l, idx) => {
      if (idx !== i) return l;
      return { ...l, sub: [...(l.sub || []), { href: "/sub-pagina", label: "Sub Pagina" }] };
    });
    onChangeLinks(updated);
  }
  function removeSub(i: number, j: number) {
    const updated = links.map((l, idx) => {
      if (idx !== i) return l;
      return { ...l, sub: (l.sub || []).filter((_, si) => si !== j) };
    });
    onChangeLinks(updated);
  }
  function updateSub(i: number, j: number, key: "href" | "label", value: string) {
    const updated = links.map((l, idx) => {
      if (idx !== i) return l;
      const newSub = (l.sub || []).map((s, si) => si === j ? { ...s, [key]: value } : s);
      return { ...l, sub: newSub };
    });
    onChangeLinks(updated);
  }

  return (
    <div>
      <Panel title="Bottone CTA Navbar">
        <Grid>
          <Field label="Testo CTA"><Input value={ctaLabel} onChange={onChangeCtaLabel}/></Field>
          <Field label="Link CTA"><Input value={ctaHref} onChange={onChangeCtaHref}/></Field>
        </Grid>
      </Panel>
      <Panel title="Link Navigazione">
        <div style={{ fontSize:12,color:"#666",marginBottom:14,lineHeight:1.5 }}>
          Gestisci i link della navbar. Ogni link può avere sotto-voci (dropdown).
        </div>
        {links.map((link, i) => (
          <div key={i} style={{ background:"#F5F5FA",borderRadius:12,padding:"14px 16px",marginBottom:10,border:"1px solid #E8E8F0" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
              <GripVertical size={14} style={{ color:"#bbb",flexShrink:0 }}/>
              <div style={{ flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                <div>
                  <div style={{ fontSize:10,fontWeight:700,color:"#666",textTransform:"uppercase",marginBottom:4 }}>Label</div>
                  <Input value={link.label} onChange={v => updateLink(i, "label", v)}/>
                </div>
                <div>
                  <div style={{ fontSize:10,fontWeight:700,color:"#666",textTransform:"uppercase",marginBottom:4 }}>Href</div>
                  <Input value={link.href} onChange={v => updateLink(i, "href", v)}/>
                </div>
              </div>
              <button type="button" onClick={() => removeLink(i)}
                style={{ padding:"6px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer",flexShrink:0 }}>
                <Trash2 size={13}/>
              </button>
            </div>
            {/* Sublinks */}
            {(link.sub || []).map((sub, j) => (
              <div key={j} style={{ display:"flex",gap:8,alignItems:"center",paddingLeft:22,marginBottom:6 }}>
                <div style={{ flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  <div>
                    <div style={{ fontSize:10,fontWeight:700,color:"#888",textTransform:"uppercase",marginBottom:3 }}>Sub Label</div>
                    <Input value={sub.label} onChange={v => updateSub(i, j, "label", v)}/>
                  </div>
                  <div>
                    <div style={{ fontSize:10,fontWeight:700,color:"#888",textTransform:"uppercase",marginBottom:3 }}>Sub Href</div>
                    <Input value={sub.href} onChange={v => updateSub(i, j, "href", v)}/>
                  </div>
                </div>
                <button type="button" onClick={() => removeSub(i, j)}
                  style={{ padding:"6px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer",flexShrink:0 }}>
                  <X size={12}/>
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addSub(i)}
              style={{ marginLeft:22,marginTop:4,padding:"5px 12px",background:"rgba(46,39,132,0.08)",color:"#2E2784",border:"none",borderRadius:7,fontSize:11,fontWeight:600,cursor:"pointer" }}>
              + Aggiungi sotto-voce
            </button>
          </div>
        ))}
        <button type="button" onClick={addLink}
          style={{ marginTop:8,padding:"9px 18px",background:"#F8AE01",color:"#000",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer" }}>
          + Aggiungi Link
        </button>
      </Panel>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   FOOTER LINK LISTS EDITOR
══════════════════════════════════════════════════ */
function SimpleLinkListEditor({ title, hint, links, onChange }: {
  title: string; hint: string;
  links: { href: string; label: string }[];
  onChange: (l: { href: string; label: string }[]) => void;
}) {
  function add() {
    onChange([...links, { href: "/", label: "Nuovo Link" }]);
  }
  function remove(i: number) {
    onChange(links.filter((_, idx) => idx !== i));
  }
  function update(i: number, key: "href" | "label", value: string) {
    onChange(links.map((l, idx) => idx === i ? { ...l, [key]: value } : l));
  }
  return (
    <Panel title={title}>
      <div style={{ fontSize:12,color:"#666",marginBottom:14,lineHeight:1.5 }}>{hint}</div>
      {links.map((link, i) => (
        <div key={i} style={{ display:"flex",alignItems:"center",gap:8,background:"#F5F5FA",borderRadius:12,padding:"14px 16px",marginBottom:10,border:"1px solid #E8E8F0" }}>
          <GripVertical size={14} style={{ color:"#bbb",flexShrink:0 }}/>
          <div style={{ flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:"#666",textTransform:"uppercase",marginBottom:4 }}>Label</div>
              <Input value={link.label} onChange={v => update(i, "label", v)}/>
            </div>
            <div>
              <div style={{ fontSize:10,fontWeight:700,color:"#666",textTransform:"uppercase",marginBottom:4 }}>Href</div>
              <Input value={link.href} onChange={v => update(i, "href", v)}/>
            </div>
          </div>
          <button type="button" onClick={() => remove(i)}
            style={{ padding:"6px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer",flexShrink:0 }}>
            <Trash2 size={13}/>
          </button>
        </div>
      ))}
      <button type="button" onClick={add}
        style={{ marginTop:8,padding:"9px 18px",background:"#F8AE01",color:"#000",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer" }}>
        + Aggiungi Link
      </button>
    </Panel>
  );
}

function FooterLinksEditor({ exploreLinks, moreLinks, onChangeExploreLinks, onChangeMoreLinks }: {
  exploreLinks: NavLinkItem[]; moreLinks: NavLinkItem[];
  onChangeExploreLinks: (l: NavLinkItem[]) => void;
  onChangeMoreLinks: (l: NavLinkItem[]) => void;
}) {
  return (
    <div>
      <SimpleLinkListEditor
        title="Footer — Colonna Explore"
        hint="Link mostrati nella colonna 'Explore' del footer."
        links={exploreLinks}
        onChange={onChangeExploreLinks}
      />
      <SimpleLinkListEditor
        title="Footer — Colonna Pages"
        hint="Link mostrati nella colonna 'Pages' del footer."
        links={moreLinks}
        onChange={onChangeMoreLinks}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   LIST EDITORS
══════════════════════════════════════════════════ */
type FieldDef = { key:string; label:string; type:string; options?:string[] };

const BRAND_FIELDS:    FieldDef[] = [
  {key:"id",label:"ID Slug",type:"text"},{key:"name",label:"Nome",type:"text"},{key:"tag",label:"Categoria",type:"text"},
  {key:"img",label:"Immagine (URL)",type:"url"},{key:"since",label:"Anno inizio",type:"text"},
  {key:"campaigns",label:"N° Campagne",type:"text"},{key:"countries",label:"N° Paesi",type:"text"},
  {key:"desc",label:"Descrizione",type:"textarea"},
];
const LEADER_FIELDS:   FieldDef[] = [
  {key:"id",label:"ID Slug",type:"text"},{key:"name",label:"Nome",type:"text"},{key:"role",label:"Ruolo",type:"text"},
  {key:"img",label:"Foto (URL)",type:"url"},{key:"bio",label:"Bio",type:"textarea"},{key:"quote",label:"Citazione",type:"textarea"},
];
const STUDY_FIELDS:    FieldDef[] = [
  {key:"id",label:"ID Slug",type:"text"},{key:"title",label:"Titolo",type:"text"},{key:"client",label:"Cliente",type:"text"},
  {key:"brand",label:"Brand",type:"text"},{key:"year",label:"Anno",type:"text"},{key:"location",label:"Paese",type:"text"},
  {key:"cat",label:"Categoria (retail/petrol)",type:"text"},{key:"img",label:"Immagine (URL)",type:"url"},
  {key:"summary",label:"Sommario",type:"textarea"},
];
const POST_FIELDS:     FieldDef[] = [
  {key:"slug",label:"Slug (URL)",type:"text"},{key:"title",label:"Titolo",type:"text"},
  {key:"date",label:"Data (YYYY-MM-DD)",type:"text"},{key:"category",label:"Categoria",type:"text"},
  {key:"img",label:"Immagine (URL)",type:"url"},{key:"excerpt",label:"Estratto",type:"textarea"},
  {key:"contentHtml",label:"Contenuto Articolo",type:"richtext"},
];
const USER_FIELDS:     FieldDef[] = [
  {key:"id",label:"Username / ID",type:"text"},{key:"name",label:"Nome Completo",type:"text"},
  {key:"email",label:"Email",type:"email"},
  {key:"password",label:"Password (lascia vuoto per non cambiare)",type:"password"},
  {key:"role",label:"Ruolo",type:"select",options:["superadmin","admin","editor"]},
];
const POSITION_FIELDS: FieldDef[] = [
  {key:"id",label:"ID",type:"text"},{key:"role",label:"Ruolo",type:"text"},
  {key:"loc",label:"Sede",type:"text"},{key:"description",label:"Descrizione",type:"textarea"},
];

function BrandsEditor    ({ data, onSave }: { data:BrandItem[]|null;    onSave:(d:BrandItem[])=>void })    { return <ListEditor<BrandItem>    title="Brand"       data={data} fields={BRAND_FIELDS}    nameKey="name"  imgKey="img" onSave={onSave} blank={{id:"",name:"",tag:"",img:"",since:"",campaigns:"",countries:"",desc:""}}/>; }
function UsersEditor     ({ data, onSave }: { data:UserItem[]|null;     onSave:(d:UserItem[])=>void })     { return <ListEditor<UserItem>     title="Utente"      data={data} fields={USER_FIELDS}     nameKey="name"  imgKey=""    onSave={onSave} blank={{id:"",name:"",email:"",password:"",role:"editor"}}/>; }
function LeadershipEditor({ data, onSave }: { data:LeaderItem[]|null;   onSave:(d:LeaderItem[])=>void })   { return <ListEditor<LeaderItem>   title="Membro"      data={data} fields={LEADER_FIELDS}   nameKey="name"  imgKey="img" onSave={onSave} blank={{id:"",name:"",role:"",img:"",bio:"",quote:""}}/>; }
function StudiesEditor   ({ data, onSave }: { data:StudyItem[]|null;    onSave:(d:StudyItem[])=>void })    { return <ListEditor<StudyItem>    title="Case Study"  data={data} fields={STUDY_FIELDS}    nameKey="title" imgKey="img" onSave={onSave} blank={{id:"",title:"",client:"",year:String(new Date().getFullYear()),location:"",img:"",summary:"",cat:"retail",brand:""}}/>; }
function PostsEditor     ({ data, onSave }: { data:PostItem[]|null;     onSave:(d:PostItem[])=>void })     { return <ListEditor<PostItem>     title="Post"        data={data} fields={POST_FIELDS}     nameKey="title" imgKey="img" onSave={onSave} blank={{id:Date.now(),slug:"",title:"",date:new Date().toISOString().slice(0,10),excerpt:"",img:"",category:"Loyalty Marketing"}}/>; }
function PositionsEditor ({ data, onSave }: { data:PositionItem[]|null; onSave:(d:PositionItem[])=>void }) { return <ListEditor<PositionItem> title="Posizione Lavorativa" data={data} fields={POSITION_FIELDS} nameKey="role"  imgKey=""    onSave={onSave} blank={{id:String(Date.now()),role:"",loc:"",description:""}}/>; }

/* ══════════════════════════════════════════════════
   CUSTOM PAGES EDITOR
══════════════════════════════════════════════════ */
function CustomPagesEditor({ data, onSave }: { data:CustomPageItem[]|null; onSave:(d:CustomPageItem[])=>void }) {
  const [items,   setItems]   = useState<CustomPageItem[]>([]);
  const [editing, setEditing] = useState<number|null>(null);
  const [form,    setForm]    = useState<Omit<CustomPageItem,"id">>({ slug:"", title:"", description:"", blocks:[] });

  useEffect(() => { if (data) setItems(data); }, [data]);
  if (!data) return <Loader/>;

  function openNew() {
    setEditing(-1);
    setForm({ slug:"", title:"", description:"", blocks:[] });
  }
  function openEdit(i: number) {
    setEditing(i);
    const { id: _, ...rest } = items[i];
    setForm({ ...rest });
  }
  function del(i: number) {
    if (!confirm("Eliminare questa pagina?")) return;
    const updated = items.filter((_, idx) => idx !== i);
    setItems(updated); onSave(updated);
  }
  function commit() {
    let updated: CustomPageItem[];
    if (editing === -1) {
      updated = [...items, { ...form, id: String(Date.now()) }];
    } else {
      updated = items.map((item, i) => i === editing ? { ...form, id: item.id } : item);
    }
    setItems(updated); onSave(updated); setEditing(null);
  }

  function addBlock(type: BlockType) {
    const block: Block = type === "text"  ? { type:"text",  title:"",body:"" }
                       : type === "image" ? { type:"image", url:"", alt:"", caption:"" }
                       :                   { type:"cta",   label:"Clicca qui", href:"/contact", style:"primary" };
    setForm(p => ({ ...p, blocks: [...p.blocks, block] }));
  }
  function updateBlock(i: number, key: string, value: string) {
    setForm(p => ({ ...p, blocks: p.blocks.map((b, idx) => idx === i ? { ...b, [key]: value } : b) }));
  }
  function removeBlock(i: number) {
    setForm(p => ({ ...p, blocks: p.blocks.filter((_, idx) => idx !== i) }));
  }

  return (
    <div>
      {editing !== null && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:16,overflowY:"auto",paddingTop:40 }}>
          <div style={{ background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:720,boxShadow:"0 24px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <h3 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111" }}>{editing === -1 ? "Nuova Pagina" : "Modifica Pagina"}</h3>
              <button onClick={() => setEditing(null)} style={{ background:"none",border:"none",cursor:"pointer",color:"#999" }}><X size={18}/></button>
            </div>
            <Grid>
              <Field label="Titolo Pagina">
                <Input value={form.title} onChange={v => setForm(p => ({...p,title:v}))}/>
              </Field>
              <Field label="Slug URL (es: chi-siamo)">
                <Input value={form.slug} onChange={v => setForm(p => ({...p,slug:v.toLowerCase().replace(/\s+/g,"-")}))}/>
              </Field>
              <Field label="Descrizione (SEO)" full>
                <Textarea value={form.description||""} onChange={v => setForm(p => ({...p,description:v}))} rows={2}/>
              </Field>
            </Grid>

            {/* Blocks */}
            <div style={{ marginTop:24 }}>
              <div style={{ fontSize:12,fontWeight:700,color:"#2E2784",textTransform:"uppercase",marginBottom:12 }}>Sezioni della Pagina</div>
              {form.blocks.map((block, i) => (
                <div key={i} style={{ background:"#F5F5FA",borderRadius:12,padding:"14px 16px",marginBottom:10,border:"1px solid #E8E8F0" }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                    <span style={{ fontSize:11,fontWeight:700,textTransform:"uppercase",color:"#2E2784" }}>
                      {block.type === "text" ? "Blocco Testo" : block.type === "image" ? "Immagine" : "Pulsante CTA"}
                    </span>
                    <button type="button" onClick={() => removeBlock(i)}
                      style={{ padding:"5px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer" }}>
                      <Trash2 size={13}/>
                    </button>
                  </div>
                  {block.type === "text" && (
                    <Grid>
                      <Field label="Titolo Sezione"><Input value={block.title||""} onChange={v => updateBlock(i,"title",v)}/></Field>
                      <Field label="Contenuto HTML" full>
                        <RichTextEditor value={block.body||""} onChange={v => updateBlock(i,"body",v)}/>
                      </Field>
                    </Grid>
                  )}
                  {block.type === "image" && (
                    <Grid>
                      <ImageField value={block.url||""} onChange={v => updateBlock(i,"url",v)} label="Immagine (URL o Upload)"/>
                      <Field label="Alt text"><Input value={block.alt||""} onChange={v => updateBlock(i,"alt",v)}/></Field>
                      <Field label="Didascalia"><Input value={block.caption||""} onChange={v => updateBlock(i,"caption",v)}/></Field>
                    </Grid>
                  )}
                  {block.type === "cta" && (
                    <Grid>
                      <Field label="Testo Pulsante"><Input value={block.label||""} onChange={v => updateBlock(i,"label",v)}/></Field>
                      <Field label="Link"><Input value={block.href||""} onChange={v => updateBlock(i,"href",v)}/></Field>
                      <Field label="Stile">
                        <FieldSelect value={block.style||"primary"} onChange={v => updateBlock(i,"style",v)} options={["primary","secondary"]}/>
                      </Field>
                    </Grid>
                  )}
                </div>
              ))}
              <div style={{ display:"flex",gap:8,marginTop:10 }}>
                <button type="button" onClick={() => addBlock("text")}  style={{ padding:"7px 14px",background:"#2E2784",color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer" }}>+ Testo</button>
                <button type="button" onClick={() => addBlock("image")} style={{ padding:"7px 14px",background:"#2E2784",color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer" }}>+ Immagine</button>
                <button type="button" onClick={() => addBlock("cta")}   style={{ padding:"7px 14px",background:"#F8AE01",color:"#000",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer" }}>+ CTA</button>
              </div>
            </div>

            <div style={{ display:"flex",gap:10,marginTop:20 }}>
              <SaveBtn onClick={commit}/>
              <SecBtn onClick={() => setEditing(null)}>Annulla</SecBtn>
            </div>
            {form.slug && (
              <div style={{ marginTop:12,fontSize:11,color:"#888" }}>
                La pagina sarà disponibile su: <strong>/{form.slug}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginBottom:16,padding:"14px 18px",background:"rgba(46,39,132,0.06)",borderRadius:12,fontSize:12,color:"#2E2784",lineHeight:1.6 }}>
        <strong>Pagine Custom</strong> — Crea pagine completamente nuove senza scrivere codice. Ogni pagina ha un URL personalizzato e può contenere blocchi di testo, immagini e pulsanti CTA.
      </div>

      <div style={{ display:"grid",gap:10,marginBottom:16 }}>
        {items.map((item, idx) => (
          <div key={item.id} style={{ background:"#fff",borderRadius:14,padding:"14px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:14 }}>
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontWeight:600,color:"#111",fontSize:14 }}>{item.title}</div>
              <div style={{ color:"#aaa",fontSize:11,marginTop:2 }}>/{item.slug} · {item.blocks.length} blocchi</div>
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <button onClick={() => openEdit(idx)} style={{ padding:"7px 16px",background:"#2E2784",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer" }}>Modifica</button>
              <button onClick={() => del(idx)}       style={{ padding:"7px 14px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:8,fontSize:12,cursor:"pointer" }}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={openNew} style={{ padding:"10px 20px",background:"#F8AE01",color:"#000",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer" }}>
        + Nuova Pagina Custom
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PASSWORD INPUT (show/hide toggle + "already set" badge)
══════════════════════════════════════════════════ */
function PasswordInput({ value, onChange, hasExisting }: { value:string; onChange:(v:string)=>void; hasExisting:boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={hasExisting ? "••••••••" : ""}
          style={{ flex:1, padding:"9px 12px", border:"1px solid #ddd", borderRadius:9, fontSize:13, outline:"none" }}
        />
        <button type="button" onClick={() => setShow(s => !s)}
          style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", width:36, height:36, border:"1px solid #ddd", borderRadius:9, background:"#fff", cursor:"pointer", color:"#666" }}
          title={show ? "Nascondi password" : "Mostra password"}>
          {show ? <EyeOff size={15}/> : <Eye size={15}/>}
        </button>
      </div>
      {hasExisting && !value && (
        <div style={{ marginTop:6, fontSize:11, color:"#16a34a", fontWeight:600 }}>
          ✓ Password già impostata — lascia vuoto per non cambiarla
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   GENERIC LIST EDITOR
══════════════════════════════════════════════════ */
function ListEditor<T extends Record<string, unknown>>({
  title, data, fields, nameKey, imgKey, onSave, blank,
}: {
  title:string; data:T[]|null; fields:FieldDef[]; nameKey:string; imgKey:string;
  onSave:(d:T[])=>void; blank:T;
}) {
  const [items,   setItems]   = useState<T[]>([]);
  const [editing, setEditing] = useState<number|null>(null);
  const [form,    setForm]    = useState<Record<string,string>>({});
  const [isNew,   setIsNew]   = useState(false);

  useEffect(() => { if (data) setItems(data); }, [data]);
  if (!data) return <Loader/>;

  function open(idx: number) {
    setIsNew(false); setEditing(idx);
    setForm(Object.fromEntries(Object.entries(items[idx]).map(([k,v]) => [k,String(v ?? "")])));
  }
  function commit() {
    if (editing === null) return;
    if (isNew) {
      const newItem = { ...blank, id: typeof blank.id === "number" ? Date.now() : "" } as T;
      const m = { ...newItem };
      for (const [k,v] of Object.entries(form)) (m as Record<string,unknown>)[k] = typeof newItem[k] === "number" ? Number(v) : v;
      const updated = [...items, m];
      setItems(updated); setEditing(null); setIsNew(false); onSave(updated);
    } else {
      const updated = items.map((item, i) => {
        if (i !== editing) return item;
        const m = { ...item };
        for (const [k,v] of Object.entries(form)) (m as Record<string,unknown>)[k] = typeof item[k] === "number" ? Number(v) : v;
        return m;
      });
      setItems(updated); setEditing(null); onSave(updated);
    }
  }
  function del(idx: number) {
    if (!confirm(`Eliminare questo ${title}?`)) return;
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated); onSave(updated);
  }
  function add() {
    setIsNew(true); setEditing(items.length);
    setForm(Object.fromEntries(Object.entries(blank).map(([k,v]) => [k,String(v ?? "")])));
  }

  return (
    <div>
      {editing !== null && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
          <div style={{ background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:640,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <h3 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111" }}>{isNew ? `Nuovo ${title}` : `Modifica ${title}`}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} style={{ background:"none",border:"none",cursor:"pointer",color:"#999",padding:4 }}><X size={18}/></button>
            </div>
            <Grid>
              {fields.map(f => (
                <Field key={f.key} label={f.label} full={f.type === "richtext" || f.type.startsWith("textarea")}>
                  {f.type === "richtext" ? (
                    <RichTextEditor value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))}/>
                  ) : f.type === "url" ? (
                    <ImageField value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))} label={f.label}/>
                  ) : f.type === "select" ? (
                    <FieldSelect value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))} options={f.options??[]}/>
                  ) : f.type === "password" ? (
                    <PasswordInput
                      value={form[f.key]||""}
                      onChange={v => setForm(p => ({...p,[f.key]:v}))}
                      hasExisting={!isNew && form.hasPassword === "true"}
                    />
                  ) : f.type.startsWith("textarea") ? (
                    <Textarea rows={f.type==="textarea-lg"?10:3} value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))}/>
                  ) : (
                    <Input type={f.type} value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))}/>
                  )}
                </Field>
              ))}
            </Grid>
            <div style={{ display:"flex",gap:10,marginTop:20 }}>
              <SaveBtn onClick={commit}/>
              <SecBtn onClick={() => { setEditing(null); setIsNew(false); }}>Annulla</SecBtn>
            </div>
          </div>
        </div>
      )}
      <div style={{ display:"grid",gap:10,marginBottom:16 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background:"#fff",borderRadius:14,padding:"14px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:14 }}>
            {imgKey && item[imgKey]
              ? <img src={String(item[imgKey])} alt="" style={{ width:52,height:52,objectFit:"cover",borderRadius:10,flexShrink:0 }}/>
              : imgKey ? <div style={{ width:52,height:52,background:"#F5F5FA",borderRadius:10,flexShrink:0 }}/> : null
            }
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontWeight:600,color:"#111",fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{String(item[nameKey]||"(vuoto)")}</div>
              <div style={{ color:"#aaa",fontSize:11,marginTop:2 }}>{String(item.id||"")}</div>
            </div>
            <div style={{ display:"flex",gap:8 }}>
              <button onClick={() => open(idx)} style={{ padding:"7px 16px",background:"#2E2784",color:"#fff",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer" }}>Modifica</button>
              <button onClick={() => del(idx)}  style={{ padding:"7px 14px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:8,fontSize:12,cursor:"pointer" }}>Elimina</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={add} style={{ padding:"10px 20px",background:"#F8AE01",color:"#000",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer" }}>
        + Aggiungi {title}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   RICH TEXT EDITOR
══════════════════════════════════════════════════ */
type RichCmd = { cmd:string; arg?:string; label:string; title:string };
const RICH_CMDS: RichCmd[] = [
  {cmd:"bold",               label:"B",       title:"Grassetto"},
  {cmd:"italic",             label:"I",       title:"Corsivo"},
  {cmd:"underline",          label:"U",       title:"Sottolineato"},
  {cmd:"formatBlock",arg:"<h2>",  label:"H2", title:"Titolo H2"},
  {cmd:"formatBlock",arg:"<h3>",  label:"H3", title:"Titolo H3"},
  {cmd:"formatBlock",arg:"<p>",   label:"¶",  title:"Paragrafo"},
  {cmd:"insertUnorderedList",label:"• List",  title:"Lista puntata"},
  {cmd:"insertOrderedList",  label:"1. List", title:"Lista numerata"},
  {cmd:"removeFormat",       label:"✕ fmt",  title:"Rimuovi formattazione"},
];

function RichTextEditor({ value, onChange }: { value:string; onChange:(v:string)=>void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const skipSync  = useRef(false);
  useEffect(() => {
    if (editorRef.current && !skipSync.current) editorRef.current.innerHTML = value || "";
  }, [value]);
  const exec = (cmd:string, arg?:string) => { document.execCommand(cmd,false,arg); editorRef.current?.focus(); emit(); };
  const emit = () => { skipSync.current=true; onChange(editorRef.current?.innerHTML??""); setTimeout(()=>{skipSync.current=false;},0); };
  const insertLink = () => { const url=prompt("URL del link:"); if(url) exec("createLink",url); };
  const btn = (label:string,action:()=>void,title:string) => (
    <button key={label} type="button" title={title} onMouseDown={e=>{e.preventDefault();action();}}
      style={{ padding:"4px 8px",border:"none",borderRadius:5,background:"transparent",cursor:"pointer",fontSize:11,fontWeight:700,color:"#444" }}
      onMouseEnter={e=>(e.currentTarget.style.background="#E8E8F0")}
      onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
      {label}
    </button>
  );
  return (
    <div style={{ border:"1.5px solid #E8E8F0",borderRadius:9,overflow:"hidden",background:"#FAFAFA" }}>
      <div style={{ display:"flex",gap:2,padding:"6px 8px",background:"#F0F0F8",borderBottom:"1px solid #E8E8F0",flexWrap:"wrap",alignItems:"center" }}>
        {RICH_CMDS.map(c => btn(c.label,()=>exec(c.cmd,c.arg),c.title))}
        <div style={{ width:1,height:18,background:"#DDD",margin:"0 4px" }}/>
        {btn("🔗 Link",insertLink,"Inserisci link")}
        {btn("✂ Unlink",()=>exec("unlink"),"Rimuovi link")}
      </div>
      <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={emit}
        style={{ minHeight:220,padding:"12px 14px",fontSize:13,color:"#111",lineHeight:1.7,outline:"none",fontFamily:"inherit" }}
        onFocus={e=>{e.currentTarget.parentElement!.style.borderColor="#2E2784";}}
        onBlur={e=>{e.currentTarget.parentElement!.style.borderColor="#E8E8F0";}}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SHARED UI
══════════════════════════════════════════════════ */
function Panel({ title, children, rightAction }: { title:string; children:React.ReactNode; rightAction?:React.ReactNode }) {
  return (
    <div style={{ background:"#fff",borderRadius:16,padding:"20px 22px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",marginBottom:14 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
        <div style={{ fontSize:11,fontWeight:700,color:"#2E2784",textTransform:"uppercase",letterSpacing:"0.07em" }}>{title}</div>
        {rightAction}
      </div>
      {children}
    </div>
  );
}
function Grid({ children }: { children:React.ReactNode }) {
  return <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14 }}>{children}</div>;
}
function FooterBar({ children }: { children:React.ReactNode }) {
  return <div style={{ marginTop:18,paddingTop:16,borderTop:"1px solid #f0f0f6" }}>{children}</div>;
}
function Field({ label, children, full }: { label:string; children:React.ReactNode; full?:boolean }) {
  return (
    <div style={{ gridColumn:full?"1 / -1":undefined }}>
      <label style={{ display:"block",fontSize:11,fontWeight:700,color:"#666",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.05em" }}>{label}</label>
      {children}
    </div>
  );
}
function Input({ value, onChange, type="text" }: { value:string; onChange:(v:string)=>void; type?:string }) {
  return (
    <input type={type} value={value} onChange={e=>onChange(e.target.value)}
      style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,color:"#111",background:"#FAFAFA",outline:"none",fontFamily:"inherit",transition:"border 0.15s" }}
      onFocus={e=>e.target.style.borderColor="#2E2784"}
      onBlur={e=>e.target.style.borderColor="#E8E8F0"}
    />
  );
}
function Textarea({ value, onChange, rows=3 }: { value:string; onChange:(v:string)=>void; rows?:number }) {
  return (
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows}
      style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,color:"#111",background:"#FAFAFA",outline:"none",fontFamily:"inherit",resize:"vertical",transition:"border 0.15s" }}
      onFocus={e=>e.target.style.borderColor="#2E2784"}
      onBlur={e=>e.target.style.borderColor="#E8E8F0"}
    />
  );
}
function FieldSelect({ value, onChange, options }: { value:string; onChange:(v:string)=>void; options:string[] }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,color:"#111",background:"#FAFAFA",outline:"none",fontFamily:"inherit",cursor:"pointer" }}
      onFocus={e=>e.target.style.borderColor="#2E2784"}
      onBlur={e=>e.target.style.borderColor="#E8E8F0"}>
      {options.map(opt=><option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}
function Loader() {
  return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",padding:60,color:"#bbb",fontSize:13,gap:8 }}>
      <div style={{ width:18,height:18,border:"2px solid #E8E8F0",borderTopColor:"#2E2784",borderRadius:"50%",animation:"spin 0.7s linear infinite" }}/>
      Caricamento...
    </div>
  );
}
function SaveBtn({ onClick }: { onClick:()=>void }) {
  return (
    <button onClick={onClick}
      style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"10px 20px",background:"#2E2784",color:"#fff",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer" }}>
      <Save size={14}/> Salva
    </button>
  );
}
function SecBtn({ onClick, children }: { onClick:()=>void; children:React.ReactNode }) {
  return (
    <button onClick={onClick}
      style={{ padding:"10px 18px",background:"#F5F5FA",color:"#555",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer" }}>
      {children}
    </button>
  );
}
