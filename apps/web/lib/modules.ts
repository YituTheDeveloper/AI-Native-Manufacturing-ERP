export type ModulePage = {
  title: string;
  description: string;
  group: string;
};

export const modulePages: Record<string, ModulePage> = {
  insights: {
    title: "Insights",
    description: "Operational reporting will use live, permission-scoped ERP data.",
    group: "Workspace",
  },
  products: {
    title: "Products and CRM",
    description: "Products, customers, contacts, and opportunities will be managed here.",
    group: "Commercial",
  },
  "sales/orders": {
    title: "Sales orders",
    description: "Quotes, confirmed orders, deliveries, and returns will be tracked here.",
    group: "Commercial",
  },
  procurement: {
    title: "Procurement",
    description: "Requisitions, supplier quotes, purchase orders, and receipts will be managed here.",
    group: "Operations",
  },
  inventory: {
    title: "Inventory",
    description: "Warehouse stock, reservations, transfers, lots, and serials will be tracked here.",
    group: "Operations",
  },
  manufacturing: {
    title: "Manufacturing",
    description: "Bills of material, routings, work centers, and production orders will be managed here.",
    group: "Operations",
  },
  quality: {
    title: "Quality",
    description: "Inspection plans, results, defects, and corrective actions will be recorded here.",
    group: "Operations",
  },
  finance: {
    title: "Finance",
    description: "The general ledger, receivables, payables, and financial reports will appear here.",
    group: "Finance",
  },
  documents: {
    title: "Documents",
    description: "Authorized company documents and their source records will be available here.",
    group: "Workspace",
  },
  settings: {
    title: "Settings",
    description: "Organization, user, role, and integration settings will be configured here.",
    group: "Workspace",
  },
};
