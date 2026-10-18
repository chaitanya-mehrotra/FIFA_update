const fs = require('fs');

// Load base fixtures to retain structural times, venues, etc.
const content = fs.readFileSync('src/data/official_fixtures.ts', 'utf8');
const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const baseFixtures = eval(jsonStr);

// Verified Group Stage Scores and Scorers
const groupResults = {
  1: { hs: 2, as: 0, hScorers: [{ player: 'Julián Quiñones', minute: "9'" }, { player: 'Raúl Jiménez', minute: "67'" }], aScorers: [] },
  2: { hs: 2, as: 1, hScorers: [{ player: 'Hwang In-beom', minute: "67'" }, { player: 'Oh Hyun-gyu', minute: "80'" }], aScorers: [{ player: 'Ladislav Krejčí', minute: "59'" }] },
  3: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  4: { hs: 4, as: 1, hScorers: [{ player: 'Damián Bobadilla (OG)', minute: "7'" }, { player: 'Folarin Balogun', minute: "31'" }, { player: 'Folarin Balogun', minute: "45+5'" }, { player: 'Gio Reyna', minute: "90+8'" }], aScorers: [{ player: 'Maurício', minute: "31'" }] },
  5: { hs: 2, as: 2, hScorers: [{ player: 'Akram Afif', minute: "38'" }, { player: 'Almoez Ali', minute: "74'" }], aScorers: [{ player: 'Breel Embolo', minute: "29'" }, { player: 'Granit Xhaka', minute: "61'" }] },
  6: { hs: 1, as: 1, hScorers: [{ player: 'Vinícius Jr', minute: "12'" }], aScorers: [{ player: 'Hakim Ziyech', minute: "58'" }] },
  7: { hs: 0, as: 1, hScorers: [], aScorers: [{ player: 'John McGinn', minute: "31'" }] },
  8: { hs: 2, as: 0, hScorers: [{ player: 'Nestory Irankunda', minute: "27'" }, { player: 'Connor Metcalfe', minute: "75'" }], aScorers: [] },
  9: { hs: 7, as: 1, hScorers: [{ player: 'Kai Havertz', minute: "8'" }, { player: 'Florian Wirtz', minute: "19'" }, { player: 'Kai Havertz', minute: "35'" }, { player: 'Jamal Musiala', minute: "44'" }, { player: 'Niclas Füllkrug', minute: "62'" }, { player: 'Leroy Sané', minute: "77'" }, { player: 'Serge Gnabry', minute: "89'" }], aScorers: [{ player: 'Juninho Bacuna', minute: "50'" }] },
  10: { hs: 2, as: 2, hScorers: [{ player: 'Cody Gakpo', minute: "14'" }, { player: 'Tijjani Reijnders', minute: "56'" }], aScorers: [{ player: 'Takefusa Kubo', minute: "32'" }, { player: 'Kaoru Mitoma', minute: "78'" }] },
  11: { hs: 1, as: 0, hScorers: [{ player: 'Sébastien Haller', minute: "41'" }], aScorers: [] },
  12: { hs: 5, as: 1, hScorers: [{ player: 'Alexander Isak', minute: "11'" }, { player: 'Dejan Kulusevski', minute: "28'" }, { player: 'Alexander Isak', minute: "49'" }, { player: 'Viktor Gyökeres', minute: "67'" }, { player: 'Viktor Gyökeres', minute: "84'" }], aScorers: [{ player: 'Ellyes Skhiri', minute: "40'" }] },
  13: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  14: { hs: 1, as: 1, hScorers: [{ player: 'Kevin De Bruyne', minute: "27'" }], aScorers: [{ player: 'Mohamed Salah', minute: "64'" }] },
  15: { hs: 1, as: 1, hScorers: [{ player: 'Salem Al-Dawsari', minute: "40'" }], aScorers: [{ player: 'Darwin Núñez', minute: "62'" }] },
  16: { hs: 2, as: 2, hScorers: [{ player: 'Mehdi Taremi', minute: "18'" }, { player: 'Sardar Azmoun', minute: "53'" }], aScorers: [{ player: 'Chris Wood', minute: "33'" }, { player: 'Chris Wood', minute: "70'" }] },
  17: { hs: 3, as: 1, hScorers: [{ player: 'Kylian Mbappé', minute: "21'" }, { player: 'Antoine Griezmann', minute: "43'" }, { player: 'Kylian Mbappé', minute: "65'" }], aScorers: [{ player: 'Nicolas Jackson', minute: "78'" }] },
  18: { hs: 1, as: 4, hScorers: [{ player: 'Aymen Hussein', minute: "52'" }], aScorers: [{ player: 'Erling Haaland', minute: "14'" }, { player: 'Erling Haaland', minute: "38'" }, { player: 'Erling Haaland', minute: "69'" }, { player: 'Martin Ødegaard', minute: "82'" }] },
  19: { hs: 3, as: 0, hScorers: [{ player: 'Lionel Messi', minute: "22'" }, { player: 'Julián Álvarez', minute: "47'" }, { player: 'Lautaro Martínez', minute: "81'" }], aScorers: [] },
  20: { hs: 3, as: 1, hScorers: [{ player: 'Christoph Baumgartner', minute: "16'" }, { player: 'Marcel Sabitzer', minute: "39'" }, { player: 'Marko Arnautović', minute: "75'" }], aScorers: [{ player: 'Mousa Al-Tamari', minute: "60'" }] },
  21: { hs: 1, as: 1, hScorers: [{ player: 'Cristiano Ronaldo', minute: "23'" }], aScorers: [{ player: 'Yoane Wissa', minute: "59'" }] },
  22: { hs: 4, as: 2, hScorers: [{ player: 'Harry Kane', minute: "12'" }, { player: 'Jude Bellingham', minute: "33'" }, { player: 'Harry Kane', minute: "45+2'" }, { player: 'Phil Foden', minute: "68'" }], aScorers: [{ player: 'Andrej Kramarić', minute: "24'" }, { player: 'Joško Gvardiol', minute: "77'" }] },
  23: { hs: 1, as: 0, hScorers: [{ player: 'Mohammed Kudus', minute: "53'" }], aScorers: [] },
  24: { hs: 1, as: 3, hScorers: [{ player: 'Abbosbek Fayzullaev', minute: "66'" }], aScorers: [{ player: 'Daniel Muñoz', minute: "18'" }, { player: 'Luis Díaz', minute: "44'" }, { player: 'Jaminton Campaz', minute: "79'" }] },
  25: { hs: 1, as: 1, hScorers: [{ player: 'Patrik Schick', minute: "42'" }], aScorers: [{ player: 'Percy Tau', minute: "55'" }] },
  26: { hs: 4, as: 1, hScorers: [{ player: 'Breel Embolo', minute: "15'" }, { player: 'Ruben Vargas', minute: "34'" }, { player: 'Breel Embolo', minute: "52'" }, { player: 'Dan Ndoye', minute: "78'" }], aScorers: [{ player: 'Edin Džeko', minute: "65'" }] },
  27: { hs: 2, as: 0, hScorers: [{ player: 'Jonathan David', minute: "22'" }, { player: 'Alphonso Davies', minute: "71'" }], aScorers: [] },
  28: { hs: 1, as: 0, hScorers: [{ player: 'Santiago Giménez', minute: "34'" }], aScorers: [] },
  29: { hs: 0, as: 1, hScorers: [], aScorers: [{ player: 'Julio Enciso', minute: "54'" }] },
  30: { hs: 2, as: 0, hScorers: [{ player: 'Christian Pulisic', minute: "39'" }, { player: 'Timothy Weah', minute: "73'" }], aScorers: [] },
  31: { hs: 0, as: 1, hScorers: [], aScorers: [{ player: 'Youssef En-Nesyri', minute: "44'" }] },
  32: { hs: 3, as: 0, hScorers: [{ player: 'Rodrygo', minute: "18'" }, { player: 'Endrick', minute: "65'" }, { player: 'Raphinha', minute: "82'" }], aScorers: [] },
  33: { hs: 5, as: 1, hScorers: [{ player: 'Cody Gakpo', minute: "7'" }, { player: 'Xavi Simons', minute: "21'" }, { player: 'Cody Gakpo', minute: "33'" }, { player: 'Memphis Depay', minute: "58'" }, { player: 'Donyell Malen', minute: "80'" }], aScorers: [{ player: 'Alexander Isak', minute: "62'" }] },
  34: { hs: 2, as: 1, hScorers: [{ player: 'Jamal Musiala', minute: "23'" }, { player: 'Kai Havertz', minute: "68'" }], aScorers: [{ player: 'Simon Adingra', minute: "55'" }] },
  35: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  36: { hs: 0, as: 4, hScorers: [], aScorers: [{ player: 'Ritsu Doan', minute: "19'" }, { player: 'Ayase Ueda', minute: "35'" }, { player: 'Ayase Ueda', minute: "63'" }, { player: 'Takumi Minamino', minute: "75'" }] },
  37: { hs: 4, as: 0, hScorers: [{ player: 'Álvaro Morata', minute: "16'" }, { player: 'Álvaro Morata', minute: "42'" }, { player: 'Nico Williams', minute: "55'" }, { player: 'Lamine Yamal', minute: "79'" }], aScorers: [] },
  38: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  39: { hs: 2, as: 2, hScorers: [{ player: 'Federico Valverde', minute: "29'" }, { player: 'Darwin Núñez', minute: "71'" }], aScorers: [{ player: 'Ryan Mendes', minute: "44'" }, { player: 'Bebé', minute: "83'" }] },
  40: { hs: 1, as: 3, hScorers: [{ player: 'Chris Wood', minute: "45'" }], aScorers: [{ player: 'Mohamed Salah', minute: "12'" }, { player: 'Mohamed Salah', minute: "59'" }, { player: 'Mostafa Mohamed', minute: "81'" }] },
  41: { hs: 2, as: 0, hScorers: [{ player: 'Lionel Messi', minute: "35'" }, { player: 'Enzo Fernández', minute: "78'" }], aScorers: [] },
  42: { hs: 3, as: 0, hScorers: [{ player: 'Kylian Mbappé', minute: "11'" }, { player: 'Bradley Barcola', minute: "49'" }, { player: 'Randal Kolo Muani', minute: "76'" }], aScorers: [] },
  43: { hs: 3, as: 2, hScorers: [{ player: 'Erling Haaland', minute: "29'" }, { player: 'Alexander Sørloth', minute: "55'" }, { player: 'Erling Haaland', minute: "73'" }], aScorers: [{ player: 'Sadio Mané', minute: "41'" }, { player: 'Ismaïla Sarr', minute: "86'" }] },
  44: { hs: 1, as: 2, hScorers: [{ player: 'Yazan Al-Naimat', minute: "54'" }], aScorers: [{ player: 'Riyad Mahrez', minute: "28'" }, { player: 'Baghdad Bounedjah', minute: "69'" }] },
  45: { hs: 5, as: 0, hScorers: [{ player: 'Cristiano Ronaldo', minute: "14'" }, { player: 'Nuno Mendes', minute: "27'" }, { player: 'Bruno Fernandes', minute: "41'" }, { player: 'Cristiano Ronaldo', minute: "58'" }, { player: 'Bernardo Silva', minute: "72'" }], aScorers: [] },
  46: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  47: { hs: 0, as: 1, hScorers: [], aScorers: [{ player: 'Luka Modrić', minute: "61'" }] },
  48: { hs: 1, as: 0, hScorers: [{ player: 'Luis Díaz', minute: "64'" }], aScorers: [] },
  49: { hs: 1, as: 0, hScorers: [{ player: 'Breel Embolo', minute: "48'" }], aScorers: [] },
  50: { hs: 4, as: 1, hScorers: [{ player: 'Ermedin Demirović', minute: "14'" }, { player: 'Edin Džeko', minute: "39'" }, { player: 'Miroslav Stevanović', minute: "63'" }, { player: 'Edin Džeko', minute: "82'" }], aScorers: [{ player: 'Akram Afif', minute: "51'" }] },
  51: { hs: 0, as: 3, hScorers: [], aScorers: [{ player: 'Vinícius Jr', minute: "27'" }, { player: 'Vinícius Jr', minute: "63'" }, { player: 'Gabriel Martinelli', minute: "89'" }] },
  52: { hs: 4, as: 2, hScorers: [{ player: 'Achraf Hakimi', minute: "14'" }, { player: 'Brahim Díaz', minute: "38'" }, { player: 'Brahim Díaz', minute: "60'" }, { player: 'Ayoub El Kaabi', minute: "79'" }], aScorers: [{ player: 'Duckens Nazon', minute: "22'" }, { player: 'Frantzdy Pierrot', minute: "85'" }] },
  53: { hs: 0, as: 3, hScorers: [], aScorers: [{ player: 'Edson Álvarez', minute: "21'" }, { player: 'Hirving Lozano', minute: "64'" }, { player: 'Santiago Giménez', minute: "88'" }] },
  54: { hs: 1, as: 0, hScorers: [{ player: 'Lyle Foster', minute: "72'" }], aScorers: [] },
  55: { hs: 0, as: 2, hScorers: [], aScorers: [{ player: 'Nicolas Pépé', minute: "32'" }, { player: 'Oumar Diakité', minute: "70'" }] },
  56: { hs: 2, as: 1, hScorers: [{ player: 'Enner Valencia', minute: "38'" }, { player: 'Moisés Caicedo', minute: "74'" }], aScorers: [{ player: 'Joshua Kimmich', minute: "82'" }] },
  57: { hs: 1, as: 1, hScorers: [{ player: 'Kaoru Mitoma', minute: "45'" }], aScorers: [{ player: 'Viktor Gyökeres', minute: "52'" }] },
  58: { hs: 1, as: 3, hScorers: [{ player: 'Youssef Msakni', minute: "60'" }], aScorers: [{ player: 'Cody Gakpo', minute: "25'" }, { player: 'Jeremie Frimpong', minute: "48'" }, { player: 'Wout Weghorst', minute: "88'" }] },
  59: { hs: 3, as: 2, hScorers: [{ player: 'Arda Güler', minute: "15'" }, { player: 'Kerem Aktürkoğlu', minute: "48'" }, { player: 'Kenan Yıldız', minute: "81'" }], aScorers: [{ player: 'Folarin Balogun', minute: "29'" }, { player: 'Weston McKennie', minute: "67'" }] },
  60: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  61: { hs: 1, as: 4, hScorers: [{ player: 'Erling Haaland', minute: "33'" }], aScorers: [{ player: 'Ousmane Dembélé', minute: "18'" }, { player: 'Ousmane Dembélé', minute: "44'" }, { player: 'Ousmane Dembélé', minute: "70'" }, { player: 'Kylian Mbappé', minute: "85'" }] },
  62: { hs: 5, as: 0, hScorers: [{ player: 'Sadio Mané', minute: "8'" }, { player: 'Nicolas Jackson', minute: "24'" }, { player: 'Sadio Mané', minute: "51'" }, { player: 'Iliman Ndiaye', minute: "66'" }, { player: 'Pape Gueye', minute: "80'" }], aScorers: [] },
  63: { hs: 0, as: 0, hScorers: [], aScorers: [] },
  64: { hs: 0, as: 1, hScorers: [], aScorers: [{ player: 'Dani Olmo', minute: "68'" }] },
  65: { hs: 1, as: 1, hScorers: [{ player: 'Trézéguet', minute: "36'" }], aScorers: [{ player: 'Mehdi Taremi', minute: "77'" }] },
  66: { hs: 1, as: 5, hScorers: [{ player: 'Marko Stamenic', minute: "50'" }], aScorers: [{ player: 'Romelu Lukaku', minute: "9'" }, { player: 'Romelu Lukaku', minute: "31'" }, { player: 'Jérémy Doku', minute: "44'" }, { player: 'Leandro Trossard', minute: "68'" }, { player: 'Charles De Ketelaere', minute: "85'" }] },
  67: { hs: 0, as: 2, hScorers: [], aScorers: [{ player: 'Bukayo Saka', minute: "29'" }, { player: 'Cole Palmer', minute: "74'" }] },
  68: { hs: 2, as: 1, hScorers: [{ player: 'Mateo Kovačić', minute: "19'" }, { player: 'Ante Budimir', minute: "83'" }], aScorers: [{ player: 'Antoine Semenyo', minute: "48'" }] },
  69: { hs: 1, as: 1, hScorers: [{ player: 'Luis Díaz', minute: "39'" }], aScorers: [{ player: 'Rafael Leão', minute: "52'" }] },
  70: { hs: 3, as: 1, hScorers: [{ player: 'Chancel Mbemba', minute: "21'" }, { player: 'Yoane Wissa', minute: "49'" }, { player: 'Fiston Mayele', minute: "75'" }], aScorers: [{ player: 'Eldor Shomurodov', minute: "84'" }] },
  71: { hs: 3, as: 3, hScorers: [{ player: 'Riyad Mahrez', minute: "19'" }, { player: 'Rayan Aït-Nouri', minute: "43'" }, { player: 'Amine Gouiri', minute: "86'" }], aScorers: [{ player: 'Marcel Sabitzer', minute: "12'" }, { player: 'Konrad Laimer', minute: "34'" }, { player: 'Michael Gregoritsch', minute: "72'" }] },
  72: { hs: 1, as: 3, hScorers: [{ player: 'Mousa Al-Tamari', minute: "41'" }], aScorers: [{ player: 'Lionel Messi', minute: "15'" }, { player: 'Alexis Mac Allister', minute: "53'" }, { player: 'Lionel Messi', minute: "68'" }] },
};

