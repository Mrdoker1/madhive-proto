import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const SETTINGS_FILE = path.join(process.cwd(), 'settings.json');

const DEFAULT_SETTINGS = {
  aiProvider: 'deepseek',
  deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || ''
};

// Get AI settings
function getAISettings() {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf8');
      const settings = JSON.parse(data);
      const provider = settings.aiProvider || DEFAULT_SETTINGS.aiProvider;
      
      let apiKey: string;
      if (provider === 'openai') {
        apiKey = settings.openaiApiKey || DEFAULT_SETTINGS.openaiApiKey;
      } else if (provider === 'gemini') {
        apiKey = settings.geminiApiKey || DEFAULT_SETTINGS.geminiApiKey;
      } else {
        apiKey = settings.deepseekApiKey || DEFAULT_SETTINGS.deepseekApiKey;
      }
      
      return { provider, apiKey };
    }
  } catch (error) {
    console.error('Error reading AI settings:', error);
  }
  
  return {
    provider: DEFAULT_SETTINGS.aiProvider,
    apiKey: DEFAULT_SETTINGS.deepseekApiKey
  };
}

// Request to DeepSeek API
async function getDeepSeekSuggestion(apiKey: string, systemPrompt: string, context: string): Promise<string> {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Current campaign context:\n${context}\n\nProvide a brief suggestion to help optimize this campaign.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No suggestion available.';
  } catch (error) {
    console.error('DeepSeek request failed:', error);
    throw error;
  }
}

