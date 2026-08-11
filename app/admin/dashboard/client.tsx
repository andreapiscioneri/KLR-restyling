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
  Images, Search, Copy, FileVideo, FileAudio, File as FileIcon, Pencil, Activity, Inbox, ArrowDownUp,
  AlertTriangle, Sparkles, TrendingUp
} from "lucide-react";
import type { AdminUser } from "@/lib/admin-auth";
import type { LucideIcon } from "lucide-react";
import klrLogo from "@/src/imports/KLR-Logosito.png";
import { analyzeContent, analyzeAccessibility, trafficLight, TRAFFIC_LIGHT_COLOR, TRAFFIC_LIGHT_LABEL, type ContentCheck, type AnalyzeInput } from "@/lib/seo-analyzer";
import { AdminI18nProvider, useAdminI18n } from "@/lib/admin-i18n";
import { LanguageSwitcher } from "@/components/admin/LanguageSwitcher";
import { AuthorAvatar } from "@/src/app/components/author-avatar";

const ADMIN_INTL_LOCALE: Record<"it" | "en" | "ru", string> = {
  it: "it-IT",
  en: "en-US",
  ru: "ru-RU",
};

type TopSection =
  | "overview" | "pages" | "stats" | "brands" | "leadership"
  | "studies" | "posts" | "colors" | "users" | "settings"
  | "positions" | "customPages" | "cookies" | "media" | "analytics" | "leads" | "seo" | "accessibility";

const ROLE_SECTIONS: Record<string, TopSection[]> = {
  superadmin: ["overview","pages","stats","brands","leadership","studies","posts","colors","users","settings","positions","customPages","cookies","media","analytics","leads","seo","accessibility"],
  admin:      ["overview","pages","stats","brands","leadership","studies","posts","colors","settings","positions","customPages","cookies","media","analytics","leads","seo","accessibility"],
  editor:     ["overview","studies","posts","media","seo"],
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

type NavGroup = "principale" | "contenuti" | "media" | "configurazione" | "sistema";

const TOP_NAV: { id: TopSection; label: string; icon: LucideIcon; group: NavGroup }[] = [
  { id: "overview",    label: "Overview",       icon: LayoutGrid, group: "principale" },
  { id: "pages",       label: "Pagine & Testi", icon: FileText,   group: "contenuti" },
  { id: "brands",      label: "Brand Partners", icon: Tags,       group: "contenuti" },
  { id: "leadership",  label: "Team",           icon: Users,      group: "contenuti" },
  { id: "studies",     label: "Case Studies",   icon: FolderOpen, group: "contenuti" },
  { id: "posts",       label: "Insights",       icon: PenLine,    group: "contenuti" },
  { id: "positions",   label: "Posizioni Lavorative", icon: Award, group: "contenuti" },
  { id: "customPages", label: "Pagine Custom",  icon: FileCode,   group: "contenuti" },
  { id: "media",       label: "Media Library",  icon: Images,     group: "media" },
  { id: "colors",      label: "Colori & Tema",  icon: Palette,    group: "configurazione" },
  { id: "stats",       label: "Statistiche",    icon: BarChart3,  group: "configurazione" },
  { id: "cookies",     label: "Cookie & Privacy", icon: Cookie,   group: "configurazione" },
  { id: "analytics",   label: "Traffico Sito",  icon: Activity,   group: "sistema" },
  { id: "accessibility", label: "Accessibilità", icon: CheckCircle, group: "sistema" },
  { id: "seo",         label: "SEO · SEM · GEO · AIO",icon: TrendingUp, group: "sistema" },
  { id: "leads",       label: "Contatti & Candidature", icon: Inbox, group: "sistema" },
  { id: "users",       label: "Utenti",         icon: Users,      group: "sistema" },
  { id: "settings",    label: "Impostazioni",   icon: Settings,   group: "sistema" },
];

const NAV_GROUP_LABELS: Record<NavGroup, string> = {
  principale: "",
  contenuti: "Contenuti",
  media: "Media",
  configurazione: "Design & Configurazione",
  sistema: "Sistema",
};
const NAV_GROUP_ORDER: NavGroup[] = ["principale", "contenuti", "media", "configurazione", "sistema"];

const SECTION_DESCRIPTIONS: Record<TopSection, string> = {
  overview:    "Panoramica generale del pannello: numeri chiave e guida rapida a tutte le sezioni.",
  pages:       "Modifica i testi, i titoli, le immagini e la visibilità delle sezioni di ogni pagina del sito. Ogni scheda in alto corrisponde a una pagina.",
  stats:       "I numeri mostrati nelle sezioni statistiche del sito (es. anni di attività, campagne realizzate, paesi).",
  seo:         "Monitoraggio SEO, SEM (targeting parola chiave per ricerca/campagne a pagamento), GEO (ottimizzazione per i motori generativi AI) e AIO (AI Overview) di tutti i contenuti pubblicati: punteggi, contenuti da migliorare e valutazione in tempo reale mentre scrivi. L'accessibilità è valutata separatamente nella sezione dedicata.",
  brands:      "I brand partner mostrati nella sezione dedicata del sito, con logo, descrizione e dati.",
  leadership:  "I membri del team mostrati nella pagina About/Team, con foto, ruolo e biografia.",
  studies:     "I case study/campagne pubblicati sul sito: dati generali, risultati, reward e galleria immagini.",
  posts:       "Gli articoli del blog/Insights, con testo formattato, immagine di copertina e autore.",
  positions:   "Le posizioni lavorative aperte mostrate nella pagina Career.",
  customPages: "Crea pagine aggiuntive con URL personalizzato, senza scrivere codice, componendo blocchi di testo, immagini e CTA.",
  media:       "Tutte le immagini caricate nel sito: cercale, copiane l'URL o eliminale.",
  colors:      "Colori, logo e font usati in tutto il sito.",
  cookies:     "Testi del banner cookie e registro dei consensi raccolti dagli utenti.",
  analytics:   "Monitoraggio del traffico reale del sito: visite, pagine più viste, dispositivi e provenienza dei visitatori.",
  accessibility: "Quanto i contenuti pubblicati (articoli e case study) sono accessibili a persone con screen reader, disabilità cognitive o che navigano da tastiera. Non riguarda il posizionamento sui motori di ricerca.",
  leads:       "Messaggi ricevuti dal form contatti (con le email raccolte) e candidature inviate per le posizioni lavorative aperte.",
  users:       "Account con accesso a questo pannello admin e relativi permessi.",
  settings:    "Impostazioni generali del sito: nome, contatti, sede, social, SEO e script avanzati.",
};

/** "Quando usarla / chi la usa" — mostrato nel PageIntro sotto la descrizione principale. */
const SECTION_USAGE: Record<TopSection, string[]> = {
  overview:    ["Punto di partenza: da qui vedi cosa manca o va completato.", "Utile a chiunque acceda al pannello, di qualsiasi ruolo."],
  pages:       ["Usala quando devi cambiare un testo, un titolo o un'immagine già presente sul sito.", "Le modifiche sono visibili subito dopo il salvataggio, senza bisogno di deploy."],
  stats:       ["Aggiorna questi numeri solo quando i dati aziendali cambiano davvero (es. nuovo anno, nuova campagna conclusa)."],
  seo:         ["Consulta questa sezione dopo aver pubblicato per vedere quali articoli/case study vanno migliorati.", "Mentre scrivi un post o un case study, la valutazione SEO/GEO/AIO appare in tempo reale in fondo al modulo di modifica."],
  brands:      ["Aggiungi un brand quando firmi una nuova partnership; modificalo se cambiano i dati del cliente."],
  leadership:  ["Aggiorna quando un membro del team entra, esce o cambia ruolo/foto."],
  studies:     ["Pubblica un nuovo case study a campagna conclusa; usa i campi 'Dettaglio' per la pagina completa del progetto."],
  posts:       ["Pubblica un nuovo articolo o correggi un testo esistente del blog."],
  positions:   ["Apri una posizione quando c'è una ricerca attiva; rimuovila quando la posizione si chiude."],
  customPages: ["Usala per pagine che non rientrano nella struttura standard del sito (es. landing page, promo)."],
  media:       ["Usa questa libreria come archivio centrale: carica un'immagine una volta e riusala in più punti del sito."],
  colors:      ["Modifica solo se stai facendo un restyling grafico: l'effetto è immediato su tutto il sito."],
  cookies:     ["I testi del banner vanno cambiati se cambia la policy privacy; il registro serve per audit e conformità."],
  analytics:   ["Consulta questa sezione per capire quante persone visitano il sito, quali pagine funzionano meglio e da dove arrivano.", "I dati vengono raccolti solo se il visitatore ha accettato i cookie di ottimizzazione."],
  accessibility: ["Usa questa sezione per capire quali articoli o case study vanno resi più accessibili (testo alternativo mancante, frasi troppo lunghe, ecc).", "È una valutazione indipendente da SEO/SEM/GEO/AIO."],
  leads:       ["Controlla qui chi ha scritto tramite il form contatti o si è candidato per una posizione aperta.", "Le email raccolte sono qui: usale per ricontattare le persone."],
  users:       ["Gestita di norma da un superadmin: crea un account per ogni persona che deve accedere al pannello."],
  settings:    ["Configurazione impostata all'inizio del progetto; da rivedere solo per cambi di contatti, SEO o tracking."],
};

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
type StudyResult  = { k:string;v:string };
type StudyRewardGroup = { title:string;subtitle:string;items:string[] };
type StudyDetails = {
  sourceUrl:string;campaignTitle:string;challenge:string;
  rewardGroups:StudyRewardGroup[];activations:string[];mechanics:string[];
  gallery:string[];social:string[];videos:string[];
};
type StudyItem    = { id:string;title:string;client:string;year:string;location:string;img:string;summary:string;cat:string;brand:string;results:StudyResult[];details:StudyDetails;status?:"published"|"draft"|"deleted";publicPreview?:boolean;cornerstone?:boolean;focusKeyword?:string;authorName?:string;authorAvatar?:string;publishedAt?:string };
type PostItem     = { id:number;slug:string;title:string;date:string;excerpt:string;img:string;category:string;contentHtml?:string;authorName?:string;authorAvatar?:string;status?:"published"|"draft"|"deleted";publicPreview?:boolean;cornerstone?:boolean;focusKeyword?:string };
type UserItem     = { id:string;name:string;email:string;password?:string;role:string;hasPassword?:boolean;avatar?:string };
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
  return (
    <AdminI18nProvider>
      <AdminDashboardInner currentUser={currentUser} />
    </AdminI18nProvider>
  );
}

