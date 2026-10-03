import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '../../../lib/store';

export async function GET() {
  return NextResponse.json({
    tenantId: "22222222-2222-2222-2222-222222222222",
    count: INITIAL_PRODUCTS.length,
    data: INITIAL_PRODUCTS
  });
}
