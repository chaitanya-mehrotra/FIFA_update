import { getStandings } from './src/services/footballApi';

async function checkQual() {
  const standings = await getStandings();
  
  const maxThirds = Object.values(standings).map(teams => {
    if (teams.length < 3) return 0;
    const maxPointsList = teams.map(t => t.points + Math.max(0, 3 - t.played) * 3).sort((a, b) => b - a);
    return maxPointsList[2]; // 3rd highest max points
  }).sort((a, b) => b - a);

  const max9thBestThirdPoints = maxThirds.length >= 9 ? maxThirds[8] : 0;
  console.log('max9thBestThirdPoints:', max9thBestThirdPoints);
}

checkQual().catch(console.error);
