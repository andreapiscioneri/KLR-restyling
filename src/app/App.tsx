import { useEffect, useState } from "react";
import { Nav, type Page } from "./components/nav";
import { Home } from "./components/home";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Brands } from "./components/brands";
import { BrandDetail } from "./components/brand-detail";
import { Studies } from "./components/studies";
import { StudyDetail } from "./components/study-detail";
import { Blog } from "./components/blog";
import { BlogDetail } from "./components/blog-detail";
import { Team } from "./components/team";
import { TeamDetail } from "./components/team-detail";
import { Klr10 } from "./components/klr10";
import { Career } from "./components/career";
import { Contact } from "./components/contact";
import { Copyright } from "./components/copyright";
import { Privacy } from "./components/privacy";
import { Footer } from "./components/footer";
import { CustomCursor } from "./components/custom-cursor";

export type Route =
  | { page: Page }
  | { page: "brand-detail"; id: string }
  | { page: "study-detail"; id: string }
  | { page: "team-detail"; id: string }
  | { page: "blog-detail"; slug: string };

export default function App() {
  const [route, setRoute] = useState<Route>({ page: "home" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const go = (r: Route) => setRoute(r);
  const map: Record<string, Page> = {
    "brand-detail": "brand",
    "study-detail": "studies",
    "team-detail": "team",
    "blog-detail": "blog",
  };
  const activePage: Page = (map[route.page] || (route.page as Page));

  return (
    <div className="min-h-screen bg-white text-black cursor-none">
      <CustomCursor />
      <Nav page={activePage} setPage={(p) => go({ page: p })} />

      <main className="relative z-10">
        {route.page === "home" && <Home go={go} />}
        {route.page === "about" && <About go={go} />}
        {route.page === "services" && <Services go={go} />}
        {route.page === "brand" && <Brands go={go} />}
        {route.page === "studies" && <Studies go={go} />}
        {route.page === "blog" && <Blog go={go} />}
        {route.page === "team" && <Team go={go} />}
        {route.page === "klr10" && <Klr10 go={go} />}
        {route.page === "career" && <Career go={go} />}
        {route.page === "contact" && <Contact />}
        {route.page === "copyright" && <Copyright go={go} />}
        {route.page === "privacy" && <Privacy go={go} />}
        {route.page === "brand-detail" && <BrandDetail id={route.id} go={go} />}
        {route.page === "study-detail" && <StudyDetail id={route.id} go={go} />}
        {route.page === "team-detail" && <TeamDetail id={route.id} go={go} />}
        {route.page === "blog-detail" && <BlogDetail slug={route.slug} go={go} />}
      </main>

      <Footer go={go} />
    </div>
  );
}
