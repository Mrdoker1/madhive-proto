'use client';

import React, { useState, useMemo } from 'react';
import { Select } from '@mantine/core';
import { campaignTableData, type CampaignTableRow } from '@/data/dashboardTableData';

const CampaignTable: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Вычисляем данные для текущей страницы
  const totalItems = campaignTableData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalItems);
  const currentData = useMemo(() => 
    campaignTableData.slice(startIdx, endIdx), 
    [startIdx, endIdx]
  );

  // Форматирование чисел с запятыми
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      {/* Header with filters */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '14px', color: '#000000' }}>
          By Dimension
        </div>
        
        <Select
          data={[
            { value: 'campaign', label: 'Campaign' },
            { value: 'channel', label: 'Channel' },
            { value: 'market', label: 'Market' },
            { value: 'daypart', label: 'Daypart' }
          ]}
          defaultValue="campaign"
          styles={{
            input: {
              width: '200px',
              height: '40px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '14px'
            }
          }}
        />

        <Select
          data={[
          ]}
          placeholder="- Select -"
          styles={{
            input: {
              width: '200px',
              height: '40px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              fontSize: '14px'
            }
          }}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--header-background)' }}>
              <th style={{
                padding: '16px 24px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6B7280',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Campaign
              </th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6B7280',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Impressions
              </th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6B7280',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Reach
              </th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6B7280',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Avg. Frequency
              </th>
              <th style={{
                padding: '16px 24px',
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 500,
                color: '#6B7280',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Conversions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: index < currentData.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}
              >
                <td style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  color: '#000000'
                }}>
                  {row.campaign}
                </td>
                <td style={{
                  padding: '16px 24px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#000000'
                }}>
                  {formatNumber(row.impressions)}
                </td>
                <td style={{
                  padding: '16px 24px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#000000'
                }}>
                  {formatNumber(row.reach)}
                </td>
                <td style={{
                  padding: '16px 24px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#000000'
                }}>
                  {row.avgFrequency.toFixed(1)}
                </td>
                <td style={{
                  padding: '16px 24px',
                  textAlign: 'right',
                  fontSize: '14px',
                  color: '#000000'
                }}>
                  {formatNumber(row.conversions)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination */}
      <div
        style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Per Page Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Select
            data={[
              { value: '10', label: '10' },
              { value: '20', label: '20' },
              { value: '50', label: '50' }
            ]}
            value={String(pageSize)}
            onChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}
            styles={{
              input: {
                width: '80px',
                height: '36px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                fontSize: '14px'
              }
            }}
          />
          <span style={{ fontSize: '14px', color: '#6B7280' }}>Per Page</span>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#6B7280' }}>
            {startIdx + 1} - {endIdx} of {totalItems}
          </span>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1
              }}
            >
              ←
            </button>
            
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: currentPage === pageNum ? 'none' : '1px solid var(--border-color)',
                      borderRadius: '6px',
                      backgroundColor: currentPage === pageNum ? 'var(--primary-color)' : '#FFFFFF',
                      color: currentPage === pageNum ? '#FFFFFF' : '#000000',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: currentPage === pageNum ? 700 : 400
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignTable;

