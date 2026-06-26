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
  Eye, EyeOff, Upload, Plus, Trash2, GripVertical, Navigation, Award, FileCode
} from "lucide-react";
import type { AdminUser } from "@/lib/admin-auth";
import type { LucideIcon } from "lucide-react";
import klrLogo from "@/src/imports/KLR-Logosito.png";

type TopSection =
  | "overview" | "pages" | "stats" | "brands" | "leadership"
  | "studies" | "posts" | "colors" | "users" | "settings"
  | "positions" | "customPages";

const ROLE_SECTIONS: Record<string, TopSection[]> = {
  superadmin: ["overview","pages","stats","brands","leadership","studies","posts","colors","users","settings","positions","customPages"],
  admin:      ["overview","pages","stats","brands","leadership","studies","posts","colors","settings","positions","customPages"],
  editor:     ["overview","studies","posts"],
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
  | "career" | "tenYears" | "geo";

const TOP_NAV: { id: TopSection; label: string; icon: LucideIcon }[] = [
  { id: "overview",    label: "Overview",       icon: LayoutGrid },
  { id: "pages",       label: "Pagine & Testi", icon: FileText   },
  { id: "stats",       label: "Statistiche",    icon: BarChart3  },
  { id: "brands",      label: "Brand Partners", icon: Tags       },
  { id: "leadership",  label: "Team",           icon: Users      },
  { id: "studies",     label: "Case Studies",   icon: FolderOpen },
  { id: "posts",       label: "Insights",       icon: PenLine    },
  { id: "positions",   label: "Posizioni",      icon: Award      },
  { id: "customPages", label: "Pagine Custom",  icon: FileCode   },
  { id: "colors",      label: "Colori & Tema",  icon: Palette    },
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
];

/* ══════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════ */
type BrandItem    = { id:string;name:string;tag:string;img:string;since:string;campaigns:string;countries:string;desc:string };
type LeaderItem   = { id:string;name:string;role:string;img:string;bio:string;quote:string };
type StudyItem    = { id:string;title:string;client:string;year:string;location:string;img:string;summary:string;cat:string;brand:string };
type PostItem     = { id:number;slug:string;title:string;date:string;excerpt:string;img:string;category:string;contentHtml?:string };
type UserItem     = { id:string;name:string;email:string;password?:string;role:string };
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
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [saveError,   setSaveError]   = useState(false);

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
  }, [section, stats, brands, leadership, studies, posts, pages, load, colors, users, settings, positions, customPages]);

  async function save(type: string, payload: unknown) {
    setSaving(true); setSaved(false); setSaveError(false);
    try {
      const res = await fetch(`/api/admin/content?type=${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) { setSaveError(true); setSaving(false); setTimeout(() => setSaveError(false), 4000); return; }
      setSaving(false); setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { setSaveError(true); setSaving(false); }
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
      {saveError && <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, background: "rgba(220,38,38,0.1)", padding: "4px 12px", borderRadius: 20 }}>✗ Errore salvataggio</span>}
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
          <div>
            <div style={{ color:"#fff",fontSize:13,fontWeight:600,lineHeight:1.2 }}>{currentUser.name}</div>
            <div style={{ color:"rgba(255,255,255,0.38)",fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:"0.07em" }}>{ROLE_LABELS[currentUser.role] ?? currentUser.role}</div>
          </div>
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
        </div>
      </main>
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
          ["Posizioni",       "gestisci le posizioni aperte della pagina Career"],
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
const TEXTAREA_FIELDS = ["subtitle","mainText","text","bodyText","description","companyDesc","tagline","hq1","hq2","messagePlaceholder","item1","item2","item3","intro","closing","value1Desc","value2Desc","value3Desc","paragraph1","paragraph2","card1Text","card2Text","card3Text","card4Text","mapBody","point1","point2","point3","milestonesText","brandSubtitle","retailerSubtitle","badge3"];
const COLOR_FIELDS    = ["primaryColor","accentColor"];

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
};

const PAGE_SECTION_LABELS: Record<string,string> = {
  site:"Impostazioni Globali",nav:"Navigazione",home:"Home Page",about:"Pagina About",
  services:"Pagina Services",contact:"Pagina Contact",team:"Pagina Team",brands:"Pagina Brands",
  caseStudies:"Case Studies",blog:"Insights / Blog",work:"Work / Portfolio",footer:"Footer",
  career:"Pagina Career",tenYears:"10 Years",geo:"GEO Facts",
};

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
function PositionsEditor ({ data, onSave }: { data:PositionItem[]|null; onSave:(d:PositionItem[])=>void }) { return <ListEditor<PositionItem> title="Posizione"   data={data} fields={POSITION_FIELDS} nameKey="role"  imgKey=""    onSave={onSave} blank={{id:String(Date.now()),role:"",loc:"",description:""}}/>; }

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
