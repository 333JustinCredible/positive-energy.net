export type ProjectContentType =
  | "case-study"
  | "program-experience"
  | "capability";

export type ProjectImageRole =
  | "hero"
  | "sitework"
  | "electrical-infrastructure"
  | "power-block-installation"
  | "technical-detail"
  | "crew-action"
  | "completed-drone"
  | "active-charging";

export interface ProjectImage {
  src: string;
  role: ProjectImageRole;
  placeholderLabel: string;
  caption: string;
  alt: string;
  sortOrder: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string[];
  location?: string;
  year?: string;
  summary: string;
  metrics: string[];
  image?: string;
  contentType?: ProjectContentType;
  contractedBy?: string;
  metricsLabel?: string;
  challenge?: string;
  solution?: string;
  servicesProvided?: string[];
  equipmentTechnology?: string[];
  resultsSignificance?: string;
  projectImportance?: string;
  images?: ProjectImage[];
  coverImage?: ProjectImage;
  supportingImages?: ProjectImage[];
  sortOrder?: number;
}

export const PROJECT_PHOTO_DIRECTORY = "/images/projects";

export function projectPhotoPath(filename: string): string {
  return filename ? `${PROJECT_PHOTO_DIRECTORY}/${filename.replace(/^\/+/, "")}` : "";
}

