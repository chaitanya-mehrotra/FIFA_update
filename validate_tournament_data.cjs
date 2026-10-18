const fixtures = require('./src/data/tournamentFixtures.json');

console.log('--- TOURNAMENT DATA INTEGRITY VALIDATION ---');
console.log(`Total match count: ${fixtures.length} (Expected: 104)`);
if (fixtures.length !== 104) throw new Error('Match count mismatch');

const ids = new Set();
fixtures.forEach(m => {
  if (ids.has(m.id)) throw new Error(`Duplicate match ID: ${m.id}`);
  ids.add(m.id);
  if (m.status !== 'finished') throw new Error(`Match ${m.id} not finished`);
  if (!m.homeTeamId || !m.awayTeamId) throw new Error(`Match ${m.id} has missing team`);
  if (m.homeScore == null || m.awayScore == null) throw new Error(`Match ${m.id} has missing score`);
});
console.log('✅ All 104 matches have unique IDs, finished status, valid teams, and valid scores');

// Compute standings
const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
const standings = {};
groups.forEach(g => {
  standings[g] = {};
});

fixtures.slice(0, 72).forEach(m => {
  const g = m.group;
  [m.homeTeamId, m.awayTeamId].forEach(t => {
    if (!standings[g][t]) {
      standings[g][t] = { teamId: t, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
    }
  });

  const h = standings[g][m.homeTeamId];
  const a = standings[g][m.awayTeamId];
  h.played++;
  a.played++;
  h.goalsFor += m.homeScore;
  h.goalsAgainst += m.awayScore;
  a.goalsFor += m.awayScore;
  a.goalsAgainst += m.homeScore;

  if (m.homeScore > m.awayScore) {
    h.won++; h.points += 3;
    a.lost++;
  } else if (m.awayScore > m.homeScore) {
    a.won++; a.points += 3;
    h.lost++;
  } else {
    h.drawn++; h.points += 1;
    a.drawn++; a.points += 1;
  }
  h.goalDifference = h.goalsFor - h.goalsAgainst;
  a.goalDifference = a.goalsFor - a.goalsAgainst;
});

console.log('\n--- GROUP WINNERS & STANDINGS ---');
const groupTables = {};
groups.forEach(g => {
  const table = Object.values(standings[g]).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
  groupTables[g] = table;
  console.log(`Group ${g}: 1st: ${table[0].teamId} (${table[0].points}pts, GD:${table[0].goalDifference}) | 2nd: ${table[1].teamId} (${table[1].points}pts, GD:${table[1].goalDifference}) | 3rd: ${table[2].teamId} (${table[2].points}pts) | 4th: ${table[3].teamId} (${table[3].points}pts)`);
});

// Validate Knockout progression
console.log('\n--- KNOCKOUT PROGRESSION VALIDATION ---');
const matchById = {};
fixtures.forEach(m => matchById[m.id] = m);

// Round of 16 check
const r16Expected = [
  { id: 89, h: 'PAR', a: 'FRA', winner: 'FRA' },
  { id: 90, h: 'CAN', a: 'MAR', winner: 'MAR' },
  { id: 91, h: 'BRA', a: 'NOR', winner: 'NOR' },
  { id: 92, h: 'MEX', a: 'ENG', winner: 'ENG' },
  { id: 93, h: 'POR', a: 'ESP', winner: 'ESP' },
  { id: 94, h: 'USA', a: 'BEL', winner: 'BEL' },
  { id: 95, h: 'ARG', a: 'EGY', winner: 'ARG' },
  { id: 96, h: 'SUI', a: 'COL', winner: 'SUI' }
];

r16Expected.forEach(chk => {
  const m = matchById[chk.id];
  if (m.homeTeamId !== chk.h || m.awayTeamId !== chk.a) {
    throw new Error(`Match ${chk.id} team mismatch: got ${m.homeTeamId} vs ${m.awayTeamId}, expected ${chk.h} vs ${chk.a}`);
  }
  if (m.winnerTeamId !== chk.winner) {
    throw new Error(`Match ${chk.id} winner mismatch: got ${m.winnerTeamId}, expected ${chk.winner}`);
  }
});
console.log('✅ Round of 16 matches verified');

// QF check
const qfExpected = [
  { id: 97, h: 'FRA', a: 'MAR', winner: 'FRA' },
  { id: 98, h: 'ESP', a: 'BEL', winner: 'ESP' },
  { id: 99, h: 'NOR', a: 'ENG', winner: 'ENG' },
  { id: 100, h: 'ARG', a: 'SUI', winner: 'ARG' }
];

qfExpected.forEach(chk => {
  const m = matchById[chk.id];
  if (m.homeTeamId !== chk.h || m.awayTeamId !== chk.a) {
    throw new Error(`Match ${chk.id} team mismatch: got ${m.homeTeamId} vs ${m.awayTeamId}`);
  }
  if (m.winnerTeamId !== chk.winner) {
    throw new Error(`Match ${chk.id} winner mismatch`);
  }
});
console.log('✅ Quarterfinal matches verified');

// SF check
const sfExpected = [
  { id: 101, h: 'FRA', a: 'ESP', winner: 'ESP' },
  { id: 102, h: 'ENG', a: 'ARG', winner: 'ARG' }
];
sfExpected.forEach(chk => {
  const m = matchById[chk.id];
  if (m.homeTeamId !== chk.h || m.awayTeamId !== chk.a) {
    throw new Error(`Match ${chk.id} team mismatch`);
  }
  if (m.winnerTeamId !== chk.winner) {
    throw new Error(`Match ${chk.id} winner mismatch`);
  }
});
console.log('✅ Semifinal matches verified');

// 3rd place & Final
const m103 = matchById[103];
if (m103.homeTeamId !== 'ENG' || m103.awayTeamId !== 'FRA' || m103.winnerTeamId !== 'ENG') {
  throw new Error('Match 103 mismatch');
}
console.log(`✅ 3rd Place Match: ${m103.homeTeamId} ${m103.homeScore}–${m103.awayScore} ${m103.awayTeamId} (Winner: ${m103.winnerTeamId})`);

const m104 = matchById[104];
if (m104.homeTeamId !== 'ESP' || m104.awayTeamId !== 'ARG' || m104.winnerTeamId !== 'ESP') {
  throw new Error('Match 104 mismatch');
}
console.log(`✅ Final Match: ${m104.homeTeamId} ${m104.homeScore}–${m104.awayScore} ${m104.awayTeamId} (Champion: ${m104.winnerTeamId}, Runner-up: ARG)`);

// Total goals check
let totalGoals = 0;
fixtures.forEach(m => totalGoals += (m.homeScore + m.awayScore));
console.log(`\nTotal goals across 104 matches: ${totalGoals}`);

console.log('\n🌟 ALL 104 MATCHES AND PROGRESSION VALIDATED SUCCESSFULLY! 🌟');
