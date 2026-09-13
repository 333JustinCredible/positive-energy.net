export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  project?: string;
  tags: string[];
  year?: string;
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
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-pedestal-close",
    src: "/photos/lexus-greenville-chargepoint-pedestal-close.jpg",
    alt: "ChargePoint dual-port Level 2 pedestal charger with Lexus branding at Lexus of Greenville dealership",
    caption: "Lexus of Greenville — ChargePoint Pedestal Detail",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-abb-wall",
    src: "/photos/lexus-greenville-abb-wall-charger.jpg",
    alt: "ABB DC fast charger installed at Lexus of Greenville in South Carolina",
    caption: "Lexus of Greenville — ABB DC Fast Charger",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ABB", "DCFC", "Lexus", "Dealership"],
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-pedestal-sky",
    src: "/photos/lexus-greenville-chargepoint-pedestal-sky.jpg",
    alt: "ChargePoint Level 2 pedestal charger at Lexus of Greenville shot against a clear blue sky",
    caption: "Lexus of Greenville — ChargePoint Pedestal",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-rx-lot",
    src: "/photos/lexus-greenville-rx-charging-lot.jpg",
    alt: "Lexus vehicle connected to a branded charging pedestal in the Lexus of Greenville dealer lot",
    caption: "Lexus of Greenville — Vehicle Charging",
    project: "lexus-greenville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership"],
    location: "Greenville, SC",
  },
  {
    id: "lexus-greenville-install-day",
    src: "/photos/lexus-greenville-chargepoint-install-day.jpg",
    alt: "ChargePoint Level 2 EV charger installed at Lexus in Huntsville, Alabama.",
    caption: "ChargePoint Level 2 EV charger installation at Lexus Huntsville.",
    project: "lexus-huntsville",
    tags: ["Commercial EV", "ChargePoint", "Lexus", "Dealership", "Installation"],
    location: "Huntsville, AL",
  },

  // Kia Dealership Nashville — ABB DCFC
  {
    id: "kia-dcfc-install",
    src: "/photos/kia-dcfc-install.jpg",
    alt: "ABB DC fast charger installation in progress at a Kia dealership in Nashville, Tennessee",
    caption: "Kia Nashville — ABB DCFC Install",
    project: "kia-dealership",
    tags: ["Commercial EV", "ABB", "DCFC", "Dealership"],
    location: "Nashville, TN",
  },
  {
    id: "kia-dcfc-site-wide",
    src: "/photos/kia-dcfc-site-wide.jpg",
    alt: "Wide-angle view of the ABB DC fast charger job site at Kia of Nashville dealership",
    caption: "Kia Nashville — DCFC Site Overview",
    project: "kia-dealership",
    tags: ["Commercial EV", "ABB", "DCFC", "Dealership"],
    location: "Nashville, TN",
  },

  // 2022 Commercial Installs
  {
    id: "commercial-ev-charger-install-team",
    src: "/photos/commercial-ev-charger-install-team.jpg",
    alt: "Two people commission a commercial EV charger pedestal outdoors in the evening",
    caption: "Commercial EV Charger — Field Commissioning",
    tags: ["Commercial EV", "Installation", "Field Services"],
  },
  {
    id: "kia-ev6-abb-wall-charger",
    src: "/photos/kia-ev6-abb-wall-charger-dealership.jpg",
    alt: "White vehicle connected to a wall-mounted charger at a dealership service area",
    caption: "Dealership Vehicle on Wall-Mounted Charger",
    project: "kia-dealership",
    tags: ["Commercial EV", "ABB", "Dealership", "Kia"],
  },
  {
    id: "ev-showcase-fleet-event",
    src: "/photos/ev-showcase-commercial-fleet-event.jpg",
    alt: "Multiple vehicles on display at a commercial vehicle showcase event",
    caption: "Commercial EV Fleet Showcase Event",
    tags: ["Commercial EV", "Events", "Fleet"],
  },
  {
    id: "commercial-construction-walkthrough",
    src: "/photos/commercial-construction-site-walkthrough.jpg",
    alt: "Workers in hard hats and safety vests conduct a site walkthrough on a high-rise commercial construction floor with panoramic city views",
    caption: "High-Rise Commercial Construction Site Walk",
    tags: ["Commercial Infrastructure", "Field Services", "Construction"],
  },
  {
    id: "commercial-construction-interior",
    src: "/photos/commercial-construction-site-interior.jpg",
    alt: "Workers inspect a high-rise commercial building floor with mountain and city views through a glass curtain wall",
    caption: "Commercial High-Rise Interior Inspection",
    tags: ["Commercial Infrastructure", "Field Services", "Construction"],
  },
  {
    id: "commercial-construction-exterior",
    src: "/photos/large-commercial-construction-site-exterior.jpg",
    alt: "Large commercial construction site exterior with a tower crane, steel framework, and workers gathered for a safety briefing",
    caption: "Large Commercial Construction — Site Briefing",
    tags: ["Commercial Infrastructure", "Field Services", "Construction"],
  },
  {
    id: "kia-chattanooga-wall-charger",
    src: "/photos/kia-chattanooga-abb-chargepoint-wall-charger.jpg",
    alt: "Wall-mounted EV chargers installed side by side at a dealership service entrance",
    caption: "Dealership — Wall-Mounted EV Chargers",
    tags: ["Commercial EV", "Dealership"],
    location: "Chattanooga, TN",
  },
  {
    id: "commercial-indoor-chargepoint",
    src: "/photos/commercial-indoor-chargepoint-l2-wall-mount.jpg",
    alt: "Wall-mounted EV charger installed on an interior concrete block wall with overhead conduit",
    caption: "Commercial Indoor EV Charger Install",
    tags: ["Commercial EV", "Installation"],
  },
  {
    id: "commercial-chargepoint-bosch-panel",
    src: "/photos/commercial-chargepoint-bosch-l2-panel-install.jpg",
    alt: "EV charging equipment installed alongside an electrical panel in a commercial facility",
    caption: "EV Charging Equipment and Electrical Panel",
    tags: ["Commercial EV", "ChargePoint", "Installation"],
  },

  // 2023 Other Installs
  {
    id: "toyota-chargepoint-dcfc",
    src: "/photos/toyota-dealership-chargepoint-dcfc-exterior.jpg",
    alt: "ChargePoint DC fast charger installed at a Toyota dealership exterior, mounted in front of the branded showroom facade",
    caption: "Toyota Dealership — ChargePoint DCFC",
    tags: ["Commercial EV", "ChargePoint", "DCFC", "Dealership"],
  },
  {
    id: "commercial-ev-trenching",
    src: "/photos/commercial-ev-infrastructure-trenching.jpg",
    alt: "Underground conduit trenching for EV charging infrastructure at a commercial automotive facility, heavy equipment and crew on site",
    caption: "Commercial EV Infrastructure — Trenching & Conduit",
    tags: ["Commercial EV", "Installation", "Commercial Infrastructure"],
  },
  {
    id: "dealership-chargepoint-pedestal-row",
    src: "/photos/dealership-chargepoint-l2-pedestal-row.jpg",
    alt: "Row of numbered Level 2 pedestal chargers in a commercial auto dealership parking lot",
    caption: "Dealership Level 2 Pedestal Row",
    tags: ["Commercial EV", "Dealership"],
  },
  {
    id: "abb-terra-dcfc-outdoor",
    src: "/photos/abb-terra-dcfc-dual-port-outdoor.jpg",
    alt: "Dual-port DC fast charger with two charging connectors installed outdoors in a commercial parking area",
    caption: "Dual-Port DC Fast Charger — Outdoor Install",
    tags: ["Commercial EV", "DCFC"],
  },
];

export const allTags = Array.from(
  new Set(galleryPhotos.flatMap((p) => p.tags))
).sort();
