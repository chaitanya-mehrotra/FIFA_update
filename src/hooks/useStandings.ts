import { useQuery } from '@tanstack/react-query';
import { getStandings } from '../services/footballApi';

export function useStandings() {
  return useQuery({
    queryKey: ['standings'],
    queryFn: getStandings,
    staleTime: 60000,
    refetchInterval: 60000,
  });
}
