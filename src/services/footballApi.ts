import type { ApiGame, ApiTeam, ApiStadium, Match, Team, GroupStanding } from '../types';
import { parseApiDate } from '../utils/timezone';
import { teamMetadata } from '../data/teams';
import { calculateQualification, assignKnockoutMatches } from '../utils/qualification';

const BASE_URL = 'https://worldcup26.ir';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

let stadiumsCache: ApiStadium[] = [];
export async function getStadiums(): Promise<ApiStadium[]> {
  if (stadiumsCache.length > 0) return stadiumsCache;
  try {
    const data = await fetchApi<{ stadiums: ApiStadium[] }>('/get/stadiums');
    stadiumsCache = data.stadiums || [];
    return stadiumsCache;
  } catch (error) {
    return [];
  }
}

let teamsCache: Team[] = [];
export async function getTeams(): Promise<Team[]> {
  if (teamsCache.length > 0) return teamsCache;
  try {
    const data = await fetchApi<{ teams: ApiTeam[] }>('/get/teams');
    teamsCache = (data.teams || []).map(t => {
      const meta = teamMetadata[t.fifa_code] || { ranking: 0, coach: 'N/A', confederation: 'Unknown', recentForm: [] };
      return {
        id: t.fifa_code,
        name: t.name_en,
        code: t.fifa_code,
        group: t.groups,
        flag: t.iso2.toLowerCase(),
        confederation: meta.confederation,
        ranking: meta.ranking,
        coach: meta.coach,
        recentForm: meta.recentForm
      };
    });
    return teamsCache;
  } catch (error) {
    return [];
  }
}

const mapStatus = (finished: string, timeElapsed: string, kickoffUtc: string): { status: 'upcoming' | 'live' | 'finished'; matchMinute: string | undefined } => {
  // 1. If the API explicitly says finished, trust it
  if (finished === "TRUE" || timeElapsed === "finished" || timeElapsed === "FT" || timeElapsed === "AET" || timeElapsed === "PEN") {
    return { status: 'finished', matchMinute: timeElapsed === "AET" ? "AET" : timeElapsed === "PEN" ? "PEN" : "FT" };
  }

  // 2. Parse kickoff time and validate against current time
  const now = new Date();
  const kickoff = new Date(kickoffUtc);

  // If kickoff is in the future, it's definitely upcoming regardless of API
  if (now < kickoff) {
    return { status: 'upcoming', matchMinute: undefined };
  }

  // 3. Calculate elapsed minutes since kickoff
  const elapsedMs = now.getTime() - kickoff.getTime();
  const elapsedMinutes = Math.floor(elapsedMs / 60000);

  // A standard match is ~120 minutes max (90 + 30 extra time + stoppage)
  // If more than 150 minutes have passed and the API hasn't marked it finished,
  // it's almost certainly over — mark as finished
  if (elapsedMinutes > 150) {
    return { status: 'finished', matchMinute: "FT" };
  }

  // 4. If the API says "notstarted" but kickoff time has passed, trust kickoff time
  // The API might be stale — compute the minute from kickoff
  let matchMinute: string;
  
  // Use API time_elapsed if it looks like a real minute (e.g. "34", "45+2")
  const apiMinuteMatch = timeElapsed.match(/^\d+/);
  if (apiMinuteMatch && timeElapsed !== "notstarted") {
    matchMinute = timeElapsed.includes("'") ? timeElapsed : `${timeElapsed}'`;
  } else if (timeElapsed === "HT") {
    matchMinute = "HT";
  } else {
    // Calculate from kickoff time
    if (elapsedMinutes <= 45) {
      matchMinute = `${elapsedMinutes}'`;
    } else if (elapsedMinutes <= 60) {
      // Half time or early second half
      matchMinute = elapsedMinutes <= 50 ? "HT" : `${elapsedMinutes - 15}'`; // ~15 min half-time break
    } else if (elapsedMinutes <= 105) {
      matchMinute = `${elapsedMinutes - 15}'`; // subtract 15 min half-time break
    } else {
      matchMinute = `90+'`;
    }
  }

  return { status: 'live', matchMinute };
};

const mapStage = (type: string, group: string) => {
  if (type === 'group') return 'group';
  if (type === 'r32') return 'round_of_32';
  if (type === 'r16') return 'round_of_16';
  if (type === 'qf') return 'quarter_final';
  if (type === 'sf') return 'semi_final';
  if (type === 'third') return 'third_place';
  if (type === 'final') return 'final';
  if (group && group.length === 1) return 'group';
  return 'group';
};

