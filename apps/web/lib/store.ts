// Core Multi-Tenant Domain Store for AI-Native Manufacturing ERP
// Localized for Ethiopia — Ethiopian Birr (ETB), Amharic-context names
import { 
  TenantContext, Product, Customer, Supplier, StockLedgerEntry, 
  SalesOrder, PurchaseOrder, ProductionOrder, QualityInspection, 
  Account, JournalEntry, AIProposal, RAGDocument 
} from './types';

export const INITIAL_TENANT: TenantContext = {
  tenantId: '22222222-2222-2222-2222-222222222222',
  tenantName: 'Addis Ababa Plant #1 — Kilinto Industrial Zone',
  orgId: '11111111-1111-1111-1111-111111111111',
  orgName: 'Tekle Manufacturing PLC',
  role: 'SYSTEM_ADMIN',
  userEmail: 'admin@teklemanufacturing.et',
  userName: 'Abebe Girma',
};

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'p1', sku: 'ALU-SHEET-2MM', name: 'Aluminum Sheet 2mm 4x8ft', category: 'Raw Materials', uom: 'SHEET', costPrice: 2450.0, listPrice: 4100.0, reorderPoint: 50, safetyStock: 20, isManufactured: false, stockOnHand: 250 },
  { id: 'p2', sku: 'FAST-BOLT-M8', name: 'M8 Stainless Steel Hex Bolt', category: 'Fasteners', uom: 'PCS', costPrice: 14.50, listPrice: 33.00, reorderPoint: 1000, safetyStock: 500, isManufactured: false, stockOnHand: 5000 },
  { id: 'p3', sku: 'ENCL-HV-100', name: 'Heavy Industrial Enclosure 100L', category: 'Finished Goods', uom: 'UNIT', costPrice: 10150.0, listPrice: 21700.0, reorderPoint: 15, safetyStock: 5, isManufactured: true, stockOnHand: 45 },
  { id: 'p4', sku: 'POWDER-COAT-BLK', name: 'Industrial Black Powder Coating', category: 'Chemicals', uom: 'KG', costPrice: 685.0, listPrice: 1210.0, reorderPoint: 100, safetyStock: 30, isManufactured: false, stockOnHand: 180 },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', code: 'CUST-ETHPOW', name: 'Ethiopian Electric Power Corporation (EEP)', email: 'procurement@eep.gov.et', phone: '+251 11 551 0299', paymentTerms: 'NET30', creditLimit: 5500000 },
  { id: 'c2', code: 'CUST-ETHTELE', name: 'Ethio Telecom S.C.', email: 'orders@ethiotelecom.et', phone: '+251 11 515 0001', paymentTerms: 'NET30', creditLimit: 13700000 },
  { id: 'c3', code: 'CUST-CBBE', name: 'Commercial Bank of Ethiopia', email: 'assets@cbe.com.et', phone: '+251 11 551 5004', paymentTerms: 'NET15', creditLimit: 8250000 },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 's1', code: 'SUPP-METALS-ET', name: 'Derba Steel and Metals PLC', email: 'orders@derbasteel.et', rating: 4.85, paymentTerms: 'NET30' },
  { id: 's2', code: 'SUPP-FASTEN-ET', name: 'Awash Industrial Hardware Co.', email: 'sales@awashhardware.et', rating: 4.72, paymentTerms: 'NET30' },
  { id: 's3', code: 'SUPP-CHEM-ET', name: 'Ethiopian Chemical Industries', email: 'supply@etchemical.et', rating: 4.60, paymentTerms: 'NET60' },
];

