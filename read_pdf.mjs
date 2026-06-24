import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const dataBuffer = fs.readFileSync('new_schedule_data/FIFA_WC2026_Complete_IST_Schedule.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('new_schedule.txt', data.text);
    console.log('PDF extracted to new_schedule.txt');
}).catch(console.error);
