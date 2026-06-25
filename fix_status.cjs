const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'official_fixtures.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Find the start of the array
const arrayStartIndex = content.indexOf('[');
const prefix = content.substring(0, arrayStartIndex);
const arrayString = content.substring(arrayStartIndex, content.lastIndexOf(']') + 1);
const suffix = content.substring(content.lastIndexOf(']') + 1);

let fixtures;
try {
  fixtures = JSON.parse(arrayString);
} catch (e) {
  // If parsing fails, use eval
  fixtures = eval('(' + arrayString + ')');
}

const now = new Date();

fixtures.forEach(match => {
  const matchDate = new Date(match.date);
  // Match is ~2 hours long.
  const endTime = new Date(matchDate.getTime() + 2 * 60 * 60 * 1000);

  if (now < matchDate) {
    match.status = 'upcoming';
  } else if (now >= matchDate && now <= endTime) {
    match.status = 'live';
  } else {
    match.status = 'finished';
  }
});

// Write back to string
const newArrayString = JSON.stringify(fixtures, null, 2);
const newContent = prefix + newArrayString + suffix;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully updated official_fixtures.ts with status field.');
