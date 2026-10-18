const fs = require('fs');

const content = fs.readFileSync('src/data/official_fixtures.ts', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const fixtures = eval(jsonStr);

console.log('Group Stage Matches (1-72):');
const summary = [];
fixtures.slice(0, 72).forEach(m => {
  summary.push({ id: m.id, group: m.group, home: m.homeTeamId, away: m.awayTeamId, date: m.date, venue: m.venue });
});
console.log(JSON.stringify(summary, null, 2));