// Request to OpenAI API
async function getOpenAISuggestion(apiKey: string, systemPrompt: string, context: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Current campaign context:\n${context}\n\nProvide a brief suggestion to help optimize this campaign.`
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No suggestion available.';
  } catch (error) {
    console.error('OpenAI request failed:', error);
    throw error;
  }
}

// Request to Google Gemini API
async function getGeminiSuggestion(apiKey: string, systemPrompt: string, context: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nCurrent campaign context:\n${context}\n\nProvide a brief suggestion to help optimize this campaign.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 150,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestion available.';
  } catch (error) {
    console.error('Gemini request failed:', error);
    throw error;
  }
}

// Format context into readable text
function formatContextForAI(context: any): string {
  // console.log('📝 Full context received:', JSON.stringify(context, null, 2));
  const lines: string[] = [];
  
  // Process various parts of the context
  if (context.general) {
    lines.push('Campaign Information:');
    if (context.general.campaignName) lines.push(`- Name: ${context.general.campaignName}`);
    if (context.general.advertiser) lines.push(`- Advertiser: ${context.general.advertiser}`);
  }

  if (context.budget) {
    lines.push('\nBudget:');
    if (context.budget.totalBudget) lines.push(`- Total Budget: $${context.budget.totalBudget.toLocaleString()}`);
    if (context.budget.dailyBudget) lines.push(`- Daily Budget: $${context.budget.dailyBudget.toLocaleString()}`);
  }

  if (context.goal) {
    lines.push('\nCampaign Goal:');
    if (context.goal.goalType) lines.push(`- Goal Type: ${context.goal.goalType}`);
    if (context.goal.goalValue) lines.push(`- Goal Value: ${context.goal.goalValue.toLocaleString()}`);
  }

  if (context.flightRange) {
    lines.push('\nFlight Dates:');
    if (context.flightRange.startDate) lines.push(`- Start: ${context.flightRange.startDate}`);
    if (context.flightRange.endDate) lines.push(`- End: ${context.flightRange.endDate}`);
  }

  if (context.channels) {
    lines.push('\nChannels:');
    if (context.channels.selectedChannels && context.channels.selectedChannels.length > 0) {
      lines.push(`- Selected (${context.channels.selectedChannels.length}): ${context.channels.selectedChannels.join(', ')}`);
    } else {
      lines.push('- Not configured');
    }
    
    if (context.channels.budgetAllocation) {
      lines.push('- Budget Allocation:');
      Object.entries(context.channels.budgetAllocation).forEach(([channel, budget]) => {
        lines.push(`  * ${channel}: $${(budget as number).toLocaleString()}`);
      });
    }
  }

  if (context.markets) {
    if (context.markets.selectedMarkets && context.markets.selectedMarkets.length > 0) {
      lines.push('\nSelected Markets:');
      lines.push(`- Total Markets Selected: ${context.markets.selectedMarkets.length}`);
      
      // Show market names (convert IDs to readable names)
      const marketNames = context.markets.selectedMarkets.map((id: string) => {
        // Convert IDs like "chicago-il" to "Chicago, IL"
        return id.split('-').map((word: string) => 
          word.length === 2 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)
        ).join(', ');
      });
      
      // Show first 10 markets
      const displayMarkets = marketNames.slice(0, 10);
      lines.push(`- Markets: ${displayMarkets.join('; ')}`);
      if (marketNames.length > 10) {
        lines.push(`  ... and ${marketNames.length - 10} more`);
      }
    }
    
    // Add market details information if available
    if (context.markets.marketsDetails) {
      const totalWeight = Object.values(context.markets.marketsDetails).reduce((sum: number, detail: any) => {
        return sum + (detail.weight || 0);
      }, 0);
      if (totalWeight > 0) {
        lines.push(`- Total Market Weight: ${totalWeight.toFixed(1)}%`);
      }
    }
  }

  if (context.linear) {
    // console.log('🔍 linear:', JSON.stringify(context.linear, null, 2));
    
    // Show selected broadcasters
    if (context.linear.broadcasters && context.linear.broadcasters.length > 0) {
      lines.push('\nBroadcasters:');
      lines.push(`- Total Selected: ${context.linear.broadcasters.length}`);
      
      // Convert broadcaster IDs to readable names
      const broadcasterNames = context.linear.broadcasters.map((id: string) => {
        return id.split('-').map((word: string) => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      });
      lines.push(`- Broadcasters: ${broadcasterNames.join(', ')}`);
    } else {
      // console.log('❌ No broadcasters found in linear');
    }
    
    // Show stations if available
    if (context.linear.broadcastersWithStations && context.linear.broadcastersWithStations.length > 0) {
      const totalStations = context.linear.broadcastersWithStations.reduce((sum: number, b: any) => {
        return sum + (b.stations?.filter((s: any) => s.selected).length || 0);
      }, 0);
      
      if (totalStations > 0) {
        lines.push('\nStations:');
        lines.push(`- Total Stations Selected: ${totalStations}`);
        
        // Show station distribution by broadcasters
        const stationsByBroadcaster = context.linear.broadcastersWithStations.map((b: any) => {
          const selected = b.stations?.filter((s: any) => s.selected).length || 0;
          return `${b.name}: ${selected}`;
        }).filter((text: string) => !text.endsWith(': 0'));
        
        if (stationsByBroadcaster.length > 0) {
          lines.push(`- Distribution: ${stationsByBroadcaster.join(', ')}`);
        }
      } else if (context.linear.broadcasters && context.linear.broadcasters.length > 0) {
        lines.push('\nStations:');
        lines.push('- No stations selected yet (select stations for chosen broadcasters)');
      }
    }
  }

  if (context.audience) {
    lines.push('\nAudience Targeting:');
    const audienceParts: string[] = [];
    
    if (context.audience.gender && context.audience.gender.length > 0) {
      audienceParts.push(`Gender: ${context.audience.gender.join(', ')}`);
    }
    if (context.audience.age && context.audience.age.length > 0) {
      audienceParts.push(`Age: ${context.audience.age.join(', ')}`);
    }
    if (context.audience.income && context.audience.income.length > 0) {
      audienceParts.push(`Income: ${context.audience.income.join(', ')}`);
    }
    if (context.audience.education && context.audience.education.length > 0) {
      audienceParts.push(`Education: ${context.audience.education.join(', ')}`);
    }
    if (context.audience.householdSize && context.audience.householdSize.length > 0) {
      audienceParts.push(`Household: ${context.audience.householdSize.join(', ')}`);
    }
    
    if (audienceParts.length > 0) {
      lines.push(`- Configured: ${audienceParts.join('; ')}`);
    } else {
      lines.push('- Not configured (targeting all audiences)');
    }
  }

  if (context.dayparts) {
    lines.push('\nDayparts (Time Slots):');
    
    // Dayparts are stored as selectedSlots: { day: { hour: boolean } }
    if (context.dayparts.selectedSlots && Object.keys(context.dayparts.selectedSlots).length > 0) {
      let totalSlots = 0;
      const daypartGroups = new Set<string>();
      
      // Count selected slots and determine time groups
      Object.entries(context.dayparts.selectedSlots).forEach(([day, hours]: [string, any]) => {
        Object.entries(hours).forEach(([hour, selected]: [string, any]) => {
          if (selected) {
            totalSlots++;
            const hourNum = parseInt(hour);
            
            // Determine daypart group
            if (hourNum >= 2 && hourNum <= 5) daypartGroups.add('Overnight');
            else if (hourNum >= 6 && hourNum <= 9) daypartGroups.add('Early Morning');
            else if (hourNum >= 10 && hourNum <= 15) daypartGroups.add('Daytime');
            else if (hourNum >= 16 && hourNum <= 18) daypartGroups.add('Early Fringe');
            else if (hourNum >= 19 && hourNum <= 22) daypartGroups.add('Prime Time');
            else if (hourNum >= 23 || hourNum <= 1) daypartGroups.add('Late Fringe');
          }
        });
      });
      
      if (totalSlots > 0) {
        lines.push(`- Configured: ${totalSlots} time slots selected`);
        lines.push(`- Daypart groups: ${Array.from(daypartGroups).join(', ')}`);
      } else {
        lines.push('- Not configured (running all day)');
      }
    } else {
      lines.push('- Not configured (running all day)');
    }
  }

  if (context.interests) {
    lines.push('\nInterests:');
    if (context.interests.selectedInterests && context.interests.selectedInterests.length > 0) {
      lines.push(`- Selected Interests: ${context.interests.selectedInterests.length}`);
      lines.push(`- Interests: ${context.interests.selectedInterests.slice(0, 5).join(', ')}${context.interests.selectedInterests.length > 5 ? '...' : ''}`);
    } else {
      lines.push('- No specific interests selected');
    }
  }

  if (context.keywords) {
    lines.push('\nKeywords:');
    if (context.keywords.selectedKeywords && context.keywords.selectedKeywords.length > 0) {
      lines.push(`- Selected Keywords: ${context.keywords.selectedKeywords.length}`);
      lines.push(`- Keywords: ${context.keywords.selectedKeywords.slice(0, 5).join(', ')}${context.keywords.selectedKeywords.length > 5 ? '...' : ''}`);
    } else {
      lines.push('- No specific keywords selected');
    }
  }

  if (context.geo) {
    lines.push('\nGeo-Targeting:');
    if (context.geo.selectedZipCodes && context.geo.selectedZipCodes.length > 0) {
      lines.push(`- Geo-targeted: ${context.geo.selectedZipCodes.length} zip codes selected`);
    } else {
      lines.push('- Nationwide targeting (no specific geo-targeting)');
    }
  }

  // For omnichannel campaigns - show data for each channel
  if (context.omnichannel && context.omnichannel.channelData) {
    const channelData = context.omnichannel.channelData;
    const channels = Object.keys(channelData);
    
    if (channels.length > 0) {
      lines.push('\n=== Omnichannel Configuration ===');
      
      channels.forEach(channelId => {
        const channel = channelData[channelId];
        const channelName = channelId.charAt(0).toUpperCase() + channelId.slice(1);
        
        lines.push(`\n${channelName} Channel:`);
        
        // Audience for the channel
        if (channel.audience) {
          const audienceParts: string[] = [];
          if (channel.audience.gender && channel.audience.gender.length > 0) audienceParts.push(`Gender: ${channel.audience.gender.join(', ')}`);
          if (channel.audience.age && channel.audience.age.length > 0) audienceParts.push(`Age: ${channel.audience.age.join(', ')}`);
          if (channel.audience.income && channel.audience.income.length > 0) audienceParts.push(`Income: ${channel.audience.income.join(', ')}`);
          if (channel.audience.education && channel.audience.education.length > 0) audienceParts.push(`Education: ${channel.audience.education.join(', ')}`);
          if (channel.audience.householdSize && channel.audience.householdSize.length > 0) audienceParts.push(`Household: ${channel.audience.householdSize.join(', ')}`);
          
          if (audienceParts.length > 0) {
            lines.push(`  - Audience: ${audienceParts.join('; ')}`);
          } else {
            lines.push('  - Audience: Not configured');
          }
        }
        
        // Dayparts for the channel
        if (channel.dayparts && channel.dayparts.selectedSlots) {
          let totalSlots = 0;
          const daypartGroups = new Set<string>();
          
          Object.entries(channel.dayparts.selectedSlots).forEach(([day, hours]: [string, any]) => {
            Object.entries(hours).forEach(([hour, selected]: [string, any]) => {
              if (selected) {
                totalSlots++;
                const hourNum = parseInt(hour);
                if (hourNum >= 2 && hourNum <= 5) daypartGroups.add('Overnight');
                else if (hourNum >= 6 && hourNum <= 9) daypartGroups.add('Early Morning');
                else if (hourNum >= 10 && hourNum <= 15) daypartGroups.add('Daytime');
                else if (hourNum >= 16 && hourNum <= 18) daypartGroups.add('Early Fringe');
                else if (hourNum >= 19 && hourNum <= 22) daypartGroups.add('Prime Time');
                else if (hourNum >= 23 || hourNum <= 1) daypartGroups.add('Late Fringe');
              }
            });
          });
          
          if (totalSlots > 0) {
            lines.push(`  - Dayparts: ${totalSlots} slots (${Array.from(daypartGroups).join(', ')})`);
          } else {
            lines.push('  - Dayparts: Not configured');
          }
        }
        
        // Interests for the channel
        if (channel.interests && channel.interests.length > 0) {
          lines.push(`  - Interests: ${channel.interests.length} selected`);
        }
        
        // Keywords for the channel (search only)
        if (channel.keywords && channel.keywords.length > 0) {
          lines.push(`  - Keywords: ${channel.keywords.length} selected`);
        }
        
        // Geo for the channel
        if (channel.geo && channel.geo.selectedZipCodes && channel.geo.selectedZipCodes.length > 0) {
          lines.push(`  - Geo: ${channel.geo.selectedZipCodes.length} zip codes`);
        } else if (channel.geo && channel.geo.targetNationally) {
          lines.push('  - Geo: Nationwide');
        }
      });
    }
  }

  if (context.estimations) {
    lines.push('\nEstimations:');
    if (context.estimations.audienceEstimation) {
      lines.push(`- Audience Estimation: ${context.estimations.audienceEstimation.toLocaleString()}`);
    }
    if (context.estimations.marketEstimation) {
      lines.push(`- Market Estimation: ${context.estimations.marketEstimation.toLocaleString()}`);
    }
  }

  // If nothing is added, return JSON
  if (lines.length === 0) {
    return JSON.stringify(context, null, 2);
  }

  const formattedContext = lines.join('\n');
  // console.log('✅ Formatted context for AI:\n', formattedContext);
  return formattedContext;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { systemPrompt, context } = body;

    if (!systemPrompt) {
      return NextResponse.json(
        { error: 'System prompt is required' },
        { status: 400 }
      );
    }

    // Get AI settings
    const { provider, apiKey } = getAISettings();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI API key not configured' },
        { status: 400 }
      );
    }

    // Format context into readable form
    const contextString = typeof context === 'string' 
      ? context 
      : formatContextForAI(context);

    // Choose API based on provider
    let suggestion: string;
    
    if (provider === 'openai') {
      suggestion = await getOpenAISuggestion(apiKey, systemPrompt, contextString);
    } else if (provider === 'gemini') {
      suggestion = await getGeminiSuggestion(apiKey, systemPrompt, contextString);
    } else {
      suggestion = await getDeepSeekSuggestion(apiKey, systemPrompt, contextString);
    }

    return NextResponse.json({ 
      suggestion,
      provider 
    });

  } catch (error) {
    console.error('AI suggestion error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate suggestion',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

