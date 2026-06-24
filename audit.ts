import { getStandings } from './src/services/footballApi';
import { calculateQualification } from './src/utils/qualification';

async function audit() {
  const standings = await getStandings();
  const qual = calculateQualification(standings);
  
  const qualified: string[] = [];
  const pending: string[] = [];
  const eliminated: string[] = [];
  
  Object.entries(qual.teamStatus).forEach(([teamId, status]) => {
    if (status === 'WINNER' || status === 'RUNNER_UP' || status === 'QUALIFIED') {
      qualified.push(teamId);
    } else if (status === 'ELIMINATED') {
      eliminated.push(teamId);
    } else {
      pending.push(teamId);
    }
  });

  console.log(`\n============================`);
  console.log(`TEAM QUALIFICATION AUDIT REPORT`);
  console.log(`============================\n`);
  
  console.log(`✅ QUALIFIED TEAMS (${qualified.length})`);
  console.log(qualified.length ? qualified.join(', ') : 'None');
  
  console.log(`\n⏳ PENDING TEAMS (${pending.length})`);
  console.log(pending.length ? pending.join(', ') : 'None');

  console.log(`\n❌ ELIMINATED TEAMS (${eliminated.length})`);
  console.log(eliminated.length ? eliminated.join(', ') : 'None');
  console.log(`\n============================\n`);
}

audit().catch(console.error);
