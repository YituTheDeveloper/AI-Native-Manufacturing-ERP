import { NextResponse } from 'next/server';
import { INITIAL_SALES_ORDERS } from '../../../../lib/store';

export async function GET() {
  return NextResponse.json({
    tenantId: "22222222-2222-2222-2222-222222222222",
    count: INITIAL_SALES_ORDERS.length,
    data: INITIAL_SALES_ORDERS
  });
}
