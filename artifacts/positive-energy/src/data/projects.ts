import { finalPhotoMetadata } from "@/data/final-photo-metadata";

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

export function projectPhoto(
  filename: string,
  role: ProjectImageRole,
  placeholderLabel: string,
  sortOrder: number,
): ProjectImage {
  const metadata = finalPhotoMetadata[filename];
  if (!metadata) {
    throw new Error(`Missing spreadsheet metadata for final photo: ${filename}`);
  }

  return {
    src: projectPhotoPath(filename),
    role,
    placeholderLabel,
    caption: metadata.caption,
    alt: metadata.alt,
    sortOrder,
  };
}

export const projectsData: Project[] = [
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
    image: "/images/projects/willie-nelson-luck-reunion-tx-overdrive-battery-bank-stage-1-03-25.jpg",
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
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-battery-bank-stage-1-03-25.jpg",
        "hero",
        "Festival / full-site scale",
        0,
      ),
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-solar-field-install-1-03-25.jpg",
        "sitework",
        "Microgrid build",
        1,
      ),
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-battery-microgrid-1-03-25.jpg",
        "electrical-infrastructure",
        "Battery equipment",
        2,
      ),
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-solar-stage-setup-1-03-25.jpg",
        "power-block-installation",
        "Stage power",
        3,
      ),
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-battery-hotswap-1-03-25.jpg",
        "technical-detail",
        "Monitoring / controls",
        4,
      ),
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-solar-field-install-2-03-25.jpg",
        "crew-action",
        "Production crew / field work",
        5,
      ),
      projectPhoto(
        "willie-nelson-luck-reunion-tx-overdrive-battery-tour-bus-1-03-25.jpg",
        "completed-drone",
        "Nighttime festival operation",
        6,
      ),
    ],
    sortOrder: 4,
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
    image: "/images/projects/footprint-project-hurricane-helene-microgrid-camp-miller-2-10-24.jpg",
    images: [
      projectPhoto(
        "footprint-project-hurricane-helene-relief-barnardsville-1-10-24.jpg",
        "electrical-infrastructure",
        "Community response / deployment",
        0,
      ),
      projectPhoto(
        "footprint-project-hurricane-helene-relief-camp-miller-1-10-24.jpg",
        "sitework",
        "Utility and site assessment",
        1,
      ),
      projectPhoto(
        "footprint-project-hurricane-helene-microgrid-camp-miller-2-10-24.jpg",
        "hero",
        "Solar + battery deployment",
        2,
      ),
      projectPhoto(
        "footprint-helene-asheville-nc-atmospheric-water-generator-10-24.jpg",
        "technical-detail",
        "Starlink / communications",
        3,
      ),
      projectPhoto(
        "footprint-project-hurricane-helene-microgrid-camp-miller-3-10-24.jpg",
        "power-block-installation",
        "Microgrid troubleshooting",
        4,
      ),
      projectPhoto(
        "footprint-project-hurricane-helene-relief-free-solar-big-ivy-10-24.jpg",
        "crew-action",
        "Camp Miller",
        5,
      ),
      projectPhoto(
        "footprint-project-hurricane-helene-relief-mandala-springs-nc-10-24.jpg",
        "completed-drone",
        "Team / multi-agency collaboration",
        6,
      ),
      projectPhoto(
        "footprint-project-hurricane-helene-relief-barnardsville-2-10-24.jpg",
        "active-charging",
        "Community delivery / resident support",
        7,
      ),
    ],
    sortOrder: 3,
  },
  {
    id: "chuck-hutton-toyota",
    slug: "chuck-hutton-toyota",
    title: "Chuck Hutton Toyota — Electri-CITY Park",
    category: [],
    location: "Memphis, Tennessee",
    year: "Early 2024 – Late 2024",
    image: "/images/projects/chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-7-04-24.jpg",
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
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-1-04-24.jpg",
        "completed-drone",
        "Hero image / finished site or strongest drone",
        0,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-2-04-24.jpg",
        "sitework",
        "Sitework / trenching",
        1,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-3-04-24.jpg",
        "electrical-infrastructure",
        "Electrical infrastructure",
        2,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-4-04-24.jpg",
        "power-block-installation",
        "Power Block installation",
        3,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-5-04-24.jpg",
        "technical-detail",
        "Technical detail",
        4,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-6-04-24.jpg",
        "crew-action",
        "Crew / field work",
        5,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-7-04-24.jpg",
        "hero",
        "Completed drone view",
        6,
      ),
      projectPhoto(
        "chuck-hutton-toyota-memphis-tn-chargepoint-express-plus-8-04-24.jpg",
        "active-charging",
        "Active charging / finished system",
        7,
      ),
    ],
    sortOrder: 1,
  },
  {
    id: "toyota-lexus-multi-site",
    slug: "toyota-lexus-multi-site",
    title: "Toyota & Lexus Multi-Site EV Charging Experience",
    category: ["Commercial EV", "Dealership"],
    image: "/images/projects/lexus-greenville-sc-chargepoint-ct4000-pedestal-install-2-02-23.jpg",
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
      projectPhoto(
        "lexus-greenville-sc-abb-dcfc-charger-install-1-02-23.jpg",
        "electrical-infrastructure",
        "Hero / representative dealership",
        0,
      ),
      projectPhoto(
        "lexus-greenville-sc-abb-dcfc-charger-install-2-02-23.jpg",
        "sitework",
        "Installation / field work",
        1,
      ),
      projectPhoto(
        "lexus-greenville-sc-chargepoint-ct4000-pedestal-install-2-02-23.jpg",
        "hero",
        "Charging equipment",
        2,
      ),
      projectPhoto(
        "lexus-greenville-sc-chargepoint-ct4020-pedestal-install-1-02-23.jpg",
        "power-block-installation",
        "Completed site",
        3,
      ),
      projectPhoto(
        "toyota-nashville-tn-chargepoint-cpe250-install-3-03-23.jpg",
        "technical-detail",
        "DC fast charging equipment",
        4,
      ),
      projectPhoto(
        "toyota-nashville-tn-chargepoint-cpe250-install-4-03-23.jpg",
        "crew-action",
        "Installation / field work",
        5,
      ),
      projectPhoto(
        "toyota-nashville-tn-chargepoint-cpf50-install-5-03-23.jpg",
        "completed-drone",
        "Completed Level 2 system",
        6,
      ),
      projectPhoto(
        "manheim-mt-juliet-tn-ev-charger-bank-install-1-09-23.jpg",
        "active-charging",
        "Representative charging bank",
        7,
      ),
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
      projectPhoto(
        "sungoldpower-12k-off-grid-solar-battery-microgrid-cabin-homestead-2.jpg",
        "hero",
        "Premium residential electrical / energy system",
        0,
      ),
      projectPhoto(
        "sungoldpower-12k-off-grid-solar-battery-microgrid-cabin-homestead-1.jpg",
        "sitework",
        "Whole-home electrical panel or service equipment",
        1,
      ),
      projectPhoto(
        "tesla-wall-charger-nema-weather-box-install-residential.jpg",
        "completed-drone",
        "Completed integrated residential system",
        2,
      ),
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
      projectPhoto(
        "range-rover-knoxville-tn-cpe250-dc-fast-charger-service-1-03-25.jpg",
        "hero",
        "Commercial EV equipment service",
        0,
      ),
      projectPhoto(
        "range-rover-knoxville-tn-cpe250-dc-fast-charger-service-2-03-25.jpg",
        "sitework",
        "DC fast charger diagnostics",
        1,
      ),
      projectPhoto(
        "kia-chattanooga-tn-abb-dc-fast-charger-service-10-22.jpg",
        "electrical-infrastructure",
        "Internal charger / electrical troubleshooting",
        2,
      ),
      projectPhoto(
        "nashville-tn-off-grid-battery-service-08-23.jpg",
        "technical-detail",
        "Commissioning / testing",
        3,
      ),
      projectPhoto(
        "southall-farms-franklin-tn-ct4000-ev-charger-service-call-05-25.jpg",
        "crew-action",
        "Energy monitoring system",
        4,
      ),
      projectPhoto(
        "toyota-thomasville-ga-chargepoint-service-01-23.jpg",
        "active-charging",
        "Site assessment / field documentation",
        5,
      ),
    ],
    sortOrder: 6,
  },
];
