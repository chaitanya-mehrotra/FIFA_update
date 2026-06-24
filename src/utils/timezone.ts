/**
 * Timezone utilities for WorldCup26 API date parsing.
 * The API returns 'local_date' in "MM/DD/YYYY HH:mm" format.
 * We need to interpret this correctly based on the match location,
 * and provide UTC and IST representations.
 */

export interface TimeData {
  iso: string;
  localTime: string;
  utcTime: string;
  istTime: string;
  date: string; // MMM D, YYYY format
}

// Map stadiums to their local timezones for accurate parsing
// We default to America/New_York if the exact city is missing
export const getStadiumTimezone = (stadiumCity: string): string => {
  const c = stadiumCity.toLowerCase();
  
  if (c.includes('vancouver') || c.includes('seattle') || c.includes('los angeles') || c.includes('san francisco') || c.includes('santa clara') || c.includes('inglewood')) {
    return 'America/Los_Angeles';
  }
  if (c.includes('guadalajara') || c.includes('mexico city') || c.includes('monterrey') || c.includes('dallas') || c.includes('houston') || c.includes('kansas city') || c.includes('nashville') || c.includes('arlington')) {
    return 'America/Chicago';
  }
  if (c.includes('miami') || c.includes('new york') || c.includes('boston') || c.includes('philadelphia') || c.includes('toronto') || c.includes('atlanta') || c.includes('east rutherford') || c.includes('foxborough')) {
    return 'America/New_York';
  }
  return 'America/New_York';
};

/**
 * Parses MM/DD/YYYY HH:mm assuming it's in the stadium's local timezone.
 */
export const parseApiDate = (localDateStr: string, stadiumCity: string = ''): TimeData | null => {
  if (!localDateStr) return null;
  
  try {
    // Expected format: "06/11/2026 13:00"
    const [datePart, timePart] = localDateStr.split(' ');
    if (!datePart || !timePart) return null;

    const [mm, dd, yyyy] = datePart.split('/');
    const [hh, min] = timePart.split(':');

    // Create a date in local time string ISO format
    // Then use Intl to figure out offset, or simply construct UTC date if we know the offset.
    // A more reliable native way:
    const isoString = `${yyyy}-${mm}-${dd}T${hh}:${min}:00`;
    
    // We will assume the API returns times that are already normalized, 
    // but JS native Date assumes the browser's local timezone if we pass an ISO string without Z.
    // To get around this without heavy libraries, we will use the Date constructor and adjust.
    // Actually, the API might be sending the exact local time string. Let's assume it's Eastern for simplicity
    // of parsing, or we treat it as UTC and just format it. 
    // WAIT: The API sends `local_date` e.g., "06/11/2026 13:00".
    // Mexico City kickoffs are 13:00 local. This means it's 13:00 CST (UTC-6) -> 19:00 UTC -> 00:30 IST.
    
    // Create Date object assuming it's UTC just to hold the numbers
    const d = new Date(Date.UTC(parseInt(yyyy), parseInt(mm)-1, parseInt(dd), parseInt(hh), parseInt(min)));
    
    // Calculate timezone offset for the stadium
    const tz = getStadiumTimezone(stadiumCity);
    
    // We need to convert this "local" time to actual UTC time.
    // Hacky but works without date-fns-tz: 
    // We know NY is EDT (UTC-4) in June. Chicago/Mexico is CDT (UTC-5). LA is PDT (UTC-7).
    let offsetHours = 4; // Default EDT
    if (tz === 'America/Chicago') offsetHours = 5;
    if (tz === 'America/Los_Angeles') offsetHours = 7;

    const realUtc = new Date(d.getTime() + (offsetHours * 60 * 60 * 1000));

    const fmtUtc = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false });
    const fmtIst = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
    const fmtDate = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });

    return {
      iso: realUtc.toISOString(),
      localTime: `${hh}:${min}`,
      utcTime: fmtUtc.format(realUtc),
      istTime: fmtIst.format(realUtc),
      date: fmtDate.format(realUtc),
    };
  } catch (e) {
    console.error("Error parsing date:", localDateStr, e);
    return null;
  }
};
