import { NextResponse } from 'next/server';
import { apiSpec } from '@/lib/swagger';

export async function GET() {
  return NextResponse.json(apiSpec);
}