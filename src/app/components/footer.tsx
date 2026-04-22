import logo from "../../imports/KLR-Logosito.png";
import type { Route } from "../App";

export function Footer({ go }: { go: (r: Route) => void }) {
  const explore: { label: string; route: Route }[] = [
    { label: "Home", route: { page: "home" } },
    { label: "About", route: { page: "about" } },
    { label: "Services", route: { page: "services" } },
    { label: "Brands", route: { page: "brand" } },
  ];
  const more: { label: string; route: Route }[] = [
    { label: "Case Studies", route: { page: "studies" } },
    { label: "Insights", route: { page: "blog" } },
    { label: "Team", route: { page: "team" } },
    { label: "Career", route: { page: "career" } },
    { label: "Contact", route: { page: "contact" } },
  ];
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-5">
            <button onClick={() => go({ page: "home" })} className="flex items-center gap-3 mb-10">
              <img src={typeof logo === "string" ? logo : (logo as { src: string }).src} alt="KLR" className="h-8 w-auto" />
            </button>
            <div className="text-[#2E2784] tracking-[-0.03em] max-w-md" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.15, fontWeight: 600 }}>
              Key to Loyalty in Retail.<br />
              <span className="text-[#F8AE01]">Built on trust and teamwork.</span>
            </div>
            <p className="text-black tracking-tight mt-6 max-w-xs" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
              We design and deliver marketing campaigns with positive results for retail businesses.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <a href="https://www.linkedin.com/company/klr-key-to-loyalty-in-retail/" target="_blank" rel="noopener noreferrer" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors tracking-tight" style={{ fontSize: "0.85rem" }}>LinkedIn</a>
              <span className="text-black/20">·</span>
              <a href="https://www.youtube.com/@klreurope" target="_blank" rel="noopener noreferrer" className="text-[#2E2784] hover:text-[#F8AE01] transition-colors tracking-tight" style={{ fontSize: "0.85rem" }}>YouTube</a>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="tracking-[0.2em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Explore</div>
            <ul className="space-y-3 text-black tracking-tight" style={{ fontSize: "0.95rem" }}>
              {explore.map((e) => (
                <li key={e.label} className="hover:text-[#2E2784] cursor-pointer" onClick={() => go(e.route)}>{e.label}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="tracking-[0.2em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Links</div>
            <ul className="space-y-3 text-black tracking-tight" style={{ fontSize: "0.95rem" }}>
              {more.map((e) => (
                <li key={e.label} className="hover:text-[#2E2784] cursor-pointer" onClick={() => go(e.route)}>{e.label}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="tracking-[0.2em] uppercase text-[#2E2784] mb-6" style={{ fontSize: "0.7rem" }}>Headquarters</div>
            <p className="text-black tracking-tight" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Ulica 15. Maja 19<br />
              SI-6000 Koper/Capodistria<br />
              +386 5 902 87 58
            </p>
            <p className="text-black tracking-tight mt-4" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
              Via XXV Aprile 68<br />
              25038 Rovato (BS), Italy<br />
              +39 030 52 81 427
            </p>
            <a href="mailto:info@klr-europe.com" className="text-[#2E2784] hover:text-[#F8AE01] tracking-tight mt-4 block transition-colors" style={{ fontSize: "0.95rem" }}>info@klr-europe.com</a>
          </div>
        </div>
        <div className="flex items-center justify-between text-black tracking-tight pt-10 border-t border-black/10 flex-wrap gap-4" style={{ fontSize: "0.8rem" }}>
          <span>© 2026 KLR-EVROPA d.o.o.</span>
          <div className="flex items-center gap-4">
            <button onClick={() => go({ page: "copyright" })} className="hover:text-[#2E2784] transition-colors">Copyright</button>
            <span className="text-black/20">·</span>
            <button onClick={() => go({ page: "privacy" })} className="hover:text-[#2E2784] transition-colors">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
