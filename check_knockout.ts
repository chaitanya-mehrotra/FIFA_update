import { officialFixtures } from './src/data/official_fixtures';
import { parseApiDate } from './src/utils/timezone';

async function checkDateMatching() {
    const res = await fetch('https://worldcup26.ir/get/games');
    const data = await res.json();
    const apiGames = data.games || [];
    
    let matched = 0;
    
    officialFixtures.forEach(officialMatch => {
        if (officialMatch.stage !== 'group') {
            const apiGame = apiGames.find((g: any) => {
                const parsed = parseApiDate(g.local_date, officialMatch.hostCity || '');
                return parsed && parsed.iso === officialMatch.date;
            });
            if (apiGame) {
                matched++;
            } else {
                console.log(`Knockout Mismatch: ${officialMatch.id} - ${officialMatch.date}`);
            }
        }
    });
    console.log(`Knockout matched: ${matched}`);
}
checkDateMatching();
