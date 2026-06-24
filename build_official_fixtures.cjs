const fs = require('fs');
const { parse, addDays } = require('date-fns');
const { formatInTimeZone, toZonedTime } = require('date-fns-tz');

const temp = require('c:/Users/lenovo/OneDrive/Desktop/fifa_fix_2/temp_matches.json');

const teamsMap = {
  'Mexico': 'MEX', 'South Africa': 'RSA', 'South Korea': 'KOR', 'Czechia': 'CZE',
  'Canada': 'CAN', 'Bosnia & Herzegovina': 'BIH', 'Qatar': 'QAT', 'Switzerland': 'SUI',
  'Brazil': 'BRA', 'Morocco': 'MAR', 'Haiti': 'HAI', 'Scotland': 'SCO',
  'USA': 'USA', 'Paraguay': 'PAR', 'Australia': 'AUS', 'Türkiye': 'TUR',
  'Germany': 'GER', 'Curaçao': 'CUW', 'Ivory Coast': 'CIV', 'Ecuador': 'ECU',
  'Netherlands': 'NED', 'Japan': 'JPN', 'Sweden': 'SWE', 'Tunisia': 'TUN',
  'Belgium': 'BEL', 'Egypt': 'EGY', 'Iran': 'IRN', 'New Zealand': 'NZL',
  'Spain': 'ESP', 'Cape Verde': 'CPV', 'Saudi Arabia': 'KSA', 'Uruguay': 'URU',
  'France': 'FRA', 'Senegal': 'SEN', 'Iraq': 'IRQ', 'Norway': 'NOR',
  'Argentina': 'ARG', 'Algeria': 'ALG', 'Austria': 'AUT', 'Jordan': 'JOR',
  'Portugal': 'POR', 'DR Congo': 'COD', 'Uzbekistan': 'UZB', 'Colombia': 'COL',
  'England': 'ENG', 'Croatia': 'CRO', 'Ghana': 'GHA', 'Panama': 'PAN'
};

const venueTzMap = {
  'Mexico City': 'America/Mexico_City',
  'Guadalajara': 'America/Mexico_City',
  'Monterrey': 'America/Monterrey',
  'Toronto': 'America/Toronto',
  'Vancouver': 'America/Vancouver',
  'Los Angeles': 'America/Los_Angeles',
  'SF Bay Area': 'America/Los_Angeles',
  'Seattle': 'America/Los_Angeles',
  'Dallas': 'America/Chicago',
  'Houston': 'America/Chicago',
  'Kansas City': 'America/Chicago',
  'Atlanta': 'America/New_York',
  'Miami': 'America/New_York',
  'Boston': 'America/New_York',
  'Philadelphia': 'America/New_York',
  'NY/NJ': 'America/New_York',
};

const getTz = (venue) => {
  for (const [key, tz] of Object.entries(venueTzMap)) {
    if (venue.includes(key)) return tz;
  }
  return 'America/New_York';
};

const getStage = (g, id) => {
  if (g.length === 1) return 'group';
  if (g === 'R32' || id >= 73 && id <= 88) return 'round_of_32';
  if (g === 'R16' || id >= 89 && id <= 96) return 'round_of_16';
  if (g === 'QF' || id >= 97 && id <= 100) return 'quarter_final';
  if (g === 'SF' || id >= 101 && id <= 102) return 'semi_final';
  if (g === '3rd' || id === 103) return 'third_place';
  if (g === 'Final' || id === 104) return 'final';
  return 'group';
}

const fixtures = temp.filter(m => m.v).map((match, idx) => {
  const parts = match.m.split(' vs ');
  let homeTeamId = teamsMap[parts[0]] || null;
  let awayTeamId = teamsMap[parts[1]] || null;
  let homePlaceholder = homeTeamId ? undefined : parts[0];
  let awayPlaceholder = awayTeamId ? undefined : parts[1];

  let dateStr = match.d.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), /, '');
  let timeStr = match.t.replace(' †', '').replace(' ★', '');
  
  let parsed = parse(`${dateStr} ${timeStr}`, 'd MMMM yyyy h:mm a', new Date());
  
  if (match.t.includes('†')) {
    parsed = addDays(parsed, 1);
  }

  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');
  const hh = String(parsed.getHours()).padStart(2, '0');
  const min = String(parsed.getMinutes()).padStart(2, '0');
  
  const istIsoStr = `${yyyy}-${mm}-${dd}T${hh}:${min}:00+05:30`;
  const exactUtcDate = new Date(istIsoStr);
  
  const tz = getTz(match.v);
  const localTime = formatInTimeZone(exactUtcDate, tz, 'HH:mm');

  return {
    id: idx + 1,
    homeTeamId,
    awayTeamId,
    homeTeamPlaceholder: homePlaceholder,
    awayTeamPlaceholder: awayPlaceholder,
    date: exactUtcDate.toISOString(),
    localTime,
    utcTime: formatInTimeZone(exactUtcDate, 'UTC', 'HH:mm'),
    istTime: formatInTimeZone(exactUtcDate, 'Asia/Kolkata', 'HH:mm'),
    venue: match.v,
    stage: getStage(match.g, idx + 1),
    group: match.g.length === 1 ? match.g : undefined
  };
});

fs.writeFileSync('c:/Users/lenovo/OneDrive/Desktop/fifa_fix_2/src/data/official_fixtures.ts', `import type { Match } from '../types';\n\nexport const officialFixtures: Match[] = ${JSON.stringify(fixtures, null, 2)};\n`);
console.log('Saved to src/data/official_fixtures.ts');
