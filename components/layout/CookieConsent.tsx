"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Circle, Eye, EyeOff, Shield, ShieldCheck, ShieldX, Fingerprint } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type ConsentCategories,
  type ConsentDuration,
  type ConsentLevel,
  type ConsentRecord,
  CONSENT_EVENT,
  DURATION_MONTHS,
  LEVEL_PRESETS,
  OPEN_PREFERENCES_EVENT,
  detectLevel,
  makeConsentId,
  makeExpiry,
  readConsent,
  writeConsent,
} from "@/lib/cookie-consent";

type DataItem = { icon: "anonymous" | "pseudonymous" | "personal"; label: string };

type CategoryDef = {
  key: keyof ConsentCategories;
  title: string;
  description: string;
  locked?: boolean;
  data: DataItem[];
};

const CATEGORIES: CategoryDef[] = [
  {
    key: "basic",
    title: "Basic Operations",
    locked: true,
    description:
      "This type of sharing is necessary for us to access the data we need to make sure the website is secure and working properly.",
    data: [
      { icon: "anonymous", label: "Anonymous data like browser name and version" },
      { icon: "pseudonymous", label: "Pseudonymous data like authentication token" },
    ],
  },
  {
    key: "content",
    title: "Content Personalization",
    description:
      "When enabled, you allow us to save your preferences and create a profile about you so we can deliver personalized content.",
    data: [
      { icon: "anonymous", label: "Anonymous data like device type, model and operating system" },
      { icon: "pseudonymous", label: "Pseudonymous data like site browsing preferences" },
      { icon: "personal", label: "Personal data like your IP address and location" },
    ],
  },
  {
    key: "optimization",
    title: "Site Optimization",
    description:
      "When enabled, you allow us to monitor your behavior so we can analyze and improve the services on our website for all visitors.",
    data: [
      { icon: "anonymous", label: "Anonymous data like the address of the previously visited website (HTTP Referer)" },
      { icon: "pseudonymous", label: "Pseudonymous data like website activity identifiers" },
      { icon: "personal", label: "Personal data like content, search and purchase history" },
    ],
  },
  {
    key: "ads",
    title: "Ad Personalization",
    description:
      "When enabled, you allow us access to share data with our advertising partners that build profiles about you across multiple websites.",
    data: [
      { icon: "anonymous", label: "Anonymous data like affiliate referral links" },
      { icon: "pseudonymous", label: "Pseudonymous data like identifiers used to track and profile users" },
      { icon: "personal", label: "Personal data like your age, gender and demographics" },
    ],
  },
];

const LEVEL_COPY: Record<Exclude<ConsentLevel, "custom">, string> = {
  silver:
    "Highest level of privacy. Data accessed for necessary basic operations only. Data shared with 3rd parties to ensure the site is secure and works on your device.",
  gold:
    "Balanced experience. Data accessed for content personalisation and site optimisation. Data shared with 3rd parties may be used to track you and store your preferences for this site.",
  platinum:
    "Highest level of personalisation. Data accessed to make ads and media more relevant. Data shared with 3rd parties may be used to track you on this site and other sites you visit.",
};

export type BannerConfig = {
  enabled?: boolean;
  headline?: string;
  subheadline?: string;
  levelDescriptions?: Partial<Record<Exclude<ConsentLevel, "custom">, string>>;
  categories?: Partial<Record<"content" | "optimization" | "ads", { title?: string; description?: string }>>;
  defaultDuration?: ConsentDuration;
};

const SERVICES_BY_CATEGORY: Record<keyof ConsentCategories, string[]> = {
  basic: ["Cookie Compliance"],
  content: [],
  optimization: ["Google Analytics"],
  ads: [],
};

