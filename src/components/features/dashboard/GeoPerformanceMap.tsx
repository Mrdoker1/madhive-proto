'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getCampaignDMAData, type CampaignDMAZone } from '@/data/campaignDmaData';
import { useDashboardFilters } from '@/contexts/DashboardFilterContext';
import mapboxgl from 'mapbox-gl';

const GeoPerformanceMap: React.FC = () => {
  const { campaign } = useDashboardFilters();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [hoveredZone, setHoveredZone] = useState<CampaignDMAZone | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [campaignData, setCampaignData] = useState<ReturnType<typeof getCampaignDMAData> | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKeyLoaded, setApiKeyLoaded] = useState(false);

  // Загрузка API ключа из настроек
  useEffect(() => {
    const loadApiKey = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        mapboxgl.accessToken = data.mapboxApiKey || 'pk.eyJ1IjoibXJkb2tlcjEiLCJhIjoiY2szNGlvZHcxMDFweTNjcG4xeXRicng5ZSJ9.PAdeoloR2kVbvXM7LFO-zg';
        setApiKeyLoaded(true);
      } catch (error) {
        console.error('Failed to load API key:', error);
        // Используем дефолтный ключ
        mapboxgl.accessToken = 'pk.eyJ1IjoibXJkb2tlcjEiLCJhIjoiY2szNGlvZHcxMDFweTNjcG4xeXRicng5ZSJ9.PAdeoloR2kVbvXM7LFO-zg';
        setApiKeyLoaded(true);
      }
    };
    loadApiKey();
  }, []);

  // Загрузка данных кампании при изменении выбранной кампании
  useEffect(() => {
    if (campaign) {
      const data = getCampaignDMAData(campaign);
      setCampaignData(data);
    } else {
      setCampaignData(null);
    }
  }, [campaign]);

  // Инициализация карты
  useEffect(() => {
    if (!mapContainer.current || map.current || !apiKeyLoaded) {
      console.log('Map init skipped:', { hasContainer: !!mapContainer.current, hasMap: !!map.current, apiKeyLoaded });
      return;
    }

    console.log('Initializing Mapbox...');
    console.log('Mapbox token:', mapboxgl.accessToken ? 'SET' : 'NOT SET');

    try {
      // Инициализация карты - берем Streets но будем скрывать лишние слои
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-95.7129, 37.0902],
        zoom: 3.5,
        projection: 'mercator',
        scrollZoom: false
      });

      console.log('Mapbox instance created, waiting for load event...');

      map.current.on('load', () => {
        if (!map.current) return;
        console.log('✅ Map loaded successfully!');
        
        // Убираем дороги и лишние детали
        const style = map.current.getStyle();
        if (style && style.layers) {
          style.layers.forEach((layer: any) => {
            try {
              // Скрываем ВСЕ дороги, мосты, туннели и их номера
              if (
                layer.id.includes('road') ||
                layer.id.includes('bridge') ||
                layer.id.includes('tunnel') ||
                layer.id.includes('street') ||
                layer.id.includes('motorway') ||
                layer.id.includes('highway') ||
                layer.id.includes('path') ||
                layer.id.includes('ferry') ||
                layer.id.includes('aeroway') ||
                layer.id.includes('hillshade') ||
                layer.id.includes('building') ||
                layer.id.includes('poi-label') ||
                layer.id.includes('transit')
              ) {
                map.current!.setLayoutProperty(layer.id, 'visibility', 'none');
              }
            } catch (e) {
              // Игнорируем ошибки для слоев без нужных свойств
            }
          });
        }
        
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('❌ Map error:', e);
      });

      map.current.on('style.load', () => {
        console.log('Style loaded');
      });
    } catch (error) {
      console.error('❌ Error creating map:', error);
    }

    // Обработчик для зума по Ctrl+Scroll
    const handleWheel = (e: WheelEvent) => {
      if (!map.current) return;
      
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        
        const delta = -e.deltaY;
        const zoom = map.current.getZoom();
        const zoomChange = delta > 0 ? 0.5 : -0.5;
        
        map.current.easeTo({
          zoom: zoom + zoomChange,
          duration: 100
        });
      }
    };

    const mapElement = mapContainer.current;
    mapElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      mapElement?.removeEventListener('wheel', handleWheel);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    };
  }, [apiKeyLoaded]);

  // Отображение DMA зон на карте
  useEffect(() => {
    if (!map.current || !campaignData || !mapLoaded) {
      console.log('DMA zones effect - waiting...', { 
        hasMap: !!map.current, 
        hasCampaignData: !!campaignData, 
        mapLoaded 
      });
      return;
    }

    console.log('Adding DMA zones to map...', campaignData.campaignName);

    // Удаляем старые маркеры
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Удаляем старые слои и источники
    if (map.current.getLayer('dma-fills')) {
      map.current.removeLayer('dma-fills');
    }
    if (map.current.getSource('dma-zones')) {
      map.current.removeSource('dma-zones');
    }

    const zones = campaignData.zones;
    if (zones.length === 0) return;
    
    console.log('Processing zones:', zones.length);

    // Получаем максимальное значение impressions для цветовой шкалы
    const maxImpressions = Math.max(...zones.map(z => z.impressions));

    // Функция для получения цвета зоны
    const getZoneColor = (impressions: number): string => {
      const percentage = (impressions / maxImpressions) * 100;
      if (percentage >= 75) return '#059669';
      if (percentage >= 50) return '#10b981';
      if (percentage >= 25) return '#6ee7b7';
      return '#d1fae5';
    };

    // Создаем GeoJSON для DMA зон (точки)
    const geojsonFeatures = zones.map((zone) => {
      return {
        type: 'Feature',
        properties: {
          name: zone.dmaName,
          city: zone.city,
          state: zone.state,
          impressions: zone.impressions,
          color: getZoneColor(zone.impressions)
        },
        geometry: {
          type: 'Point',
          coordinates: zone.coordinates
        }
      };
    });

    // Добавляем источник данных
    map.current.addSource('dma-zones', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: geojsonFeatures as any
      }
    });

    // Вычисляем радиус круга на основе impressions
    const minImpressions = Math.min(...zones.map(z => z.impressions));
    
    // Добавляем слой с кругами для DMA зон
    map.current.addLayer({
      id: 'dma-fills',
      type: 'circle',
      source: 'dma-zones',
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['get', 'impressions'],
          minImpressions, 30,
          maxImpressions, 80
        ],
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.3,
        'circle-stroke-width': 3,
        'circle-stroke-color': ['get', 'color'],
        'circle-stroke-opacity': 0.7
      }
    });

    // Обработчики hover для кругов
    map.current.on('mouseenter', 'dma-fills', (e) => {
      if (map.current && e.features && e.features[0]) {
        map.current.getCanvas().style.cursor = 'pointer';
        const feature = e.features[0];
        const zone = zones.find(z => 
          z.city === feature.properties?.city && 
          z.state === feature.properties?.state
        );
        if (zone) {
          setHoveredZone(zone);
        }
      }
    });

    map.current.on('mousemove', 'dma-fills', (e) => {
      if (e.point) {
        setTooltipPosition({ x: e.point.x, y: e.point.y });
      }
    });

    map.current.on('mouseleave', 'dma-fills', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = '';
        setHoveredZone(null);
        setTooltipPosition(null);
      }
    });

    // Подстраиваем карту под все зоны
    const bounds = new mapboxgl.LngLatBounds();
    zones.forEach(zone => {
      bounds.extend(zone.coordinates);
    });
    
    map.current.fitBounds(bounds, {
      padding: 100,
      maxZoom: 6
    });

  }, [campaignData, mapLoaded]);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', margin: 0 }}>
          {campaignData ? `Geographic Performance - ${campaignData.campaignName}` : 'Geographic Performance'}
        </h3>
      </div>

      <div style={{ display: 'flex', gap: '0', minHeight: '600px' }}>
        {/* Map Container */}
        <div style={{ flex: '1', position: 'relative', backgroundColor: '#f5f5f5' }}>
          <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
          
          {/* No campaign selected message */}
          {!campaignData && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '32px 48px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                border: '1px solid var(--border-color)',
                zIndex: 10
              }}
            >
              <p style={{ fontSize: '16px', marginBottom: '8px', fontWeight: 600, color: '#111827' }}>Please select a campaign</p>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>Use the filter above to view DMA zones</p>
            </div>
          )}
          
          {/* Loading indicator */}
          {!mapLoaded && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '14px',
                color: '#6B7280'
              }}
            >
              Loading map...
            </div>
          )}

          {/* Tooltip */}
          {hoveredZone && tooltipPosition && (
            <div
              style={{
                position: 'absolute',
                left: tooltipPosition.x + 15,
                top: tooltipPosition.y - 30,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '8px',
                pointerEvents: 'none',
                zIndex: 10,
                fontSize: '13px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                {hoveredZone.city}, {hoveredZone.state}
              </div>
              <div style={{ color: '#D1D5DB', fontSize: '12px' }}>
                Impressions: {hoveredZone.impressions.toLocaleString('en-US')}
              </div>
            </div>
          )}
        </div>

        {/* DMA Zones Table */}
        {campaignData && (
          <div
            style={{
              width: '380px',
              borderLeft: '1px solid var(--border-color)',
              backgroundColor: 'var(--header-background)',
              overflowY: 'auto'
            }}
          >
            <div style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', marginBottom: '16px', textTransform: 'uppercase' }}>
                DMA Zones
              </h4>
              
              {/* Table */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {campaignData.zones.map((zone, index) => {
                const maxImpressions = Math.max(...campaignData.zones.map(z => z.impressions));
                const percentage = (zone.impressions / maxImpressions) * 100;
                
                let color = '#d1fae5';
                if (percentage >= 75) color = '#059669';
                else if (percentage >= 50) color = '#10b981';
                else if (percentage >= 25) color = '#6ee7b7';

                // Функция приближения к зоне
                const handleZoomToZone = () => {
                  if (map.current) {
                    map.current.flyTo({
                      center: zone.coordinates,
                      zoom: 7,
                      duration: 1500,
                      essential: true
                    });
                  }
                };

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={handleZoomToZone}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: color,
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          flexShrink: 0
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                          {zone.city}, {zone.state}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          {zone.dmaName}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '36px' }}>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>Impressions:</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                        {zone.impressions.toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>
                );
                })}
              </div>
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
          gap: '24px',
          backgroundColor: '#FFFFFF'
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

export default GeoPerformanceMap;