export const INITIAL_STOCK_LEDGER: StockLedgerEntry[] = [
  { id: 'l1', timestamp: '2026-10-02 09:30', warehouse: 'WH-KILINTO', sku: 'ALU-SHEET-2MM', productName: 'Aluminum Sheet 2mm 4x8ft', quantityChange: 250, entryType: 'RECEIPT', referenceId: 'PO-2026-001' },
  { id: 'l2', timestamp: '2026-10-02 11:15', warehouse: 'WH-KILINTO', sku: 'FAST-BOLT-M8', productName: 'M8 Stainless Steel Hex Bolt', quantityChange: 5000, entryType: 'RECEIPT', referenceId: 'PO-2026-002' },
  { id: 'l3', timestamp: '2026-10-03 08:00', warehouse: 'WH-PLANT-FLOOR', sku: 'ENCL-HV-100', productName: 'Heavy Industrial Enclosure 100L', quantityChange: 45, entryType: 'PRODUCTION_OUTPUT', referenceId: 'WO-2026-88' },
];

export const INITIAL_SALES_ORDERS: SalesOrder[] = [
  { id: 'so1', orderNumber: 'SO-2026-101', customerName: 'Ethiopian Electric Power Corporation (EEP)', date: '2026-10-01', status: 'CONFIRMED', totalAmount: 1085000.00, items: [{ sku: 'ENCL-HV-100', quantity: 50, unitPrice: 21700.00 }] },
  { id: 'so2', orderNumber: 'SO-2026-102', customerName: 'Ethio Telecom S.C.', date: '2026-10-02', status: 'RESERVED', totalAmount: 411000.00, items: [{ sku: 'ALU-SHEET-2MM', quantity: 100, unitPrice: 4110.00 }] },
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'po1', poNumber: 'PO-2026-001', supplierName: 'Derba Steel and Metals PLC', date: '2026-09-28', status: 'RECEIVED', totalAmount: 612500.00, items: [{ sku: 'ALU-SHEET-2MM', quantity: 250, unitPrice: 2450.00 }] },
  { id: 'po2', poNumber: 'PO-2026-002', supplierName: 'Awash Industrial Hardware Co.', date: '2026-09-29', status: 'APPROVED', totalAmount: 72500.00, items: [{ sku: 'FAST-BOLT-M8', quantity: 5000, unitPrice: 14.50 }] },
];

export const INITIAL_PRODUCTION_ORDERS: ProductionOrder[] = [
  { id: 'wo1', orderNumber: 'WO-2026-88', productName: 'Heavy Industrial Enclosure 100L', sku: 'ENCL-HV-100', plannedQuantity: 50, producedQuantity: 45, status: 'IN_PROGRESS', startDate: '2026-10-01', dueDate: '2026-10-05' },
  { id: 'wo2', orderNumber: 'WO-2026-89', productName: 'Heavy Industrial Enclosure 100L', sku: 'ENCL-HV-100', plannedQuantity: 100, producedQuantity: 0, status: 'PLANNED', startDate: '2026-10-06', dueDate: '2026-10-12' },
];

export const INITIAL_QUALITY_INSPECTIONS: QualityInspection[] = [
  { id: 'qi1', inspectionPlan: 'Incoming Sheet Inspection Plan v2', referenceNumber: 'INSP-2026-041', status: 'PASSED', inspector: 'Tigist Haile', date: '2026-10-02', defectsCount: 0, notes: 'Thickness verified 2.01mm across sample 10 sheets.' },
  { id: 'qi2', inspectionPlan: 'Final Assembly Quality Gate', referenceNumber: 'INSP-2026-042', status: 'PASSED', inspector: 'Tigist Haile', date: '2026-10-03', defectsCount: 1, notes: 'Minor powder coat scratch resolved on Unit #12.' },
];

export const INITIAL_ACCOUNTS: Account[] = [
  { id: 'a1', code: '1010', name: 'Operating Cash Account (CBE)', type: 'ASSET', balance: 24700000.00 },
  { id: 'a2', code: '1200', name: 'Accounts Receivable', type: 'ASSET', balance: 4658500.00 },
  { id: 'a3', code: '1300', name: 'Raw Material Inventory', type: 'ASSET', balance: 6855000.00 },
  { id: 'a4', code: '2000', name: 'Accounts Payable', type: 'LIABILITY', balance: 2303000.00 },
  { id: 'a5', code: '4000', name: 'Manufacturing Sales Revenue', type: 'REVENUE', balance: 33900000.00 },
  { id: 'a6', code: '5000', name: 'Cost of Goods Sold (COGS)', type: 'EXPENSE', balance: 17005000.00 },
];

