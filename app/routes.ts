import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Resource routes: the sitemap and llms.txt (no shared layout). robots.txt, ai.txt, security.txt, the IndexNow key
  // and the web manifest are the Worker's (workers/app.ts).
  route("sitemap.xml", "routes/sitemap.xml.ts"),
  route("llms.txt", "routes/llms.txt.ts"),

  // All pages share the header/footer shell via the pathless layout.
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),

    // Services
    route("grant-proposal-support", "routes/grant-proposal-support.tsx"),
    route("manuscript-editing", "routes/manuscript-editing.tsx"),
    route("visual-design", "routes/visual-design.tsx"),
    route("language-support", "routes/language-support.tsx"),
    route("career-development", "routes/career-development.tsx"),

    // Operations
    route("editing-process", "routes/editing-process.tsx"),
    route("institutional-partnerships", "routes/institutional-partnerships.tsx"),
    route("pricing", "routes/pricing.tsx"),

    // Resources
    route("our-experts", "routes/our-experts.tsx"),
    route("knowledge-hub", "routes/knowledge-hub.tsx"),

    // Company
    route("about-us", "routes/about-us.tsx"),
    route("careers", "routes/careers.tsx"),
    route("contact-us", "routes/contact-us.tsx"),

    // Legal and Support
    route("editing-guarantee", "routes/editing-guarantee.tsx"),
    route("security-confidentiality", "routes/security-confidentiality.tsx"),
    route("privacy-policy", "routes/privacy-policy.tsx"),
    route("terms-of-service", "routes/terms-of-service.tsx"),
    route("cookie-policy", "routes/cookie-policy.tsx"),
    route("accessibility", "routes/accessibility.tsx"),
  ]),
] satisfies RouteConfig;
