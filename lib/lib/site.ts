export const site = {
  name: "Urgent Care of Ennis",
  fullName: "Urgent Care of Ennis",
  tagline: "Your Health Matters",
  // Canonical origin. Every absolute URL on the site (metadata, schema,
  // sitemap) derives from this so it can never drift between files.
  url: "https://www.urgentcareofennis.com",
  phone: "(469) 940-3431",
  phoneHref: "tel:+14699403431",
  // Front desk inbox — appointment requests are emailed here.
  frontDeskEmail: "fd.ucennis@wcgtx.com",
  address: {
    line1: "108 Chamber of Commerce Dr",
    line2: "Ennis, TX 75119",
    // Business name in the query so Directions lands on the clinic's Google
    // listing rather than a bare street address.
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Urgent%20Care%20of%20Ennis%2C%20108%20Chamber%20of%20Commerce%20Dr%2C%20Ennis%2C%20TX%2075119",
  },
  hours: "Monday – Saturday · 7:00 AM – 7:00 PM",
  hoursShort: ["Monday – Saturday", "7:00 AM – 7:00 PM"],
  // Self-pay new office visit, quoted on the home page.
  selfPayVisit: 150,
  social: {
    instagram: "https://www.instagram.com/urgentcareofennis/",
  },
  // 1200×630 share image used for Open Graph / Twitter cards.
  ogImage: "/og-image.png",
  // Google Tag Manager container for this site only (account "WCGTX" →
  // container "Urgent Care of Ennis"). GA4 (G-BRRVBZ2TSP) stays hard-coded in
  // layout.tsx on purpose; GTM is for additional pixels, so there is no GA4
  // tag inside the container and nothing double-counts.
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-P7FNFWK3",
};
