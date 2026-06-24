import { officialFixtures } from './src/data/official_fixtures';

async function checkApiIDs() {
    const res = await fetch('https://worldcup26.ir/get/games');
    const data = await res.json();
    
    const apiGames = data.games || [];
    
    console.log(`API returned ${apiGames.length} games.`);
    
    let mismatchCount = 0;
    
    officialFixtures.forEach(officialMatch => {
        const matchIdStr = String(officialMatch.id);
        const apiGame = apiGames.find((g: any) => g.id === matchIdStr);
        
        if (!apiGame) {
            console.log(`[WARNING] No API game found for official ID: ${officialMatch.id}`);
            return;
        }
        
        if (apiGame.home_team_id !== officialMatch.homeTeamId || apiGame.away_team_id !== officialMatch.awayTeamId) {
            console.log(`[MISMATCH] ID ${officialMatch.id} -> Official: ${officialMatch.homeTeamId} vs ${officialMatch.awayTeamId} | API: ${apiGame.home_team_id} vs ${apiGame.away_team_id}`);
            mismatchCount++;
        }
    });
    
    console.log(`Total Mismatches Found: ${mismatchCount}`);
}

checkApiIDs();
