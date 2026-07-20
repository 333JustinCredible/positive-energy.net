export interface Project {
  id: string;
  title: string;
  category: string[];
  location: string;
  year: string;
  summary: string;
  metrics: string[];
  image: string;
}

export const projectsData: Project[] = [
  {
    id: "bonnaroo",
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
    title: "Willie Nelson's Luck Reunion",
    category: ["Distributed Energy", "Remote Power"],
    location: "Luck Ranch, TX",
    year: "2023",
    summary: "Engineered and installed an off-grid solar and battery storage system for a private music compound, delivering silent, clean power.",
    metrics: ["Zero Generator Noise", "100% Solar+Battery Powered"],
    image: "/images/projects/luck-reunion.jpg"
  },
  {
    id: "nashville-tornado",
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
    title: "Hurricane Helene Recovery",
    category: ["Disaster Response", "Resilient Power"],
    location: "Western NC",
    year: "2024",
    summary: "Deployed critical disaster response power infrastructure to support emergency operations and community relief centers.",
    metrics: ["48 Hours to Mobilization", "Multi-site Microgrid Deployment"],
    image: "/images/projects/hurricane-helene.jpg"
  },
  {
    id: "off-grid-fest",
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
    title: "Lexus of Greenville EV Charging",
    category: ["Commercial EV", "Dealership"],
    location: "Greenville, SC",
    year: "2023",
    summary: "Designed and installed a multi-unit ChargePoint Level 2 charging array and ABB wall charger at the Lexus of Greenville dealership, delivering a branded EV charging experience for customers and inventory.",
    metrics: ["6 Charging Stations", "ChargePoint + ABB Hardware"],
    image: "/photos/lexus-greenville-exterior-chargepoint-row.jpg"
  }
];
