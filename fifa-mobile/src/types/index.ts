export interface Team {
  id: string;
  name: string;
  code: string;
  group: string;
  flag: string;
  confederation: string;
  ranking: number;
  coach: string;
  recentForm?: string[];
}

export type MatchStatus = 'upcoming' | 'live' | 'finished';
export type MatchStage = 'group' | 'round_of_32' | 'round_of_16' | 'quarter_final' | 'semi_final' | 'third_place' | 'final';

export interface Match {
  id: number;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeTeamPlaceholder?: string;
  awayTeamPlaceholder?: string;
  date: string;
  localTime?: string;
  utcTime?: string;
  istTime?: string;
  time?: string;
  venue: string;
  hostCity?: string;
  hostCountry?: string;
  status: MatchStatus;
  stage: MatchStage;
  homeScore?: number | null;
  awayScore?: number | null;
  homeScorers?: { player: string; minute: string }[];
  awayScorers?: { player: string; minute: string }[];
  group?: string;
  matchMinute?: string; // e.g. "34'", "45+2'", "HT", "90+3'"
  winnerTo?: number;
  loserTo?: number;
}

export interface GroupStanding {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// API Types
export interface ApiGame {
  _id: string;
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: string;
  away_score: string;
  home_scorers: string;
  away_scorers: string;
  group: string;
  matchday: string;
  local_date: string;
  persian_date: string;
  stadium_id: string;
  finished: string;
  time_elapsed: string;
  type: string;
  home_team_name_en?: string;
  away_team_name_en?: string;
  home_team_label?: string;
  away_team_label?: string;
}

export interface ApiTeam {
  _id: string;
  id: string;
  name_en: string;
  flag: string;
  fifa_code: string;
  iso2: string;
  groups: string;
}

export interface ApiStadium {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  image: string;
}
