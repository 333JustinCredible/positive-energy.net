export interface ServiceGroup {
  id: string;
  title: string;
  imageAlt: string;
  description: string;
  items: string[];
  partners?: string[];
  credentials?: string[];
}

export const servicesData: ServiceGroup[] = [
  {
    id: "commercial-infrastructure",
    title: "Commercial EV Charging",
    imageAlt: "ChargePoint charging dispensers installed in a commercial parking lot with vehicles parked nearby.",
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
    imageAlt: "Battery and electrical equipment mounted inside a framed utility room.",
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
    imageAlt: "Open EV charging equipment being serviced outside a Land Rover dealership.",
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
    imageAlt: "Workers in safety vests gather for a site walk inside a glass-walled commercial construction floor.",
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
    imageAlt: "Two people carry a solar panel across a grassy site beside an array of panels and a support trailer.",
    description: "Temporary microgrids, battery power, event infrastructure and emergency-response applications.",
    items: [
      "Temporary microgrids",
      "Battery-powered events",
      "Event infrastructure",
      "Emergency-response applications"
    ]
  }
];
