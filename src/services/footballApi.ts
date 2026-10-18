import type { Match, Team, GroupStanding, ApiStadium } from '../types';
import { tournamentFixtures, tournamentOverview } from '../data/tournamentArchive';
import { stadiums } from '../data/stadiums';
import { teamMetadata } from '../data/teams';
import { localApiTeams } from '../data/localTeams';

// Map non-standard iso2 codes to valid flagcdn country codes
const flagCodeMap: Record<string, string> = {
  'SCO': 'gb-sct',
  'ENG': 'gb-eng',
  'WAL': 'gb-wls',
};

// 1. Fetch Stadiums (from local verified database)
export async function getStadiums(): Promise<ApiStadium[]> {
  return stadiums.map(s => ({
    id: s.id,
    name: s.name,
    city: s.city,
    country: s.country,
    capacity: s.capacity,
    image: s.image
  }));
}

// 2. Fetch Teams (all 48 participating nations)
let teamsCache: Team[] = [];
export async function getTeams(): Promise<Team[]> {
  if (teamsCache.length > 0) return teamsCache;
  
  teamsCache = localApiTeams.map(t => {
    const meta = teamMetadata[t.fifa_code] || { ranking: 0, coach: 'N/A', confederation: 'Unknown', recentForm: [] };
    const flagCode = flagCodeMap[t.iso2.toUpperCase()] || t.iso2.toLowerCase();
    return {
      id: t.fifa_code,
      name: t.name_en,
      code: t.fifa_code,
      group: t.groups,
      flag: flagCode,
      confederation: meta.confederation,
      ranking: meta.ranking,
      coach: meta.coach,
      recentForm: meta.recentForm
    };
  });
  return teamsCache;
}

// 3. Centralized Verified Match Dataset (all 104 matches completed)
export async function getGames(): Promise<Match[]> {
  return tournamentFixtures;
}

// The 8 verified qualifying third-place teams (Outcome #67: Groups B, D, E, F, I, J, K, L)
const verifiedBestThirdTeamIds = new Set(['BIH', 'PAR', 'ECU', 'SWE', 'SEN', 'ALG', 'COD', 'GHA']);

// 4. Fetch Standings (calculated strictly from verified Group Stage matches)
export async function getStandings(): Promise<Record<string, GroupStanding[]>> {
  const games = await getGames();
  const standings: Record<string, GroupStanding[]> = {};

  const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  groups.forEach(g => {
    standings[g] = [];
  });

  games.filter(g => g.stage === 'group' && g.status === 'finished').forEach(game => {
    if (!game.group || !game.homeTeamId || !game.awayTeamId) return;
    
    [game.homeTeamId, game.awayTeamId].forEach(tid => {
      if (!standings[game.group!].find(s => s.teamId === tid)) {
        standings[game.group!].push({
          teamId: tid, played: 0, won: 0, drawn: 0, lost: 0,
          goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
        });
      }
    });

    const home = standings[game.group!].find(s => s.teamId === game.homeTeamId)!;
    const away = standings[game.group!].find(s => s.teamId === game.awayTeamId)!;

    const hs = game.homeScore ?? 0;
    const as = game.awayScore ?? 0;

    home.played++;
    away.played++;
    home.goalsFor += hs;
    home.goalsAgainst += as;
    away.goalsFor += as;
    away.goalsAgainst += hs;

    if (hs > as) {
      home.won++; home.points += 3;
      away.lost++;
    } else if (as > hs) {
      away.won++; away.points += 3;
      home.lost++;
    } else {
      home.drawn++; home.points += 1;
      away.drawn++; away.points += 1;
    }

    home.goalDifference = home.goalsFor - home.goalsAgainst;
    away.goalDifference = away.goalsFor - away.goalsAgainst;
  });

  // Sort by official tournament tiebreak: Points -> Goal Difference -> Goals For
  groups.forEach(g => {
    standings[g].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    // Tag position and qualification status
    standings[g].forEach((team, idx) => {
      team.position = idx + 1;
      if (idx === 0) team.qualificationStatus = 'WINNER';
      else if (idx === 1) team.qualificationStatus = 'RUNNER_UP';
      else if (idx === 2) {
        team.qualificationStatus = verifiedBestThirdTeamIds.has(team.teamId) ? 'BEST_THIRD' : 'ELIMINATED';
      } else {
        team.qualificationStatus = 'ELIMINATED';
      }
    });
  });

  return standings;
}

export { tournamentOverview };
