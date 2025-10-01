'use client';

import React, { useState, useRef, useEffect } from 'react';
import { dmaMapData, getColorForValue, formatMetricValue, type DMAData } from '@/data/geoMapData';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibXJkb2tlcjEiLCJhIjoiY2szNGlvZHcxMDFweTNjcG4xeXRicng5ZSJ9.PAdeoloR2kVbvXM7LFO-zg';

type MetricType = 'impressions' | 'grps' | 'reach';

// Маппинг кодов штатов на полные названия
const STATE_CODE_TO_NAME: Record<string, string> = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
  'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
  'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
  'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
  'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
  'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
  'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
  'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
  'DC': 'District of Columbia'
};

const STATE_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_CODE_TO_NAME).map(([code, name]) => [name, code])
);

const GeoPerformanceMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const selectedMetric: MetricType = 'impressions'; // Фиксированная метрика
  const [hoveredDMA, setHoveredDMA] = useState<DMAData | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Инициализация карты
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-95.7129, 37.0902],
      zoom: 3.5
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Создаем маппинг STATE_NAME -> цвет для всех штатов
      const stateColorMap: Record<string, string> = {};
      
      // Группируем данные по штату (для штатов с несколькими DMA берем максимум)
      const stateMetrics: Record<string, number> = {};
      dmaMapData.forEach(dma => {
        const stateName = STATE_CODE_TO_NAME[dma.state];
        if (stateName) {
          const currentValue = stateMetrics[stateName] || 0;
          stateMetrics[stateName] = Math.max(currentValue, dma[selectedMetric]);
        }
      });
      
      // Создаем цвета для каждого штата
      Object.entries(stateMetrics).forEach(([stateName, value]) => {
        stateColorMap[stateName] = getColorForValue(value, selectedMetric);
      });

      // Создаем expression для fill-color
      const fillColorExpression: any = ['match', ['get', 'STATE_NAME']];
      Object.entries(stateColorMap).forEach(([stateName, color]) => {
        fillColorExpression.push(stateName, color);
      });
      fillColorExpression.push('#E5E7EB'); // default color

      // Добавляем слой штатов из Mapbox
      map.current.addLayer({
        id: 'state-fills',
        type: 'fill',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.us_census_states_2015'
        },
        'source-layer': 'states',
        paint: {
          'fill-color': fillColorExpression,
          'fill-opacity': 0.7
        }
      });

      // Добавляем границы штатов
      map.current.addLayer({
        id: 'state-borders',
        type: 'line',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.us_census_states_2015'
        },
        'source-layer': 'states',
        paint: {
          'line-color': '#ffffff',
          'line-width': 2
        }
      });

      // Обработчики hover
      map.current.on('mousemove', 'state-fills', (e) => {
        if (!e.features || !e.features[0]) return;
        
        const stateName = e.features[0].properties?.STATE_NAME;
        
        if (stateName && map.current) {
          map.current.getCanvas().style.cursor = 'pointer';
          
          const stateCode = STATE_NAME_TO_CODE[stateName];
          if (stateCode) {
            // Находим первый DMA для этого штата
            const dma = dmaMapData.find(d => d.state === stateCode);
            if (dma) {
              setHoveredDMA(dma);
              setHoverPosition({ x: e.point.x, y: e.point.y });
            }
          }
        }
      });

      map.current.on('mouseleave', 'state-fills', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
        }
        setHoveredDMA(null);
        setHoverPosition(null);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Map Container */}
      <div style={{ height: '500px', position: 'relative' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />

        {/* Tooltip */}
        {hoveredDMA && hoverPosition && (
          <div
            style={{
              position: 'absolute',
              left: hoverPosition.x + 10,
              top: hoverPosition.y + 10,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: '#FFFFFF',
              padding: '12px 16px',
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 10,
              fontSize: '14px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>
              {hoveredDMA.dmaName}, {hoveredDMA.state}
            </div>
            <div style={{ color: '#D1D5DB' }}>
              {getMetricLabel(selectedMetric)}: {formatMetricValue(hoveredDMA[selectedMetric], selectedMetric)}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}
      >
        <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Impressions:</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {[
            { color: '#d1fae5', label: 'Low (0-25%)' },
            { color: '#6ee7b7', label: 'Medium (25-50%)' },
            { color: '#10b981', label: 'High (50-75%)' },
            { color: '#059669', label: 'Very High (75-100%)' }
          ].map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  border: '2px solid #ffffff',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <span style={{ fontSize: '12px', color: '#6B7280' }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для получения координат DMA
function getCoordinatesForDMA(dmaCode: string): [number, number] {
  const coordinates: Record<string, [number, number]> = {
    'NY': [-74.0060, 40.7128],
    'LA': [-118.2437, 34.0522],
    'CHI': [-87.6298, 41.8781],
    'PHI': [-75.1652, 39.9526],
    'DAL': [-96.7970, 32.7767],
    'SF': [-122.4194, 37.7749],
    'BOS': [-71.0589, 42.3601],
    'ATL': [-84.3880, 33.7490],
    'WAS': [-77.0369, 38.9072],
    'HOU': [-95.3698, 29.7604],
    'DET': [-83.0458, 42.3314],
    'SEA': [-122.3321, 47.6062],
    'PHX': [-112.0740, 33.4484],
    'MIN': [-93.2650, 44.9778],
    'MIA': [-80.1918, 25.7617],
    'DEN': [-104.9903, 39.7392],
    'ORL': [-81.3792, 28.5383],
    'SAC': [-121.4944, 38.5816]
  };
  
  return coordinates[dmaCode] || [-95.7129, 37.0902];
}

// Вспомогательная функция для получения label метрики
function getMetricLabel(metric: MetricType): string {
  const labels: Record<MetricType, string> = {
    'impressions': 'Impressions',
    'grps': 'GRPs',
    'reach': 'Reach'
  };
  
  return labels[metric];
}

export default GeoPerformanceMap;

