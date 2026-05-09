/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://truestarcontracting.com",
  generateRobotsTxt: true,
  exclude: ["/admin/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/admin/" },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Custom priority per path
    let priority = 0.7;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path.startsWith("/services/")) {
      priority = 0.9;
      changefreq = "monthly";
    } else if (path === "/service-areas") {
      priority = 0.85;
    } else if (path.startsWith("/service-areas/")) {
      const parts = path.split("/").filter(Boolean);
      if (parts.length === 3) {
        // town×service
        // Determine tier by checking if slug appears in tier1/tier2/tier3
        const tier1Towns = ["north-arlington","kearny","belleville","lyndhurst","harrison","rutherford","east-rutherford","nutley","bloomfield","newark","jersey-city","hoboken","secaucus","wallington","wood-ridge","carlstadt","north-bergen","union-city","weehawken","west-new-york","guttenberg","moonachie"];
        const tier2Towns = ["montclair","glen-ridge","clifton","passaic","garfield","elmwood-park","fairview","cliffside-park","edgewater","fort-lee","palisades-park","leonia","ridgefield","ridgefield-park","little-ferry","hackensack","lodi","hasbrouck-heights","south-hackensack","teterboro","east-newark","irvington","orange"];
        const townSlug = parts[1];
        if (tier1Towns.includes(townSlug)) priority = 0.9;
        else if (tier2Towns.includes(townSlug)) priority = 0.8;
        else priority = 0.7;
      } else if (parts.length === 2) {
        // town landing
        const tier1Towns = ["north-arlington","kearny","belleville","lyndhurst","harrison","rutherford","east-rutherford","nutley","bloomfield","newark","jersey-city","hoboken","secaucus","wallington","wood-ridge","carlstadt","north-bergen","union-city","weehawken","west-new-york","guttenberg","moonachie"];
        const tier2Towns = ["montclair","glen-ridge","clifton","passaic","garfield","elmwood-park","fairview","cliffside-park","edgewater","fort-lee","palisades-park","leonia","ridgefield","ridgefield-park","little-ferry","hackensack","lodi","hasbrouck-heights","south-hackensack","teterboro","east-newark","irvington","orange"];
        const townSlug = parts[1];
        if (tier1Towns.includes(townSlug)) priority = 0.85;
        else if (tier2Towns.includes(townSlug)) priority = 0.75;
        else priority = 0.65;
      }
    } else if (["/gallery", "/reviews", "/contact", "/estimate"].includes(path)) {
      priority = 0.6;
    } else if (path === "/about") {
      priority = 0.5;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
