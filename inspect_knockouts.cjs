const fs = require('fs');

const content = fs.readFileSync('src/data/official_fixtures.ts', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const fixtures = eval(jsonStr);

console.log('Matches 73 to 88 (Round of 32):');
fixtures.slice(72, 88).forEach(m => {
  console.log(`Match ${m.id}: ${m.homeTeamId || m.homeTeamPlaceholder} vs ${m.awayTeamId || m.awayTeamPlaceholder} | Venue: ${m.venue} | Date: ${m.date}`);
});

console.log('\nMatches 89 to 96 (Round of 16):');
fixtures.slice(88, 96).forEach(m => {
  console.log(`Match ${m.id}: ${m.homeTeamId || m.homeTeamPlaceholder} vs ${m.awayTeamId || m.awayTeamPlaceholder} | Venue: ${m.venue} | Date: ${m.date}`);
});

console.log('\nMatches 97 to 100 (Quarterfinals):');
fixtures.slice(96, 100).forEach(m => {
  console.log(`Match ${m.id}: ${m.homeTeamId || m.homeTeamPlaceholder} vs ${m.awayTeamId || m.awayTeamPlaceholder} | Venue: ${m.venue} | Date: ${m.date}`);
});

console.log('\nMatches 101 to 102 (Semifinals):');
fixtures.slice(100, 102).forEach(m => {
  console.log(`Match ${m.id}: ${m.homeTeamId || m.homeTeamPlaceholder} vs ${m.awayTeamId || m.awayTeamPlaceholder} | Venue: ${m.venue} | Date: ${m.date}`);
});

console.log('\nMatch 103 (3rd Place):');
console.log(`Match ${fixtures[102].id}: ${fixtures[102].homeTeamId || fixtures[102].homeTeamPlaceholder} vs ${fixtures[102].awayTeamId || fixtures[102].awayTeamPlaceholder}`);

console.log('\nMatch 104 (Final):');
console.log(`Match ${fixtures[103].id}: ${fixtures[103].homeTeamId || fixtures[103].homeTeamPlaceholder} vs ${fixtures[103].awayTeamId || fixtures[103].awayTeamPlaceholder}`);
