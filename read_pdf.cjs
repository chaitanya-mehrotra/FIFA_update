const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('new_schedule_data/FIFA_WC2026_Complete_IST_Schedule.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('new_schedule.txt', data.text);
    console.log('PDF extracted to new_schedule.txt');
}).catch(console.error);
