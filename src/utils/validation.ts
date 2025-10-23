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

