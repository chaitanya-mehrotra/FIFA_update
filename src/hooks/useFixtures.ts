import { useQuery } from '@tanstack/react-query';
import { getGames } from '../services/footballApi';
import type { Match } from '../types';

export function useFixtures() {
  return useQuery<Match[]>({
    queryKey: ['fixtures'],
    queryFn: getGames,
    staleTime: 30000,
    refetchInterval: 30000, // Auto-refresh every 30s for live data
  });
}
