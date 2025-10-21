'use client';

import React, { useMemo } from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { campaignTableData } from '@/data/DashboardData';
import { useDashboardFilters } from '@/contexts/DashboardFilterContext';

interface MetricCardProps {
  title: string;
  value: string | number;
  data: number[];
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  data,
  color = '#8B5CF6'
}) => {
  const chartData = data.map((val, index) => ({ index, value: val }));

  const formatValue = (val: string | number): string => {
    const numStr = val.toString();
    if (numStr.includes('.')) {
      return numStr;
    }
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '250px',
        flex: 1
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: 500, color: '#6B7280' }}>
        {title}
      </div>

      <div style={{ fontSize: '32px', fontWeight: 700, color: '#000000', lineHeight: 1 }}>
        {formatValue(value)}
      </div>

      <div style={{ width: '100%', height: '60px', marginTop: 'auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MetricsSection: React.FC = () => {
  const { advertiser, campaign } = useDashboardFilters();

  // Вычисляем суммарные метрики из данных кампаний с учетом фильтров
  const metricsData = useMemo(() => {
    // Фильтруем данные на основе выбранных фильтров
    let filteredData = campaignTableData;
    
    if (advertiser) {
      filteredData = filteredData.filter(row => row.advertiser === advertiser);
    }
    
    if (campaign) {
      filteredData = filteredData.filter(row => row.id === campaign);
    }

    // Если нет данных после фильтрации, возвращаем пустые значения
    if (filteredData.length === 0) {
      return [
        { title: 'Impressions', value: '0', data: [], color: '#8B5CF6' },
        { title: 'Reach', value: '0', data: [], color: '#8B5CF6' },
        { title: 'Frequency', value: '0.0', data: [], color: '#8B5CF6' },
        { title: 'Incremental Reach', value: '0', data: [], color: '#8B5CF6' },
        { title: 'Unique Reach', value: '0', data: [], color: '#8B5CF6' }
      ];
    }

    const totalImpressions = filteredData.reduce((sum, row) => sum + row.impressions, 0);
    const totalReach = filteredData.reduce((sum, row) => sum + row.reach, 0);
    const totalIncrementalReach = filteredData.reduce((sum, row) => sum + row.incrementalReach, 0);
    const totalUniqueReach = filteredData.reduce((sum, row) => sum + row.uniqueReach, 0);
    const avgFrequency = filteredData.reduce((sum, row) => sum + row.frequency, 0) / filteredData.length;

    // Суммируем тренды по отфильтрованным кампаниям
    const sumTrends = (trendKey: 'impressionsTrend' | 'reachTrend' | 'frequencyTrend' | 'incrementalReachTrend' | 'uniqueReachTrend') => {
      const maxLength = Math.max(...filteredData.map(row => row[trendKey].length));
      const summedTrend: number[] = [];
      
      for (let i = 0; i < maxLength; i++) {
        const sum = filteredData.reduce((acc, row) => {
          return acc + (row[trendKey][i] || 0);
        }, 0);
        summedTrend.push(sum);
      }
      
      return summedTrend;
    };

    return [
      {
        title: 'Impressions',
        value: totalImpressions.toLocaleString('en-US'),
        data: sumTrends('impressionsTrend'),
        color: '#8B5CF6'
      },
      {
        title: 'Reach',
        value: totalReach.toLocaleString('en-US'),
        data: sumTrends('reachTrend'),
        color: '#8B5CF6'
      },
      {
        title: 'Frequency',
        value: avgFrequency.toFixed(1),
        data: sumTrends('frequencyTrend').map(val => val / filteredData.length),
        color: '#8B5CF6'
      },
      {
        title: 'Incremental Reach',
        value: totalIncrementalReach.toLocaleString('en-US'),
        data: sumTrends('incrementalReachTrend'),
        color: '#8B5CF6'
      },
      {
        title: 'Unique Reach',
        value: totalUniqueReach.toLocaleString('en-US'),
        data: sumTrends('uniqueReachTrend'),
        color: '#8B5CF6'
      }
    ];
  }, [advertiser, campaign]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px'
      }}
    >
      {metricsData.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          data={metric.data}
          color={metric.color}
        />
      ))}
    </div>
  );
};

export default MetricsSection;

