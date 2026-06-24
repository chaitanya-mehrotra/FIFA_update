import { getStandings } from './src/services/footballApi';
import { calculateQualification } from './src/utils/qualification';

async function checkArg() {
  const standings = await getStandings();
  const qual = calculateQualification(standings);
  
  const arg = Object.values(standings).flat().find(t => t.teamId === 'ARG');
  console.log('ARG Current Standing:', arg);
  console.log('ARG Status:', qual.teamStatus['ARG']);

  // Log all group leaders to see if ARG is guaranteed
  Object.entries(standings).forEach(([group, teams]) => {
     if(teams.some(t => t.teamId === 'ARG')) {
         console.log(`\nGroup ${group} Standings:`);
         teams.forEach(t => {
             const maxPts = t.points + Math.max(0, 3 - t.played) * 3;
             console.log(`${t.teamId}: Pts=${t.points}, Played=${t.played}, Max=${maxPts}, GD=${t.goalDifference}`);
         });
     }
  });
}

checkArg().catch(console.error);
