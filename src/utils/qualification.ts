import type { Match, GroupStanding } from '../types';

export type TeamStatus = 'WINNER' | 'RUNNER_UP' | 'QUALIFIED' | 'ELIMINATED' | 'TBD';

export interface QualificationResult {
  groupWinners: Record<string, string>;
  groupRunnersUp: Record<string, string>;
  bestThirds: string[];
  bestThirdsMap: Record<string, string>; // Maps team ID -> Group
  teamStatus: Record<string, TeamStatus>;
}

export function calculateQualification(standings: Record<string, GroupStanding[]>): QualificationResult {
  const groupWinners: Record<string, string> = {};
  const groupRunnersUp: Record<string, string> = {};
  const thirdPlaces: GroupStanding[] = [];
  const teamStatus: Record<string, TeamStatus> = {};
  
  let allGroupsFinished = true;
  
  Object.values(standings).forEach(teams => {
    if (teams.length === 0) return;
    const isGroupFinished = teams.every(t => t.played >= 3);
    if (!isGroupFinished) allGroupsFinished = false;
  });

  const currentThirds = Object.values(standings)
    .filter(teams => teams.length >= 3)
    .map(teams => {
      const sorted = [...teams].sort((a, b) => b.points - a.points);
      return sorted[2].points;
    })
    .sort((a, b) => b - a);
    
  const current8thBestThirdPoints = currentThirds.length >= 8 ? currentThirds[7] : 0;

  const maxThirds = Object.values(standings).map(teams => {
    if (teams.length < 3) return 0;
    const maxPointsList = teams.map(t => t.points + Math.max(0, 3 - t.played) * 3).sort((a, b) => b - a);
    return maxPointsList[2] || 0;
  }).sort((a, b) => b - a);

  const max9thBestThirdPoints = maxThirds.length >= 9 ? maxThirds[8] : 0;

  Object.entries(standings).forEach(([group, teams]) => {
    if (teams.length === 0) return;
    const isGroupFinished = teams.every(t => t.played >= 3);

    // Calculate max achievable points for each team
    const teamsWithMax = teams.map(t => ({
      ...t,
      maxPoints: t.points + Math.max(0, 3 - t.played) * 3
    }));

    teamsWithMax.forEach((team, idx) => {
      const others = teamsWithMax.filter(t => t.teamId !== team.teamId);
      const othersMaxPoints = others.map(t => t.maxPoints).sort((a, b) => b - a);

      const highestOtherMax = othersMaxPoints[0] || 0;
      const secondHighestOtherMax = othersMaxPoints[1] || 0;
      const thirdHighestOtherMax = othersMaxPoints[2] || 0;

      // Mathematical guarantees
      const guaranteedFirst = team.points > highestOtherMax;
      const guaranteedTop2 = team.points > secondHighestOtherMax;
      
      const guaranteedAtLeastThird = team.points > thirdHighestOtherMax;
      const guaranteedTop8Thirds = team.points > max9thBestThirdPoints;
      const guaranteedToQualify = guaranteedTop2 || (guaranteedAtLeastThird && guaranteedTop8Thirds);
      
      const currentPoints = teams.map(t => t.points).sort((a, b) => b - a);
      const guaranteedFourth = team.maxPoints < (currentPoints[2] || 0);
      const cannotReachTop8Thirds = team.maxPoints < current8thBestThirdPoints;
      
      const isEliminated = guaranteedFourth || cannotReachTop8Thirds;

      let status: TeamStatus = 'TBD';

      if (isGroupFinished) {
        if (idx === 0) {
          groupWinners[group] = team.teamId;
          status = 'WINNER';
        } else if (idx === 1) {
          groupRunnersUp[group] = team.teamId;
          status = 'RUNNER_UP';
        } else if (idx === 2) {
          thirdPlaces.push({ ...team, group } as any);
          status = 'TBD'; // Evaluated globally after all groups finish
        } else {
          status = 'ELIMINATED';
        }
      } else {
        // Group NOT finished — use strict mathematical bounds
        if (guaranteedFirst) {
          groupWinners[group] = team.teamId;
          status = 'WINNER';
        } else if (guaranteedToQualify) {
          // Can they still catch the current 1st place?
          const currentFirstPoints = teamsWithMax[0].teamId === team.teamId 
            ? teamsWithMax[1].points 
            : teamsWithMax[0].points;
          if (team.maxPoints < currentFirstPoints) {
             groupRunnersUp[group] = team.teamId;
             status = 'RUNNER_UP';
          } else {
             status = 'QUALIFIED'; // Secured Top 2 or Best 3rd, but exact seed TBD
          }
        } else if (isEliminated) {
          status = 'ELIMINATED';
        }
      }

      teamStatus[team.teamId] = status;
    });
  });

  const bestThirds: string[] = [];
  const bestThirdsMap: Record<string, string> = {};

  // Best third-place teams are ONLY evaluated when EVERY group completes ALL matches
  if (allGroupsFinished) {
    thirdPlaces.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    const best8 = thirdPlaces.slice(0, 8);
    const remainingThirds = thirdPlaces.slice(8);

    best8.forEach((t: any) => {
      bestThirds.push(t.teamId);
      bestThirdsMap[t.teamId] = t.group;
      teamStatus[t.teamId] = 'QUALIFIED';
    });

    remainingThirds.forEach(t => {
      teamStatus[t.teamId] = 'ELIMINATED';
    });
  }

  return { groupWinners, groupRunnersUp, bestThirds, bestThirdsMap, teamStatus };
}