export const INITIAL_JOURNALS: JournalEntry[] = [
  { 
    id: 'j1', 
    journalNumber: 'JRN-2026-001', 
    postingDate: '2026-10-01', 
    description: 'Finished Goods Delivery & Revenue Recognition (SO-2026-101)',
    lines: [
      { accountCode: '1200', accountName: 'Accounts Receivable', debit: 1085000.00, credit: 0 },
      { accountCode: '4000', accountName: 'Manufacturing Sales Revenue', debit: 0, credit: 1085000.00 },
    ],
    isBalanced: true
  },
  { 
    id: 'j2', 
    journalNumber: 'JRN-2026-002', 
    postingDate: '2026-10-02', 
    description: 'Raw Material Purchase Posting (PO-2026-001)',
    lines: [
      { accountCode: '1300', accountName: 'Raw Material Inventory', debit: 612500.00, credit: 0 },
      { accountCode: '2000', accountName: 'Accounts Payable', debit: 0, credit: 612500.00 },
    ],
    isBalanced: true
  },
];

export const INITIAL_PROPOSALS: AIProposal[] = [
  { 
    id: 'prop-101', 
    actionType: 'PROPOSE_PURCHASE_ORDER', 
    requestedBy: 'Copilot AI Agent', 
    details: 'Reorder 500 sheets of ALU-SHEET-2MM due to stock reaching reorder threshold (250 available, 100 reserved). Supplier: Derba Steel and Metals PLC @ ETB 2,450.00/unit. Total: ETB 1,225,000.',
    status: 'PENDING_APPROVAL',
    createdAt: '2026-10-03 02:45'
  },
  { 
    id: 'prop-102', 
    actionType: 'PROPOSE_INVENTORY_TRANSFER', 
    requestedBy: 'Copilot AI Agent', 
    details: 'Transfer 50 units of ALU-SHEET-2MM from WH-KILINTO to WH-PLANT-FLOOR for Work Order WO-2026-89 execution.',
    status: 'PENDING_APPROVAL',
    createdAt: '2026-10-03 03:10'
  }
];

export const INITIAL_RAG_DOCS: RAGDocument[] = [
  {
    id: 'doc-1',
    title: 'Standard Operating Procedure — Aluminum Enclosure Assembly & Quality Control (Tekle MFG)',
    category: 'SOP & Operations',
    content: 'All aluminum enclosures must undergo visual coating check, weld integrity testing, and dimensional inspection before final packaging. Torque specifications for M8 hex bolts must be set to 24 N·m. All outputs must meet Ethiopian Standards Authority (ESA) certification ES 3821.',
    chunksCount: 8
  },
  {
    id: 'doc-2',
    title: 'Multi-Tenant Security Policy & Approval Matrix v3.2 (Ethiopia Compliance)',
    category: 'Compliance',
    content: 'Write operations involving purchasing above ETB 550,000, inventory transfers over 100 units, and manual financial journal entries require approval from Plant Manager or System Administrator. All transactions must comply with Ethiopian Revenue and Customs Authority (ERCA) regulations.',
    chunksCount: 5
  },
  {
    id: 'doc-3',
    title: 'Ethiopian VAT & Tax Compliance Guide — MoR Regulations 2025',
    category: 'Tax & Finance',
    content: 'Manufacturing companies operating in Ethiopia are subject to 15% VAT on all taxable supplies. Export sales are zero-rated. Corporate income tax is 30% on net profits. Withholding tax of 2% applies to all procurement contracts above ETB 10,000.',
    chunksCount: 6
  }
];
