import type { CampaignGeneralData, CampaignBudgetData, CampaignGoalData, CampaignFlightData } from '@/store/slices/campaignSlice';

export interface ValidationError {
  field: string;
  message: string;
  sectionId?: string;
}

/**
 * Валидация General Details
 */
export const validateGeneralDetails = (data: CampaignGeneralData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.campaignName || data.campaignName.trim() === '') {
    errors.push({
      field: 'campaignName',
      message: 'Campaign Name is required',
      sectionId: 'general-details'
    });
  }

  if (!data.advertiser || data.advertiser.trim() === '') {
    errors.push({
      field: 'advertiser',
      message: 'Advertiser is required',
      sectionId: 'general-details'
    });
  }

  if (!data.cpeCode || data.cpeCode.trim() === '') {
    errors.push({
      field: 'cpeCode',
      message: 'CPE Code is required',
      sectionId: 'general-details'
    });
  }

  if (!data.campaignOwner || data.campaignOwner.trim() === '') {
    errors.push({
      field: 'campaignOwner',
      message: 'Campaign Owner is required',
      sectionId: 'general-details'
    });
  }

  if (!data.campaignApprover || data.campaignApprover.trim() === '') {
    errors.push({
      field: 'campaignApprover',
      message: 'Campaign Approver is required',
      sectionId: 'general-details'
    });
  }

  if (!data.spotLength || data.spotLength.length === 0) {
    errors.push({
      field: 'spotLength',
      message: 'Spot Length is required',
      sectionId: 'general-details'
    });
  }

  return errors;
};

/**
 * Валидация Total Budget
 */
export const validateTotalBudget = (data: CampaignBudgetData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.totalBudget || data.totalBudget <= 0) {
    errors.push({
      field: 'totalBudget',
      message: 'Total Budget is required',
      sectionId: 'total-budget'
    });
  }

  return errors;
};

/**
 * Валидация Goal
 */
export const validateGoal = (data: CampaignGoalData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.goalType || data.goalType.trim() === '') {
    errors.push({
      field: 'goalType',
      message: 'Goal Type is required',
      sectionId: 'goal'
    });
  }

  return errors;
};

/**
 * Валидация Flight Range
 */
export const validateFlightRange = (data: CampaignFlightData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.startDate || data.startDate.trim() === '') {
    errors.push({
      field: 'startDate',
      message: 'Flight Start Date is required',
      sectionId: 'flight-range'
    });
  }

  if (!data.endDate || data.endDate.trim() === '') {
    errors.push({
      field: 'endDate',
      message: 'Flight End Date is required',
      sectionId: 'flight-range'
    });
  }

  return errors;
};

/**
 * Форматирование ошибок в единую строку для отображения
 */
export const formatValidationErrors = (errors: ValidationError[]): string => {
  if (errors.length === 0) return '';
  
  // Группируем ошибки по секциям
  const errorsBySection = errors.reduce((acc, error) => {
    const section = error.sectionId || 'general';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(error.message);
    return acc;
  }, {} as Record<string, string[]>);

  // Берем первую ошибку для отображения
  const firstError = errors[0];
  return firstError.message;
};

/**
 * Конвертация массива ошибок в объект для подсветки полей
 */
export const errorsToFieldErrors = (errors: ValidationError[]): Record<string, string> => {
  return errors.reduce((acc, error) => {
    if (error.field) {
      acc[error.field] = error.message;
    }
    return acc;
  }, {} as Record<string, string>);
};

/**
 * Валидация Select Channels (для Omnichannel)
 */
export const validateSelectChannels = (selectedChannels: string[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!selectedChannels || selectedChannels.length === 0) {
    errors.push({
      field: 'selectedChannels',
      message: 'Please select at least one channel',
      sectionId: 'select-channels'
    });
  }

  return errors;
};

/**
 * Валидация Allocation (для Omnichannel)
 * Проверяем, что все выбранные каналы имеют распределенный бюджет
 * Точное равенство суммы totalBudget не проверяем, так как AllocationSection
 * автоматически управляет распределением и может округлять значения
 */