const parseScorers = (scorersStr: string): { player: string, minute: string }[] => {
  if (!scorersStr || scorersStr === "null") return [];
  const cleanStr = scorersStr.replace(/^{"/, "").replace(/"}$/, "");
  if (!cleanStr) return [];
  const parts = cleanStr.split(/","|","/);
  return parts.map(part => {
    const match = part.match(/^(.*?)\s+((?:\d+|90'\+\d+)'.*)$/);
    if (match) {
      return { player: match[1].trim(), minute: match[2].trim() };
    }
    return { player: part.trim(), minute: '' };
  });
};

import { officialFixtures } from '../data/official_fixtures';

// Internal function to just get raw mapped games without knockout assignments
async function getRawGames(): Promise<Match[]> {
  let apiGames: ApiGame[] = [];
  try {
    const gamesData = await fetchApi<{ games: ApiGame[] }>('/get/games');
    apiGames = gamesData.games || [];
  } catch (error) {
    console.error("Failed to fetch API games for live data", error);
  }

  const teams = await getTeams();

  // Validate and map API games to Official Fixtures strictly by Team Names
  const scoreUpdates: Record<number, ApiGame> = {};
  const debugReport: any[] = [];

  officialFixtures.forEach(officialMatch => {
    let validApiGame: ApiGame | undefined;

    if (officialMatch.stage === 'group' && officialMatch.homeTeamId && officialMatch.awayTeamId) {
      const homeTeam = teams.find(t => t.id === officialMatch.homeTeamId);
      const awayTeam = teams.find(t => t.id === officialMatch.awayTeamId);
      
      if (homeTeam && awayTeam) {
        // Find exact match by Name to bypass corrupted API IDs
        validApiGame = apiGames.find(g => 
          g.home_team_name_en?.toLowerCase() === homeTeam.name.toLowerCase() &&
          g.away_team_name_en?.toLowerCase() === awayTeam.name.toLowerCase()
        );
      }
    } else {
      // Knockout stage matches use structural ID mapping since teams are TBD
      validApiGame = apiGames.find(g => parseInt(g.id) === officialMatch.id);
    }

    if (validApiGame) {
      scoreUpdates[officialMatch.id] = validApiGame;
      debugReport.push({
        'Match ID': `match_${officialMatch.id}`,
        'Home Team': validApiGame.home_team_name_en,
        'Away Team': validApiGame.away_team_name_en,
        'Kickoff Time': officialMatch.date,
        'Status': validApiGame.time_elapsed,
        'Score Source': 'Strict Name Match'
      });
    } else if (officialMatch.stage === 'group') {
      debugReport.push({
        'Match ID': `match_${officialMatch.id}`,
        'Home Team': officialMatch.homeTeamId,
        'Away Team': officialMatch.awayTeamId,
        'Kickoff Time': officialMatch.date,
        'Status': 'Not Found',
        'Score Source': 'Rejected (Mismatch)'
      });
    }
  });

  // Only log if we found mapped updates to avoid spamming
  if (debugReport.length > 0 && Math.random() < 0.05) { // Log occasionally
    console.log("=================================================");
    console.log("FIXTURE-RESULT MAPPING VALIDATION REPORT");
    console.log("=================================================");
    console.table(debugReport.slice(0, 10)); // Sample 10
  }

  // Merge official structural data with API live scores using validated map
  return officialFixtures.map(officialMatch => {
    const apiGame = scoreUpdates[officialMatch.id];
    
    // Default to upcoming if no API data — but still validate against kickoff time
    let status: 'upcoming' | 'live' | 'finished' = 'upcoming';
    let matchMinute: string | undefined = undefined;
    let homeScore = null;
    let awayScore = null;
    let homeScorers: { player: string; minute: string }[] = [];
    let awayScorers: { player: string; minute: string }[] = [];

    if (apiGame) {
      const result = mapStatus(apiGame.finished, apiGame.time_elapsed, officialMatch.date);
      status = result.status;
      matchMinute = result.matchMinute;
      homeScorers = parseScorers(apiGame.home_scorers);
      awayScorers = parseScorers(apiGame.away_scorers);

      let parsedHomeScore = apiGame.home_score && apiGame.home_score !== "null" ? parseInt(apiGame.home_score) : null;
      let parsedAwayScore = apiGame.away_score && apiGame.away_score !== "null" ? parseInt(apiGame.away_score) : null;

      // Always synchronize score with the timeline events (goals)
      if (parsedHomeScore === null || homeScorers.length > parsedHomeScore) {
        parsedHomeScore = Math.max(parsedHomeScore || 0, homeScorers.length);
      }
      if (parsedAwayScore === null || awayScorers.length > parsedAwayScore) {
        parsedAwayScore = Math.max(parsedAwayScore || 0, awayScorers.length);
      }

      // If match is live or finished, it must have a numerical score, never null
      if (status === 'live' || status === 'finished') {
        homeScore = parsedHomeScore ?? 0;
        awayScore = parsedAwayScore ?? 0;
      } else {
        homeScore = parsedHomeScore;
        awayScore = parsedAwayScore;
      }
    } else {
      // No API data — derive status purely from kickoff time
      const now = new Date();
      const kickoff = new Date(officialMatch.date);
      if (now >= kickoff) {
        const elapsedMs = now.getTime() - kickoff.getTime();
        const elapsedMinutes = Math.floor(elapsedMs / 60000);
        if (elapsedMinutes > 150) {
          status = 'finished';
          matchMinute = 'FT';
        } else {
          // Kickoff has passed but no API data — show as upcoming still
          // (no score data to confirm it's actually live)
          status = 'upcoming';
        }
      }
    }

    return {
      ...officialMatch,
      status,
      matchMinute,
      homeScore,
      awayScore,
      homeScorers,
      awayScorers
    } as Match;
  });
}

// 4. Fetch Standings (Groups)
export async function getStandings(): Promise<Record<string, GroupStanding[]>> {
  const games = await getRawGames();
  const standings: Record<string, GroupStanding[]> = {};

  ['A','B','C','D','E','F','G','H','I','J','K','L'].forEach(g => {
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

    const hs = game.homeScore || 0;
    const as = game.awayScore || 0;

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

  Object.keys(standings).forEach(g => {
    standings[g].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  });

  const teams = await getTeams();
  teams.forEach(t => {
    if (t.group && standings[t.group] && !standings[t.group].find(s => s.teamId === t.id)) {
      standings[t.group].push({
        teamId: t.id, played: 0, won: 0, drawn: 0, lost: 0,
        goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
      });
    }
  });

  return standings;
}

// 3. Fetch Games and map to our internal Match model, overriding knockouts
export async function getGames(): Promise<Match[]> {
  const rawGames = await getRawGames();
  const standings = await getStandings();
  const qual = calculateQualification(standings);
  
  return assignKnockoutMatches(rawGames, qual);
}