/**
 * Resolve placeholder labels from official_fixtures.ts to actual team IDs.
 * 
 * Label formats used in the official data:
 *   "1st Grp C"            → group winner of C
 *   "2nd Grp F"            → runner-up of F
 *   "Best 3rd (A/B/C/D/F)" → best third from those groups
 *   "Winner M73"           → winner of match 73
 *   "Loser M101"           → loser of match 101
 */
function resolveLabel(label: string | undefined, qual: QualificationResult, availableThirds: string[]): string | null {
  if (!label) return null;

  // "1st Grp X" → group winner
  const winnerMatch = label.match(/^1st Grp ([A-L])$/);
  if (winnerMatch) {
    return qual.groupWinners[winnerMatch[1]] || null;
  }

  // "2nd Grp X" → runner-up
  const runnerUpMatch = label.match(/^2nd Grp ([A-L])$/);
  if (runnerUpMatch) {
    return qual.groupRunnersUp[runnerUpMatch[1]] || null;
  }

  // "Best 3rd (A/B/C/D/F)" → best third from allowed groups
  const thirdMatch = label.match(/^Best 3rd \(([A-L/]+)\)$/);
  if (thirdMatch) {
    if (availableThirds.length === 0) return null;
    const allowedGroups = thirdMatch[1].split('/');
    for (let i = 0; i < availableThirds.length; i++) {
      const teamId = availableThirds[i];
      const teamGroup = qual.bestThirdsMap[teamId];
      if (allowedGroups.includes(teamGroup)) {
        availableThirds.splice(i, 1);
        return teamId;
      }
    }
    return null;
  }

  return null;
}

export function assignKnockoutMatches(games: Match[], qual: QualificationResult): Match[] {
  const matchMap = new Map<number, Match>();
  games.forEach(g => matchMap.set(g.id, { ...g }));

  const availableThirds = [...qual.bestThirds];

  // Phase 1: Assign R32 from group positions
  games.forEach(game => {
    if (game.stage === 'round_of_32') {
      // Only resolve if the slot doesn't already have a hardcoded team ID
      if (!game.homeTeamId && game.homeTeamPlaceholder) {
        const homeId = resolveLabel(game.homeTeamPlaceholder, qual, availableThirds);
        if (homeId) game.homeTeamId = homeId;
      }

      if (!game.awayTeamId && game.awayTeamPlaceholder) {
        const awayId = resolveLabel(game.awayTeamPlaceholder, qual, availableThirds);
        if (awayId) game.awayTeamId = awayId;
      }

      // Update the matchMap with resolved IDs
      matchMap.set(game.id, game);
    }
  });

  // Phase 2: Propagate knockout winners/losers sequentially
  const getWinner = (matchId: number): string | null => {
    const m = matchMap.get(matchId);
    if (!m || m.status !== 'finished') return null;
    if (m.homeScore != null && m.awayScore != null) {
      if (m.homeScore > m.awayScore) return m.homeTeamId;
      if (m.awayScore > m.homeScore) return m.awayTeamId;
    }
    return null;
  };

  const getLoser = (matchId: number): string | null => {
    const m = matchMap.get(matchId);
    if (!m || m.status !== 'finished') return null;
    if (m.homeScore != null && m.awayScore != null) {
      if (m.homeScore < m.awayScore) return m.homeTeamId;
      if (m.awayScore < m.homeScore) return m.awayTeamId;
    }
    return null;
  };

  const sortedGames = [...games].sort((a, b) => a.id - b.id);

  sortedGames.forEach(game => {
    if (game.stage !== 'group' && game.stage !== 'round_of_32') {
      // "Winner M73" format
      const homeWinnerMatch = game.homeTeamPlaceholder?.match(/^Winner M(\d+)$/);
      if (homeWinnerMatch) {
        const winner = getWinner(parseInt(homeWinnerMatch[1], 10));
        if (winner) game.homeTeamId = winner;
      }
      const homeLoserMatch = game.homeTeamPlaceholder?.match(/^Loser M(\d+)$/);
      if (homeLoserMatch) {
        const loser = getLoser(parseInt(homeLoserMatch[1], 10));
        if (loser) game.homeTeamId = loser;
      }

      const awayWinnerMatch = game.awayTeamPlaceholder?.match(/^Winner M(\d+)$/);
      if (awayWinnerMatch) {
        const winner = getWinner(parseInt(awayWinnerMatch[1], 10));
        if (winner) game.awayTeamId = winner;
      }
      const awayLoserMatch = game.awayTeamPlaceholder?.match(/^Loser M(\d+)$/);
      if (awayLoserMatch) {
        const loser = getLoser(parseInt(awayLoserMatch[1], 10));
        if (loser) game.awayTeamId = loser;
      }

      matchMap.set(game.id, game);
    }
  });

  return sortedGames;
}