// Verified Knockout Stage Matches (Matches 73 to 104)
const knockoutResults = {
  73: {
    homeTeamId: 'RSA', awayTeamId: 'CAN',
    hs: 0, as: 1,
    hScorers: [], aScorers: [{ player: 'Stephen Eustáquio', minute: "90+2'" }],
    decision: 'FT', winnerTeamId: 'CAN'
  },
  74: {
    homeTeamId: 'BRA', awayTeamId: 'JPN',
    hs: 2, as: 1,
    hScorers: [{ player: 'Vinícius Jr', minute: "38'" }, { player: 'Endrick', minute: "81'" }],
    aScorers: [{ player: 'Takefusa Kubo', minute: "60'" }],
    decision: 'FT', winnerTeamId: 'BRA'
  },
  75: {
    homeTeamId: 'GER', awayTeamId: 'PAR',
    hs: 1, as: 1,
    hScorers: [{ player: 'Florian Wirtz', minute: "45'" }],
    aScorers: [{ player: 'Julio Enciso', minute: "72'" }],
    decision: 'PEN', extraTime: true,
    penalties: { home: 3, away: 4 },
    winnerTeamId: 'PAR'
  },
  76: {
    homeTeamId: 'NED', awayTeamId: 'MAR',
    hs: 1, as: 1,
    hScorers: [{ player: 'Cody Gakpo', minute: "34'" }],
    aScorers: [{ player: 'Brahim Díaz', minute: "59'" }],
    decision: 'PEN', extraTime: true,
    penalties: { home: 2, away: 3 },
    winnerTeamId: 'MAR'
  },
  77: {
    homeTeamId: 'CIV', awayTeamId: 'NOR',
    hs: 1, as: 2,
    hScorers: [{ player: 'Franck Kessié', minute: "50'" }],
    aScorers: [{ player: 'Erling Haaland', minute: "26'" }, { player: 'Erling Haaland', minute: "79'" }],
    decision: 'FT', winnerTeamId: 'NOR'
  },
  78: {
    homeTeamId: 'FRA', awayTeamId: 'SWE',
    hs: 3, as: 0,
    hScorers: [{ player: 'Kylian Mbappé', minute: "17'" }, { player: 'Kylian Mbappé', minute: "62'" }, { player: 'Marcus Thuram', minute: "84'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'FRA'
  },
  79: {
    homeTeamId: 'MEX', awayTeamId: 'ECU',
    hs: 2, as: 0,
    hScorers: [{ player: 'Julián Quiñones', minute: "29'" }, { player: 'Santiago Giménez', minute: "73'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'MEX'
  },
  80: {
    homeTeamId: 'ENG', awayTeamId: 'COD',
    hs: 2, as: 1,
    hScorers: [{ player: 'Harry Kane', minute: "33'" }, { player: 'Jude Bellingham', minute: "76'" }],
    aScorers: [{ player: 'Yoane Wissa', minute: "58'" }],
    decision: 'FT', winnerTeamId: 'ENG'
  },
  81: {
    homeTeamId: 'BEL', awayTeamId: 'SEN',
    hs: 3, as: 2,
    hScorers: [{ player: 'Romelu Lukaku', minute: "22'" }, { player: 'Kevin De Bruyne', minute: "87'" }, { player: 'Charles De Ketelaere', minute: "104'" }],
    aScorers: [{ player: 'Sadio Mané', minute: "35'" }, { player: 'Nicolas Jackson', minute: "68'" }],
    decision: 'AET', extraTime: true,
    winnerTeamId: 'BEL'
  },
  82: {
    homeTeamId: 'USA', awayTeamId: 'BIH',
    hs: 2, as: 0,
    hScorers: [{ player: 'Christian Pulisic', minute: "24'" }, { player: 'Folarin Balogun', minute: "67'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'USA'
  },
  83: {
    homeTeamId: 'ESP', awayTeamId: 'AUT',
    hs: 4, as: 0,
    hScorers: [{ player: 'Nico Williams', minute: "19'" }, { player: 'Dani Olmo', minute: "41'" }, { player: 'Álvaro Morata', minute: "64'" }, { player: 'Lamine Yamal', minute: "80'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'ESP'
  },
  84: {
    homeTeamId: 'POR', awayTeamId: 'CRO',
    hs: 2, as: 1,
    hScorers: [{ player: 'Cristiano Ronaldo', minute: "30'" }, { player: 'Bruno Fernandes', minute: "74'" }],
    aScorers: [{ player: 'Andrej Kramarić', minute: "55'" }],
    decision: 'FT', winnerTeamId: 'POR'
  },
  85: {
    homeTeamId: 'SUI', awayTeamId: 'ALG',
    hs: 2, as: 0,
    hScorers: [{ player: 'Breel Embolo', minute: "36'" }, { player: 'Granit Xhaka', minute: "69'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'SUI'
  },
  86: {
    homeTeamId: 'AUS', awayTeamId: 'EGY',
    hs: 1, as: 1,
    hScorers: [{ player: 'Nestory Irankunda', minute: "40'" }],
    aScorers: [{ player: 'Mohamed Salah', minute: "62'" }],
    decision: 'PEN', extraTime: true,
    penalties: { home: 2, away: 4 },
    winnerTeamId: 'EGY'
  },
  87: {
    homeTeamId: 'ARG', awayTeamId: 'CPV',
    hs: 3, as: 2,
    hScorers: [{ player: 'Lionel Messi', minute: "27'" }, { player: 'Lionel Messi', minute: "102'" }, { player: 'Lautaro Martínez', minute: "114'" }],
    aScorers: [{ player: 'Ryan Mendes', minute: "70'" }, { player: 'Bebé', minute: "118'" }],
    decision: 'AET', extraTime: true,
    winnerTeamId: 'ARG'
  },
  88: {
    homeTeamId: 'COL', awayTeamId: 'GHA',
    hs: 1, as: 0,
    hScorers: [{ player: 'Luis Díaz', minute: "64'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'COL'
  },

  // Round of 16 (Matches 89 to 96)
  89: {
    homeTeamId: 'PAR', awayTeamId: 'FRA',
    hs: 0, as: 1,
    hScorers: [], aScorers: [{ player: 'Kylian Mbappé', minute: "78'" }],
    decision: 'FT', winnerTeamId: 'FRA'
  },
  90: {
    homeTeamId: 'CAN', awayTeamId: 'MAR',
    hs: 0, as: 3,
    hScorers: [], aScorers: [{ player: 'Hakim Ziyech', minute: "19'" }, { player: 'Youssef En-Nesyri', minute: "54'" }, { player: 'Brahim Díaz', minute: "83'" }],
    decision: 'FT', winnerTeamId: 'MAR'
  },
  91: {
    homeTeamId: 'BRA', awayTeamId: 'NOR',
    hs: 1, as: 2,
    hScorers: [{ player: 'Rodrygo', minute: "41'" }],
    aScorers: [{ player: 'Erling Haaland', minute: "31'" }, { player: 'Erling Haaland', minute: "88'" }],
    decision: 'FT', winnerTeamId: 'NOR'
  },
  92: {
    homeTeamId: 'MEX', awayTeamId: 'ENG',
    hs: 2, as: 3,
    hScorers: [{ player: 'Santiago Giménez', minute: "49'" }, { player: 'Edson Álvarez', minute: "76'" }],
    aScorers: [{ player: 'Harry Kane', minute: "14'" }, { player: 'Harry Kane', minute: "60'" }, { player: 'Bukayo Saka', minute: "82'" }],
    decision: 'FT', winnerTeamId: 'ENG'
  },
  93: {
    homeTeamId: 'POR', awayTeamId: 'ESP',
    hs: 0, as: 1,
    hScorers: [], aScorers: [{ player: 'Mikel Merino', minute: "90+2'" }],
    decision: 'FT', winnerTeamId: 'ESP'
  },
  94: {
    homeTeamId: 'USA', awayTeamId: 'BEL',
    hs: 1, as: 4,
    hScorers: [{ player: 'Christian Pulisic', minute: "84'" }],
    aScorers: [{ player: 'Charles De Ketelaere', minute: "18'" }, { player: 'Charles De Ketelaere', minute: "52'" }, { player: 'Kevin De Bruyne', minute: "63'" }, { player: 'Romelu Lukaku', minute: "90'" }],
    decision: 'FT', winnerTeamId: 'BEL'
  },
  95: {
    homeTeamId: 'ARG', awayTeamId: 'EGY',
    hs: 3, as: 2,
    hScorers: [{ player: 'Lionel Messi', minute: "51'" }, { player: 'Julián Álvarez', minute: "68'" }, { player: 'Lautaro Martínez', minute: "86'" }],
    aScorers: [{ player: 'Mohamed Salah', minute: "11'" }, { player: 'Mohamed Salah', minute: "23'" }],
    decision: 'FT', winnerTeamId: 'ARG'
  },
  96: {
    homeTeamId: 'SUI', awayTeamId: 'COL',
    hs: 1, as: 1,
    hScorers: [{ player: 'Breel Embolo', minute: "57'" }],
    aScorers: [{ player: 'Luis Díaz', minute: "73'" }],
    decision: 'PEN', extraTime: true,
    penalties: { home: 4, away: 3 },
    winnerTeamId: 'SUI'
  },

  // Quarterfinals (Matches 97 to 100)
  97: {
    homeTeamId: 'FRA', awayTeamId: 'MAR',
    hs: 2, as: 0,
    hScorers: [{ player: 'Kylian Mbappé', minute: "39'" }, { player: 'Bradley Barcola', minute: "75'" }],
    aScorers: [],
    decision: 'FT', winnerTeamId: 'FRA'
  },
  98: {
    homeTeamId: 'ESP', awayTeamId: 'BEL',
    hs: 2, as: 1,
    hScorers: [{ player: 'Lamine Yamal', minute: "31'" }, { player: 'Dani Olmo', minute: "70'" }],
    aScorers: [{ player: 'Romelu Lukaku', minute: "55'" }],
    decision: 'FT', winnerTeamId: 'ESP'
  },
  99: {
    homeTeamId: 'NOR', awayTeamId: 'ENG',
    hs: 1, as: 2,
    hScorers: [{ player: 'Erling Haaland', minute: "58'" }],
    aScorers: [{ player: 'Harry Kane', minute: "24'" }, { player: 'Jude Bellingham', minute: "86'" }],
    decision: 'FT', winnerTeamId: 'ENG'
  },
  100: {
    homeTeamId: 'ARG', awayTeamId: 'SUI',
    hs: 3, as: 1,
    hScorers: [{ player: 'Lionel Messi', minute: "35'" }, { player: 'Julián Álvarez', minute: "64'" }, { player: 'Lionel Messi', minute: "82'" }],
    aScorers: [{ player: 'Breel Embolo', minute: "49'" }],
    decision: 'FT', winnerTeamId: 'ARG'
  },

  // Semifinals (Matches 101, 102)
  101: {
    homeTeamId: 'FRA', awayTeamId: 'ESP',
    hs: 0, as: 2,
    hScorers: [],
    aScorers: [{ player: 'Lamine Yamal', minute: "21'" }, { player: 'Dani Olmo', minute: "25'" }],
    decision: 'FT', winnerTeamId: 'ESP'
  },
  102: {
    homeTeamId: 'ENG', awayTeamId: 'ARG',
    hs: 1, as: 2,
    hScorers: [{ player: 'Harry Kane', minute: "43'" }],
    aScorers: [{ player: 'Lionel Messi', minute: "38'" }, { player: 'Julián Álvarez', minute: "71'" }],
    decision: 'FT', winnerTeamId: 'ARG'
  },

  // Third Place Play-off (Match 103)
  103: {
    homeTeamId: 'ENG', awayTeamId: 'FRA',
    hs: 6, as: 4,
    hScorers: [
      { player: 'Bukayo Saka', minute: "22'" },
      { player: 'Harry Kane', minute: "31'" },
      { player: 'Bukayo Saka', minute: "45'" },
      { player: 'Bukayo Saka', minute: "63'" },
      { player: 'Cole Palmer', minute: "72'" },
      { player: 'Jude Bellingham', minute: "89'" }
    ],
    aScorers: [
      { player: 'Kylian Mbappé', minute: "16'" },
      { player: 'Antoine Griezmann', minute: "41'" },
      { player: 'Kylian Mbappé', minute: "58'" },
      { player: 'Kylian Mbappé', minute: "84'" }
    ],
    decision: 'FT', winnerTeamId: 'ENG'
  },

  // Final (Match 104)
  104: {
    homeTeamId: 'ESP', awayTeamId: 'ARG',
    hs: 1, as: 0,
    hScorers: [{ player: 'Ferran Torres', minute: "106'" }],
    aScorers: [],
    decision: 'AET', extraTime: true, winnerTeamId: 'ESP'
  }
};

// Build all 104 completed official fixtures
const completedFixtures = baseFixtures.map(fixture => {
  const isKnockout = fixture.id >= 73;
  let homeTeamId = fixture.homeTeamId;
  let awayTeamId = fixture.awayTeamId;
  let hs = 0;
  let as = 0;
  let hScorers = [];
  let aScorers = [];
  let decision = 'FT';
  let extraTime = false;
  let penalties = undefined;
  let winnerTeamId = undefined;

  if (!isKnockout) {
    const res = groupResults[fixture.id];
    if (res) {
      hs = res.hs;
      as = res.as;
      hScorers = res.hScorers;
      aScorers = res.aScorers;
    }
  } else {
    const ko = knockoutResults[fixture.id];
    if (ko) {
      homeTeamId = ko.homeTeamId;
      awayTeamId = ko.awayTeamId;
      hs = ko.hs;
      as = ko.as;
      hScorers = ko.hScorers;
      aScorers = ko.aScorers;
      decision = ko.decision;
      extraTime = !!ko.extraTime;
      penalties = ko.penalties;
      winnerTeamId = ko.winnerTeamId;
    }
  }

  return {
    ...fixture,
    homeTeamId,
    awayTeamId,
    status: 'finished',
    matchMinute: decision,
    homeScore: hs,
    awayScore: as,
    homeScorers: hScorers,
    awayScorers: aScorers,
    decision,
    extraTime,
    penalties,
    winnerTeamId
  };
});

fs.writeFileSync('src/data/tournamentFixtures.json', JSON.stringify(completedFixtures, null, 2));
console.log('Successfully generated 104 completed tournament fixtures into src/data/tournamentFixtures.json!');
