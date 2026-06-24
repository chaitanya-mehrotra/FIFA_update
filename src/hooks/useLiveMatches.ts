import { useQuery } from '@tanstack/react-query';
import { getGames } from '../services/footballApi';

export function useLiveMatches() {
  return useQuery({
    queryKey: ['liveMatches'],
    queryFn: async () => {
      const allGames = await getGames();
      
      const live = allGames.filter(g => g.status === 'live');
      
      // Compute "Today" based on local time or UTC boundary. 
      // For simplicity and since it's a global tournament, we can just grab upcoming matches within the next 24 hours
      // Or matches that are happening today in UTC.
      const now = new Date();
      const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      const today = allGames.filter(g => {
        if (g.status !== 'upcoming') return false;
        const matchDate = new Date(g.date);
        return matchDate >= now && matchDate <= next24h;
      });

      const upcoming = allGames.filter(g => g.status === 'upcoming' && !today.includes(g));
      const latest = allGames.filter(g => g.status === 'finished').reverse().slice(0, 5);

      return { live, today, upcoming, latest };
    },
    refetchInterval: 30000,
  });
}
