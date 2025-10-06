'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';
import { Table, TableTbody, TableTr, TableTd, Text, ActionIcon } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

interface SummaryRowProps {
  label: string;
  value: string | React.ReactNode;
  editRoute: string;
  isEmpty?: boolean;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value, editRoute, isEmpty = false }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(editRoute);
  };

  return (
    <TableTr>
      <TableTd style={{ width: '200px', paddingRight: '24px' }}>
        <Text size="xs" fw={500} c="dark">
          {label}
        </Text>
      </TableTd>
      <TableTd style={{ paddingRight: '24px' }}>
        {isEmpty ? (
          <Text size="xs" c="dimmed">
            Not specified
          </Text>
        ) : (
          <Text size="xs" c="dark">
            {value}
          </Text>
        )}
      </TableTd>
      <TableTd style={{ width: '60px', textAlign: 'right' }}>
        <ActionIcon
          variant="transparent"
          size="sm"
          onClick={handleEdit}
          title="Edit"
          style={{ color: 'var(--secondary-color)' }}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </TableTd>
    </TableTr>
  );
};

const CampaignSummarySection: React.FC = () => {
  // Получаем данные из Redux store
  const campaign = useAppSelector((state) => state.campaign);

  // Форматирование бюджета
  const formatCurrency = (amount: number) => {
    if (amount === 0) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Форматирование дат
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Вычисление продолжительности кампании
  const getCampaignDuration = () => {
    if (!campaign.flight.startDate || !campaign.flight.endDate) return '';
    
    const start = new Date(campaign.flight.startDate);
    const end = new Date(campaign.flight.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `Campaign of ${diffDays} Days from ${formatDate(campaign.flight.startDate)} to ${formatDate(campaign.flight.endDate)}`;
  };

  // Форматирование списков
  const formatArray = (arr: string[], limit = 3) => {
    if (arr.length === 0) return '';
    if (arr.length <= limit) {
      return arr.join(', ');
    }
    return `${arr.slice(0, limit).join(', ')} +${arr.length - limit} more`;
  };

  // Форматирование данных аудитории в строку
  const formatAudienceString = () => {
    const parts = [];
    if (campaign.audience.gender.length > 0) {
      parts.push(`Gender: ${formatArray(campaign.audience.gender)}`);
    }
    if (campaign.audience.age.length > 0) {
      parts.push(`Age: ${formatArray(campaign.audience.age)}`);
    }
    if (campaign.audience.income.length > 0) {
      parts.push(`Income: ${formatArray(campaign.audience.income)}`);
    }
    return parts.join(', ');
  };

  // Форматирование Markets данных
  const formatMarketsString = () => {
    return formatArray(campaign.markets.selectedMarkets);
  };

  // Форматирование Daypart Summary
  const formatDaypartSummary = () => {
    const selectedSlots = campaign.dayparts.selectedSlots;
    
    if (!selectedSlots || Object.keys(selectedSlots).length === 0) return '';
    
    // Группируем дни по временным интервалам
    const timeRanges: Record<string, string[]> = {};
    
    // Список дней для правильного порядка (начинается с Monday)
    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayNames = {
      'Sun': 'Sun',
      'Mon': 'Mon', 
      'Tue': 'Tue',
      'Wed': 'Wed',
      'Thu': 'Thu',
      'Fri': 'Fri',
      'Sat': 'Sat'
    };
    
    // Функция для форматирования времени
    const formatHour = (hour: number): string => {
      if (hour === 0) return '12am';
      if (hour < 12) return `${hour}am`;
      if (hour === 12) return '12pm';
      return `${hour - 12}pm`;
    };
    
    // Для каждого дня находим непрерывные временные интервалы
    dayOrder.forEach(day => {
      if (!selectedSlots[day]) return;
      
      const selectedHours = Object.entries(selectedSlots[day])
        .filter(([_, selected]) => selected)
        .map(([hour, _]) => parseInt(hour))
        .sort((a, b) => a - b);
        
      if (selectedHours.length === 0) return;
      
      // Группируем непрерывные часы в диапазоны
      let ranges: string[] = [];
      let start = selectedHours[0];
      let end = selectedHours[0];
      
      for (let i = 1; i <= selectedHours.length; i++) {
        if (i < selectedHours.length && selectedHours[i] === end + 1) {
          end = selectedHours[i];
        } else {
          // Завершаем текущий диапазон
          let range;
          if (start === end) {
            range = formatHour(start);
          } else {
            // Диапазон включает конечный час, поэтому добавляем +1 к end
            range = `${formatHour(start)}-${formatHour(end + 1)}`;
          }
          ranges.push(range);
          
          if (i < selectedHours.length) {
            start = selectedHours[i];
            end = selectedHours[i];
          }
        }
      }
      
      // Группируем дни с одинаковыми временными диапазонами
      const timeKey = ranges.join(', ');
      if (!timeRanges[timeKey]) {
        timeRanges[timeKey] = [];
      }
      timeRanges[timeKey].push(dayNames[day as keyof typeof dayNames]);
    });
    
    // Формируем итоговую строку
    const formattedRanges = Object.entries(timeRanges).map(([timeRange, days]) => {
      // Группируем смежные дни
      const groupedDays = groupConsecutiveDays(days);
      return `${groupedDays} ${timeRange}`;
    });
    
    return formattedRanges.join(', ');
  };
  
  // Вспомогательная функция для группировки смежных дней
  const groupConsecutiveDays = (days: string[]): string => {
    const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const sortedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    
    if (sortedDays.length === 0) return '';
    if (sortedDays.length === 1) return sortedDays[0];
    
    // Проверяем на специальные группы
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weekend = ['Sat', 'Sun'];
    
    if (weekdays.every(day => sortedDays.includes(day)) && sortedDays.length === 5) {
      return 'Mon-Fri';
    }
    
    if (weekend.every(day => sortedDays.includes(day)) && sortedDays.length === 2) {
      return 'Sat/Sun';
    }
    
    // Группируем смежные дни
    const groups: string[] = [];
    let start = 0;
    
    while (start < sortedDays.length) {
      let end = start;
      
      // Находим конец текущей группы смежных дней
      while (end + 1 < sortedDays.length) {
        const currentIndex = dayOrder.indexOf(sortedDays[end]);
        const nextIndex = dayOrder.indexOf(sortedDays[end + 1]);
        
        if (nextIndex === currentIndex + 1) {
          end++;
        } else {
          break;
        }
      }
      
      // Формируем группу
      if (start === end) {
        groups.push(sortedDays[start]);
      } else if (end === start + 1) {
        groups.push(`${sortedDays[start]}/${sortedDays[end]}`);
      } else {
        groups.push(`${sortedDays[start]}-${sortedDays[end]}`);
      }
      
      start = end + 1;
    }
    
    return groups.join('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* General Section */}
      <div>
        <Text size="lg" fw={600} mb="md" c="dark">General</Text>
        <Table>
          <TableTbody>
            {/* Campaign Name */}
            <SummaryRow
              label="Campaign Name"
              value={campaign.general.campaignName}
              editRoute="/campaign/linear/new#general-details"
              isEmpty={!campaign.general.campaignName}
            />

            {/* Campaign Duration */}
            <SummaryRow
              label="Campaign Duration"
              value={getCampaignDuration()}
              editRoute="/campaign/linear/new#flight-range"
              isEmpty={!campaign.flight.startDate || !campaign.flight.endDate}
            />

            {/* Advertiser */}
            <SummaryRow
              label="Advertiser"
              value={campaign.general.advertiser}
              editRoute="/campaign/linear/new#general-details"
              isEmpty={!campaign.general.advertiser}
            />

            {/* Agency */}
            <SummaryRow
              label="Agency"
              value={campaign.general.agency}
              editRoute="/campaign/linear/new#general-details"
              isEmpty={!campaign.general.agency}
            />

            {/* Spot Length */}
            <SummaryRow
              label="Spot Length"
              value={campaign.general.spotLength.length > 0 ? campaign.general.spotLength.map(s => `:${s}`).join(', ') : ''}
              editRoute="/campaign/linear/new#general-details"
              isEmpty={campaign.general.spotLength.length === 0}
            />
          </TableTbody>
        </Table>
      </div>

      {/* Rich Section */}
      <div>
        <Text size="lg" fw={600} mb="md" c="dark">Rich</Text>
        <Table>
          <TableTbody>
            {/* Budget */}
            <SummaryRow
              label="Budget"
              value={formatCurrency(campaign.budget.totalBudget)}
              editRoute="/campaign/linear/new#total-budget"
              isEmpty={campaign.budget.totalBudget === 0}
            />

            {/* Audience */}
            <SummaryRow
              label="Audience"
              value={formatAudienceString()}
              editRoute="/campaign/linear/details#audiences"
              isEmpty={
                campaign.audience.gender.length === 0 && 
                campaign.audience.age.length === 0 && 
                campaign.audience.income.length === 0
              }
            />

            {/* Markets */}
            <SummaryRow
              label="Markets"
              value={formatMarketsString()}
              editRoute="/campaign/linear/details#markets"
              isEmpty={campaign.markets.selectedMarkets.length === 0}
            />

            {/* Daypart Summary */}
            <SummaryRow
              label="Daypart Summary"
              value={formatDaypartSummary()}
              editRoute="/campaign/linear/details#dayparts"
              isEmpty={
                Object.values(campaign.dayparts.selectedSlots).every(
                  daySlots => Object.values(daySlots).every(slot => !slot)
                )
              }
            />
          </TableTbody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignSummarySection;
