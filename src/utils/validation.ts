import type { CampaignGeneralData, CampaignBudgetData, CampaignGoalData, CampaignFlightData, SpotLengthMix } from '@/store/slices/campaignSlice';

export interface ValidationError {
  field: string;
  message: string;
  sectionId?: string;
}

/**
 * Validation for General Details
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

  return errors;
};

/**
 * Validation for Total Budget
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
 * Validation for Goal
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
 * Validation for Flight Range
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
 * Format errors into a single string for display
 */
export const formatValidationErrors = (errors: ValidationError[]): string => {
  if (errors.length === 0) return '';
  
  // Group errors by sections
  const errorsBySection = errors.reduce((acc, error) => {
    const section = error.sectionId || 'general';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(error.message);
    return acc;
  }, {} as Record<string, string[]>);

  // Take first error for display
  const firstError = errors[0];
  return firstError.message;
};

/**
 * Convert error array to object for field highlighting
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
 * Validation for Select Channels (for Omnichannel)
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
 * Validation for Allocation (for Omnichannel)
 * Check that all selected channels have allocated budget
 * We don't check exact equality to totalBudget, as AllocationSection
 * automatically manages distribution and may round values
 */
export const validateAllocation = (
  budgetAllocation: Record<string, number> | undefined,
  selectedChannels: string[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // If no channels selected, validation not needed
  if (selectedChannels.length === 0) {
    return errors;
  }

  // Check that budgetAllocation exists
  if (!budgetAllocation) {
    errors.push({
      field: 'budgetAllocation',
      message: 'Please allocate budget across channels',
      sectionId: 'allocation'
    });
    return errors;
  }

  // Check that all selected channels have allocated budget (greater than 0)
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
 * Validation for Linear Details
 * Check that measurement provider is selected
 */
export const validateLinearDetails = (measurementProvider: string): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!measurementProvider || measurementProvider.trim() === '') {
    errors.push({
      field: 'measurementProvider',
      message: 'Measurement provider is required',
      sectionId: 'linear-details'
    });
  }

  return errors;
};

/**
 * Validation for Markets (for Linear)
 * Check that at least one market is selected
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
 * Validation for Broadcasters and Programs (for Linear)
 * Check that:
 * 1. At least one broadcaster is selected
 * 2. At least one station is selected overall (not necessarily for each broadcaster)
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

  // Check that at least one broadcaster is selected
  if (!broadcasters || broadcasters.length === 0) {
    errors.push({
      field: 'broadcasters',
      message: 'Please select at least one broadcaster',
      sectionId: 'broadcasters'
    });
    return errors;
  }

  // Check that at least one station is selected overall (from any broadcaster)
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
 * Validation for Spot Length Mix
 * Check that percentages add up to 100%
 */
export const validateSpotLengthMix = (spotLengthMix: SpotLengthMix | undefined): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!spotLengthMix) {
    errors.push({
      field: 'spotLengthMix',
      message: 'Spot Length is required',
      sectionId: 'spot-length'
    });
    return errors;
  }

  const total = spotLengthMix.fifteen + spotLengthMix.thirty + spotLengthMix.sixty;
  
  if (total !== 100) {
    errors.push({
      field: 'spotLengthMix',
      message: `Spot Length percentages must add up to 100% (currently ${total}%)`,
      sectionId: 'spot-length'
    });
  }

  return errors;
};

/**
 * Validation for Proposal - program selection check (for Linear)
 * Check that at least one program is selected
 */
export const validateProgramSelection = (
  programSelections: { [stationId: string]: { [programId: string]: boolean } }
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Count total number of selected programs
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
 * Validation for Proposal - program budget check (for Linear)
 * Check that selected programs don't exceed allocated station budget
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

  // Check each station
  Object.keys(programSelections).forEach(stationId => {
    const selectedPrograms = programSelections[stationId];
    const programs = stationPrograms[stationId] || [];
    const allocatedBudget = stationBudgets[stationId] || 0;

    // Calculate total cost of selected programs for this station
    let totalRate = 0;
    Object.keys(selectedPrograms).forEach(programId => {
      if (selectedPrograms[programId]) {
        const program = programs.find(p => p.id === programId);
        if (program) {
          totalRate += program.rate;
        }
      }
    });

    // Check budget excess
    if (totalRate > allocatedBudget) {
      errors.push({
        field: 'programBudget',
        message: 'Selected programs exceed the allocated budget',
        sectionId: 'proposal'
      });
      // Return after first found error to avoid duplicate messages
      return;
    }
  });

  return errors;
};

/**
 * Scroll to first error
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

