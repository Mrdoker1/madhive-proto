'use client';

import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

// Mock данные для графиков
const generateMockData = (baseValue: number, variance: number, points: number = 30): number[] => {
  const data: number[] = [];
  let current = baseValue;
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * variance;
    current = Math.max(baseValue * 0.8, Math.min(baseValue * 1.2, current + change));
    data.push(current);
  }
  
  return data;
};

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
  const metricsData = [
    {
      title: 'Impressions',
      value: '2,529,748',
      data: generateMockData(2500000, 100000),
      color: '#8B5CF6'
    },
    {
      title: 'Reach',
      value: '2,087,987',
      data: generateMockData(2000000, 80000),
      color: '#8B5CF6'
    },
    {
      title: 'Frequency',
      value: '6.2',
      data: generateMockData(6, 0.5),
      color: '#8B5CF6'
    },
    {
      title: 'Incremental Reach',
      value: '1,099,112',
      data: generateMockData(1100000, 50000),
      color: '#8B5CF6'
    },
    {
      title: 'Unique Reach',
      value: '770,228',
      data: generateMockData(770000, 30000),
      color: '#8B5CF6'
    }
  ];

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

