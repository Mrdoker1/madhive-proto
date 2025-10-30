import { allBroadcasterStations } from './stations';

export interface BroadcasterData {
  id: string;
  name: string;
  displayName: string;
}

// Generate broadcasters based on new data from stations folder
export const broadcastersData: BroadcasterData[] = allBroadcasterStations.map(broadcaster => ({
  id: broadcaster.broadcasterId,
  name: broadcaster.broadcasterName,
  displayName: broadcaster.broadcasterName
}));

// Function to get broadcaster by ID
export const getBroadcasterById = (id: string): BroadcasterData | undefined => {
  return broadcastersData.find(broadcaster => broadcaster.id === id);
};

// Function to get broadcaster by name
export const getBroadcasterByName = (name: string): BroadcasterData | undefined => {
  return broadcastersData.find(broadcaster => broadcaster.name === name);
};
