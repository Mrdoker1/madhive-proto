import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

// Default settings
const DEFAULT_SETTINGS = {
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  aiProvider: 'deepseek', // 'deepseek', 'openai', or 'gemini'
  deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || ''
};

// Get settings
export async function GET() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      const settings = JSON.parse(data);
      return NextResponse.json(settings);
    }
    return NextResponse.json(DEFAULT_SETTINGS);
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json(DEFAULT_SETTINGS);
  }
}

// Save settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Load current settings or use defaults
    let currentSettings = DEFAULT_SETTINGS;
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }

    // Update only provided fields
    const settings = {
      ...currentSettings,
      ...body
    };

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}

