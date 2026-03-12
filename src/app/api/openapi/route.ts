import { NextResponse } from 'next/server';
import { apiSpec } from '@/lib/swagger';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(apiSpec);
}