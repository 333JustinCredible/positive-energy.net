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
    title: "Commercial Infrastructure",
    description: "End-to-end electrical infrastructure for commercial facilities, focusing on modern mobility and facility-wide power upgrades.",
    items: [
      "EV charging (L1/L2/DCFC)",
      "Multi-family & hospitality charging",
      "Fleet & retail charging solutions",
      "Parking structure power retrofits"
    ],
    partners: ["ChargePoint", "ABB", "Blink", "Tritium", "Tesla"]
  },
  {
    id: "distributed-energy",
    title: "Distributed Energy",
    description: "Harness and store your own power with commercial-scale solar photovoltaic systems and intelligent battery storage.",
    items: [
      "Commercial solar PV installations",
      "Battery storage solutions",
      "Demand management systems"
    ],
    partners: ["FranklinWH", "SolarEdge", "LG"]
  },
  {
    id: "field-services",
    title: "Field Services",
    description: "The crew that shows up. Rapid-response maintenance and emergency repair for critical electrical infrastructure.",
    items: [
      "On-call electrical repair",
      "Emergency power response",
      "Preventive maintenance",
      "24/7 dispatch capabilities"
    ]
  },
  {
    id: "engineering-consulting",
    title: "Engineering & Consulting",
    description: "Strategic planning and compliance consulting for high-stakes energy transition projects.",
    items: [
      "Site power assessment",
      "Load analysis & modeling",
      "Incentive & rebate consulting",
      "System commissioning",
      "LEED & sustainability strategy"
    ],
    credentials: ["USGBC", "IFMA", "CSI member"]
  },
  {
    id: "resilient-remote-power",
    title: "Resilient & Remote Power",
    description: "Off-grid, disaster response, and temporary power solutions that don't quit when the grid does.",
    items: [
      "Off-grid event power",
      "Disaster response mobilization",
      "Temporary power deployments",
      "Generator integration",
      "Hybrid microgrids"
    ],
    partners: ["Footprint Project", "Civil Air Patrol", "OVRDRV"]
  }
];
