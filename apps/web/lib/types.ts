// Domain Types for AI-Native Manufacturing ERP

export type ERPModule = 
  | 'dashboard'
  | 'crm'
  | 'sales'
  | 'procurement'
  | 'inventory'
  | 'manufacturing'
  | 'quality'
  | 'finance'
  | 'assets'
  | 'workforce'
  | 'workflow'
  | 'analytics'
  | 'ai';

export interface TenantContext {
  tenantId: string;
  tenantName: string;
  orgId: string;
  orgName: string;
  role: 'SYSTEM_ADMIN' | 'PLANT_MANAGER' | 'FINANCIAL_CONTROLLER' | 'SALES_REP' | 'OPERATOR';
  userEmail: string;
  userName: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  paymentTerms: string;
  creditLimit: number;
}

export interface Supplier {
  id: string;
  code: string;
  name: string;
  email: string;
  rating: number;
  paymentTerms: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  uom: string;
  costPrice: number;
  listPrice: number;
  reorderPoint: number;
  safetyStock: number;
  isManufactured: boolean;
  stockOnHand: number;
}

export interface StockLedgerEntry {
  id: string;
  timestamp: string;
  warehouse: string;
  sku: string;
  productName: string;
  quantityChange: number;
  entryType: 'RECEIPT' | 'ISSUE' | 'TRANSFER' | 'ADJUSTMENT' | 'CONSUMPTION' | 'PRODUCTION_OUTPUT';
  referenceId: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  status: 'DRAFT' | 'CONFIRMED' | 'RESERVED' | 'DELIVERED' | 'INVOICED';
  totalAmount: number;
  items: { sku: string; quantity: number; unitPrice: number }[];
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  date: string;
  status: 'SUBMITTED' | 'APPROVED' | 'RECEIVED' | 'CANCELLED';
  totalAmount: number;
  items: { sku: string; quantity: number; unitPrice: number }[];
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  productName: string;
  sku: string;
  plannedQuantity: number;
  producedQuantity: number;
  status: 'PLANNED' | 'RELEASED' | 'IN_PROGRESS' | 'QUALITY_CHECK' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  dueDate: string;
}

export interface QualityInspection {
  id: string;
  inspectionPlan: string;
  referenceNumber: string;
  status: 'PASSED' | 'FAILED' | 'PENDING';
  inspector: string;
  date: string;
  defectsCount: number;
  notes: string;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  balance: number;
}

export interface JournalEntry {
  id: string;
  journalNumber: string;
  postingDate: string;
  description: string;
  lines: { accountCode: string; accountName: string; debit: number; credit: number }[];
  isBalanced: boolean;
}

export interface AIProposal {
  id: string;
  actionType: string;
  requestedBy: string;
  details: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'EXECUTED';
  createdAt: string;
}

export interface RAGDocument {
  id: string;
  title: string;
  category: string;
  content: string;
  chunksCount: number;
}