export const projectsData: Project[] = [
  {
    id: "bonnaroo",
    slug: "bonnaroo",
    title: "Bonnaroo Music & Arts Festival",
    category: ["Resilient Power", "Commercial EV"],
    location: "Great Stage Park, TN",
    year: "Multi-year",
    summary: "Deployed annual EV charging infrastructure and off-grid event power resilience systems for one of the nation's premier outdoor music festivals.",
    metrics: ["100k+ Attendees Supported", "100% Off-grid Zones"],
    image: "/images/projects/bonnaroo.jpg"
  },
  {
    id: "luck-reunion",
    slug: "luck-reunion",
    title: "Luck Reunion — Battery-Powered Event Infrastructure",
    category: ["Remote Power", "Event Energy"],
    location: "Luck, Texas",
    year: "2023",
    summary:
      "Positive Energy participated in Willie Nelson’s Luck Reunion with support from the Music Sustainability Alliance to document and evaluate OverDrive Energy Solutions’ expanding battery-powered event infrastructure.\n\nIn the field, Positive Energy helped configure small- and medium-scale microgrids serving stages and other festival areas while interviewing production personnel and documenting the operational impact of replacing conventional generator infrastructure with distributed battery systems.",
    metrics: [
      "13th Luck Reunion",
      "OverDrive Energy Solutions / OVRDRV",
      "Music Sustainability Alliance",
    ],
    image: "/images/projects/luck-reunion.jpg",
    contentType: "case-study",
    metricsLabel: "Event context",
    solution:
      "Positive Energy supported and documented OverDrive’s battery-powered event infrastructure.",
    servicesProvided: [
      "Built and configured distributed battery microgrids",
      "Supported power deployment across stages and production areas",
      "Observed and documented system operation",
      "Interviewed production staff, vendors, and operators",
      "Evaluated power quality, logistics, safety, and usability",
      "Documented lessons learned and improvement opportunities",
      "Produced the post-event deployment report for the Music Sustainability Alliance",
    ],
    resultsSignificance:
      "The deployment demonstrated: Clean, consistent power; Extremely quiet operation; Less cabling and fewer cable ramps; Reduced refueling and maintenance requirements; Smaller, modular equipment footprints; Ability to position battery systems closer to loads; Centralized/live system monitoring; Faster and safer setup; Greater flexibility for changing and last-minute power needs.",
    projectImportance:
      "This project demonstrates Positive Energy’s ability to work beyond conventional electrical construction by combining temporary microgrids, battery systems, monitoring, field deployment, operational analysis, and stakeholder education in a live production environment.",
    images: [
      {
        role: "hero",
        src: "",
        placeholderLabel: "Festival / full-site scale",
        caption: "",
        alt: "",
        sortOrder: 0,
      },
      {
        role: "sitework",
        src: "",
        placeholderLabel: "Microgrid build",
        caption: "",
        alt: "",
        sortOrder: 1,
      },
      {
        role: "electrical-infrastructure",
        src: "",
        placeholderLabel: "Battery equipment",
        caption: "",
        alt: "",
        sortOrder: 2,
      },
      {
        role: "power-block-installation",
        src: "",
        placeholderLabel: "Stage power",
        caption: "",
        alt: "",
        sortOrder: 3,
      },
      {
        role: "technical-detail",
        src: "",
        placeholderLabel: "Monitoring / controls",
        caption: "",
        alt: "",
        sortOrder: 4,
      },
      {
        role: "crew-action",
        src: "",
        placeholderLabel: "Production crew / field work",
        caption: "",
        alt: "",
        sortOrder: 5,
      },
      {
        role: "completed-drone",
        src: "",
        placeholderLabel: "Nighttime festival operation",
        caption: "",
        alt: "",
        sortOrder: 6,
      },
      {
        role: "active-charging",
        src: "",
        placeholderLabel: "Finished operating system",
        caption: "",
        alt: "",
        sortOrder: 7,
      },
    ],
    sortOrder: 4,
  },
  {
    id: "nashville-tornado",
    slug: "nashville-tornado",
    title: "Nashville Tornado Recovery",
    category: ["Field Services", "Emergency Response"],
    location: "Nashville, TN",
    year: "2020",
    summary: "Led emergency power restoration for commercial facilities immediately following the devastating March 2020 tornadoes.",
    metrics: ["24/7 Dispatch", "Restored 15+ Commercial Facilities"],
    image: "/images/projects/nashville-tornado.jpg"
  },
  {
    id: "hurricane-helene",
    slug: "hurricane-helene-response",
    title: "Hurricane Helene Disaster Response",
    category: ["Disaster Response", "Resilient Power"],
    location: "Western North Carolina",
    year: "Fall 2024",
    summary: "Within two days of Hurricane Helene, Positive Energy deployed to western North Carolina as part of the FootPrint Project response team. Working within FootPrint’s broader disaster-response effort, Positive Energy helped identify communities facing extended outages and supported deployment of solar, battery, and satellite-communications resources where they could provide the greatest impact.",
    metrics: [
      "Within two days of Hurricane Helene",
      "FootPrint Project response team",
    ],
    contentType: "case-study",
    metricsLabel: "Response context",
    challenge: "Catastrophic flooding and infrastructure damage left communities without reliable electrical power, communications, refrigeration, and other essential services. Conditions and needs changed rapidly across isolated communities throughout western North Carolina.",
    solution: "Positive Energy’s work was part of FootPrint Project’s larger response effort, which brought together volunteers, clean-energy equipment, logistics, local officials, emergency services, community organizations, and other response partners.",
    servicesProvided: [
      "Coordinated with local utility representatives to help identify areas expected to experience prolonged outages",
      "Supported community resource centers with power and communications assessments",
      "Helped deploy small solar and battery systems",
      "Helped deploy and support Starlink communications",
      "Troubleshot temporary microgrids",
      "Assisted residents with essential-power needs",
      "Worked with local officials and other emergency-response organizations to identify additional resource needs",
      "Worked with the Pensacola Fire Department and National Guard in support of Camp Miller, a temporary relief and staging location serving displaced residents and responding personnel",
    ],
    resultsSignificance: "Positive Energy worked alongside or interacted with organizations and resources including FootPrint Project, local utility representatives, Pensacola Fire Department, National Guard / Air National Guard personnel, SpaceX / Starlink, Tesla, solar-industry volunteers and organizations, Samaritan’s Purse, Red Cross, and other state and local emergency-response organizations.",
    projectImportance: "This experience demonstrates Positive Energy’s ability to contribute effectively within a larger emergency-response organization, rapidly assess unfamiliar infrastructure, troubleshoot distributed-energy systems in the field, coordinate across multiple organizations, and help deploy practical power and communications solutions under difficult conditions.",
    image: "/images/projects/hurricane-helene.jpg",
    images: [
      {
        role: "hero",
        src: "",
        placeholderLabel: "Community response / deployment",
        caption: "",
        alt: "",
        sortOrder: 0,
      },
      {
        role: "sitework",
        src: "",
        placeholderLabel: "Utility and site assessment",
        caption: "",
        alt: "",
        sortOrder: 1,
      },
      {
        role: "electrical-infrastructure",
        src: "",
        placeholderLabel: "Solar + battery deployment",
        caption: "",
        alt: "",
        sortOrder: 2,
      },
      {
        role: "technical-detail",
        src: "",
        placeholderLabel: "Starlink / communications",
        caption: "",
        alt: "",
        sortOrder: 3,
      },
      {
        role: "power-block-installation",
        src: "",
        placeholderLabel: "Microgrid troubleshooting",
        caption: "",
        alt: "",
        sortOrder: 4,
      },
      {
        role: "crew-action",
        src: "",
        placeholderLabel: "Camp Miller",
        caption: "",
        alt: "",
        sortOrder: 5,
      },
      {
        role: "completed-drone",
        src: "",
        placeholderLabel: "Team / multi-agency collaboration",
        caption: "",
        alt: "",
        sortOrder: 6,
      },
      {
        role: "active-charging",
        src: "",
        placeholderLabel: "Community delivery / resident support",
        caption: "",
        alt: "",
        sortOrder: 7,
      },
    ],
    sortOrder: 3,
  },
  {
    id: "off-grid-fest",
    slug: "off-grid-fest",
    title: "Off-Grid Fest",
    category: ["Remote Power", "Distributed Energy"],
    location: "Southeast US",
    year: "2023",
    summary: "Built a temporary, fully renewable microgrid for an outdoor event, achieving a zero-generator operational footprint.",
    metrics: ["Zero Diesel Consumed", "100% Renewable Deployment"],
    image: "/images/projects/off-grid-fest.jpg"
  },
  {
    id: "deep-tropics",
    slug: "deep-tropics",
    title: "Deep Tropics Festival",
    category: ["Remote Power", "Solar + Storage"],
    location: "Nashville, TN",
    year: "2022",
    summary: "Provided remote solar and storage installation for an off-grid tropical-themed music festival focused on extreme sustainability.",
    metrics: ["Zero Grid Power Used", "Carbon Negative Event"],
    image: "/images/projects/deep-tropics.jpg"
  },
  {
    id: "nashville-earth-day",
    slug: "nashville-earth-day",
    title: "Nashville Earth Day",
    category: ["Commercial EV"],
    location: "Centennial Park, Nashville",
    year: "Annual",
    summary: "Activated the main EV showcase with temporary rapid charging infrastructure, supporting dozens of vehicles throughout the event.",
    metrics: ["20+ EVs Charged", "Temporary L2/DCFC Deployment"],
    image: "/images/projects/nashville-earth-day.jpg"
  },
  {
    id: "kia-dealership",
    slug: "kia-dealership",
    title: "Kia Dealership DCFC Install",
    category: ["Commercial EV", "Commercial Infrastructure"],
    location: "Nashville, TN",
    year: "2022",
    summary: "Delivered and commissioned an ABB DC fast charger for a Kia dealership, enabling on-lot rapid charging for new EV inventory and customer test drives.",
    metrics: ["ABB DCFC Hardware", "Same-Day Commission"],
    image: "/images/projects/kia-dealership.jpg"
  },
  {
    id: "lexus-greenville",
    slug: "lexus-greenville",
    title: "Lexus of Greenville EV Charging",
    category: ["Commercial EV", "Dealership"],
    location: "Greenville, SC",
    year: "2023",
    summary: "Designed and installed a multi-unit ChargePoint Level 2 charging array and ABB wall charger at the Lexus of Greenville dealership, delivering a branded EV charging experience for customers and inventory.",
    metrics: ["6 Charging Stations", "ChargePoint + ABB Hardware"],
    image: "/photos/lexus-greenville-exterior-chargepoint-row.jpg"
  },
  {
    id: "chuck-hutton-toyota",
    slug: "chuck-hutton-toyota",
    title: "Chuck Hutton Toyota",
    category: [],
    location: "Memphis, Tennessee",
    year: "Early 2024 – Late 2024",
    summary: "Positive Energy delivered the complete EV charging network installation for Chuck Hutton Toyota’s Electri-CITY Park in Memphis, including the electrical infrastructure from the utility transformer through the ChargePoint Express Plus Power Blocks and underground distribution to the charging dispensers.",
    metrics: [
      "12 ChargePoint Express Plus Power Blocks",
      "Up to 200 kW per Power Block",
      "6 dual-head ChargePoint Power Links"
    ],
    contentType: "case-study",
    contractedBy: "Land Valente Industries",
    metricsLabel: "System scale",
    challenge: "Chuck Hutton Toyota was developing a large-scale public EV charging destination requiring significantly more infrastructure than a typical dealership charging installation. The system required high-power 480V electrical distribution, centralized DC power conversion, underground distribution, multiple charging dispensers, networking, commissioning, and coordination with the broader energy infrastructure at the site.",
    solution: "Positive Energy was responsible for the complete installation of the EV charging network. Power was provided to the site transformer, and Positive Energy installed the charging infrastructure from the transformer through the main 400A, 480V disconnects, ChargePoint Express Plus Power Blocks, underground distribution, Power Links, and charging dispensers.",
    servicesProvided: [
      "480V electrical distribution",
      "Conduit and feeder installation",
      "Underground electrical infrastructure",
      "Equipment placement and installation",
      "ChargePoint Express Plus installation",
      "Power Link installation",
      "Networking and commissioning",
      "Operations & maintenance support",
      "Assistance with solar design",
      "Battery/microgrid planning support"
    ],
    equipmentTechnology: [
      "12 ChargePoint Express Plus Power Blocks",
      "Up to 200 kW per Power Block",
      "6 dual-head ChargePoint Power Links"
    ],
    resultsSignificance: "The completed charging network became the centerpiece of Chuck Hutton Toyota’s Electri-CITY Park and demonstrates Positive Energy’s ability to deliver complex, high-power EV charging infrastructure from major electrical distribution through commissioning and lifecycle support.",
    projectImportance: "This project demonstrates capability beyond installing charging dispensers. Positive Energy delivered the electrical and civil infrastructure required to move power from the site transformer through centralized DC power equipment and underground distribution to the final charging points.",
    images: [
      {
        role: "hero",
        src: "",
        placeholderLabel: "Hero image / finished site or strongest drone",
        caption: "",
        alt: "",
        sortOrder: 0,
      },
      {
        role: "sitework",
        src: "",
        placeholderLabel: "Sitework / trenching",
        caption: "",
        alt: "",
        sortOrder: 1,
      },
      {
        role: "electrical-infrastructure",
        src: "",
        placeholderLabel: "Electrical infrastructure",
        caption: "",
        alt: "",
        sortOrder: 2,
      },
      {
        role: "power-block-installation",
        src: "",
        placeholderLabel: "Power Block installation",
        caption: "",
        alt: "",
        sortOrder: 3,
      },
      {
        role: "technical-detail",
        src: "",
        placeholderLabel: "Technical detail",
        caption: "",
        alt: "",
        sortOrder: 4,
      },
      {
        role: "crew-action",
        src: "",
        placeholderLabel: "Crew / field work",
        caption: "",
        alt: "",
        sortOrder: 5,
      },
      {
        role: "completed-drone",
        src: "",
        placeholderLabel: "Completed drone view",
        caption: "",
        alt: "",
        sortOrder: 6,
      },
      {
        role: "active-charging",
        src: "",
        placeholderLabel: "Active charging / finished system",
        caption: "",
        alt: "",
        sortOrder: 7,
      },
    ],
    sortOrder: 0,
  },
  {
    id: "toyota-lexus-multi-site",
    slug: "toyota-lexus-multi-site",
    title: "Toyota & Lexus Multi-Site EV Charging Experience",
    category: ["Commercial EV", "Dealership"],
    summary: "Positive Energy has supported EV charging installations at approximately 45 Toyota dealerships and 11 Lexus dealerships across Tennessee, Georgia, South Carolina, North Carolina, Kentucky, Alabama, Mississippi, and Florida.",
    metrics: [
      "Approximately 45 Toyota dealerships",
      "11 Lexus dealerships",
      "8 states across the Southeast",
      "6 Lexus Charging Stations",
      "ChargePoint + ABB Hardware",
    ],
    contentType: "program-experience",
    metricsLabel: "Program scale",
    solution: "Working primarily on retrofit projects, Positive Energy served as the EV charging specialist from the existing electrical distribution system through final charger commissioning. At Lexus of Greenville, this included a multi-unit ChargePoint Level 2 charging array and ABB wall charger; a confirmed Toyota dealership deployment used a ChargePoint DC fast charger.",
    servicesProvided: [
      "Breaker-to-charger electrical installation",
      "Conduit, conductors, disconnects, and related electrical infrastructure",
      "Charger installation and configuration",
      "Networking and monitoring integration",
      "Testing and commissioning",
      "Dealership owner and staff instruction on EVs, charger operation, and charger benefits",
      "ChargePoint Level 2 charging array installation",
      "ABB Level 2 wall charger installation",
      "ChargePoint DC fast charger installation",
    ],
    equipmentTechnology: [
      "ChargePoint",
      "ABB",
      "Blink",
      "EVgo",
      "eConnect",
      "6 ChargePoint Level 2 charging stations at Lexus of Greenville",
      "ABB Level 2 wall charger at Lexus of Greenville",
      "ChargePoint DC fast charger at a Toyota dealership",
    ],
    resultsSignificance: "Lane Valente Industries served as the primary general contractor for much of this work. Repeated dealership deployments allowed Positive Energy to develop substantial experience working within active automotive facilities and adapting EV charging infrastructure to existing electrical systems. These confirmed dealership deployments demonstrate a repeatable EV charging installation experience across Toyota and Lexus environments.",
    projectImportance: "This program experience demonstrates repeatability across dozens of active dealership environments, multiple states, charger manufacturers, electrical conditions, and retrofit scenarios. It represents dealership-level experience and does not assert a corporate Toyota or Lexus mandate.",
    images: [
      {
        role: "hero",
        src: "/photos/lexus-greenville-exterior-chargepoint-row.jpg",
        placeholderLabel: "Hero / representative dealership",
        caption: "Lexus of Greenville — ChargePoint Row",
        alt: "Lexus of Greenville dealership facade with three installed ChargePoint Level 2 pedestal chargers in the customer parking lot",
        sortOrder: 0,
      },
      {
        role: "sitework",
        src: "/photos/lexus-greenville-chargepoint-install-day.jpg",
        placeholderLabel: "Installation / field work",
        caption: "Lexus of Greenville — Install Day",
        alt: "Installation day at Lexus of Greenville with ChargePoint charger being set in place by the Positive Energy crew",
        sortOrder: 1,
      },
      {
        role: "technical-detail",
        src: "/photos/lexus-greenville-abb-wall-charger.jpg",
        placeholderLabel: "Charging equipment",
        caption: "Lexus of Greenville — ABB Wall Charger",
        alt: "ABB Level 2 wall-mounted EV charger installed in the interior of the Lexus of Greenville dealership",
        sortOrder: 2,
      },
      {
        role: "completed-drone",
        src: "/photos/toyota-dealership-chargepoint-dcfc-exterior.jpg",
        placeholderLabel: "Completed site",
        caption: "Toyota Dealership — ChargePoint DCFC",
        alt: "ChargePoint DC fast charger installed at a Toyota dealership exterior, mounted in front of the branded showroom facade",
        sortOrder: 3,
      },
    ],
    sortOrder: 2,
  },
  {
    id: "residential-energy-distributed-power",
    slug: "residential-energy-distributed-power",
    title: "Residential Energy & Distributed Power",
    category: ["Residential Energy", "Distributed Power"],
    location: "Tennessee",
    summary:
      "Positive Energy develops integrated residential energy systems that combine battery storage, solar, EV charging, backup power, electrical infrastructure, and energy management.\n\nOur approach considers the property as a complete energy system — how power is generated, stored, distributed, monitored, and used — with a focus on resilience, flexibility, freedom, and energy independence.",
    metrics: ["Tennessee"],
    contentType: "capability",
    metricsLabel: "Primary market",
    solution:
      "Positive Energy is best suited for technically complex residential projects where multiple systems must work together. This may include large homes, custom residences, estates, high electrical demand, multiple EVs, backup-power requirements, or properties seeking greater energy freedom and independence.\n\nFor specialized projects, Positive Energy can coordinate with experienced solar designers, engineers, battery specialists, manufacturers, and other industry partners as required.",
    servicesProvided: [
      "Whole-home and partial-home battery backup",
      "Solar + battery storage integration",
      "EV charging integration",
      "Energy monitoring and load management",
      "Electrical service and distribution upgrades",
      "Off-grid and remote power systems",
      "System design and equipment coordination",
      "Commissioning and ongoing technical support",
    ],
    images: [
      {
        role: "hero",
        src: "",
        placeholderLabel: "Premium residential electrical / energy system",
        caption: "",
        alt: "",
        sortOrder: 0,
      },
      {
        role: "sitework",
        src: "",
        placeholderLabel: "Whole-home electrical panel or service equipment",
        caption: "",
        alt: "",
        sortOrder: 1,
      },
      {
        role: "electrical-infrastructure",
        src: "",
        placeholderLabel: "Residential EV charging",
        caption: "",
        alt: "",
        sortOrder: 2,
      },
      {
        role: "power-block-installation",
        src: "",
        placeholderLabel: "Energy monitoring / controls",
        caption: "",
        alt: "",
        sortOrder: 3,
      },
      {
        role: "technical-detail",
        src: "",
        placeholderLabel: "Battery storage / backup power",
        caption: "",
        alt: "",
        sortOrder: 4,
      },
      {
        role: "crew-action",
        src: "",
        placeholderLabel: "Solar / off-grid equipment",
        caption: "",
        alt: "",
        sortOrder: 5,
      },
      {
        role: "completed-drone",
        src: "",
        placeholderLabel: "Technical installation detail",
        caption: "",
        alt: "",
        sortOrder: 6,
      },
      {
        role: "active-charging",
        src: "",
        placeholderLabel: "Completed integrated residential system",
        caption: "",
        alt: "",
        sortOrder: 7,
      },
    ],
    sortOrder: 5,
  },
  {
    id: "ev-charging-service-om-technical-support",
    slug: "ev-charging-service-om-technical-support",
    title: "EV Charging Service, O&M & Technical Support",
    category: ["EV Charging", "Field Services"],
    location: "Tennessee and the Southeast",
    summary:
      "Positive Energy helps owners, operators, contractors, and facility teams keep complex energy infrastructure working. From commissioning new equipment to diagnosing failed chargers, correcting electrical issues, upgrading existing systems, and supporting ongoing maintenance, we provide practical field expertise across the full equipment lifecycle.",
    metrics: ["Tennessee and the Southeast", "Select nationwide support"],
    contentType: "capability",
    metricsLabel: "Primary market",
    solution:
      "Positive Energy supports EV charging and distributed-energy systems throughout their operating life, not just during installation.",
    servicesProvided: [
      "EV charger troubleshooting and repair",
      "DC fast charger diagnostics",
      "Preventive maintenance and O&M",
      "Commissioning and recommissioning",
      "Networking and connectivity troubleshooting",
      "NACS cable replacement and equipment upgrades",
      "Electrical diagnostics and corrective work",
      "Energy monitoring systems",
      "Site assessments and system evaluations",
      "Manufacturer and technical-support coordination",
      "Design and engineering support",
      "Existing-system upgrades and corrections",
    ],
    images: [
      {
        role: "hero",
        src: "",
        placeholderLabel: "Commercial EV equipment service",
        caption: "",
        alt: "",
        sortOrder: 0,
      },
      {
        role: "sitework",
        src: "",
        placeholderLabel: "DC fast charger diagnostics",
        caption: "",
        alt: "",
        sortOrder: 1,
      },
      {
        role: "electrical-infrastructure",
        src: "",
        placeholderLabel: "Internal charger / electrical troubleshooting",
        caption: "",
        alt: "",
        sortOrder: 2,
      },
      {
        role: "power-block-installation",
        src: "",
        placeholderLabel: "NACS or charging-cable replacement",
        caption: "",
        alt: "",
        sortOrder: 3,
      },
      {
        role: "technical-detail",
        src: "",
        placeholderLabel: "Commissioning / testing",
        caption: "",
        alt: "",
        sortOrder: 4,
      },
      {
        role: "crew-action",
        src: "",
        placeholderLabel: "Energy monitoring system",
        caption: "",
        alt: "",
        sortOrder: 5,
      },
      {
        role: "completed-drone",
        src: "",
        placeholderLabel: "Commercial electrical troubleshooting",
        caption: "",
        alt: "",
        sortOrder: 6,
      },
      {
        role: "active-charging",
        src: "",
        placeholderLabel: "Site assessment / field documentation",
        caption: "",
        alt: "",
        sortOrder: 7,
      },
    ],
    sortOrder: 6,
  },
];