export const validateAllocation = (
  budgetAllocation: Record<string, number> | undefined,
  selectedChannels: string[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Если нет выбранных каналов, валидация не нужна
  if (selectedChannels.length === 0) {
    return errors;
  }

  // Проверяем, что budgetAllocation существует
  if (!budgetAllocation) {
    errors.push({
      field: 'budgetAllocation',
      message: 'Please allocate budget across channels',
      sectionId: 'allocation'
    });
    return errors;
  }

  // Проверяем, что все выбранные каналы имеют распределенный бюджет (больше 0)
  const channelsWithoutBudget = selectedChannels.filter(
    channel => !budgetAllocation[channel] || budgetAllocation[channel] <= 0
  );

  if (channelsWithoutBudget.length > 0) {
    errors.push({
      field: 'budgetAllocation',
      message: 'All selected channels must have budget allocated',
      sectionId: 'allocation'
    });
  }

  return errors;
};

/**
 * Валидация Markets (для Linear)
 * Проверяем, что выбран хотя бы один маркет
 */
export const validateMarkets = (selectedMarkets: string[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!selectedMarkets || selectedMarkets.length === 0) {
    errors.push({
      field: 'selectedMarkets',
      message: 'Please select at least one market',
      sectionId: 'markets'
    });
  }

  return errors;
};

/**
 * Валидация Broadcasters and Programs (для Linear)
 * Проверяем, что:
 * 1. Выбран хотя бы один broadcaster
 * 2. Выбрана хотя бы одна станция в общем (не обязательно у каждого broadcaster)
 */
export const validateBroadcastersAndPrograms = (
  broadcasters: string[],
  broadcastersWithStations?: Array<{
    id: string;
    name: string;
    stations: Array<{ id: string; selected: boolean }>;
  }>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Проверяем, что выбран хотя бы один broadcaster
  if (!broadcasters || broadcasters.length === 0) {
    errors.push({
      field: 'broadcasters',
      message: 'Please select at least one broadcaster',
      sectionId: 'broadcasters'
    });
    return errors;
  }

  // Проверяем, что выбрана хотя бы одна станция в общем (у любого broadcaster)
  if (broadcastersWithStations && broadcastersWithStations.length > 0) {
    const totalSelectedStations = broadcastersWithStations.reduce((count, broadcaster) => {
      const selectedStations = broadcaster.stations.filter(s => s.selected);
      return count + selectedStations.length;
    }, 0);

    if (totalSelectedStations === 0) {
      errors.push({
        field: 'stations',
        message: 'Please select at least one station',
        sectionId: 'broadcasters'
      });
    }
  }

  return errors;
};

/**
 * Валидация Proposal - проверка выбора программ (для Linear)
 * Проверяем, что выбрана хотя бы одна программа
 */
export const validateProgramSelection = (
  programSelections: { [stationId: string]: { [programId: string]: boolean } }
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Подсчитываем общее количество выбранных программ
  let totalSelectedPrograms = 0;
  
  Object.values(programSelections).forEach(stationPrograms => {
    Object.values(stationPrograms).forEach(isSelected => {
      if (isSelected) {
        totalSelectedPrograms++;
      }
    });
  });

  if (totalSelectedPrograms === 0) {
    errors.push({
      field: 'programs',
      message: 'Please select at least one program',
      sectionId: 'proposal'
    });
  }

  return errors;
};

/**
 * Валидация Proposal - проверка бюджета программ (для Linear)
 * Проверяем, что выбранные программы не превышают выделенный бюджет станции
 */
export const validateProgramBudget = (
  programSelections: { [stationId: string]: { [programId: string]: boolean } },
  stationPrograms: { 
    [stationId: string]: Array<{ 
      id: string; 
      rate: number; 
    }> 
  },
  stationBudgets: { [stationId: string]: number }
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Проверяем каждую станцию
  Object.keys(programSelections).forEach(stationId => {
    const selectedPrograms = programSelections[stationId];
    const programs = stationPrograms[stationId] || [];
    const allocatedBudget = stationBudgets[stationId] || 0;

    // Считаем общую стоимость выбранных программ для этой станции
    let totalRate = 0;
    Object.keys(selectedPrograms).forEach(programId => {
      if (selectedPrograms[programId]) {
        const program = programs.find(p => p.id === programId);
        if (program) {
          totalRate += program.rate;
        }
      }
    });

    // Проверяем превышение бюджета
    if (totalRate > allocatedBudget) {
      errors.push({
        field: 'programBudget',
        message: 'Selected programs exceed the allocated budget',
        sectionId: 'proposal'
      });
      // Возвращаем после первой найденной ошибки, чтобы не дублировать сообщение
      return;
    }
  });

  return errors;
};

/**
 * Скролл к первой ошибке
 */
export const scrollToFirstError = (errors: ValidationError[]): void => {
  if (errors.length === 0) return;
  
  const firstError = errors[0];
  if (firstError.sectionId) {
    const element = document.getElementById(firstError.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};

