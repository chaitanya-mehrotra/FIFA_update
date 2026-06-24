import { useQuery } from '@tanstack/react-query';
import { getTeams } from '../services/footballApi';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 60, // 1 hour (teams rarely change)
  });
}
