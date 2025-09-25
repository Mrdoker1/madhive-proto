'use client';

import React, { useState, useEffect } from 'react';
import { Checkbox, Table, TableThead, TableTbody, TableTr, TableTh, TableTd, Text, TextInput, Alert } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import MarketDetailTable from './MarketDetailTable';
import { useAppSelector, useAppDispatch } from '@/hooks/useRedux';
import { updateMarketsData } from '@/store/slices/campaignSlice';
import { marketsDatabase, type MarketData, type MarketDetailData } from '@/data/marketsData';


const MarketsSection = () => {
  const dispatch = useAppDispatch();
  const marketsData = useAppSelector((state) => state.campaign.markets);
  const linearData = useAppSelector((state) => state.campaign.linear);
  const budgetData = useAppSelector((state) => state.campaign.budget);
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());


  // Функция для расчета процентов и бюджета по выбранным маркетам
  const calculateBudgetAndPercentageDistribution = (availableMarkets: MarketData[], selectedMarkets: MarketData[]) => {
    if (selectedMarkets.length === 0) {
      return availableMarkets.map(market => ({ 
        ...market, 
        budget: 0,
        percentage: 0
      }));
    }

    // Равномерное распределение процентов между выбранными маркетами
    const percentagePerMarket = 100 / selectedMarkets.length;
    
    return availableMarkets.map(market => {
      if (market.selected) {
        // Рассчитываем бюджет на основе процента от общего бюджета
        const budget = (budgetData.totalBudget * percentagePerMarket) / 100;
        return {
          ...market,
          percentage: Math.round(percentagePerMarket * 100) / 100, // Округляем до 2 знаков
          budget: budget
        };
      } else {
        return {
          ...market,
          percentage: 0,
          budget: 0
        };
      }
    });
  };

  // Функция для обработки изменения процента для конкретного рынка
  const handlePercentageChange = (marketId: string, value: string) => {
    // Разрешаем только цифры и точку для десятичных чисел
    if (!/^\d*\.?\d*$/.test(value)) return;
    
    const numericValue = parseFloat(value) || 0;
    
    // Ограничиваем максимальным значением 100
    if (numericValue > 100) return;
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        // Пересчитываем бюджет на основе нового процента
        const budget = (budgetData.totalBudget * numericValue) / 100;
        
        // Пересчитываем бюджеты подрынков на основе нового бюджета основного рынка
        const updatedDetails = market.details.map(detail => ({
          ...detail,
          budget: (budget * detail.percentage) / 100
        }));
        
        return {
          ...market,
          percentage: numericValue,
          budget: budget,
          details: updatedDetails
        };
      }
      return market;
    });
    
    setMarkets(updatedMarkets);
  };

  // Функция для расчета общего процента выбранных рынков
  const getTotalPercentage = () => {
    let total = 0;
    
    markets.forEach(market => {
      // Добавляем процент основного рынка, если он выбран
      // Подрынки являются частью основного рынка, поэтому их проценты не суммируются с основным
      if (market.selected) {
        total += market.percentage;
      }
    });
    
    return total;
  };

  // Функция для проверки превышения процентов в подрынках
  const checkSubMarketOverallocation = () => {
    return markets.some(market => {
      if (market.selected && market.details.length > 0) {
        const subMarketTotal = market.details
          .filter(detail => detail.selected)
          .reduce((sum, detail) => sum + detail.percentage, 0);
        return subMarketTotal > 100;
      }
      return false;
    });
  };

  // Проверяем, превышает ли общий процент 100% или есть превышение в подрынках
  const totalPercentage = getTotalPercentage();
  const hasSubMarketOverallocation = checkSubMarketOverallocation();
  const isOverHundredPercent = totalPercentage > 100 || hasSubMarketOverallocation;

  // Загружаем рынки при изменении выбранных broadcasters
  useEffect(() => {
    if (linearData.broadcasters.length === 0) {
      setMarkets([]);
      return;
    }

    // Собираем все рынки для выбранных broadcasters
    const allAvailableMarkets: MarketData[] = [];
    linearData.broadcasters.forEach(broadcaster => {
      if (marketsDatabase[broadcaster]) {
        allAvailableMarkets.push(...marketsDatabase[broadcaster]);
      }
    });

    // Проставляем статус selected на основе сохраненных данных
    const marketsWithSelection = allAvailableMarkets.map(market => ({
      ...market,
      selected: marketsData.selectedMarkets.includes(market.name)
    }));

    // Сохраняем уже введенные пользователем проценты и состояние подстанций
    const marketsWithPreservedData = marketsWithSelection.map(market => {
      // Ищем существующий рынок с теми же данными, чтобы сохранить введенные проценты
      const existingMarket = markets.find(m => m.id === market.id);
      if (existingMarket) {
        // Сохраняем процент и пересчитываем бюджет
        const budget = market.selected ? (budgetData.totalBudget * existingMarket.percentage) / 100 : 0;
        
        // Сохраняем состояние подстанций
        const preservedDetails = market.details.map(detail => {
          const existingDetail = existingMarket.details.find(d => d.id === detail.id);
          if (existingDetail) {
            // Пересчитываем бюджет для подстанции от бюджета основного рынка
            const detailBudget = (budget * existingDetail.percentage) / 100;
            return {
              ...detail,
              selected: existingDetail.selected,
              percentage: existingDetail.percentage,
              budget: detailBudget
            };
          }
          return detail;
        });
        
        return {
          ...market,
          percentage: market.selected ? existingMarket.percentage : 0,
          budget: budget,
          details: preservedDetails
        };
      }
      // Для новых рынков - проценты в 0
      return {
        ...market,
        percentage: 0,
        budget: 0
      };
    });
    
    setMarkets(marketsWithPreservedData);
  }, [linearData.broadcasters, marketsData.selectedMarkets, budgetData.totalBudget]);


  const handleSelectAll = (checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      const newMarket = { ...market, selected: checked };
      
      // При снятии выделения сбрасываем процент и бюджет
      if (!checked) {
        newMarket.percentage = 0;
        newMarket.budget = 0;
        
        // Также снимаем выделение со всех подстанций
        newMarket.details = newMarket.details.map(detail => ({
          ...detail,
          selected: false,
          percentage: 0,
          budget: 0
        }));
      } else {
        // При выделении всех рынков выбираем все подстанции
        newMarket.details = newMarket.details.map(detail => ({
          ...detail,
          selected: true,
          percentage: 0, // Пользователь сам введет проценты
          budget: 0
        }));
      }
      
      return newMarket;
    });
    
    const selectedMarketNames = checked ? updatedMarkets.map(market => market.name) : [];
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  const handleMarketSelect = (marketId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const newMarket = { ...market, selected: checked };
        
        // При снятии выделения сбрасываем процент и бюджет
        if (!checked) {
          newMarket.percentage = 0;
          newMarket.budget = 0;
          
          // Также снимаем выделение со всех подстанций
          newMarket.details = newMarket.details.map(detail => ({
            ...detail,
            selected: false,
            percentage: 0,
            budget: 0
          }));
        } else {
          // При выделении основного рынка выбираем все подстанции с равномерным распределением
          const detailsCount = newMarket.details.length;
          const percentagePerDetail = detailsCount > 0 ? 100 / detailsCount : 0;
          
          newMarket.details = newMarket.details.map(detail => {
            const percentage = Math.round(percentagePerDetail * 100) / 100; // Округляем до 2 знаков
            const budget = (newMarket.budget * percentage) / 100; // Рассчитываем бюджет от основного рынка
            
            return {
              ...detail,
              selected: true,
              percentage: percentage,
              budget: budget
            };
          });
        }
        
        return newMarket;
      }
      return market;
    });
    
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };


  // Обработчик выбора подстанции
  const handleDetailSelect = (marketId: string, detailId: string, checked: boolean) => {
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedDetails = market.details.map(detail => {
          if (detail.id === detailId) {
            return { 
              ...detail, 
              selected: checked,
              percentage: checked ? detail.percentage : 0,
              budget: checked ? detail.budget : 0
            };
          }
          return detail;
        });
        
        // Проверяем, остались ли выбранные подстанции
        const hasSelectedDetails = updatedDetails.some(detail => detail.selected);
        
        // Если нет выбранных подстанций, снимаем выделение с основного рынка
        const updatedMarket = { 
          ...market, 
          details: updatedDetails,
          selected: hasSelectedDetails ? market.selected : false,
          percentage: hasSelectedDetails ? market.percentage : 0,
          budget: hasSelectedDetails ? market.budget : 0
        };
        
        return updatedMarket;
      }
      return market;
    });
    
    // Обновляем selectedMarkets в Redux
    const selectedMarketNames = updatedMarkets
      .filter(market => market.selected)
      .map(market => market.name);
    
    setMarkets(updatedMarkets);
    dispatch(updateMarketsData({ selectedMarkets: selectedMarketNames }));
  };

  // Обработчик изменения процента подстанции
  const handleDetailPercentageChange = (marketId: string, detailId: string, value: string) => {
    // Разрешаем только цифры и точку для десятичных чисел
    if (!/^\d*\.?\d*$/.test(value)) return;
    
    const numericValue = parseFloat(value) || 0;
    
    // Ограничиваем максимальным значением 100
    if (numericValue > 100) return;
    
    const updatedMarkets = markets.map(market => {
      if (market.id === marketId) {
        const updatedDetails = market.details.map(detail => {
          if (detail.id === detailId) {
            // Пересчитываем бюджет на основе нового процента от бюджета основного рынка
            const budget = (market.budget * numericValue) / 100;
            return {
              ...detail,
              percentage: numericValue,
              budget: budget
            };
          }
          return detail;
        });
        return { ...market, details: updatedDetails };
      }
      return market;
    });
    
    setMarkets(updatedMarkets);
  };

  // Функция для переключения коллапса детальной таблицы
  const handleToggleDetailExpand = (marketId: string) => {
    console.log('Toggling expand for market:', marketId);
    setExpandedDetails(prev => {
      const newSet = new Set(prev);
      console.log('Current expanded details:', Array.from(prev));
      if (newSet.has(marketId)) {
        newSet.delete(marketId);
        console.log('Removing from expanded:', marketId);
      } else {
        newSet.add(marketId);
        console.log('Adding to expanded:', marketId);
      }
      console.log('New expanded details:', Array.from(newSet));
      return newSet;
    });
  };

  const allSelected = markets.length > 0 && markets.every(market => market.selected);
  const someSelected = markets.some(market => market.selected);

  // Получаем выбранные рынки с деталями для отображения во второй части
  const selectedMarketsWithDetails = markets.filter(market => market.selected && market.details.length > 0);

  // Автоматически разворачиваем первую детальную таблицу для тестирования
  useEffect(() => {
    if (selectedMarketsWithDetails.length > 0 && expandedDetails.size === 0) {
      const firstMarketId = selectedMarketsWithDetails[0].id;
      setExpandedDetails(new Set([firstMarketId]));
      console.log('Auto-expanding first market:', firstMarketId);
    }
  }, [selectedMarketsWithDetails.length > 0 ? selectedMarketsWithDetails[0]?.id : null]);

  return (
    <div>
      {/* Info message */}
      <div style={{ marginBottom: '24px' }}>
        {linearData.broadcasters.length === 0 ? (
          <Text size="sm" c="dimmed">
            Select broadcasters in Linear Details to see available markets
          </Text>
        ) : (
          <Text size="sm" c="dark">
            Markets available for selected broadcasters: {linearData.broadcasters.join(', ')}
          </Text>
        )}
      </div>

      {/* Alert for percentage validation */}
      {isOverHundredPercent && (
        <Alert 
          icon={<IconAlertTriangle size={16} />}
          title="Percentage Allocation Warning"
          color="orange"
          style={{ marginBottom: '20px' }}
        >
          {totalPercentage > 100 && hasSubMarketOverallocation ? (
            <>
              Total percentage allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
              Additionally, some sub-markets exceed 100% allocation within their parent markets. 
              Please adjust the percentages accordingly.
            </>
          ) : totalPercentage > 100 ? (
            <>
              Total percentage allocation is {totalPercentage.toFixed(1)}%, which exceeds 100%. 
              Please adjust the percentages to ensure they do not exceed 100% in total.
            </>
          ) : (
            <>
              Some sub-markets exceed 100% allocation within their parent markets. 
              Please adjust the sub-market percentages to ensure they do not exceed 100% per market.
            </>
          )}
        </Alert>
      )}

      {/* Main Markets Table */}
      <Table
        styles={{
          tr: {
            height: '48px'
          }
        }}
      >
        <TableThead>
          <TableTr>
            <TableTh style={{ width: '40px' }}>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected && !allSelected}
                onChange={(event) => handleSelectAll(event.currentTarget.checked)}
              />
            </TableTh>
            <TableTh>
              <Text size="xs" fw={500}>Market</Text>
            </TableTh>
            <TableTh style={{ width: '120px' }}>
              <Text size="xs" fw={500}>% of Budget</Text>
            </TableTh>
            <TableTh style={{ width: '100px' }}>
              <Text size="xs" fw={500}>Budget</Text>
            </TableTh>
            <TableTh style={{ width: '120px' }}>
              <Text size="xs" fw={500}>Impression</Text>
            </TableTh>
            <TableTh style={{ width: '80px' }}>
              <Text size="xs" fw={500}>CPM</Text>
            </TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {markets.map((market) => (
            <TableTr key={market.id}>
              <TableTd>
                <Checkbox
                  checked={market.selected}
                  onChange={(event) => handleMarketSelect(market.id, event.currentTarget.checked)}
                />
              </TableTd>
              <TableTd>
                <Text size="xs">
                  {market.name}
                  {market.details.length > 0 && ` (${market.details.length})`}
                </Text>
              </TableTd>
              <TableTd>
                {market.selected ? (
                  <TextInput
                    size="xs"
                    value={market.percentage.toString()}
                    onChange={(event) => handlePercentageChange(market.id, event.currentTarget.value)}
                    rightSection={<Text size="xs" c="dimmed">%</Text>}
                    styles={{
                      input: {
                        fontSize: '12px',
                        padding: '4px 20px 4px 0',
                        height: '28px',
                        textAlign: 'center'
                      },
                      section: {
                        width: '32px'
                      }
                    }}
                  />
                ) : (
                  <Text size="xs" c="dimmed">-</Text>
                )}
              </TableTd>
              <TableTd>
                <Text size="xs">
                  {market.budget > 0 ? `$${market.budget.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '$0'}
                </Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{market.impression}</Text>
              </TableTd>
              <TableTd>
                <Text size="xs">{market.cpm}</Text>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>

      {/* Detailed Tables for Selected Markets */}
      {selectedMarketsWithDetails.map((market) => (
        <MarketDetailTable
          key={`detail-${market.id}`}
          market={market}
          isExpanded={expandedDetails.has(market.id)}
          onToggleExpand={() => handleToggleDetailExpand(market.id)}
          onDetailSelect={(detailId, checked) => handleDetailSelect(market.id, detailId, checked)}
          onDetailPercentageChange={(detailId, value) => handleDetailPercentageChange(market.id, detailId, value)}
        />
      ))}
    </div>
  );
};

export default MarketsSection;
