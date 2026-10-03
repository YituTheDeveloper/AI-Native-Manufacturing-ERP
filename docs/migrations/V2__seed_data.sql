-- V2__seed_data.sql
-- Seed data for AI-Native Manufacturing ERP (Ethiopian Localization & Idempotent Execution)

-- Insert Organization & Tenant
INSERT INTO organizations (id, name, code)
VALUES ('11111111-1111-1111-1111-111111111111', 'Tekle Manufacturing PLC', 'TEKLE_MFG')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tenants (id, organization_id, name, domain, status)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Addis Ababa Plant #1 — Kilinto', 'kilinto.teklemanufacturing.et', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- Insert Core Roles & Admin User
INSERT INTO roles (id, organization_id, name, description)
VALUES 
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'System Administrator', 'Full access to all ERP modules and tenant configurations'),
('33333333-3333-3333-3333-444444444444', '11111111-1111-1111-1111-111111111111', 'Plant Manager', 'Access to Manufacturing, Quality, and Inventory modules'),
('33333333-3333-3333-3333-555555555555', '11111111-1111-1111-1111-111111111111', 'Financial Controller', 'Access to Finance, Accounts Payable, and Accounts Receivable')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, organization_id, email, full_name)
VALUES 
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'admin@teklemanufacturing.et', 'Abebe Girma'),
('44444444-4444-4444-4444-555555555555', '11111111-1111-1111-1111-111111111111', 'tigist.manufacturing@teklemanufacturing.et', 'Tigist Haile'),
('44444444-4444-4444-4444-666666666666', '11111111-1111-1111-1111-111111111111', 'dawit.finance@teklemanufacturing.et', 'Dawit Tadesse')
ON CONFLICT (id) DO NOTHING;

-- Insert Products & Categories
INSERT INTO product_categories (id, tenant_id, name, code)
VALUES 
('55555555-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Raw Materials', 'RAW_MAT'),
('55555555-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Finished Goods', 'FIN_GOOD')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, tenant_id, category_id, sku, name, description, unit_of_measure, cost_price, list_price, is_manufactured)
VALUES 
('66666666-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '55555555-1111-1111-1111-111111111111', 'ALU-SHEET-2MM', 'Aluminum Sheet 2mm 4x8ft', 'High grade industrial aluminum sheet', 'SHEET', 2450.00, 4100.00, FALSE),
('66666666-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '55555555-1111-1111-1111-111111111111', 'FAST-BOLT-M8', 'M8 Stainless Steel Hex Bolt', 'Industrial fastener M8x30mm', 'PCS', 14.50, 33.00, FALSE),
('66666666-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '55555555-2222-2222-2222-222222222222', 'ENCL-HV-100', 'Heavy Industrial Enclosure 100L', 'Precision-welded powder coated aluminum enclosure', 'UNIT', 10150.00, 21700.00, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Insert Warehouses & Stock
INSERT INTO warehouses (id, tenant_id, code, name, location)
VALUES 
('77777777-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'WH-KILINTO', 'Kilinto Central Warehouse', 'Kilinto Industrial Zone, Plot 4'),
('77777777-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'WH-PLANT-FLOOR', 'Factory Floor Staging Area', 'Building B, Assembly Line 1')
ON CONFLICT (id) DO NOTHING;

INSERT INTO stock_ledger_entries (tenant_id, warehouse_id, product_id, quantity_change, entry_type, reference_type, reference_id)
VALUES 
('22222222-2222-2222-2222-222222222222', '77777777-1111-1111-1111-111111111111', '66666666-1111-1111-1111-111111111111', 250.00, 'RECEIPT', 'PO_RECEIPT', 'PO-2026-001'),
('22222222-2222-2222-2222-222222222222', '77777777-1111-1111-1111-111111111111', '66666666-2222-2222-2222-222222222222', 5000.00, 'RECEIPT', 'PO_RECEIPT', 'PO-2026-002'),
('22222222-2222-2222-2222-222222222222', '77777777-1111-1111-1111-111111111111', '66666666-3333-3333-3333-333333333333', 45.00, 'PRODUCTION_OUTPUT', 'WO_COMPLETED', 'WO-2026-88');

-- Insert Customers & Suppliers
INSERT INTO customers (id, tenant_id, code, name, email, payment_terms, credit_limit)
VALUES ('88888888-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'CUST-ETHPOW', 'Ethiopian Electric Power Corporation (EEP)', 'procurement@eep.gov.et', 'NET30', 5500000.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO suppliers (id, tenant_id, code, name, email, rating)
VALUES ('88888888-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'SUPP-METALS-ET', 'Derba Steel and Metals PLC', 'orders@derbasteel.et', 4.85)
ON CONFLICT (id) DO NOTHING;

-- Insert Chart of Accounts
INSERT INTO chart_of_accounts (id, tenant_id, account_code, account_name, account_type, balance)
VALUES 
('99999999-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '1010', 'Operating Cash Account (CBE)', 'ASSET', 24700000.00),
('99999999-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '1200', 'Accounts Receivable', 'ASSET', 4658500.00),
('99999999-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', '1300', 'Raw Material Inventory', 'ASSET', 6855000.00),
('99999999-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', '2000', 'Accounts Payable', 'LIABILITY', 2303000.00),
('99999999-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', '4000', 'Manufacturing Sales Revenue', 'REVENUE', 33900000.00)
ON CONFLICT (id) DO NOTHING;
