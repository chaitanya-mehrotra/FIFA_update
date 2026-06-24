const fs = require('fs');

let content = fs.readFileSync('src/data/official_fixtures.ts', 'utf8');

// Replace objects that do not have status
content = content.replace(/stage: '([^']+)'(,\s+group:)/g, "stage: '$1',\n    status: 'upcoming'$2");
content = content.replace(/stage: '([^']+)'\n  \}/g, "stage: '$1',\n    status: 'upcoming'\n  }");

fs.writeFileSync('src/data/official_fixtures.ts', content);
console.log('Done');
