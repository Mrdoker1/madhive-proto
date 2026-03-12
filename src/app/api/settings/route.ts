import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

// Default settings
const DEFAULT_SETTINGS = {
  mapboxApiKey: 'pk.eyJ1IjoibXJkb2tlcjEiLCJhIjoiY2szNGlvZHcxMDFweTNjcG4xeXRicng5ZSJ9.PAdeoloR2kVbvXM7LFO-zg',
  aiProvider: 'deepseek', // 'deepseek', 'openai', or 'gemini'
  deepseekApiKey: 'sk-7aaa4dc884794c649de202fc2ae31a94',
  openaiApiKey: '',
  geminiApiKey: ''
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

