"use client";
import { ADMIN_LOCALES, useAdminI18n, type AdminLocale } from "@/lib/admin-i18n";

function FlagIT() {
  return (
    <svg viewBox="0 0 3 2" width="20" height="14" style={{ display: "block", borderRadius: 2 }}>
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#ce2b37" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 36" width="20" height="14" style={{ display: "block", borderRadius: 2 }}>
      <rect width="60" height="36" fill="#012169" />
      <path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="6" />
      <path d="M0 0 60 36M60 0 0 36" stroke="#C8102E" strokeWidth="2.4" />
      <path d="M30 0V36M0 18H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0V36M0 18H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagRU() {
  return (
    <svg viewBox="0 0 3 2" width="20" height="14" style={{ display: "block", borderRadius: 2 }}>
      <rect width="3" height="0.666" y="0" fill="#fff" />
      <rect width="3" height="0.666" y="0.667" fill="#0039A6" />
      <rect width="3" height="0.666" y="1.334" fill="#D52B1E" />
    </svg>
  );
}

const FLAGS: Record<AdminLocale, () => React.ReactElement> = { it: FlagIT, en: FlagGB, ru: FlagRU };

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useAdminI18n();

  return (
    <div style={{ padding: "0 10px 12px" }}>
      <div style={{ padding: "10px 2px 8px", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.32)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {t.common.language}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {ADMIN_LOCALES.map(({ code, label }) => {
          const Flag = FLAGS[code];
          const active = locale === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              title={label}
              aria-label={label}
              aria-pressed={active}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                padding: "8px 0", borderRadius: 8, cursor: "pointer",
                background: active ? "rgba(248,174,1,0.18)" : "rgba(255,255,255,0.06)",
                border: active ? "1px solid rgba(248,174,1,0.5)" : "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.15s",
              }}
            >
              <Flag />
            </button>
          );
        })}
      </div>
    </div>
  );
}