function DataIcon({ type }: { type: DataItem["icon"] }) {
  const cls = "w-4 h-4 shrink-0 mt-0.5";
  if (type === "anonymous") return <Circle className={cls} strokeWidth={2.5} style={{ color: "#2E2784" }} />;
  if (type === "pseudonymous") return <Eye className={cls} style={{ color: "#2E2784" }} />;
  return <EyeOff className={cls} style={{ color: "#111111" }} />;
}

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled?: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed"
      style={{ background: checked ? "#F8AE01" : "#D9D9E3" }}
    >
      <span
        className="inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: checked ? "translateX(21px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function LevelPill({
  active,
  color,
  label,
  onClick,
}: {
  active: boolean;
  color: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
      style={{
        borderColor: active ? "#F8AE01" : "#D9D9E3",
        background: active ? "#FFF8D6" : "#ffffff",
        color: active ? "#F8AE01" : "#4B4B55",
      }}
    >
      <span className="w-3 h-3 rounded-full" style={{ background: color }} />
      {label}
    </button>
  );
}

export function CookieConsent({ initialConfig }: { initialConfig?: BannerConfig | null } = {}) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [categories, setCategories] = useState<ConsentCategories>(LEVEL_PRESETS.silver);
  const [duration, setDuration] = useState<ConsentDuration>(initialConfig?.defaultDuration || "1m");
  const [savedRecord, setSavedRecord] = useState<ConsentRecord | null>(null);
  const [config] = useState<BannerConfig | null>(initialConfig ?? null);

  useEffect(() => {
    if (initialConfig?.enabled === false) setVisible(false);

    const existing = readConsent();
    setSavedRecord(existing);
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    if (!existing) {
      showTimer = setTimeout(() => setVisible(true), 2500);
    } else {
      setCategories(existing.categories);
      setDuration(existing.duration);
    }

    const onOpen = () => {
      setVisible(true);
      setExpanded(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, onOpen);
    return () => {
      if (showTimer) clearTimeout(showTimer);
      window.removeEventListener(OPEN_PREFERENCES_EVENT, onOpen);
      delete document.body.dataset.cursorTheme;
    };
  }, []);

  const level = useMemo(() => detectLevel(categories), [categories]);

  const applyLevel = (lvl: Exclude<ConsentLevel, "custom">) => {
    setCategories(LEVEL_PRESETS[lvl]);
  };

  const toggleCategory = (key: keyof ConsentCategories) => {
    if (key === "basic") return;
    setCategories((c) => ({ ...c, [key]: !c[key] }));
  };

  const save = () => {
    const record: ConsentRecord = {
      id: savedRecord?.id ?? makeConsentId(),
      level,
      duration,
      categories,
      consentedAt: new Date().toISOString(),
      expiresAt: makeExpiry(duration),
    };
    writeConsent(record);
    setSavedRecord(record);
    setVisible(false);
    setExpanded(false);
    delete document.body.dataset.cursorTheme;

    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...record, path: window.location.pathname }),
    }).catch(() => {});
  };

  if (!visible) return null;

  const categoryDefs = CATEGORIES.map((c) => {
    const override = c.key === "basic" ? undefined : config?.categories?.[c.key as "content" | "optimization" | "ads"];
    return { ...c, title: override?.title || c.title, description: override?.description || c.description };
  });

  const blocked = categoryDefs.filter((c) => !categories[c.key]).flatMap((c) => SERVICES_BY_CATEGORY[c.key]);
  const allowed = categoryDefs.filter((c) => categories[c.key]).flatMap((c) => SERVICES_BY_CATEGORY[c.key]);
  const activeCategories = categoryDefs.filter((c) => categories[c.key]).map((c) => c.title).join(", ");
  const levelCopy = level === "custom" ? LEVEL_COPY.gold : (config?.levelDescriptions?.[level] || LEVEL_COPY[level]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9998] flex justify-center px-3 pb-3 sm:px-4 sm:pb-4">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{ border: "1px solid #E5E5EC" }}
        onMouseEnter={() => { document.body.dataset.cursorTheme = "purple"; }}
        onMouseLeave={() => { delete document.body.dataset.cursorTheme; }}
      >
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#2E2784,#F8AE01)" }} />

        <div className="max-h-[80vh] overflow-y-auto overscroll-contain p-5 sm:p-6" data-lenis-prevent>
          <p className="text-center text-base sm:text-lg font-bold" style={{ color: "#2E2784" }}>
            {config?.headline || "We believe your data is your property and support your right to privacy and transparency."}
          </p>
          <p className="mt-1 text-center text-xs sm:text-sm text-gray-600">
            {config?.subheadline || "Select a Data Access Level and Duration to choose how we use and share your data."}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <LevelPill active={level === "silver"} color="#B9B9C6" label="Silver" onClick={() => applyLevel("silver")} />
            <LevelPill active={level === "gold"} color="#D8B23C" label="Gold" onClick={() => applyLevel("gold")} />
            <LevelPill active={level === "platinum"} color="#7C6FB0" label="Platinum" onClick={() => applyLevel("platinum")} />

            <div className="relative">
              <button
                type="button"
                onClick={() => setDurationOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
                style={{ borderColor: "#F8AE01", color: "#F8AE01" }}
              >
                {duration === "1m" ? "1 month" : duration === "6m" ? "6 months" : "12 months"}
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {durationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 z-10 mt-2 w-32 overflow-hidden rounded-lg bg-white shadow-xl"
                    style={{ border: "1px solid #E5E5EC" }}
                  >
                    {(["1m", "6m", "12m"] as ConsentDuration[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDuration(d);
                          setDurationOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        {duration === d && <span className="text-xs">✓</span>}
                        {d === "1m" ? "1 month" : d === "6m" ? "6 months" : "12 months"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="mt-4 text-center text-xs sm:text-sm text-gray-700">
            {levelCopy}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-5 border-t pt-5" style={{ borderColor: "#EEEEF3" }}>
                  <p className="text-center text-base font-bold" style={{ color: "#2E2784" }}>
                    Consent Preferences
                  </p>
                  <p className="mt-1 text-center text-xs text-gray-600">
                    Use the toggles below to specify your data sharing purposes for this website.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categoryDefs.map((cat) => (
                      <div key={cat.key} className="rounded-xl p-4" style={{ background: "#FAFAFC", border: "1px solid #EEEEF3" }}>
                        <div className="flex items-center justify-between gap-2">
                          <Toggle checked={categories[cat.key]} disabled={cat.locked} onChange={() => toggleCategory(cat.key)} />
                          <span className="flex-1 text-sm font-semibold text-gray-900">{cat.title}</span>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-gray-600">{cat.description}</p>
                        <p className="mt-3 text-xs font-semibold text-gray-900">Data Accessed:</p>
                        <ul className="mt-2 space-y-2">
                          {cat.data.map((d) => (
                            <li key={d.label} className="flex items-start gap-2 text-xs text-gray-600">
                              <DataIcon type={d.icon} />
                              <span>{d.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-5" style={{ borderColor: "#EEEEF3" }}>
                    <p className="text-center text-base font-bold" style={{ color: "#2E2784" }}>
                      Protection &amp; Metrics
                    </p>
                    <p className="mt-1 text-center text-xs text-gray-600">
                      View your consent record, and the list of 3rd parties blocked and allowed based on your settings.
                    </p>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-xl p-4" style={{ background: "#FAFAFC", border: "1px solid #EEEEF3" }}>
                        <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#2E2784" }}>
                          <Fingerprint className="h-4 w-4" /> Consent Metrics
                        </p>
                        <dl className="mt-3 space-y-2 text-xs text-gray-700">
                          <div className="flex justify-between gap-2">
                            <dt className="text-gray-500">Consent ID</dt>
                            <dd className="truncate font-mono" style={{ color: "#F8AE01" }}>
                              {savedRecord?.id ?? "pending"}
                            </dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-gray-500">Data Access Level</dt>
                            <dd className="capitalize font-semibold">{level}</dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-gray-500">Purpose Categories</dt>
                            <dd className="text-right">{activeCategories || "None"}</dd>
                          </div>
                          <div className="flex justify-between gap-2">
                            <dt className="text-gray-500">Duration</dt>
                            <dd>{DURATION_MONTHS[duration]} month{DURATION_MONTHS[duration] > 1 ? "s" : ""}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="rounded-xl p-4" style={{ background: "#FAFAFC", border: "1px solid #EEEEF3" }}>
                        <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#2E2784" }}>
                          <Shield className="h-4 w-4" /> Privacy Protection
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <p className="mb-1 flex items-center gap-1 font-semibold text-gray-800">
                              <ShieldX className="h-3.5 w-3.5" style={{ color: "#B9354A" }} /> Blocked
                            </p>
                            <ul className="space-y-1 text-gray-600">
                              {blocked.length ? blocked.map((s) => <li key={s}>{s}</li>) : <li className="text-gray-400">None</li>}
                            </ul>
                          </div>
                          <div>
                            <p className="mb-1 flex items-center gap-1 font-semibold text-gray-800">
                              <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#2E9E6D" }} /> Allowed
                            </p>
                            <ul className="space-y-1 text-gray-600">
                              {allowed.length ? allowed.map((s) => <li key={s}>{s}</li>) : <li className="text-gray-400">None</li>}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="text-xs font-semibold underline underline-offset-2"
              style={{ color: "#F8AE01" }}
            >
              {expanded ? "Hide details" : "Customize"}
            </button>
            <Link href="/privacy" className="hidden text-xs text-gray-500 hover:underline sm:inline">
              Privacy policy
            </Link>
          </div>

          <button
            type="button"
            onClick={save}
            className="mt-3 w-full rounded-full py-3 text-sm font-bold text-white transition-transform active:scale-[0.99] sm:mx-auto sm:block sm:w-64"
            style={{ background: "#F8AE01" }}
          >
            Save my preferences
          </button>

          <Link href="/privacy" className="mt-3 block text-center text-xs text-gray-500 hover:underline sm:hidden">
            Privacy policy
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_PREFERENCES_EVENT));
  }
}

export function useConsentCategories() {
  const [categories, setCategories] = useState<ConsentCategories | null>(null);

  useEffect(() => {
    setCategories(readConsent()?.categories ?? null);

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentRecord>).detail;
      setCategories(detail.categories);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return categories;
}
