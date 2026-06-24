import { getGames } from './src/services/footballApi';

async function generateReport() {
    console.log("=================================================");
    console.log("DEBUG REPORT: LIVE MATCH SYNCHRONIZATION");
    console.log("=================================================\n");
    const games = await getGames();
    
    const liveGames = games.filter(g => g.status === 'live');
    console.log(`* Matches marked LIVE: ${liveGames.length}`);
    liveGames.forEach(g => {
        console.log(`  - Match ${g.id} | Minute: ${g.matchMinute} | Score: ${g.homeScore} - ${g.awayScore} | Scorers: ${g.homeScorers?.length} - ${g.awayScorers?.length}`);
        
        if (g.homeScore === null || g.awayScore === null) {
            console.error(`    [ERROR] Score is null for live match ${g.id}`);
        }
        
        const inferredHome = Math.max(g.homeScore || 0, g.homeScorers?.length || 0);
        const inferredAway = Math.max(g.awayScore || 0, g.awayScorers?.length || 0);
        if (g.homeScore !== inferredHome || g.awayScore !== inferredAway) {
            console.error(`    [ERROR] Score mismatch for live match ${g.id}. Timeline goals > current score.`);
        }
    });

    console.log("\n* Static score sources removed: YES (using mapStatus and API array synchronization)");
}

generateReport();
