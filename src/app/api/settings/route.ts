import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

// Дефолтные настройки
const DEFAULT_SETTINGS = {
  mapboxApiKey: 'pk.eyJ1IjoibXJkb2tlcjEiLCJhIjoiY2szNGlvZHcxMDFweTNjcG4xeXRicng5ZSJ9.PAdeoloR2kVbvXM7LFO-zg',
  aiProvider: 'deepseek', // 'deepseek' or 'openai'
  deepseekApiKey: 'sk-7aaa4dc884794c649de202fc2ae31a94',
  openaiApiKey: ''
};

// Получить настройки
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

// Сохранить настройки
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Загружаем текущие настройки или используем дефолтные
    let currentSettings = DEFAULT_SETTINGS;
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      currentSettings = { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }

    // Обновляем только переданные поля
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