function AdminDashboardInner({ currentUser }: { currentUser: AdminUser }) {
  const router = useRouter();
  const { t } = useAdminI18n();
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
    if (section === "seo"         && !studies)      load("studies");
    if (section === "seo"         && !posts)        load("posts");
    if (section === "accessibility" && !studies)    load("studies");
    if (section === "accessibility" && !posts)      load("posts");
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
      {saving    && <span style={{ fontSize: 12, color: "#F8AE01", fontWeight: 600, background: "rgba(248,174,1,0.1)", padding: "4px 12px", borderRadius: 20 }}>{t.common.saving}</span>}
      {saved     && <span style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:"#16a34a",fontWeight:600,background:"rgba(22,163,74,0.1)",padding:"4px 12px",borderRadius:20 }}><CheckCircle size={12}/>{t.common.saved}</span>}
      {saveError && (
        <span style={{ display:"flex",flexDirection:"column",gap:4,fontSize:12,color:"#dc2626",fontWeight:600,background:"rgba(220,38,38,0.1)",padding:"8px 12px",borderRadius:20,maxWidth:360 }}>
          <span>✗ {t.common.saveError}</span>
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
          width:250,position:"fixed",top:0,left:0,bottom:0,zIndex:40,
          background:"linear-gradient(175deg,#1e1a6e 0%,#2E2784 60%,#231e72 100%)",
          display:"flex",flexDirection:"column",
          boxShadow:"4px 0 24px rgba(46,39,132,0.25)",
          transition:"transform 0.28s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div style={{ padding:"22px 20px 18px",borderBottom:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <Image src={klrLogo} alt="KLR" width={96} height={30} style={{ height:24,width:"auto" }} />
          <button className="admin-mobile-bar" onClick={() => setSidebarOpen(false)} aria-label={t.common.closeMenu}
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
            <div style={{ color:"rgba(255,255,255,0.38)",fontSize:10,marginTop:2,textTransform:"uppercase",letterSpacing:"0.07em" }}>{t.role[currentUser.role] ?? ROLE_LABELS[currentUser.role] ?? currentUser.role}</div>
          </div>
          <button type="button" onClick={() => setChangePasswordOpen(true)} title={t.common.changePassword}
            style={{ width:28,height:28,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.08)",border:"none",borderRadius:8,color:"rgba(255,255,255,0.6)",cursor:"pointer" }}>
            <Settings size={13}/>
          </button>
        </div>
        <nav style={{ flex:1,padding:"10px 10px",overflowY:"auto" }}>
          {NAV_GROUP_ORDER.map(group => {
            const items = TOP_NAV.filter(item => item.group === group && (ROLE_SECTIONS[currentUser.role] ?? ROLE_SECTIONS.editor).includes(item.id));
            if (items.length === 0) return null;
            return (
              <div key={group} style={{ marginBottom:6 }}>
                {t.navGroup[group] && (
                  <div style={{ padding:"12px 12px 6px",fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.32)",textTransform:"uppercase",letterSpacing:"0.08em" }}>
                    {t.navGroup[group]}
                  </div>
                )}
                {items.map(item => {
                  const active = section === item.id;
                  return (
                    <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                      style={{ display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",marginBottom:2,border:"none",borderRadius:10,background:active?"rgba(248,174,1,0.15)":"transparent",color:active?"#F8AE01":"rgba(255,255,255,0.55)",fontSize:13,fontWeight:active?600:400,cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
                      <item.icon size={15}/>
                      <span style={{ flex:1 }}>{t.nav[item.id] ?? item.label}</span>
                      {active && <ChevronRight size={13} style={{ opacity:0.6 }}/>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
        <LanguageSwitcher/>
        <div style={{ padding:"0 10px 20px" }}>
          <button onClick={logout}
            style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:7,width:"100%",padding:"10px 12px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"rgba(255,255,255,0.45)",fontSize:12,cursor:"pointer",transition:"all 0.15s" }}>
            <LogOut size={13}/> {t.common.logout}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="md:ml-[250px]" style={{ flex:1,minWidth:0 }}>
        <div className="admin-mobile-bar" style={{ position:"sticky",top:0,zIndex:20,background:"rgba(245,245,250,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(0,0,0,0.07)",padding:"0 20px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ display:"flex",alignItems:"center",gap:12 }}>
            <button className="md:hidden" onClick={() => setSidebarOpen(v => !v)} aria-label={sidebarOpen ? t.common.closeMenu : t.common.openMenu}
              style={{ width:36,height:36,background:"#2E2784",border:"none",borderRadius:8,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
              {sidebarOpen ? <X size={17}/> : <Menu size={17}/>}
            </button>
            <div style={{ fontSize:15,fontWeight:700,color:"#111" }}>{t.nav[section] ?? TOP_NAV.find(n => n.id === section)?.label}</div>
          </div>
          <div style={{ display:"flex",gap:8,alignItems:"center" }}><StatusBadge/></div>
        </div>

        <div style={{ padding:"24px" }}>
          <div className="hidden md:flex" style={{ alignItems:"flex-start",justifyContent:"space-between",marginBottom:16,gap:16 }}>
            <h1 style={{ margin:0,fontSize:20,fontWeight:700,color:"#111" }}>{t.nav[section] ?? TOP_NAV.find(n => n.id === section)?.label}</h1>
            <div style={{ display:"flex",gap:8,flexShrink:0 }}><StatusBadge/></div>
          </div>
          <div className="admin-mobile-bar" style={{ marginBottom:4,fontSize:15,fontWeight:700,color:"#111" }}>{t.nav[section] ?? TOP_NAV.find(n => n.id === section)?.label}</div>
          <PageIntro description={t.sectionDesc[section] ?? SECTION_DESCRIPTIONS[section]} usage={t.sectionUsage[section] ?? SECTION_USAGE[section]}/>

          {section === "overview"    && <Overview />}
          {section === "colors"      && <ColorsEditor     data={colors}      onSave={d => { setColors(d);                         save("colors",      d); }} />}
          {section === "users"       && <UsersEditor      data={users}       onSave={d => { setUsers(d);                          save("users",       d); }} />}
          {section === "settings"    && <SettingsEditor   data={settings}    onSave={d => { setSettings(d as Record<string,unknown>); save("settings",   d); }} />}
          {section === "stats"       && <StatsEditor      data={stats}       onSave={d => { setStats(d);                          save("stats",       d); }} />}
          {section === "brands"      && <BrandsEditor     data={brands}      onSave={d => { setBrands(d);                         save("brands",      d); }} />}
          {section === "leadership"  && <LeadershipEditor data={leadership}  onSave={d => { setLeadership(d);                     save("leadership",  d); }} />}
          {section === "studies"     && <StudiesEditor    data={studies}     brands={brands} users={users} currentUser={currentUser} onSave={d => { setStudies(d);                        save("studies",     d); }} />}
          {section === "posts"       && <PostsEditor      data={posts}       users={users} currentUser={currentUser} onSave={d => { setPosts(d);                          save("posts",       d); }} />}
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
          {section === "analytics"   && <AnalyticsPanel />}
          {section === "accessibility" && <AccessibilityPanel posts={posts} studies={studies} />}
          {section === "leads"       && (
            <>
              <ContactLeadsPanel />
              <ApplicationsPanel />
            </>
          )}
          {section === "seo"         && <SeoMonitorPanel posts={posts} studies={studies} />}
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
  const { t } = useAdminI18n();
  const cp = t.changePassword;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError(cp.tooShort);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(cp.mismatch);
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
        setError(json?.error || cp.genericError.replace("{status}", String(res.status)));
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
          <h3 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111" }}>{cp.title}</h3>
          <button type="button" onClick={onClose} aria-label={t.common.close}
            style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",background:"#F2F2F6",border:"none",borderRadius:7,cursor:"pointer",color:"#666" }}>
            <X size={14}/>
          </button>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <Field label={cp.currentPassword}>
            <Input type="password" value={currentPassword} onChange={setCurrentPassword}/>
          </Field>
          <Field label={cp.newPassword}>
            <Input type="password" value={newPassword} onChange={setNewPassword}/>
          </Field>
          <Field label={cp.confirmPassword}>
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
            {cp.updated}
          </div>
        )}

        <button type="submit" disabled={submitting || success}
          style={{ marginTop:16,width:"100%",padding:"11px",background:submitting||success?"#eee":"#F8AE01",color:submitting||success?"#999":"#000",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:submitting||success?"not-allowed":"pointer" }}>
          {submitting ? cp.saving : success ? cp.done : cp.submit}
        </button>
      </form>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   OVERVIEW
══════════════════════════════════════════════════ */
function Overview() {
  const { t } = useAdminI18n();
  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:14,marginBottom:24 }}>
        {[
          { label:t.overview.stats.pages,       value:"11",  color:"#2E2784" },
          { label:t.overview.stats.sections,     value:"60+", color:"#2E2784" },
          { label:t.overview.stats.uploads,      value:"✓",   color:"#16a34a" },
          { label:t.overview.stats.navbar,       value:"✓",   color:"#16a34a" },
          { label:t.overview.stats.deploy,       value:"✓",   color:"#16a34a" },
          { label:t.overview.stats.customPages,  value:"∞",   color:"#F8AE01" },
        ].map(c => (
          <div key={c.label} style={{ background:"#fff",borderRadius:16,padding:"22px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",borderTop:`3px solid ${c.color}` }}>
            <div style={{ fontSize:28,fontWeight:800,color:c.color,lineHeight:1 }}>{c.value}</div>
            <div style={{ fontSize:12,color:"#777",marginTop:6 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background:"#fff",borderRadius:16,padding:"22px 24px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize:12,fontWeight:700,color:"#2E2784",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:14 }}>{t.overview.quickGuide}</div>
        {t.overview.guideItems.map(([k, v]) => (
          <div key={k} style={{ display:"flex",gap:8,marginBottom:10,fontSize:13,color:"#444",alignItems:"flex-start" }}>
            <span style={{ fontWeight:700,color:"#2E2784",minWidth:120 }}>{k}</span>
            <ArrowRight size={14} style={{ marginTop:2,color:"#999",flexShrink:0 }}/>
            <span style={{ color:"#666" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:16 }}>
        <Callout variant="success">
          <strong>{t.overview.allSolved}</strong> {t.overview.allSolvedDesc}
        </Callout>
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
  const { t } = useAdminI18n();

  async function handleFile(file: File) {
    setUploading(true); setUploadError("");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json() as { url?: string; error?: string };
      if (json.url) { onUrl(json.url); }
      else          { setUploadError(json.error || t.common.uploadFailed); }
    } catch { setUploadError(t.common.networkError); }
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
function ImageField({ value, onChange, label, avatarName }: { value: string; onChange: (v: string) => void; label: string; avatarName?: string }) {
  const { open, uploading, uploadError, inputEl } = useImageUpload(onChange);
  const { t } = useAdminI18n();
  return (
    <Field label={label} full>
      {inputEl}
      <div style={{ display:"flex",gap:8,alignItems:"center" }}>
        {avatarName !== undefined && !value && <AuthorAvatar name={avatarName} size={40}/>}
        <Input value={value} onChange={onChange} />
        <button type="button" onClick={open}
          style={{ flexShrink:0,display:"flex",alignItems:"center",gap:6,padding:"9px 14px",background:uploading?"#ddd":"#2E2784",color:"#fff",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:uploading?"not-allowed":"pointer",whiteSpace:"nowrap",transition:"all 0.15s" }}
          disabled={uploading}>
          <Upload size={13}/>{uploading ? t.common.uploading : t.common.upload}
        </button>
      </div>
      {uploadError && <div style={{ fontSize:11,color:"#dc2626",marginTop:4 }}>{uploadError}</div>}
      {value && (
        <div style={{ display:"flex",alignItems:"center",gap:8,marginTop:8 }}>
          <div style={{ background:"#2E2784",borderRadius:8,padding:8,display:"flex",alignItems:"center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" style={{ height:60,objectFit:"cover",borderRadius:4,maxWidth:"100%" }}/>
          </div>
          <button type="button" onClick={() => onChange("")} title={t.common.removeImage} aria-label={t.common.removeImage}
            style={{ flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",width:32,height:32,background:"#fff",color:"#dc2626",border:"1px solid #eee",borderRadius:999,cursor:"pointer" }}>
            <X size={13}/>
          </button>
        </div>
      )}
    </Field>
  );
}

/* ══════════════════════════════════════════════════
   DYNAMIC LIST FIELDS (per contenuti strutturati case study)
══════════════════════════════════════════════════ */
const listRowBtn: React.CSSProperties = { flexShrink:0,padding:8,minWidth:32,minHeight:32,background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" };
const listAddBtn: React.CSSProperties = { padding:"8px 14px",background:"#EEF0FB",color:"#2E2784",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6 };

function StringListField({ label, value, onChange, placeholder, image }: { label:string; value:string[]; onChange:(v:string[])=>void; placeholder?:string; image?:boolean }) {
  const items = value ?? [];
  const { t } = useAdminI18n();
  function update(i:number, v:string) { const next=[...items]; next[i]=v; onChange(next); }
  function remove(i:number) { onChange(items.filter((_,idx)=>idx!==i)); }
  function add() { onChange([...items, ""]); }
  return (
    <Field label={label} full>
      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {items.map((v, i) => (
          <div key={i} style={{ display:"flex",gap:8,alignItems:image?"flex-start":"center" }}>
            <div style={{ flex:1 }}>
              {image
                ? <ImageField value={v} onChange={(nv)=>update(i,nv)} label=""/>
                : <Input value={v} placeholder={placeholder} onChange={(nv)=>update(i,nv)}/>}
            </div>
            <button type="button" onClick={()=>remove(i)} aria-label={t.common.removeItem} style={listRowBtn}><Trash2 size={13}/></button>
          </div>
        ))}
        <button type="button" onClick={add} style={listAddBtn}><Plus size={13}/>{t.common.add}</button>
      </div>
    </Field>
  );
}

function KVListField({ label, value, onChange, kLabel, vLabel }: { label:string; value:{k:string;v:string}[]; onChange:(v:{k:string;v:string}[])=>void; kLabel:string; vLabel:string }) {
  const items = value ?? [];
  function update(i:number, key:"k"|"v", v:string) { const next=items.map((it,idx)=>idx===i?{...it,[key]:v}:it); onChange(next); }
  function remove(i:number) { onChange(items.filter((_,idx)=>idx!==i)); }
  function add() { onChange([...items, { k:"", v:"" }]); }
  return (
    <Field label={label} full>
      <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display:"flex",gap:8,alignItems:"center" }}>
            <div style={{ flex:1 }}><Input value={it.k} placeholder={kLabel} onChange={(v)=>update(i,"k",v)}/></div>
            <div style={{ flex:1 }}><Input value={it.v} placeholder={vLabel} onChange={(v)=>update(i,"v",v)}/></div>
            <button type="button" onClick={()=>remove(i)} aria-label="Rimuovi elemento" style={listRowBtn}><Trash2 size={13}/></button>
          </div>
        ))}
        <button type="button" onClick={add} style={listAddBtn}><Plus size={13}/>Aggiungi</button>
      </div>
    </Field>
  );
}

function RewardGroupsField({ label, value, onChange }: { label:string; value:{title:string;subtitle:string;items:string[]}[]; onChange:(v:{title:string;subtitle:string;items:string[]}[])=>void }) {
  const { t } = useAdminI18n();
  const groups = value ?? [];
  function update(i:number, patch:Partial<{title:string;subtitle:string;items:string[]}>) {
    onChange(groups.map((g,idx)=>idx===i?{...g,...patch}:g));
  }
  function remove(i:number) { onChange(groups.filter((_,idx)=>idx!==i)); }
  function add() { onChange([...groups, { title:"", subtitle:"", items:[] }]); }
  return (
    <Field label={label} full>
      <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
        {groups.map((g, i) => (
          <div key={i} style={{ border:"1px solid #eee",borderRadius:12,padding:14,display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ display:"flex",gap:8,alignItems:"center" }}>
              <div style={{ flex:1 }}><Input value={g.title} placeholder={t.common.rewardGroupTitle} onChange={(v)=>update(i,{title:v})}/></div>
              <button type="button" onClick={()=>remove(i)} aria-label={t.common.removeItem} style={listRowBtn}><Trash2 size={13}/></button>
            </div>
            <Input value={g.subtitle} placeholder={t.common.rewardGroupSubtitle} onChange={(v)=>update(i,{subtitle:v})}/>
            <StringListField label={t.common.items} value={g.items||[]} onChange={(items)=>update(i,{items})} placeholder={t.common.item}/>
          </div>
        ))}
        <button type="button" onClick={add} style={listAddBtn}><Plus size={13}/>{t.common.addRewardGroup}</button>
      </div>
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
  const { t } = useAdminI18n();
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader/>;
  const c = t.colors;
  return (
    <div>
      <Panel title={c.title} info={c.info}>
        <Grid>
          {Object.keys(COLORS_LABELS).map((key) => {
            const value = form[key] || "";
            const isColor = key === "primaryColor" || key === "accentColor";
            return (
              <Field key={key} label={t.fieldLabel[key] ?? COLORS_LABELS[key]}>
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
          <ImageField value={form.logoUrl || ""} onChange={v => setForm(p => ({...p,logoUrl:v}))} label={c.logoLabel}/>
        </div>
        <div style={{ marginTop:16,padding:"14px",background:"#F5F5FA",borderRadius:12,border:"1px solid #E8E8F0" }}>
          <div style={{ fontSize:12,fontWeight:700,color:"#666",textTransform:"uppercase",marginBottom:10 }}>{c.preview}</div>
          <div style={{ display:"flex",gap:16,alignItems:"center",flexWrap:"wrap" }}>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:32,height:32,background:form.primaryColor||"#2E2784",borderRadius:8,border:"1px solid rgba(0,0,0,0.1)" }}/>
              <div style={{ fontSize:12,color:"#555" }}>{c.primary}: {form.primaryColor||"#2E2784"}</div>
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
              <div style={{ width:32,height:32,background:form.accentColor||"#F8AE01",borderRadius:8,border:"1px solid rgba(0,0,0,0.1)" }}/>
              <div style={{ fontSize:12,color:"#555" }}>{c.accent}: {form.accentColor||"#F8AE01"}</div>
            </div>
          </div>
        </div>
      </Panel>
      <div style={{ marginBottom:14 }}>
        <Accordion title={c.typographyTitle} subtitle={c.typographySubtitle}>
          <Grid>
            <Field label={c.headingFont} hint={c.headingFontHint}><FontSelect value={form.headingFont||"Inter"} onChange={v => setForm(p => ({...p,headingFont:v}))}/></Field>
            <Field label={c.bodyFont} hint={c.bodyFontHint}><FontSelect value={form.bodyFont||"Inter"} onChange={v => setForm(p => ({...p,bodyFont:v}))}/></Field>
          </Grid>
        </Accordion>
      </div>
      <FooterBar><Button icon={Save} onClick={() => onSave(form)}>{t.common.save}</Button></FooterBar>
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
  const { t } = useAdminI18n();
  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!data) return <Loader/>;
  const up  = (key: string, value: unknown) => setForm(p => ({...p,[key]:value}));
  const upN = (sec: string, key: string, value: string) =>
    setForm(p => ({...p,[sec]:{...(p[sec] as Record<string,unknown>),[key]:value}}));
  const socialLinks = form.socialLinks as Record<string,string> || {};
  const hq = form.hq as Record<string,string> || {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = form.defaultEmail && !emailPattern.test(String(form.defaultEmail)) ? t.settings.invalidEmail : undefined;
  const s = t.settings;
  return (
    <div>
      <Panel title={s.siteInfoTitle} info={s.siteInfoInfo}>
        <Grid>
          <Field label={s.siteName} required hint={s.siteNameHint}><Input value={String(form.siteName||"")} onChange={v=>up("siteName",v)} placeholder={s.siteNamePlaceholder}/></Field>
          <Field label={s.siteUrl} hint={s.siteUrlHint}><Input value={String(form.siteUrl||"")} onChange={v=>up("siteUrl",v)} placeholder={s.siteUrlPlaceholder}/></Field>
          <Field label={s.siteDescription} full hint={s.siteDescriptionHint}><Textarea value={String(form.siteDescription||"")} onChange={v=>up("siteDescription",v)} rows={3} placeholder={s.siteDescriptionPlaceholder}/></Field>
          <Field label={s.keywords} full hint={s.keywordsHint}><Textarea value={String(form.siteKeywords||"")} onChange={v=>up("siteKeywords",v)} rows={2} placeholder={s.keywordsPlaceholder}/></Field>
        </Grid>
      </Panel>
      <Panel title={s.contactsTitle} info={s.contactsInfo}>
        <Grid>
          <Field label={s.mainEmail} required error={emailError}><Input type="email" value={String(form.defaultEmail||"")} onChange={v=>up("defaultEmail",v)} placeholder={s.mainEmailPlaceholder}/></Field>
          <Field label={s.supportEmail} hint={s.supportEmailHint}><Input type="email" value={String(form.supportEmail||"")} onChange={v=>up("supportEmail",v)} placeholder={s.supportEmailPlaceholder}/></Field>
          <Field label={s.phone}><Input value={String(form.phone||"")} onChange={v=>up("phone",v)} placeholder={s.phonePlaceholder}/></Field>
        </Grid>
      </Panel>
      <Panel title={s.hqTitle} info={s.hqInfo}>
        <Grid>
          <Field label={s.address} full><Input value={String(hq.address||"")} onChange={v=>upN("hq","address",v)} placeholder={s.addressPlaceholder}/></Field>
          <Field label={s.city}><Input value={String(hq.city||"")} onChange={v=>upN("hq","city",v)} placeholder={s.cityPlaceholder}/></Field>
          <Field label={s.country}><Input value={String(hq.country||"")} onChange={v=>upN("hq","country",v)} placeholder={s.countryPlaceholder}/></Field>
        </Grid>
      </Panel>
      <Panel title={s.socialTitle} info={s.socialInfo}>
        <Grid>
          <Field label="LinkedIn"><Input value={String(socialLinks.linkedin||"")} onChange={v=>upN("socialLinks","linkedin",v)} placeholder={s.socialLinkedinPlaceholder}/></Field>
          <Field label="Instagram"><Input value={String(socialLinks.instagram||"")} onChange={v=>upN("socialLinks","instagram",v)} placeholder={s.socialInstagramPlaceholder}/></Field>
          <Field label="Twitter"><Input value={String(socialLinks.twitter||"")} onChange={v=>upN("socialLinks","twitter",v)} placeholder={s.socialTwitterPlaceholder}/></Field>
          <Field label="Facebook"><Input value={String(socialLinks.facebook||"")} onChange={v=>upN("socialLinks","facebook",v)} placeholder={s.socialFacebookPlaceholder}/></Field>
        </Grid>
      </Panel>
      <div style={{ marginBottom:14 }}>
        <Accordion title={s.advancedTitle} subtitle={s.advancedSubtitle}>
          <Callout variant="warning">{s.cssWarning}</Callout>
          <div style={{ height:14 }}/>
          <Grid>
            <Field label={s.gaId} hint={s.gaIdHint}><Input value={String(form.googleAnalyticsId||"")} onChange={v=>up("googleAnalyticsId",v)} placeholder={s.gaIdPlaceholder}/></Field>
            <Field label={s.customCss} full hint={s.customCssHint}><Textarea value={String(form.customCss||"")} onChange={v=>up("customCss",v)} rows={6} placeholder={s.customCssPlaceholder}/></Field>
          </Grid>
        </Accordion>
      </div>
      <FooterBar><Button icon={Save} onClick={() => onSave(form)}>{t.common.save}</Button></FooterBar>
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
  const { t } = useAdminI18n();
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
      <Panel title={t.cookieBanner.title} info={t.cookieBanner.info} rightAction={
        <label style={{ display:"flex",alignItems:"center",gap:8,fontSize:12,fontWeight:600,color: enabled ? "#16a34a" : "#999",cursor:"pointer" }}>
          <input type="checkbox" checked={enabled} onChange={e => up("enabled", e.target.checked)} style={{ width:16,height:16,cursor:"pointer" }}/>
          {enabled ? t.cookieBanner.active : t.cookieBanner.inactive}
        </label>
      }>
        <Grid>
          <Field label={t.cookieBanner.mainTitle} full><Textarea value={String(form.headline||"")} onChange={v=>up("headline",v)} rows={2}/></Field>
          <Field label={t.cookieBanner.subtitle} full><Textarea value={String(form.subheadline||"")} onChange={v=>up("subheadline",v)} rows={2}/></Field>
          <Field label={t.cookieBanner.defaultDuration}>
            <FieldSelect value={String(form.defaultDuration||"1m")} onChange={v=>up("defaultDuration",v)} options={["1m","6m","12m"]}/>
          </Field>
        </Grid>
      </Panel>

      <Panel title={t.cookieBanner.levelsTitle} info={t.cookieBanner.levelsInfo}>
        <Grid>
          {(["silver","gold","platinum"] as CookieLevelKey[]).map(lvl => (
            <Field key={lvl} label={COOKIE_LEVEL_LABELS[lvl]} full>
              <Textarea value={levelDescriptions[lvl]||""} onChange={v=>upLevel(lvl,v)} rows={2}/>
            </Field>
          ))}
        </Grid>
      </Panel>

      <Panel title={t.cookieBanner.categoriesTitle} info={t.cookieBanner.categoriesInfo}>
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
  const { t, locale } = useAdminI18n();

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
  const { ask, dialog } = useConfirm();

  function removeOne(id: string) {
    ask({
      title: t.common.confirmDeleteConsentTitle,
      message: t.common.confirmDeleteConsentMessage,
      confirmLabel: t.common.delete,
      onConfirm: async () => { await fetch(`/api/admin/consent?id=${encodeURIComponent(id)}`, { method: "DELETE" }); load(); },
    });
  }

  function removeAll() {
    ask({
      title: t.common.confirmDeleteAllConsentsTitle,
      message: t.common.confirmDeleteAllConsentsMessage.replace("{count}", String(log?.length ?? 0)),
      confirmLabel: t.common.deleteAll,
      onConfirm: async () => { await fetch(`/api/admin/consent?id=all`, { method: "DELETE" }); load(); },
    });
  }

  const now = Date.now();
  const total   = log?.length ?? 0;
  const active  = log?.filter(r => new Date(r.expiresAt).getTime() > now).length ?? 0;
  const last24h = log?.filter(r => now - new Date(r.loggedAt).getTime() < 86400000).length ?? 0;
  const byLevel: Record<string, number> = {};
  log?.forEach(r => { byLevel[r.level] = (byLevel[r.level]||0) + 1; });

  return (
    <div>
      <Panel title={t.common.consentLogTitle} info={t.common.consentLogInfo} rightAction={
        <div style={{ display:"flex",gap:8 }}>
          <Button variant="ghost" icon={RefreshCw} onClick={load}>{t.common.refresh}</Button>
          {total > 0 && <Button variant="danger" icon={Trash2} onClick={removeAll}>{t.common.deleteAll}</Button>}
        </div>
      }>
        {loading && !log && <Loader/>}
        {error && <div style={{ color:"#dc2626",fontSize:13,padding:"12px 0" }}>{t.common.errorPrefix}: {error}</div>}

        {log && (
          <>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:18 }}>
              <MiniStat label={t.common.totalConsents} value={String(total)} color="#2E2784"/>
              <MiniStat label={t.common.activeConsents} value={String(active)} color="#16a34a"/>
              <MiniStat label={t.common.last24h} value={String(last24h)} color="#F8AE01"/>
              {(["silver","gold","platinum","custom"] as const).filter(l => byLevel[l]).map(l => (
                <MiniStat key={l} label={COOKIE_LEVEL_LABELS[l as CookieLevelKey] ?? "Custom"} value={String(byLevel[l])} color={LEVEL_BADGE_COLOR[l]}/>
              ))}
            </div>

            {log.length === 0 ? (
              <EmptyState icon={Cookie} title={t.common.noConsentsTitle} description={t.common.noConsentsDescription}/>
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
                          <td style={{ padding:"9px 10px",color:"#444",whiteSpace:"nowrap" }}>{new Date(r.consentedAt).toLocaleString(ADMIN_INTL_LOCALE[locale])}</td>
                          <td style={{ padding:"9px 10px" }}>
                            <span style={{ padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,color:"#fff",background:LEVEL_BADGE_COLOR[r.level]||"#888",textTransform:"capitalize" }}>{r.level}</span>
                          </td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{cats.join(", ")}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.duration}</td>
                          <td style={{ padding:"9px 10px",color: expired ? "#dc2626" : "#666" }}>{new Date(r.expiresAt).toLocaleDateString(ADMIN_INTL_LOCALE[locale])}{expired ? t.common.expiredSuffix : ""}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.path||"—"}</td>
                          <td style={{ padding:"9px 10px",color:"#999",fontFamily:"monospace",fontSize:11 }}>{r.id.slice(0,8)}…</td>
                          <td style={{ padding:"9px 10px" }}>
                            <button onClick={() => removeOne(r.id)} title={t.common.delete} aria-label={t.common.deleteConsentRecord}
                              style={{ background:"none",border:"none",color:"#bbb",cursor:"pointer",display:"flex",padding:6,minWidth:28,minHeight:28,alignItems:"center",justifyContent:"center" }}>
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
      {dialog}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ANALYTICS / TRAFFICO SITO
══════════════════════════════════════════════════ */
type VisitRecord = {
  id: string;
  path: string;
  referrer?: string;
  sessionId: string;
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  visitedAt: string;
  eventType?: "pageview" | "cta_click";
  eventLabel?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
};

const PAID_MEDIUMS = new Set(["cpc","ppc","paid","paidsearch","paid-search","display","paidsocial","paid-social","retargeting"]);
function isPaidVisit(r: VisitRecord): boolean {
  return Boolean(r.gclid) || (r.utmMedium ? PAID_MEDIUMS.has(r.utmMedium.toLowerCase()) : false);
}

const DEVICE_LABEL: Record<VisitRecord["device"], string> = { desktop: "Desktop", mobile: "Mobile", tablet: "Tablet" };
const DEVICE_COLOR: Record<VisitRecord["device"], string> = { desktop: "#2E2784", mobile: "#F8AE01", tablet: "#6f5fae" };

function topEntries(counts: Record<string, number>, limit = 8): [string, number][] {
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function AnalyticsPanel() {
  const [log, setLog]         = useState<VisitRecord[]|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string|null>(null);
  const { ask, dialog } = useConfirm();
  const { t, locale } = useAdminI18n();

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
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

  function removeAll() {
    ask({
      title: t.common.confirmDeleteTrafficTitle,
      message: t.common.confirmDeleteTrafficMessage.replace("{count}", String(log?.length ?? 0)),
      confirmLabel: t.common.deleteAll,
      onConfirm: async () => { await fetch("/api/admin/analytics", { method: "DELETE" }); load(); },
    });
  }

  const pageviews = log?.filter(r => (r.eventType ?? "pageview") === "pageview") ?? [];
  const ctaClicks = log?.filter(r => r.eventType === "cta_click") ?? [];

  const now = Date.now();
  const total       = pageviews.length;
  const uniqueVisitors = new Set(pageviews.map(r => r.sessionId)).size;
  const last24h      = pageviews.filter(r => now - new Date(r.visitedAt).getTime() < 86400000).length;
  const last7d        = pageviews.filter(r => now - new Date(r.visitedAt).getTime() < 7 * 86400000).length;

  const byPath: Record<string, number> = {};
  const byReferrer: Record<string, number> = {};
  const byDevice: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 };
  const byBrowser: Record<string, number> = {};
  const byCta: Record<string, number> = {};
  pageviews.forEach(r => {
    byPath[r.path] = (byPath[r.path]||0) + 1;
    const ref = r.referrer ? (() => { try { return new URL(r.referrer!).hostname; } catch { return r.referrer!; } })() : t.common.directTraffic;
    byReferrer[ref] = (byReferrer[ref]||0) + 1;
    byDevice[r.device] = (byDevice[r.device]||0) + 1;
    byBrowser[r.browser] = (byBrowser[r.browser]||0) + 1;
  });
  ctaClicks.forEach(r => {
    const label = r.eventLabel || "(senza etichetta)";
    byCta[label] = (byCta[label]||0) + 1;
  });

  const topCase = topEntries(Object.fromEntries(Object.entries(byPath).filter(([p]) => p.startsWith("/work/"))), 1)[0];
  const topBlog = topEntries(Object.fromEntries(Object.entries(byPath).filter(([p]) => p.startsWith("/blog/"))), 1)[0];

  const recent = pageviews.slice(0, 50);

  return (
    <div>
      <Panel title={t.common.siteTrafficTitle} info={t.common.siteTrafficInfo} rightAction={
        <div style={{ display:"flex",gap:8 }}>
          <Button variant="ghost" icon={RefreshCw} onClick={load}>{t.common.refresh}</Button>
          {total > 0 && <Button variant="danger" icon={Trash2} onClick={removeAll}>{t.common.deleteAll}</Button>}
        </div>
      }>
        {loading && !log && <Loader/>}
        {error && <div style={{ color:"#dc2626",fontSize:13,padding:"12px 0" }}>{t.common.errorPrefix}: {error}</div>}

        {log && (
          <>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:18 }}>
              <MiniStat label="Visite totali" value={String(total)} color="#2E2784"/>
              <MiniStat label="Visitatori unici" value={String(uniqueVisitors)} color="#16a34a"/>
              <MiniStat label="Ultime 24h" value={String(last24h)} color="#F8AE01"/>
              <MiniStat label="Ultimi 7 giorni" value={String(last7d)} color="#6f5fae"/>
              {(["desktop","mobile","tablet"] as const).filter(d => byDevice[d]).map(d => (
                <MiniStat key={d} label={DEVICE_LABEL[d]} value={String(byDevice[d])} color={DEVICE_COLOR[d]}/>
              ))}
              <MiniStat label="CTA cliccate" value={String(ctaClicks.length)} color="#dc2626"/>
            </div>

            {(topCase || topBlog) && (
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10,marginBottom:18 }}>
                {topCase && <div style={{ padding:"12px 16px",borderRadius:14,background:"#F7F7FB",border:"1px solid #F0F0F6" }}>
                  <div style={{ fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:700 }}>Case study più visto</div>
                  <div style={{ fontSize:13,color:"#2E2784",fontWeight:700,marginTop:4 }}>{topCase[0]} <span style={{ color:"#888",fontWeight:500 }}>({topCase[1]} visite)</span></div>
                </div>}
                {topBlog && <div style={{ padding:"12px 16px",borderRadius:14,background:"#F7F7FB",border:"1px solid #F0F0F6" }}>
                  <div style={{ fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:700 }}>Articolo più letto</div>
                  <div style={{ fontSize:13,color:"#2E2784",fontWeight:700,marginTop:4 }}>{topBlog[0]} <span style={{ color:"#888",fontWeight:500 }}>({topBlog[1]} visite)</span></div>
                </div>}
              </div>
            )}

            {total === 0 ? (
              <EmptyState icon={Activity} title={t.common.noVisitsTitle} description={t.common.noVisitsDescription}/>
            ) : (
              <>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,marginBottom:20 }}>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Pagine più viste</div>
                    {topEntries(byPath).map(([path, count]) => (
                      <div key={path} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                        <span style={{ color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{path}</span>
                        <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Provenienza</div>
                    {topEntries(byReferrer).map(([ref, count]) => (
                      <div key={ref} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                        <span style={{ color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{ref}</span>
                        <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Browser</div>
                    {topEntries(byBrowser).map(([browser, count]) => (
                      <div key={browser} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                        <span style={{ color:"#444" }}>{browser}</span>
                        <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>CTA più cliccate</div>
                    {ctaClicks.length === 0 ? (
                      <div style={{ fontSize:12.5,color:"#aaa",padding:"6px 0" }}>Nessun click registrato</div>
                    ) : topEntries(byCta).map(([label, count]) => (
                      <div key={label} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                        <span style={{ color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{label}</span>
                        <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Ultime visite</div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12.5 }}>
                    <thead>
                      <tr style={{ textAlign:"left",color:"#888",textTransform:"uppercase",fontSize:10.5,letterSpacing:"0.04em" }}>
                        <th style={{ padding:"8px 10px" }}>Data</th>
                        <th style={{ padding:"8px 10px" }}>Pagina</th>
                        <th style={{ padding:"8px 10px" }}>Provenienza</th>
                        <th style={{ padding:"8px 10px" }}>Dispositivo</th>
                        <th style={{ padding:"8px 10px" }}>Browser</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map(r => (
                        <tr key={r.id} style={{ borderTop:"1px solid #F0F0F6" }}>
                          <td style={{ padding:"9px 10px",color:"#444",whiteSpace:"nowrap" }}>{new Date(r.visitedAt).toLocaleString(ADMIN_INTL_LOCALE[locale])}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.path}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.referrer ? (() => { try { return new URL(r.referrer).hostname; } catch { return r.referrer; } })() : t.common.directTraffic}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{DEVICE_LABEL[r.device]}</td>
                          <td style={{ padding:"9px 10px",color:"#666" }}>{r.browser}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </Panel>
      {dialog}
      <SemPanel log={log}/>
    </div>
  );
}

function SemPanel({ log }: { log: VisitRecord[]|null }) {
  const { t } = useAdminI18n();
  if (!log) return null;
  const pageviews = log.filter(r => (r.eventType ?? "pageview") === "pageview");
  const paid = pageviews.filter(isPaidVisit);
  const total = paid.length;
  const uniqueSessions = new Set(paid.map(r => r.sessionId)).size;

  const byCampaign: Record<string, number> = {};
  const bySourceMedium: Record<string, number> = {};
  const byLanding: Record<string, number> = {};
  paid.forEach(r => {
    byCampaign[r.utmCampaign || t.common.noCampaign] = (byCampaign[r.utmCampaign || t.common.noCampaign]||0) + 1;
    const sm = `${r.utmSource || t.common.unknown} / ${r.utmMedium || t.common.unknown}`;
    bySourceMedium[sm] = (bySourceMedium[sm]||0) + 1;
    byLanding[r.path] = (byLanding[r.path]||0) + 1;
  });

  return (
    <Panel title={t.common.paidTrafficTitle} info={t.common.paidTrafficInfo}>
      {total === 0 ? (
        <EmptyState icon={TrendingUp} title={t.common.noPaidTrafficTitle} description={t.common.noPaidTrafficDescription}/>
      ) : (
        <>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:18 }}>
            <MiniStat label="Visite a pagamento" value={String(total)} color="#2E2784"/>
            <MiniStat label="Sessioni uniche" value={String(uniqueSessions)} color="#16a34a"/>
            <MiniStat label="% sul totale" value={`${pageviews.length ? Math.round((total/pageviews.length)*100) : 0}%`} color="#F8AE01"/>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16 }}>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Campagne</div>
              {topEntries(byCampaign).map(([c, count]) => (
                <div key={c} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                  <span style={{ color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{c}</span>
                  <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Fonte / Mezzo</div>
              {topEntries(bySourceMedium).map(([sm, count]) => (
                <div key={sm} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                  <span style={{ color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{sm}</span>
                  <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:12,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8 }}>Pagine di atterraggio</div>
              {topEntries(byLanding).map(([p, count]) => (
                <div key={p} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px solid #F0F0F6",fontSize:12.5 }}>
                  <span style={{ color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:10 }}>{p}</span>
                  <span style={{ color:"#2E2784",fontWeight:700 }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Panel>
  );
}

/* ══════════════════════════════════════════════════
   CONTATTI & CANDIDATURE
══════════════════════════════════════════════════ */
type ContactSubmission = {
  id: string; name: string; email: string; company?: string; jobTitle?: string; message: string; submittedAt: string;
  utmSource?: string; utmMedium?: string; utmCampaign?: string; gclid?: string;
};

function leadSource(r: { utmSource?:string; utmMedium?:string; utmCampaign?:string; gclid?:string }, common: Record<string, string>): string {
  if (r.gclid && !r.utmSource) return common.googleAds || "Google Ads";
  if (r.utmSource || r.utmCampaign) return [r.utmSource, r.utmMedium, r.utmCampaign].filter(Boolean).join(" / ");
  return common.organicDirect || "Organic / Direct";
}

function ContactLeadsPanel() {
  const [log, setLog]         = useState<ContactSubmission[]|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string|null>(null);
  const { ask, dialog } = useConfirm();
  const { t, locale } = useAdminI18n();

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/admin/contact", { cache: "no-store" });
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

  function removeOne(id: string) {
    ask({
      title: t.common.confirmDeleteContactTitle,
      message: t.common.confirmDeleteContactMessage,
      confirmLabel: t.common.delete,
      onConfirm: async () => { await fetch(`/api/admin/contact?id=${encodeURIComponent(id)}`, { method: "DELETE" }); load(); },
    });
  }

  function removeAll() {
    ask({
      title: t.common.confirmDeleteAllContactsTitle,
      message: t.common.confirmDeleteAllContactsMessage.replace("{count}", String(log?.length ?? 0)),
      confirmLabel: t.common.deleteAll,
      onConfirm: async () => { await fetch(`/api/admin/contact?id=all`, { method: "DELETE" }); load(); },
    });
  }

  const total = log?.length ?? 0;
  const now = Date.now();
  const last7d = log?.filter(r => now - new Date(r.submittedAt).getTime() < 7 * 86400000).length ?? 0;

  return (
    <div>
      <Panel title={t.common.contactMessagesTitle} info={t.common.contactMessagesInfo} rightAction={
        <div style={{ display:"flex",gap:8 }}>
          <Button variant="ghost" icon={RefreshCw} onClick={load}>{t.common.refresh}</Button>
          {total > 0 && <Button variant="danger" icon={Trash2} onClick={removeAll}>{t.common.deleteAll}</Button>}
        </div>
      }>
        {loading && !log && <Loader/>}
        {error && <div style={{ color:"#dc2626",fontSize:13,padding:"12px 0" }}>{t.common.errorPrefix}: {error}</div>}

        {log && (
          <>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:18 }}>
              <MiniStat label={t.common.totalMessages} value={String(total)} color="#2E2784"/>
              <MiniStat label={t.common.last7days} value={String(last7d)} color="#F8AE01"/>
            </div>

            {total === 0 ? (
              <EmptyState icon={Inbox} title={t.common.noMessagesTitle} description={t.common.noMessagesDescription}/>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12.5 }}>
                  <thead>
                    <tr style={{ textAlign:"left",color:"#888",textTransform:"uppercase",fontSize:10.5,letterSpacing:"0.04em" }}>
                      <th style={{ padding:"8px 10px" }}>Data</th>
                      <th style={{ padding:"8px 10px" }}>Nome</th>
                      <th style={{ padding:"8px 10px" }}>Email</th>
                      <th style={{ padding:"8px 10px" }}>Azienda</th>
                      <th style={{ padding:"8px 10px" }}>Fonte</th>
                      <th style={{ padding:"8px 10px" }}>Messaggio</th>
                      <th style={{ padding:"8px 10px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.map(r => (
                      <tr key={r.id} style={{ borderTop:"1px solid #F0F0F6" }}>
                        <td style={{ padding:"9px 10px",color:"#444",whiteSpace:"nowrap" }}>{new Date(r.submittedAt).toLocaleString(ADMIN_INTL_LOCALE[locale])}</td>
                        <td style={{ padding:"9px 10px",color:"#666" }}>{r.name}</td>
                        <td style={{ padding:"9px 10px",color:"#2E2784",fontWeight:600 }}>{r.email}</td>
                        <td style={{ padding:"9px 10px",color:"#666" }}>{r.company || "—"}{r.jobTitle ? ` · ${r.jobTitle}` : ""}</td>
                        <td style={{ padding:"9px 10px",color:"#666",whiteSpace:"nowrap" }}>{leadSource(r, t.common)}</td>
                        <td style={{ padding:"9px 10px",color:"#666",maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} title={r.message}>{r.message}</td>
                        <td style={{ padding:"9px 10px" }}>
                          <button onClick={() => removeOne(r.id)} title={t.common.delete} aria-label={t.common.deleteMessage}
                            style={{ background:"none",border:"none",color:"#bbb",cursor:"pointer",display:"flex",padding:6,minWidth:28,minHeight:28,alignItems:"center",justifyContent:"center" }}>
                            <Trash2 size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Panel>
      {dialog}
    </div>
  );
}

type JobApplication = {
  id: string; positionId: string; positionRole: string; name: string; email: string; message?: string; submittedAt: string;
  utmSource?: string; utmMedium?: string; utmCampaign?: string; gclid?: string;
};

function ApplicationsPanel() {
  const [log, setLog]         = useState<JobApplication[]|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string|null>(null);
  const { ask, dialog } = useConfirm();
  const { t, locale } = useAdminI18n();

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/admin/applications", { cache: "no-store" });
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

  function removeOne(id: string) {
    ask({
      title: t.common.confirmDeleteApplicationTitle,
      message: t.common.confirmDeleteApplicationMessage,
      confirmLabel: t.common.delete,
      onConfirm: async () => { await fetch(`/api/admin/applications?id=${encodeURIComponent(id)}`, { method: "DELETE" }); load(); },
    });
  }

  function removeAll() {
    ask({
      title: t.common.confirmDeleteAllApplicationsTitle,
      message: t.common.confirmDeleteAllApplicationsMessage.replace("{count}", String(log?.length ?? 0)),
      confirmLabel: t.common.deleteAll,
      onConfirm: async () => { await fetch(`/api/admin/applications?id=all`, { method: "DELETE" }); load(); },
    });
  }

  const total = log?.length ?? 0;
  const byPosition: Record<string, number> = {};
  log?.forEach(r => { byPosition[r.positionRole] = (byPosition[r.positionRole]||0) + 1; });

  return (
    <div>
      <Panel title={t.common.applicationsTitle} info={t.common.applicationsInfo} rightAction={
        <div style={{ display:"flex",gap:8 }}>
          <Button variant="ghost" icon={RefreshCw} onClick={load}>{t.common.refresh}</Button>
          {total > 0 && <Button variant="danger" icon={Trash2} onClick={removeAll}>{t.common.deleteAll}</Button>}
        </div>
      }>
        {loading && !log && <Loader/>}
        {error && <div style={{ color:"#dc2626",fontSize:13,padding:"12px 0" }}>{t.common.errorPrefix}: {error}</div>}

        {log && (
          <>
            {total > 0 && (
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10,marginBottom:18 }}>
                <MiniStat label={t.common.totalApplications} value={String(total)} color="#2E2784"/>
                {topEntries(byPosition, 5).map(([role, count]) => (
                  <MiniStat key={role} label={role} value={String(count)} color="#F8AE01"/>
                ))}
              </div>
            )}

            {total === 0 ? (
              <EmptyState icon={Award} title={t.common.noApplicationsTitle} description={t.common.noApplicationsDescription}/>
            ) : (
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12.5 }}>
                  <thead>
                    <tr style={{ textAlign:"left",color:"#888",textTransform:"uppercase",fontSize:10.5,letterSpacing:"0.04em" }}>
                      <th style={{ padding:"8px 10px" }}>Data</th>
                      <th style={{ padding:"8px 10px" }}>Posizione</th>
                      <th style={{ padding:"8px 10px" }}>Nome</th>
                      <th style={{ padding:"8px 10px" }}>Email</th>
                      <th style={{ padding:"8px 10px" }}>Fonte</th>
                      <th style={{ padding:"8px 10px" }}>Messaggio</th>
                      <th style={{ padding:"8px 10px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.map(r => (
                      <tr key={r.id} style={{ borderTop:"1px solid #F0F0F6" }}>
                        <td style={{ padding:"9px 10px",color:"#444",whiteSpace:"nowrap" }}>{new Date(r.submittedAt).toLocaleString(ADMIN_INTL_LOCALE[locale])}</td>
                        <td style={{ padding:"9px 10px",color:"#666" }}>{r.positionRole}</td>
                        <td style={{ padding:"9px 10px",color:"#666" }}>{r.name}</td>
                        <td style={{ padding:"9px 10px",color:"#2E2784",fontWeight:600 }}>{r.email}</td>
                        <td style={{ padding:"9px 10px",color:"#666",whiteSpace:"nowrap" }}>{leadSource(r, t.common)}</td>
                        <td style={{ padding:"9px 10px",color:"#666",maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} title={r.message}>{r.message || t.common.noData}</td>
                        <td style={{ padding:"9px 10px" }}>
                          <button onClick={() => removeOne(r.id)} title={t.common.delete} aria-label={t.common.deleteApplication}
                            style={{ background:"none",border:"none",color:"#bbb",cursor:"pointer",display:"flex",padding:6,minWidth:28,minHeight:28,alignItems:"center",justifyContent:"center" }}>
                            <Trash2 size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Panel>
      {dialog}
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
  const { t } = useAdminI18n();
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
    setUploadMsg(t.common.uploadSummary.replace("{ok}", String(ok)).replace("{fail}", String(fail)));
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

  const { ask, dialog } = useConfirm();

  async function remove(id: string) {
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.status === 409) {
      const json = await res.json();
      ask({
        title: t.media.inUseTitle,
        message: `${json.message} ${t.media.inUseSuffix}`,
        confirmLabel: t.media.deleteAnyway,
        onConfirm: async () => { await fetch(`/api/admin/media/${id}?force=true`, { method: "DELETE" }); setEditing(null); load(query, typeFilter); },
      });
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
      <Panel title={t.media.title.replace("{count}", String(total))} info={t.media.info} rightAction={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {uploadMsg && <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>{uploadMsg}</span>}
          <input ref={fileInputRef} type="file" multiple style={{ display: "none" }}
            onChange={e => { handleUpload(e.target.files); e.target.value = ""; }} />
          <Button icon={Upload} disabled={uploading} onClick={() => fileInputRef.current?.click()}>{uploading ? t.media.uploading : t.media.uploadFile}</Button>
        </div>
      }>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.media.searchPlaceholder}
              style={{ width: "100%", boxSizing: "border-box", padding: "9px 12px 9px 34px", border: "1.5px solid #E8E8F0", borderRadius: 9, fontSize: 13, background: "#FAFAFA", outline: "none" }} />
          </div>
          <FieldSelect value={typeFilter} onChange={setTypeFilter} options={["all", "image", "video", "application"]} />
        </div>

        {loading && !items && <Loader />}

        {items && items.length === 0 && (
          query || typeFilter !== "all" ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "#999", fontSize: 13 }}>
              {t.media.noResults}
            </div>
          ) : (
            <EmptyState icon={Images} title={t.media.emptyTitle}
              description={t.media.emptyDesc}
              actionLabel={t.media.uploadFile} onAction={() => fileInputRef.current?.click()}/>
          )
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
                <Button variant="secondary" onClick={() => setVisible(v => v + MEDIA_PAGE_SIZE)}>{t.media.loadMore.replace("{remaining}", String(items.length - visible))}</Button>
              </div>
            )}
          </>
        )}
      </Panel>
      {dialog}

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
  const { t } = useAdminI18n();
  const [form, setForm] = useState(item);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const replaceRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{t.media.editAsset}</div>
        <button onClick={onCancel} aria-label={t.common.close} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", padding: 6, minWidth: 30, minHeight: 30 }}><X size={18} /></button>
      </div>

      <MediaThumb item={item} size={140} />

      <div style={{ marginTop: 14 }}>
        <Field label={t.media.assetTitle}><Input value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} /></Field>
      </div>
      <div style={{ marginTop: 10 }}>
        <Field label={t.media.altText}><Input value={form.alt} onChange={v => setForm(p => ({ ...p, alt: v }))} /></Field>
      </div>
      <div style={{ marginTop: 10 }}>
        <Field label={t.media.caption}><Input value={form.caption} onChange={v => setForm(p => ({ ...p, caption: v }))} /></Field>
      </div>
      <div style={{ marginTop: 10 }}>
        <Field label={t.media.description}><Textarea value={form.description} onChange={v => setForm(p => ({ ...p, description: v }))} rows={3} /></Field>
      </div>

      <div style={{ marginTop: 14, padding: "10px 12px", background: "#FAFAFC", borderRadius: 10, fontSize: 11.5, color: "#888" }}>
        <div>{t.media.file}: {item.filename}</div>
        <div>{t.media.type}: {item.mimeType} · {t.media.weight}: {formatBytes(item.filesize)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <code style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.url}</code>
          <button onClick={() => onCopyUrl(item.url)} aria-label={t.media.copyUrl} title={t.media.copyUrl}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#2E2784", display: "flex", padding: 6, minWidth: 28, minHeight: 28, alignItems: "center", justifyContent: "center" }}>
            <Copy size={13} />
          </button>
        </div>
      </div>

      <input ref={replaceRef} type="file" style={{ display: "none" }} onChange={e => setReplaceFile(e.target.files?.[0] || null)} />
      <button onClick={() => replaceRef.current?.click()}
        style={{ marginTop: 12, width: "100%", padding: "9px 12px", background: "#F5F5FA", color: "#555", border: "1px dashed #ddd", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
        {replaceFile ? t.media.replaceWith.replace("{name}", replaceFile.name) : t.media.replaceFile}
      </button>

      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        <Button variant="danger" icon={Trash2} onClick={() => onDelete(item.id)}>Elimina</Button>
        <div style={{ flex: 1 }} />
        <Button variant="secondary" onClick={onCancel}>Annulla</Button>
        <Button icon={Save} onClick={() => onSave(form, replaceFile || undefined)}>Salva</Button>
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
const STATS_HINTS: Record<string,string> = {
  campaigns:"Numero totale di campagne realizzate, es. \"120+\"",
  retailers:"Numero di catene/retailer con cui si è collaborato, es. \"35\"",
  countries:"Numero di paesi in cui KLR ha operato, es. \"12\"",
  years:"Anni di attività dell'azienda, es. \"15\"",
  combinedExperience:"Somma degli anni di esperienza di tutto il team, es. \"80+\"",
  people:"Numero di persone che compongono il team, es. \"25\"",
  nationalities:"Numero di nazionalità rappresentate nel team, es. \"8\"",
};

function StatsEditor({ data, onSave }: { data:Record<string,string>|null; onSave:(d:Record<string,string>)=>void }) {
  const [form,setForm] = useState<Record<string,string>>({});
  const { t } = useAdminI18n();
  useEffect(() => { if (data) setForm(data); },[data]);
  if (!data) return <Loader/>;
  return (
    <Panel title={t.stats.title} info={t.stats.info}>
      <Grid>
        {Object.keys(STATS_LABELS).map((key) => {
          const hint = t.stats[`${key}Hint`] ?? STATS_HINTS[key];
          return (
            <Field key={key} label={t.stats[key] ?? STATS_LABELS[key]} hint={hint}>
              <Input value={form[key]||""} onChange={v=>setForm(p=>({...p,[key]:v}))} placeholder={hint?.match(/"([^"]+)"/)?.[1] ?? ""}/>
            </Field>
          );
        })}
      </Grid>
      <FooterBar><Button icon={Save} onClick={() => onSave(form)}>{t.common.save}</Button></FooterBar>
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
    <Panel title="Ordine Sezioni" info="Trascina per riordinare le sezioni della pagina, o nascondile temporaneamente senza eliminarne il contenuto.">
      <div style={{ display:"grid", gap:8 }}>
        {order.map((key, idx) => (
          <div key={key} style={{ display:"flex", alignItems:"center", gap:10, background:"#F8F8FC", borderRadius:10, padding:"8px 12px" }}>
            <span style={{ flex:1, fontSize:13, fontWeight:600, color:"#333" }}>{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}</span>
            <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} aria-label="Sposta su"
              style={{ width:32,height:32,border:"none",borderRadius:7,cursor:idx===0?"not-allowed":"pointer",background:idx===0?"#eee":"#2E2784",color:idx===0?"#aaa":"#fff",fontSize:13 }}>↑</button>
            <button type="button" onClick={() => move(idx, 1)} disabled={idx === order.length - 1} aria-label="Sposta giù"
              style={{ width:32,height:32,border:"none",borderRadius:7,cursor:idx===order.length-1?"not-allowed":"pointer",background:idx===order.length-1?"#eee":"#2E2784",color:idx===order.length-1?"#aaa":"#fff",fontSize:13 }}>↓</button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function PagesEditor({ data, onSave }: { data:PagesDataLocal|null; onSave:(d:unknown)=>void }) {
  const [form,       setForm]       = useState<PagesDataLocal>({});
  const [activePage, setActivePage] = useState<PageKey>("site");
  const { t } = useAdminI18n();
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
      <div style={{ width:155,flexShrink:0,background:"#fff",borderRadius:14,padding:8,boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ padding:"6px 10px 8px",fontSize:10,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:"0.06em" }}>{t.common.choosePage}</div>
        {PAGE_TABS.map(tab => {
          const active = activePage === tab.id;
          return (
            <button key={tab.id} onClick={() => setActivePage(tab.id)} aria-current={active}
              style={{ display:"flex",alignItems:"center",gap:7,width:"100%",padding:"9px 10px",marginBottom:2,background:active?"#2E2784":"transparent",color:active?"#fff":"#555",border:"none",borderRadius:9,fontSize:12,fontWeight:active?600:400,cursor:"pointer",textAlign:"left",transition:"all 0.15s" }}>
              <tab.icon size={12}/>{t.pageTab[tab.id] ?? tab.label}
            </button>
          );
        })}
      </div>

      {/* Fields */}
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4 }}>
          <h2 style={{ margin:0,fontSize:15,fontWeight:700,color:"#111" }}>{t.pageSection[activePage] ?? PAGE_SECTION_LABELS[activePage]}</h2>
          <Button icon={Save} onClick={() => onSave(form)}>{t.common.save}</Button>
        </div>
        <p style={{ margin:"0 0 16px",fontSize:12,color:"#999" }}>{t.common.sectionVisibilityHint}</p>

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
            <Panel title={t.common.general} info={t.common.generalInfo}>
              <Grid>
                {topStrings.map(([fieldKey, fieldVal]) => renderField(
                  fieldKey, String(fieldVal),
                  v => updateTop(activePage, fieldKey, v),
                  t.fieldLabel
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
                  {isVisible ? t.common.visible : t.common.hidden}
                </button>
              }
            >
              {!isVisible && (
                <div style={{ padding:"10px 14px",background:"rgba(220,38,38,0.06)",borderRadius:8,fontSize:12,color:"#dc2626",marginBottom:12 }}>
                  {t.common.sectionHidden}
                </div>
              )}
              <Grid>
                {Object.entries(obj).map(([fk, fv]) => {
                  if (fk === "_visible") return null;
                  if (Array.isArray(fv)) return null;
                  if (typeof fv === "object") return null;
                  return renderField(fk, String(fv ?? ""), v => update(activePage, sectionKey, fk, v), t.fieldLabel);
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
                        })), t.fieldLabel);
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

function renderField(fieldKey: string, value: string, onChange: (v: string) => void, fieldLabels: Record<string,string> = FIELD_LABELS) {
  const label   = fieldLabels[fieldKey] || FIELD_LABELS[fieldKey] || fieldKey;
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
      <Panel title="Bottone CTA Navbar" info="Il pulsante di call-to-action mostrato in alto a destra nella navbar del sito su ogni pagina.">
        <Grid>
          <Field label="Testo CTA"><Input value={ctaLabel} onChange={onChangeCtaLabel}/></Field>
          <Field label="Link CTA"><Input value={ctaHref} onChange={onChangeCtaHref}/></Field>
        </Grid>
      </Panel>
      <Panel title="Link Navigazione" info="I link del menu principale del sito, nell'ordine in cui appaiono. Ogni link può avere sotto-voci per creare un menu a tendina.">
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
              <button type="button" onClick={() => removeLink(i)} aria-label="Rimuovi link"
                style={{ padding:"6px",minWidth:28,minHeight:28,background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer",flexShrink:0 }}>
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
                <button type="button" onClick={() => removeSub(i, j)} aria-label="Rimuovi sotto-voce"
                  style={{ padding:"6px",minWidth:28,minHeight:28,background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer",flexShrink:0 }}>
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
        {links.length === 0 && (
          <div style={{ marginBottom:10 }}>
            <Callout variant="info">Nessun link in navbar: il menu del sito apparirà vuoto finché non aggiungi almeno una voce.</Callout>
          </div>
        )}
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
    <Panel title={title} info={hint}>
      {links.length === 0 && (
        <div style={{ marginBottom:10 }}>
          <Callout variant="info">Nessun link in questa colonna del footer: resterà vuota finché non ne aggiungi almeno una.</Callout>
        </div>
      )}
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
          <button type="button" onClick={() => remove(i)} aria-label="Rimuovi link"
            style={{ padding:"6px",minWidth:28,minHeight:28,background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer",flexShrink:0 }}>
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
type FieldDef = { key:string; label:string; type:string; options?:string[]; checkboxLabel?:string };

function translateFields(fields: FieldDef[], dict: Record<string,string>): FieldDef[] {
  return fields.map(f => ({
    ...f,
    label: dict[f.key] ?? f.label,
    checkboxLabel: f.checkboxLabel ? (dict[`${f.key}Checkbox`] ?? f.checkboxLabel) : undefined,
  }));
}
const SECTOR_OPTIONS = ["retail", "petrol"];
const SECTOR_LABELS: Record<string,string> = { retail: "Grocery", petrol: "Fuel" };

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
  {key:"year",label:"Anno",type:"text"},{key:"location",label:"Paese",type:"text"},
  {key:"img",label:"Immagine (URL)",type:"url"},
  {key:"summary",label:"Sommario",type:"textarea"},
  {key:"publishedAt",label:"Data pubblicazione (YYYY-MM-DD)",type:"text"},
  {key:"authorName",label:"Autore",type:"text"},{key:"authorAvatar",label:"Avatar autore (URL)",type:"url"},
  {key:"focusKeyword",label:"Parola chiave SEO (focus keyword)",type:"text"},
  {key:"status",label:"Stato",type:"select",options:["published","draft"]},
  {key:"publicPreview",label:"Anteprima pubblica",type:"checkbox",checkboxLabel:"Consenti anteprima senza login (link condivisibile per revisione bozza)"},
  {key:"cornerstone",label:"Contenuto cornerstone",type:"checkbox",checkboxLabel:"Segna come contenuto cornerstone (più importante per la SEO)"},
];
const POST_FIELDS:     FieldDef[] = [
  {key:"slug",label:"Slug (URL)",type:"text"},{key:"title",label:"Titolo",type:"text"},
  {key:"date",label:"Data (YYYY-MM-DD)",type:"text"},{key:"category",label:"Categoria",type:"text"},
  {key:"img",label:"Immagine (URL)",type:"url"},{key:"excerpt",label:"Estratto",type:"textarea"},
  {key:"authorName",label:"Autore",type:"text"},{key:"authorAvatar",label:"Avatar autore (URL)",type:"url"},
  {key:"focusKeyword",label:"Parola chiave SEO (focus keyword)",type:"text"},
  {key:"status",label:"Stato",type:"select",options:["published","draft"]},
  {key:"publicPreview",label:"Anteprima pubblica",type:"checkbox",checkboxLabel:"Consenti anteprima senza login (link condivisibile per revisione bozza)"},
  {key:"cornerstone",label:"Contenuto cornerstone",type:"checkbox",checkboxLabel:"Segna come contenuto cornerstone (più importante per la SEO)"},
  {key:"contentHtml",label:"Contenuto Articolo",type:"richtext"},
];
const USER_FIELDS:     FieldDef[] = [
  {key:"id",label:"Username / ID",type:"text"},{key:"name",label:"Nome Completo",type:"text"},
  {key:"email",label:"Email",type:"email"},
  {key:"avatar",label:"Foto Profilo (URL)",type:"url"},
  {key:"password",label:"Password (lascia vuoto per non cambiare)",type:"password"},
  {key:"role",label:"Ruolo",type:"select",options:["superadmin","admin","editor"]},
];
const POSITION_FIELDS: FieldDef[] = [
  {key:"id",label:"ID",type:"text"},{key:"role",label:"Ruolo",type:"text"},
  {key:"loc",label:"Sede",type:"text"},{key:"description",label:"Descrizione",type:"textarea"},
];

function BrandsEditor    ({ data, onSave }: { data:BrandItem[]|null;    onSave:(d:BrandItem[])=>void })    { const { t } = useAdminI18n(); return <ListEditor<BrandItem>    title={t.entityName.brand}  data={data} fields={translateFields(BRAND_FIELDS, t.itemField.brand)}    nameKey="name"  imgKey="img" onSave={onSave} blank={{id:"",name:"",tag:"",img:"",since:"",campaigns:"",countries:"",desc:""}}/>; }
function UsersEditor     ({ data, onSave }: { data:UserItem[]|null;     onSave:(d:UserItem[])=>void })     { const { t } = useAdminI18n(); return <ListEditor<UserItem>     title={t.entityName.user}   data={data} fields={translateFields(USER_FIELDS, t.itemField.user)}     nameKey="name"  imgKey="avatar" avatarFallback onSave={onSave} blank={{id:"",name:"",email:"",avatar:"",password:"",role:"editor"}}/>; }
function LeadershipEditor({ data, onSave }: { data:LeaderItem[]|null;   onSave:(d:LeaderItem[])=>void })   { const { t } = useAdminI18n(); return <ListEditor<LeaderItem>   title={t.entityName.leader} data={data} fields={translateFields(LEADER_FIELDS, t.itemField.leader)}   nameKey="name"  imgKey="img" onSave={onSave} blank={{id:"",name:"",role:"",img:"",bio:"",quote:""}}/>; }
const STUDY_BLANK_DETAILS: StudyDetails = { sourceUrl:"",campaignTitle:"",challenge:"",rewardGroups:[],activations:[],mechanics:[],gallery:[],social:[],videos:[] };
function StudiesEditor   ({ data, brands, users, currentUser, onSave }: { data:StudyItem[]|null; brands:BrandItem[]|null; users:UserItem[]|null; currentUser:AdminUser; onSave:(d:StudyItem[])=>void })    {
  const { t } = useAdminI18n();
  const sd = t.studyDetail;
  const sectorOptions = Array.from(new Set([...SECTOR_OPTIONS, ...(data ?? []).map(s => s.cat).filter(Boolean)]));
  const brandOptions = Array.from(new Set([
    ...(brands ?? []).map(b => b.name),
    ...(data ?? []).map(s => s.brand),
  ].filter(Boolean)));
  const author = users?.find(u => u.id === currentUser.id || u.email === currentUser.email);
  return <ListEditor<StudyItem>
    title={t.entityName.study} data={data} fields={translateFields(STUDY_FIELDS, t.itemField.study)} nameKey="title" imgKey="img" onSave={onSave}
    withStatusTabs dateKey="year" previewUrl={s => `/work/${s.id}?preview=1`}
    seoInput={s => ({
      title: s.title, description: s.summary, slug: s.id, hasImage: Boolean(s.img), focusKeyword: s.focusKeyword,
      contentHtml: [
        s.details?.campaignTitle, s.details?.challenge,
        ...(s.details?.rewardGroups ?? []).flatMap(g => [g.title, g.subtitle, ...(g.items ?? [])]),
        ...(s.details?.activations ?? []), ...(s.details?.mechanics ?? []),
      ].filter(Boolean).map(txt => `<p>${txt}</p>`).join(""),
    })}
    optionsMap={{ cat: sectorOptions, brand: brandOptions }}
    blank={{id:"",title:"",client:"",year:String(new Date().getFullYear()),location:"",img:"",summary:"",cat:"retail",brand:"",results:[],details:STUDY_BLANK_DETAILS,status:"published",publicPreview:false,cornerstone:false,authorName:author?.name ?? currentUser.name,authorAvatar:author?.avatar ?? "",publishedAt:new Date().toISOString().slice(0,10)}}
    extra={(form, setForm) => {
      const results: StudyResult[] = form.results ?? [];
      const details: StudyDetails  = { ...STUDY_BLANK_DETAILS, ...(form.details ?? {}) };
      const setDetails = (patch: Partial<StudyDetails>) => setForm((p:any) => ({ ...p, details: { ...details, ...patch } }));
      return (
        <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
          <CategoryFields
            key={form.id || "new"}
            cat={form.cat || ""} brand={form.brand || ""}
            sectorOptions={sectorOptions} brandOptions={brandOptions}
            onChangeCat={v => setForm((p:any) => ({...p, cat:v}))}
            onChangeBrand={v => setForm((p:any) => ({...p, brand:v}))}
          />
          <div style={{ display:"flex",flexDirection:"column",gap:18,paddingTop:18,borderTop:"1px solid #f0f0f6" }}>
          <div style={{ fontSize:11,fontWeight:700,color:"#2E2784",textTransform:"uppercase",letterSpacing:"0.07em" }}>{sd.title}</div>
          <Grid>
            <KVListField label={sd.results} value={results} kLabel={sd.resultsK} vLabel={sd.resultsV} onChange={v => setForm((p:any) => ({...p, results: v}))}/>
            <Field label={sd.campaignTitle}><Input value={details.campaignTitle} onChange={v => setDetails({campaignTitle:v})}/></Field>
            <Field label={sd.challenge} full><Textarea rows={3} value={details.challenge} onChange={v => setDetails({challenge:v})}/></Field>
            <StringListField label={sd.activations} value={details.activations} onChange={v => setDetails({activations:v})} placeholder={sd.activationPlaceholder}/>
            <StringListField label={sd.mechanics} value={details.mechanics} onChange={v => setDetails({mechanics:v})} placeholder={sd.mechanicPlaceholder}/>
            <RewardGroupsField label={sd.rewardGroups} value={details.rewardGroups} onChange={v => setDetails({rewardGroups:v})}/>
            <StringListField label={sd.gallery} value={details.gallery} onChange={v => setDetails({gallery:v})} image/>
            <StringListField label={sd.social} value={details.social} onChange={v => setDetails({social:v})} placeholder={sd.socialPlaceholder}/>
            <StringListField label={sd.videos} value={details.videos} onChange={v => setDetails({videos:v})} placeholder={sd.videoPlaceholder}/>
          </Grid>
          </div>
          <SeoScorePanel title={form.title||""} description={form.summary||""} contentHtml={`${details.challenge||""} ${(details.activations||[]).join(" ")} ${(details.mechanics||[]).join(" ")}`} slug={form.id||""} hasImage={Boolean(form.img)}
            focusKeyword={form.focusKeyword||""} onChangeFocusKeyword={v => setForm((p:any) => ({...p, focusKeyword:v}))} urlPrefix="work/"/>
        </div>
      );
    }}
  />;
}
function PostsEditor     ({ data, users, currentUser, onSave }: { data:PostItem[]|null; users:UserItem[]|null; currentUser:AdminUser; onSave:(d:PostItem[])=>void })     {
  const { t } = useAdminI18n();
  const author = users?.find(u => u.id === currentUser.id || u.email === currentUser.email);
  return <ListEditor<PostItem>     title={t.entityName.post} data={data} fields={translateFields(POST_FIELDS, t.itemField.post)}     nameKey="title" imgKey="img" onSave={onSave} withStatusTabs dateKey="date" previewUrl={p => `/blog/${p.slug}?preview=1`}
    seoInput={p => ({ title:p.title, description:p.excerpt, slug:p.slug, hasImage:Boolean(p.img), contentHtml:p.contentHtml||"", focusKeyword:p.focusKeyword })}
    blank={{id:Date.now(),slug:"",title:"",date:new Date().toISOString().slice(0,10),excerpt:"",img:"",category:"Loyalty Marketing",status:"draft",publicPreview:false,cornerstone:false,authorName:author?.name ?? currentUser.name,authorAvatar:author?.avatar ?? ""}}
  extra={(form, setForm) => <SeoScorePanel title={form.title||""} description={form.excerpt||""} contentHtml={form.contentHtml||""} slug={form.slug||""} hasImage={Boolean(form.img)}
    focusKeyword={form.focusKeyword||""} onChangeFocusKeyword={v => setForm((p:any) => ({...p, focusKeyword:v}))} urlPrefix="blog/"/>}
/>; }
function PositionsEditor ({ data, onSave }: { data:PositionItem[]|null; onSave:(d:PositionItem[])=>void }) { const { t } = useAdminI18n(); return <ListEditor<PositionItem> title={t.entityName.position} data={data} fields={translateFields(POSITION_FIELDS, t.itemField.position)} nameKey="role"  imgKey=""    onSave={onSave} blank={{id:String(Date.now()),role:"",loc:"",description:""}}/>; }

/* ══════════════════════════════════════════════════
   CUSTOM PAGES EDITOR
══════════════════════════════════════════════════ */
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function CustomPagesEditor({ data, onSave }: { data:CustomPageItem[]|null; onSave:(d:CustomPageItem[])=>void }) {
  const [items,   setItems]   = useState<CustomPageItem[]>([]);
  const [editing, setEditing] = useState<number|null>(null);
  const [form,    setForm]    = useState<Omit<CustomPageItem,"id">>({ slug:"", title:"", description:"", blocks:[] });
  const { ask, dialog } = useConfirm();

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
    ask({
      title: `Eliminare "${items[i].title}"?`,
      message: `La pagina /${items[i].slug} non sarà più raggiungibile e il contenuto andrà perso. L'azione non è reversibile.`,
      confirmLabel: "Elimina",
      onConfirm: () => { const updated = items.filter((_, idx) => idx !== i); setItems(updated); onSave(updated); },
    });
  }
  const titleMissing = editing !== null && !form.title.trim();
  const slugInvalid = editing !== null && !!form.slug && !SLUG_PATTERN.test(form.slug);
  const canSave = editing !== null && !titleMissing && !!form.slug && !slugInvalid;
  function commit() {
    if (!canSave) return;
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
              <button onClick={() => setEditing(null)} aria-label="Chiudi" style={{ background:"none",border:"none",cursor:"pointer",color:"#999" }}><X size={18}/></button>
            </div>
            <Grid>
              <Field label="Titolo Pagina" required error={titleMissing ? "Campo obbligatorio" : undefined}>
                <Input value={form.title} onChange={v => setForm(p => ({...p,title:v}))} placeholder="Es. Chi Siamo"/>
              </Field>
              <Field label="Slug URL" required hint="Solo lettere minuscole, numeri e trattini: definisce l'indirizzo della pagina."
                error={slugInvalid ? "Usa solo lettere minuscole, numeri e trattini (es. chi-siamo)" : undefined}>
                <Input value={form.slug} onChange={v => setForm(p => ({...p,slug:v.toLowerCase().replace(/\s+/g,"-")}))} placeholder="chi-siamo"/>
              </Field>
              <Field label="Descrizione (SEO)" full hint="Mostrata nei risultati dei motori di ricerca sotto il titolo.">
                <Textarea value={form.description||""} onChange={v => setForm(p => ({...p,description:v}))} rows={2} placeholder="Breve descrizione della pagina per Google…"/>
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
                    <button type="button" onClick={() => removeBlock(i)} aria-label="Rimuovi blocco"
                      style={{ padding:"5px",minWidth:28,minHeight:28,background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:7,cursor:"pointer" }}>
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
                <Button icon={Plus} onClick={() => addBlock("text")}>Testo</Button>
                <Button icon={Plus} onClick={() => addBlock("image")}>Immagine</Button>
                <Button variant="secondary" icon={Plus} onClick={() => addBlock("cta")}>CTA</Button>
              </div>
              {form.blocks.length === 0 && (
                <div style={{ marginTop:10 }}>
                  <Callout variant="info">La pagina non ha ancora contenuto: aggiungi almeno un blocco Testo, Immagine o CTA con i pulsanti sopra prima di salvare.</Callout>
                </div>
              )}
            </div>

            <div style={{ display:"flex",gap:10,marginTop:20 }}>
              <Button icon={Save} onClick={commit} disabled={!canSave}>Salva</Button>
              <Button variant="secondary" onClick={() => setEditing(null)}>Annulla</Button>
            </div>
            {form.slug && !slugInvalid && (
              <div style={{ marginTop:12,fontSize:11,color:"#888" }}>
                La pagina sarà disponibile su: <strong>/{form.slug}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState icon={FileCode} title="Nessuna pagina custom ancora"
          description="Crea pagine aggiuntive con URL personalizzato, senza scrivere codice, componendo blocchi di testo, immagini e pulsanti CTA — utile per landing page o promo."
          actionLabel="Nuova Pagina Custom" onAction={openNew}/>
      ) : (
        <>
          <div style={{ display:"grid",gap:10,marginBottom:16 }}>
            {items.map((item, idx) => (
              <div key={item.id} style={{ background:"#fff",borderRadius:14,padding:"14px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontWeight:600,color:"#111",fontSize:14 }}>{item.title}</div>
                  <div style={{ color:"#aaa",fontSize:11,marginTop:2 }}>/{item.slug} · {item.blocks.length} blocchi</div>
                </div>
                <div style={{ display:"flex",gap:8 }}>
                  <Button variant="secondary" onClick={() => openEdit(idx)}>Modifica</Button>
                  <Button variant="danger" icon={Trash2} onClick={() => del(idx)}>Elimina</Button>
                </div>
              </div>
            ))}
          </div>
          <Button icon={Plus} onClick={openNew}>Nuova Pagina Custom</Button>
        </>
      )}
      {dialog}
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
/* ══════════════════════════════════════════════════
   SEO / GEO / AIO — VALUTAZIONE IN TEMPO REALE
══════════════════════════════════════════════════ */
function scoreColor(score: number): string {
  return TRAFFIC_LIGHT_COLOR[trafficLight(score)];
}

function TrafficLightBall({ label, score }: { label: string; score: number }) {
  const tl = trafficLight(score);
  const color = TRAFFIC_LIGHT_COLOR[tl];
  return (
    <div style={{ flex:1,minWidth:110,display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:14,background:"#F7F7FB",border:`1px solid ${color}22` }}>
      <span style={{ width:16,height:16,borderRadius:"50%",background:color,flexShrink:0,boxShadow:`0 0 0 3px ${color}22` }}/>
      <div>
        <div style={{ fontSize:11.5,fontWeight:800,color }}>{TRAFFIC_LIGHT_LABEL[tl]}</div>
        <div style={{ fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:700 }}>{label} · {score}/100</div>
      </div>
    </div>
  );
}

// Legacy alias kept for the site-wide monitor table's numeric gauges.
function ScoreGauge({ label, score }: { label: string; score: number }) {
  return (
    <div style={{ flex:1,minWidth:100,textAlign:"center",padding:"10px 8px",borderRadius:14,background:"#F7F7FB",border:`1px solid ${scoreColor(score)}22` }}>
      <div style={{ fontSize:22,fontWeight:800,color:scoreColor(score) }}>{score}</div>
      <div style={{ fontSize:10.5,color:"#888",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:700,marginTop:2 }}>{label}</div>
    </div>
  );
}

function SnippetPreview({ title, description, path }: { title:string; description:string; path:string }) {
  const displayTitle = title.length > 60 ? title.slice(0, 57) + "…" : (title || "Titolo della pagina");
  const displayDesc  = description.length > 155 ? description.slice(0, 152) + "…" : (description || "La meta descrizione apparirà qui.");
  return (
    <div style={{ padding:"14px 16px",borderRadius:12,background:"#fff",border:"1px solid #e5e5ef" }}>
      <div style={{ fontSize:10.5,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8 }}>Anteprima Google</div>
      <div style={{ fontFamily:"arial,sans-serif" }}>
        <div style={{ fontSize:13,color:"#202124" }}>klr-europe.com{path ? ` › ${path}` : ""}</div>
        <div style={{ fontSize:18,color:"#1a0dab",lineHeight:1.3,marginTop:2 }}>{displayTitle}</div>
        <div style={{ fontSize:13,color:"#4d5156",lineHeight:1.4,marginTop:3 }}>{displayDesc}</div>
      </div>
    </div>
  );
}

function SeoScorePanel({ title, description, contentHtml, slug, hasImage, focusKeyword, onChangeFocusKeyword, urlPrefix }: {
  title: string; description: string; contentHtml: string; slug: string; hasImage: boolean;
  focusKeyword?: string; onChangeFocusKeyword?: (v:string) => void; urlPrefix?: string;
}) {
  const analysis = analyzeContent({ title, description, contentHtml, slug, hasImage, focusKeyword });
  const groupLabel: Record<ContentCheck["group"], string> = { seo: "SEO", sem: "SEM", geo: "GEO (AI generative)", aio: "AIO (AI Overview)" };

  return (
    <div style={{ display:"flex",flexDirection:"column",gap:14,paddingTop:18,borderTop:"1px solid #f0f0f6" }}>
      <div style={{ display:"flex",alignItems:"center",gap:8,fontSize:11,fontWeight:700,color:"#2E2784",textTransform:"uppercase",letterSpacing:"0.07em" }}>
        <Sparkles size={13}/> Valutazione SEO · SEM · GEO · AIO in tempo reale
      </div>

      {onChangeFocusKeyword && (
        <Field label="Parola chiave principale (focus keyword)" hint="Come nel plugin Yoast: inserisci la parola chiave per cui vuoi posizionarti, i controlli sotto si aggiornano di conseguenza.">
          <Input value={focusKeyword||""} onChange={onChangeFocusKeyword} placeholder="es. loyalty marketing retail"/>
        </Field>
      )}

      <SnippetPreview title={title} description={description} path={`${urlPrefix||""}${slug}`}/>

      <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
        <TrafficLightBall label="Totale" score={analysis.overallScore}/>
        <TrafficLightBall label="SEO" score={analysis.seoScore}/>
        <TrafficLightBall label="SEM" score={analysis.semScore}/>
        <TrafficLightBall label="GEO" score={analysis.geoScore}/>
        <TrafficLightBall label="AIO" score={analysis.aioScore}/>
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
        {(["seo","sem","geo","aio"] as const).map(group => (
          <div key={group}>
            <div style={{ fontSize:10.5,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:"0.04em",margin:"6px 0 4px" }}>{groupLabel[group]}</div>
            {analysis.checks.filter(c => c.group === group).map(c => (
              <div key={c.label} style={{ display:"flex",alignItems:"flex-start",gap:8,padding:"5px 0",fontSize:12.5 }}>
                {c.passed
                  ? <CheckCircle size={14} color="#16a34a" style={{ flexShrink:0,marginTop:1 }}/>
                  : <AlertTriangle size={14} color="#dc2626" style={{ flexShrink:0,marginTop:1 }}/>}
                <span style={{ color: c.passed ? "#555" : "#333" }}><strong>{c.label}:</strong> {c.message}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeoMonitorPanel({ posts, studies }: { posts: PostItem[]|null; studies: StudyItem[]|null }) {
  if (!posts || !studies) return <Loader/>;

  type Row = { id:string; type:"Articolo"|"Case Study"; title:string; overall:number; seo:number; sem:number; geo:number; aio:number; topIssue?:string };

  const toRow = (id:string, type:Row["type"], title:string, input: AnalyzeInput): Row => {
    const a = analyzeContent(input);
    const firstFail = a.checks.find(c => !c.passed);
    return { id, type, title, overall: a.overallScore, seo: a.seoScore, sem: a.semScore, geo: a.geoScore, aio: a.aioScore, topIssue: firstFail?.message };
  };

  const postRows: Row[] = posts.filter(p => (p.status ?? "published") === "published").map(p =>
    toRow(`post-${p.id}`, "Articolo", p.title, { title: p.title, description: p.excerpt||"", contentHtml: p.contentHtml||"", slug: p.slug||"", hasImage: Boolean(p.img), focusKeyword: p.focusKeyword })
  );
  const studyRows: Row[] = studies.filter(s => (s.status ?? "published") === "published").map(s => {
    const d = s.details;
    const contentHtml = `${d?.challenge||""} ${(d?.activations||[]).join(" ")} ${(d?.mechanics||[]).join(" ")}`;
    return toRow(`study-${s.id}`, "Case Study", s.title, { title: s.title, description: s.summary||"", contentHtml, slug: s.id||"", hasImage: Boolean(s.img), focusKeyword: s.focusKeyword });
  });

  const rows = [...postRows, ...studyRows].sort((a, b) => a.overall - b.overall);
  const avg = (key: "overall"|"seo"|"sem"|"geo"|"aio") => rows.length ? Math.round(rows.reduce((s, r) => s + r[key], 0) / rows.length) : 0;
  const needsWork = rows.filter(r => r.overall < 60);

  return (
    <div>
      <Panel title="SEO · SEM · GEO · AIO — Salute dei Contenuti" info="Punteggio medio di tutti gli articoli e case study pubblicati sul sito: SEO tradizionale, SEM (targeting parola chiave per ricerca/campagne a pagamento), GEO (ottimizzazione per motori generativi come ChatGPT/Perplexity) e AIO (probabilità di comparire nelle AI Overview di Google).">
        {rows.length === 0 ? (
          <EmptyState icon={TrendingUp} title="Nessun contenuto pubblicato" description="Pubblica un articolo o un case study per vedere qui la sua valutazione SEO/SEM/GEO/AIO."/>
        ) : (
          <>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:20 }}>
              <ScoreGauge label="Media Totale" score={avg("overall")}/>
              <ScoreGauge label="SEO" score={avg("seo")}/>
              <ScoreGauge label="SEM" score={avg("sem")}/>
              <ScoreGauge label="GEO" score={avg("geo")}/>
              <ScoreGauge label="AIO" score={avg("aio")}/>
            </div>

            {needsWork.length > 0 && (
              <Callout variant="warning">{needsWork.length} contenuti con punteggio sotto 60 hanno bisogno di essere migliorati (elencati per primi qui sotto).</Callout>
            )}

            <div style={{ overflowX:"auto",marginTop:14 }}>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12.5 }}>
                <thead>
                  <tr style={{ textAlign:"left",color:"#888",textTransform:"uppercase",fontSize:10.5,letterSpacing:"0.04em" }}>
                    <th style={{ padding:"8px 10px" }}>Tipo</th>
                    <th style={{ padding:"8px 10px" }}>Titolo</th>
                    <th style={{ padding:"8px 10px" }}>Totale</th>
                    <th style={{ padding:"8px 10px" }}>SEO</th>
                    <th style={{ padding:"8px 10px" }}>SEM</th>
                    <th style={{ padding:"8px 10px" }}>GEO</th>
                    <th style={{ padding:"8px 10px" }}>AIO</th>
                    <th style={{ padding:"8px 10px" }}>Da migliorare</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.id} style={{ borderTop:"1px solid #F0F0F6" }}>
                      <td style={{ padding:"9px 10px",color:"#888",whiteSpace:"nowrap" }}>{r.type}</td>
                      <td style={{ padding:"9px 10px",color:"#333",fontWeight:600,maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{r.title}</td>
                      <td style={{ padding:"9px 10px",fontWeight:800,color:scoreColor(r.overall) }}>{r.overall}</td>
                      <td style={{ padding:"9px 10px",color:scoreColor(r.seo) }}>{r.seo}</td>
                      <td style={{ padding:"9px 10px",color:scoreColor(r.sem) }}>{r.sem}</td>
                      <td style={{ padding:"9px 10px",color:scoreColor(r.geo) }}>{r.geo}</td>
                      <td style={{ padding:"9px 10px",color:scoreColor(r.aio) }}>{r.aio}</td>
                      <td style={{ padding:"9px 10px",color:"#666",maxWidth:280,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }} title={r.topIssue}>{r.topIssue || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ACCESSIBILITÀ — pagina indipendente, non fa parte di SEO/SEM/GEO/AIO
══════════════════════════════════════════════════ */
function AccessibilityPanel({ posts, studies }: { posts: PostItem[]|null; studies: StudyItem[]|null }) {
  if (!posts || !studies) return <Loader/>;

  type Row = { id:string; type:"Articolo"|"Case Study"; title:string; score:number; checks: { label:string; passed:boolean; message:string }[] };

  const toRow = (id:string, type:Row["type"], title:string, input: AnalyzeInput): Row => {
    const acc = analyzeAccessibility(input);
    return { id, type, title, score: acc.score, checks: acc.checks };
  };

  const postRows: Row[] = posts.filter(p => (p.status ?? "published") === "published").map(p =>
    toRow(`post-${p.id}`, "Articolo", p.title, { title: p.title, description: p.excerpt||"", contentHtml: p.contentHtml||"", slug: p.slug||"", hasImage: Boolean(p.img) })
  );
  const studyRows: Row[] = studies.filter(s => (s.status ?? "published") === "published").map(s => {
    const d = s.details;
    const contentHtml = `${d?.challenge||""} ${(d?.activations||[]).join(" ")} ${(d?.mechanics||[]).join(" ")}`;
    return toRow(`study-${s.id}`, "Case Study", s.title, { title: s.title, description: s.summary||"", contentHtml, slug: s.id||"", hasImage: Boolean(s.img) });
  });

  const rows = [...postRows, ...studyRows].sort((a, b) => a.score - b.score);
  const avgScore = rows.length ? Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length) : 0;
  const needsWork = rows.filter(r => r.score < 60);

  return (
    <div>
      <Panel title="Accessibilità" info="Quanto i contenuti pubblicati sono fruibili da persone con screen reader, disabilità cognitive o che navigano da tastiera: testo alternativo immagini, struttura con sottotitoli, lunghezza delle frasi, link descrittivi. Non riguarda il posizionamento nei motori di ricerca.">
        {rows.length === 0 ? (
          <EmptyState icon={CheckCircle} title="Nessun contenuto pubblicato" description="Pubblica un articolo o un case study per vedere qui la sua valutazione di accessibilità."/>
        ) : (
          <>
            <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:20 }}>
              <ScoreGauge label="Media Accessibilità" score={avgScore}/>
            </div>

            {needsWork.length > 0 && (
              <Callout variant="warning">{needsWork.length} contenuti con punteggio di accessibilità sotto 60 hanno bisogno di essere migliorati (elencati per primi qui sotto).</Callout>
            )}

            <div style={{ display:"flex",flexDirection:"column",gap:10,marginTop:14 }}>
              {rows.map(r => (
                <div key={r.id} style={{ padding:"12px 16px",borderRadius:14,background:"#F7F7FB",border:"1px solid #F0F0F6" }}>
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap" }}>
                    <div>
                      <span style={{ fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:"0.04em",fontWeight:700,marginRight:8 }}>{r.type}</span>
                      <span style={{ fontSize:13.5,color:"#333",fontWeight:600 }}>{r.title}</span>
                    </div>
                    <span style={{ fontSize:14,fontWeight:800,color:scoreColor(r.score) }}>{r.score}/100</span>
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",gap:4,marginTop:8 }}>
                    {r.checks.filter(c => !c.passed).map(c => (
                      <div key={c.label} style={{ display:"flex",alignItems:"flex-start",gap:8,fontSize:12 }}>
                        <AlertTriangle size={13} color="#dc2626" style={{ flexShrink:0,marginTop:1 }}/>
                        <span style={{ color:"#555" }}><strong>{c.label}:</strong> {c.message}</span>
                      </div>
                    ))}
                    {r.checks.every(c => c.passed) && (
                      <div style={{ display:"flex",alignItems:"flex-start",gap:8,fontSize:12 }}>
                        <CheckCircle size={13} color="#16a34a" style={{ flexShrink:0,marginTop:1 }}/>
                        <span style={{ color:"#555" }}>Tutti i controlli di accessibilità superati.</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Panel>
    </div>
  );
}

function ListEditor<T extends Record<string, unknown>>({
  title, data, fields, nameKey, imgKey, onSave, blank, extra, optionsMap, withStatusTabs, dateKey, previewUrl, seoInput, avatarFallback,
}: {
  title:string; data:T[]|null; fields:FieldDef[]; nameKey:string; imgKey:string;
  onSave:(d:T[])=>void; blank:T;
  extra?: (form:Record<string,any>, setForm:React.Dispatch<React.SetStateAction<Record<string,any>>>) => React.ReactNode;
  optionsMap?: Record<string,string[]>;
  withStatusTabs?: boolean;
  dateKey?: string;
  previewUrl?: (item:T) => string;
  seoInput?: (item:T) => AnalyzeInput;
  avatarFallback?: boolean;
}) {
  const [items,   setItems]   = useState<T[]>([]);
  const [editing, setEditing] = useState<number|null>(null);
  const [form,    setForm]    = useState<Record<string,any>>({});
  const [isNew,   setIsNew]   = useState(false);
  const [query,   setQuery]   = useState("");
  const [statusTab, setStatusTab] = useState<"all"|"published"|"draft"|"deleted"|"preview"|"cornerstone">("published");
  const [sortOrder, setSortOrder] = useState<"newest"|"oldest">("newest");
  const { ask, dialog } = useConfirm();
  const { t } = useAdminI18n();

  useEffect(() => { if (data) setItems(data); }, [data]);
  if (!data) return <Loader/>;

  function toFormValue(v: unknown): any {
    return v !== null && typeof v === "object" ? JSON.parse(JSON.stringify(v)) : String(v ?? "");
  }

  function open(idx: number) {
    setIsNew(false); setEditing(idx);
    setForm(Object.fromEntries(Object.entries(items[idx]).map(([k,v]) => [k,toFormValue(v)])));
  }
  const nameMissing = isNew || editing !== null ? !String(form[nameKey] ?? "").trim() : false;
  function commit() {
    if (editing === null) return;
    if (nameMissing) return;
    if (isNew) {
      const newItem = { ...blank, id: typeof blank.id === "number" ? Date.now() : "" } as T;
      const m = { ...newItem };
      for (const [k,v] of Object.entries(form)) {
        const ref = (newItem as Record<string,unknown>)[k];
        (m as Record<string,unknown>)[k] = typeof ref === "number" ? Number(v) : typeof ref === "boolean" ? (v === true || v === "true") : v;
      }
      if (typeof (m as Record<string,unknown>).id === "string" && !(m as Record<string,unknown>).id) {
        const base = String((m as Record<string,unknown>)[nameKey] ?? "").toLowerCase().trim()
          .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        (m as Record<string,unknown>).id = base || String(Date.now());
      }
      const updated = [...items, m];
      setItems(updated); setEditing(null); setIsNew(false); onSave(updated);
    } else {
      const updated = items.map((item, i) => {
        if (i !== editing) return item;
        const m = { ...item };
        for (const [k,v] of Object.entries(form)) {
          const ref = (item as Record<string,unknown>)[k];
          (m as Record<string,unknown>)[k] = typeof ref === "number" ? Number(v) : typeof ref === "boolean" ? (v === true || v === "true") : v;
        }
        return m;
      });
      setItems(updated); setEditing(null); onSave(updated);
    }
  }
  function del(idx: number) {
    if (withStatusTabs) {
      ask({
        title: `Spostare "${String(items[idx][nameKey] || title)}" nel cestino?`,
        message: `Questo ${title.toLowerCase()} verrà nascosto dal sito e spostato tra gli eliminati. Potrai ripristinarlo in qualsiasi momento dalla scheda "Eliminati".`,
        confirmLabel: "Sposta nel cestino",
        onConfirm: () => {
          const updated = items.map((item, i) => i === idx ? { ...item, status: "deleted" } : item);
          setItems(updated); onSave(updated);
        },
      });
      return;
    }
    ask({
      title: `Eliminare "${String(items[idx][nameKey] || title)}"?`,
      message: `Questo ${title.toLowerCase()} verrà rimosso definitivamente e non sarà più visibile sul sito. L'azione non è reversibile.`,
      confirmLabel: t.common.delete,
      onConfirm: () => { const updated = items.filter((_, i) => i !== idx); setItems(updated); onSave(updated); },
    });
  }
  function restore(idx: number) {
    const updated = items.map((item, i) => i === idx ? { ...item, status: "published" } : item);
    setItems(updated); onSave(updated);
  }
  function permanentlyDelete(idx: number) {
    ask({
      title: `Eliminare definitivamente "${String(items[idx][nameKey] || title)}"?`,
      message: `Questo ${title.toLowerCase()} verrà rimosso per sempre. L'azione non è reversibile.`,
      confirmLabel: t.common.deletePermanently,
      onConfirm: () => { const updated = items.filter((_, i) => i !== idx); setItems(updated); onSave(updated); },
    });
  }
  function add() {
    setIsNew(true); setEditing(items.length);
    setForm(Object.fromEntries(Object.entries(blank).map(([k,v]) => [k,toFormValue(v)])));
  }

  const byStatus = !withStatusTabs ? items : items.filter(item => {
    const rec = item as Record<string,unknown>;
    const s = String(rec.status || "published");
    if (statusTab === "all") return s !== "deleted";
    if (statusTab === "preview") return rec.publicPreview === true && s !== "deleted";
    if (statusTab === "cornerstone") return rec.cornerstone === true && s !== "deleted";
    return s === statusTab;
  });
  const bySearch = query.trim()
    ? byStatus.filter(item => String(item[nameKey] || "").toLowerCase().includes(query.toLowerCase()))
    : byStatus;
  // Most recently added first (new items are appended to the array), or by
  // an explicit date field when provided, honoring the newest/oldest toggle.
  const sorted = !withStatusTabs ? bySearch : dateKey
    ? bySearch.map((item, i) => ({ item, i })).sort((a, b) => {
        const diff = new Date(String(a.item[dateKey] ?? "")).getTime() - new Date(String(b.item[dateKey] ?? "")).getTime();
        if (diff !== 0) return sortOrder === "newest" ? -diff : diff;
        return sortOrder === "newest" ? b.i - a.i : a.i - b.i;
      }).map(({ item }) => item)
    : sortOrder === "newest" ? [...bySearch].reverse() : bySearch;
  const filtered = sorted;
  const counts = !withStatusTabs ? null : {
    all: items.filter(i => (i as Record<string,unknown>).status !== "deleted").length,
    published: items.filter(i => String((i as Record<string,unknown>).status || "published") === "published").length,
    draft: items.filter(i => (i as Record<string,unknown>).status === "draft").length,
    deleted: items.filter(i => (i as Record<string,unknown>).status === "deleted").length,
    preview: items.filter(i => (i as Record<string,unknown>).publicPreview === true && (i as Record<string,unknown>).status !== "deleted").length,
    cornerstone: items.filter(i => (i as Record<string,unknown>).cornerstone === true && (i as Record<string,unknown>).status !== "deleted").length,
  };

  return (
    <div>
      {editing !== null && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
          <div style={{ background:"#fff",borderRadius:20,padding:28,width:"100%",maxWidth:extra?760:640,maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <h3 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111" }}>{isNew ? `Nuovo ${title}` : `Modifica ${title}`}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false); }} aria-label={t.common.close} style={{ background:"none",border:"none",cursor:"pointer",color:"#999",padding:4 }}><X size={18}/></button>
            </div>
            <Grid>
              {fields.map((f,i) => (
                f.type === "url" ? (
                  <ImageField key={f.key} value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))} label={f.label}
                    avatarName={avatarFallback && f.key === imgKey ? String(form[nameKey]||"") : undefined}/>
                ) :
                <Field key={f.key} label={f.label} full={f.type === "richtext" || f.type.startsWith("textarea")}
                  required={i === 0} error={i === 0 && nameMissing ? t.common.requiredField : undefined}>
                  {f.type === "richtext" ? (
                    <RichTextEditor value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))}/>
                  ) : f.type === "checkbox" ? (
                    <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"9px 0" }}>
                      <input type="checkbox" checked={form[f.key] === "true" || form[f.key] === true}
                        onChange={e => setForm(p => ({...p,[f.key]:e.target.checked}))}
                        style={{ width:16,height:16,cursor:"pointer" }}/>
                      <span style={{ fontSize:13,color:"#555" }}>{f.checkboxLabel ?? "Attivo"}</span>
                    </label>
                  ) : f.type === "select" ? (
                    <FieldSelect value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))} options={f.options??[]}/>
                  ) : f.type === "combo" ? (
                    <ComboField value={form[f.key]||""} onChange={v => setForm(p => ({...p,[f.key]:v}))} options={optionsMap?.[f.key]??[]}/>
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
            {extra && <div style={{ marginTop:8 }}>{extra(form, setForm)}</div>}
            <div style={{ display:"flex",gap:10,marginTop:20 }}>
              <Button icon={Save} onClick={commit} disabled={nameMissing}>{t.common.save}</Button>
              <Button variant="secondary" onClick={() => { setEditing(null); setIsNew(false); }}>{t.common.cancel}</Button>
            </div>
          </div>
        </div>
      )}

      {withStatusTabs && counts && items.length > 0 && (
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:10,marginBottom:16 }}>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {([
              { id:"all"       as const, label:t.common.all,       count:counts.all },
              { id:"published" as const, label:t.common.published, count:counts.published },
              { id:"draft"     as const, label:t.common.drafts,    count:counts.draft },
              { id:"deleted"   as const, label:t.common.deleted,   count:counts.deleted },
              { id:"preview"     as const, label:t.common.publicPreview, count:counts.preview },
              { id:"cornerstone" as const, label:t.common.cornerstone, count:counts.cornerstone },
            ]).map(tab => (
              <button key={tab.id} onClick={() => setStatusTab(tab.id)}
                style={{
                  padding:"8px 16px",borderRadius:9,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
                  background: statusTab === tab.id ? "#2E2784" : "#F0F0F8",
                  color: statusTab === tab.id ? "#fff" : "#555",
                }}>
                {tab.label} <span style={{ opacity:0.7 }}>({tab.count})</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setSortOrder(s => s === "newest" ? "oldest" : "newest")}
            style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:9,border:"1px solid #E8E8F0",background:"#fff",color:"#555",fontSize:12,fontWeight:600,cursor:"pointer" }}>
            <ArrowDownUp size={13}/> {sortOrder === "newest" ? t.common.newest : t.common.oldest}
          </button>
        </div>
      )}
      {items.length === 0 ? (
        <EmptyState icon={Plus} title={`Nessun ${title.toLowerCase()} ancora`}
          description={`Questa lista è vuota: aggiungi il primo ${title.toLowerCase()} per farlo comparire sul sito.`}
          actionLabel={t.common.addItem.replace("{item}", title)} onAction={add}/>
      ) : filtered.length === 0 ? (
        <div style={{ padding:"32px 0",textAlign:"center",color:"#999",fontSize:13 }}>
          {query.trim() ? <>Nessun risultato per &quot;{query}&quot;.</> : `Nessun elemento in questa scheda.`}
        </div>
      ) : (
        <>
          {items.length > 8 && (
            <div style={{ position:"relative",marginBottom:14,maxWidth:320 }}>
              <Search size={14} style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#bbb" }}/>
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.common.searchByName}
                style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px 9px 34px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,background:"#FAFAFA",outline:"none" }}/>
            </div>
          )}
          <div style={{ display:"grid",gap:10,marginBottom:16 }}>
            {filtered.map((item) => {
              const idx = items.indexOf(item);
              return (
                <div key={idx} style={{ background:"#fff",borderRadius:14,padding:"14px 18px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap" }}>
                  {avatarFallback
                    ? <AuthorAvatar src={imgKey ? String(item[imgKey]||"") : ""} name={String(item[nameKey]||"")} size={52}/>
                    : imgKey && item[imgKey]
                    ? <img src={String(item[imgKey])} alt="" style={{ width:52,height:52,objectFit:"cover",borderRadius:10,flexShrink:0 }}/>
                    : imgKey ? <div style={{ width:52,height:52,background:"#F5F5FA",borderRadius:10,flexShrink:0 }}/> : null
                  }
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <div style={{ fontWeight:600,color:"#111",fontSize:14,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{String(item[nameKey]||t.common.empty)}</div>
                      {item.status === "draft" && (
                        <span style={{ flexShrink:0,padding:"2px 8px",borderRadius:6,background:"#FEF3C7",color:"#92400E",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em" }}>{t.common.draft}</span>
                      )}
                    </div>
                    <div style={{ color:"#aaa",fontSize:11,marginTop:2 }}>{String(item.id||"")}</div>
                  </div>
                  {seoInput && <SeoScoreDots input={seoInput(item)}/>}
                  <div style={{ display:"flex",gap:8 }}>
                    {statusTab === "deleted" ? (
                      <>
                        <Button variant="secondary" icon={RefreshCw} onClick={() => restore(idx)}>{t.common.restore}</Button>
                        <Button variant="danger" icon={Trash2} onClick={() => permanentlyDelete(idx)}>{t.common.deletePermanently}</Button>
                      </>
                    ) : (
                      <>
                        {previewUrl && (
                          <a href={previewUrl(item)} target="_blank" rel="noopener noreferrer"
                            style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"10px 18px",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none",background:"#F5F5FA",color:"#555" }}>
                            <Eye size={14}/>{t.common.preview}
                          </a>
                        )}
                        <Button variant="secondary" onClick={() => open(idx)}>{t.common.edit}</Button>
                        <Button variant="danger" icon={Trash2} onClick={() => del(idx)}>{t.common.delete}</Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Button icon={Plus} onClick={add}>{t.common.addItem.replace("{item}", title)}</Button>
        </>
      )}
      {dialog}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SEO · GEO · AIO SCORE DOTS (stile Yoast/WordPress)
══════════════════════════════════════════════════ */
function scoreDotColor(score: number): { bg:string; label:string } {
  if (score >= 70) return { bg:"#16A34A", label:"Buono" };
  if (score >= 40) return { bg:"#F59E0B", label:"Da migliorare" };
  return { bg:"#DC2626", label:"Insufficiente" };
}
// Compact traffic-light cluster for list rows — sits in its own bordered pill with
// flexWrap on the row so it drops to its own line instead of overflowing the buttons.
function SeoScoreDots({ input }: { input: AnalyzeInput }) {
  const analysis = analyzeContent(input);
  const dots: { key:string; label:string; score:number }[] = [
    { key:"seo", label:"SEO", score:analysis.seoScore },
    { key:"sem", label:"SEM", score:analysis.semScore },
    { key:"geo", label:"GEO", score:analysis.geoScore },
    { key:"aio", label:"AIO", score:analysis.aioScore },
  ];
  return (
    <div style={{ display:"flex",gap:8,flexShrink:0,padding:"6px 10px",borderRadius:12,background:"#F7F7FB",border:"1px solid #F0F0F6" }}>
      {dots.map(d => {
        const c = scoreDotColor(d.score);
        return (
          <div key={d.key} title={`${d.label}: ${d.score}/100 — ${c.label}`}
            style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"default" }}>
            <span style={{ width:8,height:8,borderRadius:"50%",background:c.bg,display:"inline-block" }}/>
            <span style={{ fontSize:8.5,fontWeight:700,color:"#999",letterSpacing:"0.02em" }}>{d.label}</span>
          </div>
        );
      })}
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
   SHARED UI — design tokens & primitive di base
══════════════════════════════════════════════════ */
const theme = {
  primary: "#2E2784",
  primaryDark: "#231e72",
  accent: "#F8AE01",
  success: "#16a34a",
  successBg: "rgba(22,163,74,0.08)",
  warning: "#b45309",
  warningBg: "rgba(245,158,11,0.1)",
  danger: "#dc2626",
  dangerBg: "rgba(220,38,38,0.08)",
  info: "#2E2784",
  infoBg: "rgba(46,39,132,0.06)",
  border: "#E8E8F0",
  text: "#111",
  textMuted: "#666",
  textFaint: "#999",
  bg: "#F5F5FA",
  radius: 12,
  radiusLg: 16,
};

/**
 * Blocco introduttivo mostrato in cima a ogni sezione: cosa contiene + quando/chi la usa.
 * Rende ogni pagina autoesplicativa senza dover consultare documentazione esterna.
 */
function PageIntro({ description, usage }: { description: string; usage?: string[] }) {
  return (
    <div style={{ marginBottom:20,padding:"14px 18px",background:"#fff",borderRadius:theme.radius,border:`1px solid ${theme.border}`,display:"flex",gap:12,alignItems:"flex-start" }}>
      <Info size={16} style={{ color:theme.primary,flexShrink:0,marginTop:2 }}/>
      <div style={{ minWidth:0 }}>
        <p style={{ margin:0,fontSize:13,color:"#444",lineHeight:1.55 }}>{description}</p>
        {usage && usage.length > 0 && (
          <ul style={{ margin:"8px 0 0",padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:4 }}>
            {usage.map((u,i) => (
              <li key={i} style={{ fontSize:12,color:"#888",display:"flex",gap:7,lineHeight:1.5 }}>
                <span style={{ color:theme.accent,flexShrink:0 }}>›</span>{u}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Bottone unico con varianti coerenti in tutto l'admin: primary=Salva/azione principale,
 * secondary=Annulla/azione neutra, danger=Elimina/azioni distruttive, ghost=azioni minori.
 */
function Button({ children, onClick, variant = "primary", icon: Icon, disabled, type = "button" }: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary"|"secondary"|"danger"|"ghost";
  icon?: LucideIcon; disabled?: boolean; type?: "button"|"submit";
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary:   { background: disabled ? "#ddd" : theme.primary, color: disabled ? "#999" : "#fff" },
    secondary: { background: "#F5F5FA", color: "#555" },
    danger:    { background: theme.dangerBg, color: theme.danger },
    ghost:     { background: "transparent", color: "#666", border: `1px solid ${theme.border}` },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ display:"inline-flex",alignItems:"center",gap:7,padding:"10px 18px",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:disabled?"not-allowed":"pointer",transition:"opacity 0.15s",...styles[variant] }}>
      {Icon && <Icon size={14}/>}{children}
    </button>
  );
}

/** Banner informativo per stati/avvisi/errori — usalo invece di ricreare un div colorato ad-hoc. */
function Callout({ variant, children }: { variant: "info"|"success"|"warning"|"danger"; children: React.ReactNode }) {
  const map = {
    info:    { bg: theme.infoBg,    color: theme.info,    Icon: Info },
    success: { bg: theme.successBg, color: theme.success, Icon: CheckCircle },
    warning: { bg: theme.warningBg, color: theme.warning, Icon: Info },
    danger:  { bg: theme.dangerBg,  color: theme.danger,  Icon: X },
  } as const;
  const { bg, color, Icon } = map[variant];
  return (
    <div style={{ display:"flex",gap:9,alignItems:"flex-start",padding:"12px 16px",background:bg,borderRadius:theme.radius,fontSize:12.5,color,lineHeight:1.55 }}>
      <Icon size={14} style={{ flexShrink:0,marginTop:1 }}/>
      <div>{children}</div>
    </div>
  );
}

/**
 * Stato vuoto per liste senza elementi: spiega perché è vuota e offre l'azione per iniziare,
 * invece di mostrare solo una tabella/griglia vuota senza contesto.
 */
function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: {
  icon: LucideIcon; title: string; description: string; actionLabel?: string; onAction?: () => void;
}) {
  return (
    <div style={{ textAlign:"center",padding:"48px 24px",background:"#FAFAFC",borderRadius:theme.radius,border:`1px dashed ${theme.border}` }}>
      <div style={{ width:44,height:44,borderRadius:"50%",background:"#EEF0FB",color:theme.primary,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px" }}>
        <Icon size={20}/>
      </div>
      <div style={{ fontSize:14,fontWeight:700,color:"#222",marginBottom:6 }}>{title}</div>
      <div style={{ fontSize:12.5,color:"#888",maxWidth:360,margin:"0 auto",lineHeight:1.55 }}>{description}</div>
      {actionLabel && onAction && (
        <div style={{ marginTop:16 }}><Button onClick={onAction} icon={Plus}>{actionLabel}</Button></div>
      )}
    </div>
  );
}

/** Sezione collassabile per impostazioni opzionali/avanzate, chiusa di default per ridurre il carico cognitivo. */
function Accordion({ title, subtitle, children, defaultOpen = false }: { title: string; subtitle?: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border:`1px solid ${theme.border}`,borderRadius:theme.radius,overflow:"hidden" }}>
      <button type="button" onClick={() => setOpen(v => !v)}
        style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"13px 16px",background:open?"#FAFAFC":"#fff",border:"none",cursor:"pointer",textAlign:"left" }}>
        <div>
          <div style={{ fontSize:13,fontWeight:700,color:"#222" }}>{title}</div>
          {subtitle && <div style={{ fontSize:11.5,color:"#999",marginTop:2 }}>{subtitle}</div>}
        </div>
        <ChevronRight size={16} style={{ color:"#999",flexShrink:0,transform:open?"rotate(90deg)":"none",transition:"transform 0.15s" }}/>
      </button>
      {open && <div style={{ padding:"16px",borderTop:`1px solid ${theme.border}` }}>{children}</div>}
    </div>
  );
}

/**
 * Modale di conferma per azioni distruttive/irreversibili: usala al posto di window.confirm() per
 * spiegare chiaramente cosa succede, invece di un alert generico del browser.
 */
function ConfirmDialog({ open, title, message, confirmLabel, danger = true, onConfirm, onCancel }: {
  open: boolean; title: string; message: string; confirmLabel?: string; danger?: boolean;
  onConfirm: () => void; onCancel: () => void;
}) {
  const { t } = useAdminI18n();
  if (!open) return null;
  return (
    <div onClick={onCancel} style={{ position:"fixed",inset:0,background:"rgba(10,7,30,0.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff",borderRadius:16,padding:24,width:"100%",maxWidth:400,boxShadow:"0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ display:"flex",gap:12,alignItems:"flex-start",marginBottom:18 }}>
          <div style={{ width:36,height:36,borderRadius:"50%",background:danger?theme.dangerBg:theme.infoBg,color:danger?theme.danger:theme.info,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            {danger ? <Trash2 size={16}/> : <Info size={16}/>}
          </div>
          <div>
            <div style={{ fontSize:15,fontWeight:700,color:"#111" }}>{title}</div>
            <p style={{ margin:"6px 0 0",fontSize:12.5,color:"#666",lineHeight:1.55 }}>{message}</p>
          </div>
        </div>
        <div style={{ display:"flex",gap:8,justifyContent:"flex-end" }}>
          <Button variant="secondary" onClick={onCancel}>{t.common.cancel}</Button>
          <Button variant={danger?"danger":"primary"} onClick={onConfirm} icon={danger?Trash2:undefined}>{confirmLabel ?? t.common.confirm}</Button>
        </div>
      </div>
    </div>
  );
}

/** Hook per azioni che richiedono conferma esplicita prima di eseguirsi (sostituisce window.confirm). */
function useConfirm() {
  const [state, setState] = useState<{ title:string; message:string; confirmLabel?:string; danger?:boolean; onConfirm:()=>void } | null>(null);
  const ask = (opts: { title:string; message:string; confirmLabel?:string; danger?:boolean; onConfirm:()=>void }) => setState(opts);
  const dialog = state && (
    <ConfirmDialog open title={state.title} message={state.message} confirmLabel={state.confirmLabel} danger={state.danger}
      onConfirm={() => { state.onConfirm(); setState(null); }} onCancel={() => setState(null)}/>
  );
  return { ask, dialog };
}

/**
 * Icona "i" con popover di aiuto contestuale. Click/tap per aprire (funziona anche su touch),
 * si chiude cliccando altrove. Usata accanto a titoli di Panel e label di Field.
 */
function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <span ref={ref} style={{ position:"relative",display:"inline-flex",verticalAlign:"middle" }}>
      <button type="button" onClick={() => setOpen(v => !v)} aria-label="Informazioni"
        style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:16,height:16,borderRadius:"50%",border:"1px solid #C9C9E8",background:open?"#EEF0FB":"transparent",color:"#7A72C4",fontSize:10,fontWeight:700,cursor:"pointer",lineHeight:1,padding:0 }}>
        i
      </button>
      {open && (
        <div role="tooltip" style={{ position:"absolute",zIndex:50,top:"calc(100% + 6px)",left:0,width:240,background:"#1e1a3e",color:"#fff",fontSize:12,fontWeight:400,lineHeight:1.5,padding:"10px 12px",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.25)",textTransform:"none",letterSpacing:"normal" }}>
          {text}
        </div>
      )}
    </span>
  );
}
function Panel({ title, children, rightAction, info }: { title:string; children:React.ReactNode; rightAction?:React.ReactNode; info?:string }) {
  return (
    <div style={{ background:"#fff",borderRadius:16,padding:"20px 22px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",marginBottom:14 }}>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16 }}>
        <div style={{ display:"flex",alignItems:"center",gap:7 }}>
          <div style={{ fontSize:11,fontWeight:700,color:"#2E2784",textTransform:"uppercase",letterSpacing:"0.07em" }}>{title}</div>
          {info && <InfoTooltip text={info}/>}
        </div>
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
function Field({ label, children, full, hint, required, error }: { label:string; children:React.ReactNode; full?:boolean; hint?:string; required?:boolean; error?:string }) {
  return (
    <div style={{ gridColumn:full?"1 / -1":undefined }}>
      <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,fontWeight:700,color:"#666",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.05em" }}>
        {label}
        {required && <span style={{ color:theme.danger,fontWeight:800 }}>*</span>}
        {hint && <InfoTooltip text={hint}/>}
      </label>
      {children}
      {error && <div style={{ display:"flex",alignItems:"center",gap:5,marginTop:5,fontSize:11.5,color:theme.danger,fontWeight:600 }}><X size={11}/>{error}</div>}
    </div>
  );
}
function Input({ value, onChange, type="text", placeholder }: { value:string; onChange:(v:string)=>void; type?:string; placeholder?:string }) {
  return (
    <input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}
      style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,color:"#111",background:"#FAFAFA",outline:"none",fontFamily:"inherit",transition:"border 0.15s" }}
      onFocus={e=>e.target.style.borderColor="#2E2784"}
      onBlur={e=>e.target.style.borderColor="#E8E8F0"}
    />
  );
}
function Textarea({ value, onChange, rows=3, placeholder }: { value:string; onChange:(v:string)=>void; rows?:number; placeholder?:string }) {
  return (
    <textarea value={value} onChange={e=>onChange(e.target.value)} rows={rows} placeholder={placeholder}
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
const NEW_OPTION = "__new__";
function ComboField({ value, onChange, options, labels, newLabel="+ Aggiungi nuova…" }: { value:string; onChange:(v:string)=>void; options:string[]; labels?:Record<string,string>; newLabel?:string }) {
  const [adding, setAdding] = useState(false);
  if (adding || (value && !options.includes(value))) {
    return (
      <div style={{ display:"flex",gap:8,alignItems:"center" }}>
        <Input value={value} onChange={onChange}/>
        {options.length > 0 && (
          <button type="button" onClick={() => { setAdding(false); onChange(options[0]); }}
            style={{ flexShrink:0,padding:"9px 12px",background:"#F5F5FA",color:"#111",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap" }}>
            Scegli esistente
          </button>
        )}
      </div>
    );
  }
  return (
    <select value={value} onChange={e => { if (e.target.value === NEW_OPTION) { setAdding(true); onChange(""); } else { onChange(e.target.value); } }}
      style={{ width:"100%",boxSizing:"border-box",padding:"9px 12px",border:"1.5px solid #E8E8F0",borderRadius:9,fontSize:13,color:"#111",background:"#FAFAFA",outline:"none",fontFamily:"inherit",cursor:"pointer" }}
      onFocus={e=>e.target.style.borderColor="#2E2784"}
      onBlur={e=>e.target.style.borderColor="#E8E8F0"}>
      {!value && <option value="">— Seleziona —</option>}
      {options.map(opt=><option key={opt} value={opt}>{labels?.[opt] ?? opt}</option>)}
      <option value={NEW_OPTION}>{newLabel}</option>
    </select>
  );
}
function CategoryFields({ cat, brand, sectorOptions, brandOptions, onChangeCat, onChangeBrand }: {
  cat:string; brand:string; sectorOptions:string[]; brandOptions:string[];
  onChangeCat:(v:string)=>void; onChangeBrand:(v:string)=>void;
}) {
  const [mode, setMode] = useState<"cat"|"brand">(brand && !cat ? "brand" : "cat");
  return (
    <Field label="Categorizzazione" full>
      <div style={{ display:"flex",gap:16,marginBottom:8 }}>
        <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#111",cursor:"pointer" }}>
          <input type="radio" checked={mode==="cat"} onChange={() => setMode("cat")}/> Per Settore
        </label>
        <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#111",cursor:"pointer" }}>
          <input type="radio" checked={mode==="brand"} onChange={() => setMode("brand")}/> Per Brand
        </label>
      </div>
      {mode === "cat"
        ? <ComboField value={cat} onChange={onChangeCat} options={sectorOptions} labels={SECTOR_LABELS}/>
        : <ComboField value={brand} onChange={onChangeBrand} options={brandOptions}/>}
    </Field>
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
  const { t } = useAdminI18n();
  return <Button icon={Save} onClick={onClick}>{t.common.save}</Button>;
}
function SecBtn({ onClick, children }: { onClick:()=>void; children:React.ReactNode }) {
  return <Button variant="secondary" onClick={onClick}>{children}</Button>;
}
