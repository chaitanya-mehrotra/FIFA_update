import { officialFixtures } from './src/data/official_fixtures';

async function checkApiMappingByDate() {
    const res = await fetch('https://worldcup26.ir/get/games');
    const data = await res.json();
    
    const apiGames = data.games || [];
    
    let matchedCount = 0;
    
    officialFixtures.forEach(officialMatch => {
        // Find by Date and Stadium? Or just by chronological order?
        // Wait, the API has local_date like "06/13/2026 21:00"
        // And officialMatch.date is "2026-06-14T04:00:00Z"
        // This is hard to match textually. Let's convert API local_date to UTC?
        // Let's print out the first 5 API games local_dates.
    });
    
    console.log(apiGames.slice(0, 5).map((g: any) => g.local_date));
}

checkApiMappingByDate();
