export interface ServiceGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
  partners?: string[];
  credentials?: string[];
}

export const servicesData: ServiceGroup[] = [
  {
    id: "commercial-infrastructure",
    title: "Commercial EV Charging",
    description: "High-power DC fast charging, fleet, dealership, public and commercial charging infrastructure.",
    items: [
      "High-power DC fast charging",
      "Fleet and dealership charging",
      "Public and commercial charging",
      "Parking structure power retrofits"
    ]
  },
  {
    id: "distributed-energy",
    title: "Distributed Energy & Monitoring",
    description: "Solar, battery storage, energy monitoring, load management and integrated power systems.",
    items: [
      "Solar and battery storage",
      "Energy monitoring",
      "Load management",
      "Integrated power systems"
    ]
  },
  {
    id: "field-services",
    title: "Service & O&M",
    description: "Commissioning, troubleshooting, repairs, upgrades and lifecycle support.",
    items: [
      "Commissioning",
      "Troubleshooting and repairs",
      "System upgrades",
      "Lifecycle support"
    ]
  },
  {
    id: "engineering-consulting",
    title: "Design-Build & Project Delivery",
    description: "Site assessment, design coordination, electrical infrastructure, construction and commissioning.",
    items: [
      "Site assessment",
      "Design coordination",
      "Electrical infrastructure",
      "Construction and commissioning"
    ]
  },
  {
    id: "resilient-remote-power",
    title: "Resilient & Remote Power",
    description: "Temporary microgrids, battery power, event infrastructure and emergency-response applications.",
    items: [
      "Temporary microgrids",
      "Battery-powered events",
      "Event infrastructure",
      "Emergency-response applications"
    ]
  }
];
