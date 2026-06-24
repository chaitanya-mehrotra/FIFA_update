import { useQuery } from '@tanstack/react-query';
import { getGames, getTeams } from '../services/footballApi';

export function useStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const games = await getGames();
      const teams = await getTeams();

      const scorersMap: Record<string, { teamId: string, goals: number }> = {};
      const teamStatsMap: Record<string, any> = {};
      
      teams.forEach(t => {
        teamStatsMap[t.id] = { teamId: t.id, goalsScored: 0, goalsConceded: 0, wins: 0, draws: 0, losses: 0, cleanSheets: 0 };
      });

      const goalDistribution = [
        { minute: '0-15', goals: 0 },
        { minute: '16-30', goals: 0 },
        { minute: '31-45', goals: 0 },
        { minute: '46-60', goals: 0 },
        { minute: '61-75', goals: 0 },
        { minute: '76-90', goals: 0 },
        { minute: '90+', goals: 0 },
      ];

      const getMinuteBin = (minuteStr: string) => {
        const min = parseInt(minuteStr);
        if (isNaN(min)) return '90+';
        if (min <= 15) return '0-15';
        if (min <= 30) return '16-30';
        if (min <= 45) return '31-45';
        if (min <= 60) return '46-60';
        if (min <= 75) return '61-75';
        if (min <= 90) return '76-90';
        return '90+';
      };

      games.filter(g => g.status === 'finished' || g.status === 'live').forEach(game => {
        // Scorers
        game.homeScorers?.forEach(s => {
          if (!scorersMap[s.player]) scorersMap[s.player] = { teamId: game.homeTeamId || '', goals: 0 };
          scorersMap[s.player].goals++;
          const bin = getMinuteBin(s.minute);
          const binObj = goalDistribution.find(b => b.minute === bin);
          if (binObj) binObj.goals++;
        });
        game.awayScorers?.forEach(s => {
          if (!scorersMap[s.player]) scorersMap[s.player] = { teamId: game.awayTeamId || '', goals: 0 };
          scorersMap[s.player].goals++;
          const bin = getMinuteBin(s.minute);
          const binObj = goalDistribution.find(b => b.minute === bin);
          if (binObj) binObj.goals++;
        });

        // Team stats (only if both teams known)
        if (game.homeTeamId && game.awayTeamId) {
          const home = teamStatsMap[game.homeTeamId];
          const away = teamStatsMap[game.awayTeamId];
          const hs = game.homeScore || 0;
          const as = game.awayScore || 0;

          if (home) {
            home.goalsScored += hs;
            home.goalsConceded += as;
            if (as === 0 && hs > 0) home.cleanSheets++;
            if (hs > as) home.wins++;
            else if (hs === as) home.draws++;
            else home.losses++;
          }

          if (away) {
            away.goalsScored += as;
            away.goalsConceded += hs;
            if (hs === 0 && as > 0) away.cleanSheets++;
            if (as > hs) away.wins++;
            else if (hs === as) away.draws++;
            else away.losses++;
          }
        }
      });

      const topScorers = Object.entries(scorersMap)
        .map(([name, data]) => ({ name, ...data, assists: 0, yellowCards: 0 })) // API lacks assists/cards
        .sort((a, b) => b.goals - a.goals);

      const teamStats = Object.values(teamStatsMap);

      return { topScorers, teamStats, goalDistribution };
    },
    staleTime: 60000,
  });
}
