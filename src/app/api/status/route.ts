import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const status = {
      server: 'online',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      { 
        server: 'error', 
        message: 'Failed to get server status',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}