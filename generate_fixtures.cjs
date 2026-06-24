const fs = require('fs');

const groups = {
  A: ['MEX', 'RSA', 'KOR', 'CZE'],
  B: ['CAN', 'BIH', 'QAT', 'SUI'],
  C: ['BRA', 'MAR', 'HAI', 'SCO'],
  D: ['USA', 'PAR', 'AUS', 'TUR'],
  E: ['GER', 'CUW', 'CIV', 'ECU'],
  F: ['NED', 'JPN', 'SWE', 'TUN'],
  G: ['BEL', 'EGY', 'IRN', 'NZL'],
  H: ['ESP', 'CPV', 'KSA', 'URU'],
  I: ['FRA', 'SEN', 'IRQ', 'NOR'],
  J: ['ARG', 'ALG', 'AUT', 'JOR'],
  K: ['POR', 'COD', 'UZB', 'COL'],
  L: ['ENG', 'CRO', 'GHA', 'PAN'],
};

const venues = [
  "Estadio Azteca, Mexico City", "Estadio Akron, Zapopan", "BMO Field, Toronto", "SoFi Stadium, Inglewood",
  "Levi's Stadium, Santa Clara", "MetLife Stadium, E. Rutherford", "Gillette Stadium, Foxborough", "BC Place, Vancouver",
  "Houston Stadium", "AT&T Stadium, Arlington", "Philadelphia Stadium", "Estadio BBVA, Monterrey",
  "Mercedes-Benz, Atlanta", "Lumen Field, Seattle", "Hard Rock, Miami Gardens", "Arrowhead, Kansas City"
];

let fixtures = [];
let matchId = 1;
let dateOffset = 0;

// Group Stage (72 matches)
Object.entries(groups).forEach(([group, teams]) => {
  const [t1, t2, t3, t4] = teams;
  
  fixtures.push({ id: matchId++, homeTeamId: t1, awayTeamId: t2, date: `2026-06-${11 + dateOffset}`, time: '10:30 PM', venue: venues[matchId % venues.length], status: 'upcoming', stage: 'group', group, homeScore: null, awayScore: null });
  fixtures.push({ id: matchId++, homeTeamId: t3, awayTeamId: t4, date: `2026-06-${12 + dateOffset}`, time: '01:30 AM', venue: venues[matchId % venues.length], status: 'upcoming', stage: 'group', group, homeScore: null, awayScore: null });
  
  fixtures.push({ id: matchId++, homeTeamId: t4, awayTeamId: t2, date: `2026-06-${15 + dateOffset}`, time: '04:30 AM', venue: venues[matchId % venues.length], status: 'upcoming', stage: 'group', group, homeScore: null, awayScore: null });
  fixtures.push({ id: matchId++, homeTeamId: t1, awayTeamId: t3, date: `2026-06-${15 + dateOffset}`, time: '07:30 AM', venue: venues[matchId % venues.length], status: 'upcoming', stage: 'group', group, homeScore: null, awayScore: null });

  fixtures.push({ id: matchId++, homeTeamId: t4, awayTeamId: t1, date: `2026-06-${20 + dateOffset}`, time: '10:30 PM', venue: venues[matchId % venues.length], status: 'upcoming', stage: 'group', group, homeScore: null, awayScore: null });
  fixtures.push({ id: matchId++, homeTeamId: t2, awayTeamId: t3, date: `2026-06-${20 + dateOffset}`, time: '01:30 AM', venue: venues[matchId % venues.length], status: 'upcoming', stage: 'group', group, homeScore: null, awayScore: null });
  
  dateOffset = (dateOffset + 1) % 4;
});

// Sort group stage by match ID to reset sequential order properly
fixtures.sort((a,b) => a.id - b.id);

// Round of 32 (16 matches)
for(let i=0; i<16; i++) {
  fixtures.push({
    id: 73 + i,
    homeTeamId: null,
    awayTeamId: null,
    homeTeamPlaceholder: `Winner ${String.fromCharCode(65+i%12)}`,
    awayTeamPlaceholder: `Runner-up ${String.fromCharCode(65+(i+1)%12)}`,
    date: `2026-06-${28 + Math.floor(i/3)}`,
    time: i % 2 === 0 ? '10:30 PM' : '04:30 AM',
    venue: venues[i % venues.length],
    status: 'upcoming',
    stage: 'round_of_32'
  });
}

// Round of 16 (8 matches)
for(let i=0; i<8; i++) {
  fixtures.push({
    id: 89 + i,
    homeTeamId: null,
    awayTeamId: null,
    homeTeamPlaceholder: `Winner M${73 + i*2}`,
    awayTeamPlaceholder: `Winner M${74 + i*2}`,
    date: `2026-07-${4 + Math.floor(i/2)}`,
    time: i % 2 === 0 ? '01:30 AM' : '07:30 AM',
    venue: venues[i % venues.length],
    status: 'upcoming',
    stage: 'round_of_16'
  });
}

// Quarter Finals (4 matches)
for(let i=0; i<4; i++) {
  fixtures.push({
    id: 97 + i,
    homeTeamId: null,
    awayTeamId: null,
    homeTeamPlaceholder: `Winner M${89 + i*2}`,
    awayTeamPlaceholder: `Winner M${90 + i*2}`,
    date: `2026-07-${9 + Math.floor(i/2)}`,
    time: i % 2 === 0 ? '01:30 AM' : '07:30 AM',
    venue: venues[i % venues.length],
    status: 'upcoming',
    stage: 'quarter_final'
  });
}

// Semi Finals (2 matches)
for(let i=0; i<2; i++) {
  fixtures.push({
    id: 101 + i,
    homeTeamId: null,
    awayTeamId: null,
    homeTeamPlaceholder: `Winner M${97 + i*2}`,
    awayTeamPlaceholder: `Winner M${98 + i*2}`,
    date: `2026-07-${14 + i}`,
    time: '01:30 AM',
    venue: venues[i % venues.length],
    status: 'upcoming',
    stage: 'semi_final'
  });
}

// Third Place
fixtures.push({
  id: 103,
  homeTeamId: null,
  awayTeamId: null,
  homeTeamPlaceholder: `Loser M101`,
  awayTeamPlaceholder: `Loser M102`,
  date: `2026-07-18`,
  time: '01:30 AM',
  venue: venues[0],
  status: 'upcoming',
  stage: 'third_place'
});

// Final
fixtures.push({
  id: 104,
  homeTeamId: null,
  awayTeamId: null,
  homeTeamPlaceholder: `Winner M101`,
  awayTeamPlaceholder: `Winner M102`,
  date: `2026-07-19`,
  time: '12:30 AM',
  venue: venues[1],
  status: 'upcoming',
  stage: 'final'
});

const content = `import type { Match } from '../types';\n\nexport const fixtures: Match[] = ${JSON.stringify(fixtures, null, 2)};\n`;
fs.writeFileSync('./src/data/fixtures.ts', content);
