export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  project?: string;
  tags: string[];
  year: string;
  location?: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  // Lexus of Greenville — ChargePoint L2 multi-unit install
  {
    id: "lexus-greenville-exterior",
    src: "/photos/lexus-greenville-exterior-chargepoint-row.jpg",
    alt: "Lexus of Greenville dealership facade with three installed ChargePoint Level 2 pedestal chargers in the customer parking lot",
    caption: "Lexus of Greenville — ChargePoint Row",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    year: "2023",
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-pedestal-close",
    src: "/photos/lexus-greenville-chargepoint-pedestal-close.jpg",
    alt: "ChargePoint dual-port Level 2 pedestal charger with Lexus branding at Lexus of Greenville dealership",
    caption: "Lexus of Greenville — ChargePoint Pedestal Detail",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    year: "2023",
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-abb-wall",
    src: "/photos/lexus-greenville-abb-wall-charger.jpg",
    alt: "ABB Level 2 wall-mounted EV charger installed in the interior of the Lexus of Greenville dealership",
    caption: "Lexus of Greenville — ABB Wall Charger (Interior)",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ABB", "Lexus", "Dealership"],
    year: "2023",
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-pedestal-sky",
    src: "/photos/lexus-greenville-chargepoint-pedestal-sky.jpg",
    alt: "ChargePoint Level 2 pedestal charger at Lexus of Greenville shot against a clear blue sky",
    caption: "Lexus of Greenville — ChargePoint Pedestal",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    year: "2023",
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-rx-lot",
    src: "/photos/lexus-greenville-rx-charging-lot.jpg",
    alt: "Lexus RX electric vehicle plugged into a branded ChargePoint Level 2 charger in the full Lexus of Greenville dealer lot",
    caption: "Lexus of Greenville — Lexus RX Charging",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    year: "2023",
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-install-day",
    src: "/photos/lexus-greenville-chargepoint-install-day.jpg",
    alt: "Installation day at Lexus of Greenville with ChargePoint charger being set in place by the Positive Energy crew",
    caption: "Lexus of Greenville — Install Day",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership", "Installation"],
    year: "2023",
    location: "Greenville, SC",
  },

  // Kia Dealership Nashville — ABB DCFC
  {
    id: "kia-dcfc-install",
    src: "/photos/kia-dcfc-install.jpg",
    alt: "ABB DC fast charger installation in progress at a Kia dealership in Nashville, Tennessee",
    caption: "Kia Nashville — ABB DCFC Install",
    project: "kia-dealership",
    tags: ["Commercial EV", "ABB", "DCFC", "Dealership"],
    year: "2022",
    location: "Nashville, TN",
  },
  {
    id: "kia-dcfc-site-wide",
    src: "/photos/kia-dcfc-site-wide.jpg",
    alt: "Wide-angle view of the ABB DC fast charger job site at Kia of Nashville dealership",
    caption: "Kia Nashville — DCFC Site Overview",
    project: "kia-dealership",
    tags: ["Commercial EV", "ABB", "DCFC", "Dealership"],
    year: "2022",
    location: "Nashville, TN",
  },

  // 2022 Commercial Installs
  {
    id: "commercial-ev-charger-install-team",
    src: "/photos/commercial-ev-charger-install-team.jpg",
    alt: "Two Positive Energy technicians commissioning a commercial EV charger pedestal unit outdoors in the evening",
    caption: "Commercial EV Charger — Field Installation Team",
    tags: ["Commercial EV", "Installation", "Field Services"],
    year: "2022",
  },
  {
    id: "kia-ev6-abb-wall-charger",
    src: "/photos/kia-ev6-abb-wall-charger-dealership.jpg",
    alt: "White Kia EV6 plugged into an ABB Level 2 wall-mounted charger at a Kia dealership service area",
    caption: "Kia EV6 on ABB Level 2 Charger",
    project: "kia-dealership",
    tags: ["Commercial EV", "ABB", "Dealership", "Kia"],
    year: "2022",
  },
  {
    id: "ev-showcase-fleet-event",
    src: "/photos/ev-showcase-commercial-fleet-event.jpg",
    alt: "Multiple electric vehicles including Tesla Model X, Tesla Model 3, and Chevy Bolt on display at a commercial EV showcase event",
    caption: "Commercial EV Fleet Showcase Event",
    tags: ["Commercial EV", "Events", "Fleet"],
    year: "2022",
  },
  {
    id: "commercial-construction-walkthrough",
    src: "/photos/commercial-construction-site-walkthrough.jpg",
    alt: "Engineering and project team in hard hats and safety vests conducting a site walkthrough on a high-rise commercial construction floor with panoramic city views",
    caption: "High-Rise Commercial Construction Site Walk",
    tags: ["Commercial Infrastructure", "Field Services", "Construction"],
    year: "2022",
  },
  {
    id: "commercial-construction-interior",
    src: "/photos/commercial-construction-site-interior.jpg",
    alt: "Construction team inspection on a high-rise commercial building floor with sweeping mountain and city views through floor-to-ceiling glass curtain wall",
    caption: "Commercial High-Rise Interior Inspection",
    tags: ["Commercial Infrastructure", "Field Services", "Construction"],
    year: "2022",
  },
  {
    id: "commercial-construction-exterior",
    src: "/photos/large-commercial-construction-site-exterior.jpg",
    alt: "Large commercial construction site exterior with tower crane, steel framework, and Positive Energy team conducting safety briefing in an urban downtown setting",
    caption: "Large Commercial Construction — Site Briefing",
    tags: ["Commercial Infrastructure", "Field Services", "Construction"],
    year: "2022",
  },
  {
    id: "kia-chattanooga-wall-charger",
    src: "/photos/kia-chattanooga-abb-chargepoint-wall-charger.jpg",
    alt: "ABB and ChargePoint Level 2 wall chargers installed side by side at Kia of Chattanooga dealership service entrance",
    caption: "Kia Chattanooga — ABB & ChargePoint Wall Chargers",
    tags: ["Commercial EV", "ABB", "ChargePoint", "Dealership", "Kia"],
    year: "2022",
    location: "Chattanooga, TN",
  },
  {
    id: "commercial-indoor-chargepoint",
    src: "/photos/commercial-indoor-chargepoint-l2-wall-mount.jpg",
    alt: "ChargePoint Level 2 charger mounted on interior concrete block wall with overhead conduit run in an industrial commercial space",
    caption: "Commercial Indoor ChargePoint L2 Install",
    tags: ["Commercial EV", "ChargePoint", "Installation"],
    year: "2022",
  },
  {
    id: "commercial-chargepoint-bosch-panel",
    src: "/photos/commercial-chargepoint-bosch-l2-panel-install.jpg",
    alt: "ChargePoint outlet and Bosch Level 2 EV charger installed alongside an Eaton electrical panel in a commercial facility",
    caption: "ChargePoint + Bosch L2 & Eaton Panel Install",
    tags: ["Commercial EV", "ChargePoint", "Installation"],
    year: "2023",
  },

  // 2023 Other Installs
  {
    id: "toyota-chargepoint-dcfc",
    src: "/photos/toyota-dealership-chargepoint-dcfc-exterior.jpg",
    alt: "ChargePoint DC fast charger installed at a Toyota dealership exterior, mounted in front of the branded showroom facade",
    caption: "Toyota Dealership — ChargePoint DCFC",
    tags: ["Commercial EV", "ChargePoint", "DCFC", "Dealership"],
    year: "2023",
  },
  {
    id: "commercial-ev-trenching",
    src: "/photos/commercial-ev-infrastructure-trenching.jpg",
    alt: "Underground conduit trenching for EV charging infrastructure at a commercial automotive facility, heavy equipment and crew on site",
    caption: "Commercial EV Infrastructure — Trenching & Conduit",
    tags: ["Commercial EV", "Installation", "Commercial Infrastructure"],
    year: "2023",
  },
  {
    id: "dealership-chargepoint-pedestal-row",
    src: "/photos/dealership-chargepoint-l2-pedestal-row.jpg",
    alt: "Row of numbered ChargePoint Level 2 pedestal chargers in a commercial auto dealership parking lot with Tesla Model 3 visible in background",
    caption: "Dealership ChargePoint L2 Pedestal Row",
    tags: ["Commercial EV", "ChargePoint", "Dealership"],
    year: "2023",
  },
  {
    id: "abb-terra-dcfc-outdoor",
    src: "/photos/abb-terra-dcfc-dual-port-outdoor.jpg",
    alt: "ABB Terra dual-port DC fast charger with CCS and CHAdeMO connectors installed outdoors, standalone unit in commercial parking area",
    caption: "ABB Terra Dual-Port DCFC — Outdoor Install",
    tags: ["Commercial EV", "ABB", "DCFC"],
    year: "2023",
  },
];

export const allTags = Array.from(
  new Set(galleryPhotos.flatMap((p) => p.tags))
).sort();
