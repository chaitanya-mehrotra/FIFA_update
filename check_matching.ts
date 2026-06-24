import { officialFixtures } from './src/data/official_fixtures';
import { getTeams } from './src/services/footballApi';

async function checkApiMatching() {
    const res = await fetch('https://worldcup26.ir/get/games');
    const data = await res.json();
    
    const apiGames = data.games || [];
    const teams = await getTeams();
    
    let matchedCount = 0;
    let unmatchedCount = 0;
    
    officialFixtures.forEach(officialMatch => {
        // Find names in our local teams array
        const homeTeam = teams.find(t => t.id === officialMatch.homeTeamId);
        const awayTeam = teams.find(t => t.id === officialMatch.awayTeamId);
        
        if (!homeTeam || !awayTeam) {
            // These are TBD matches (Knockout stage)
            return; // skip for now
        }
        
        // Find by name in API games
        const apiGame = apiGames.find((g: any) => 
            g.home_team_name_en?.toLowerCase() === homeTeam.name.toLowerCase() &&
            g.away_team_name_en?.toLowerCase() === awayTeam.name.toLowerCase()
        );
        
        if (apiGame) {
            matchedCount++;
        } else {
            console.log(`[UNMATCHED] Official: ${homeTeam.name} vs ${awayTeam.name}`);
            unmatchedCount++;
        }
    });
    
    console.log(`Total Matched: ${matchedCount}`);
    console.log(`Total Unmatched: ${unmatchedCount}`);
}

checkApiMatching();
