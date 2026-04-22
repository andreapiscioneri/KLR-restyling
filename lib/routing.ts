export type Page =
  | "home" | "about" | "services" | "brand" | "studies"
  | "blog" | "team" | "klr10" | "career" | "contact"
  | "copyright" | "privacy";

export type Route =
  | { page: Page }
  | { page: "brand-detail"; id: string }
  | { page: "study-detail"; id: string }
  | { page: "team-detail"; id: string }
  | { page: "blog-detail"; slug: string };

export function routeToPath(r: Route): string {
  switch (r.page) {
    case "home":         return "/";
    case "about":        return "/about";
    case "services":     return "/services";
    case "brand":        return "/brands";
    case "brand-detail": return `/brands/${r.id}`;
    case "studies":      return "/work";
    case "study-detail": return `/work/${r.id}`;
    case "blog":         return "/blog";
    case "blog-detail":  return `/blog/${r.slug}`;
    case "team":         return "/team";
    case "team-detail":  return `/team/${r.id}`;
    case "klr10":        return "/10-years";
    case "career":       return "/career";
    case "contact":      return "/contact";
    case "copyright":    return "/copyright";
    case "privacy":      return "/privacy";
    default:             return "/";
  }
}
