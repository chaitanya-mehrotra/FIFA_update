import re
import json
from datetime import datetime, timedelta

def get_venue_info(raw_venue):
    venues = {
        "Azteca": {"city": "Mexico City", "country": "Mexico", "offset": -6, "venue": "Estadio Azteca"},
        "Akron": {"city": "Guadalajara", "country": "Mexico", "offset": -6, "venue": "Estadio Akron"},
        "BMO Field": {"city": "Toronto", "country": "Canada", "offset": -4, "venue": "BMO Field"},
        "SoFi": {"city": "Los Angeles", "country": "USA", "offset": -7, "venue": "SoFi Stadium"},
        "Levi's": {"city": "San Francisco Bay Area", "country": "USA", "offset": -7, "venue": "Levi's Stadium"},
        "MetLife": {"city": "New York/New Jersey", "country": "USA", "offset": -4, "venue": "MetLife Stadium"},
        "Gillette": {"city": "Boston", "country": "USA", "offset": -4, "venue": "Gillette Stadium"},
        "BBVA": {"city": "Monterrey", "country": "Mexico", "offset": -6, "venue": "Estadio BBVA"},
        "NRG": {"city": "Houston", "country": "USA", "offset": -5, "venue": "NRG Stadium"},
        "AT&T": {"city": "Dallas", "country": "USA", "offset": -5, "venue": "AT&T Stadium"},
        "Hard Rock": {"city": "Miami", "country": "USA", "offset": -4, "venue": "Hard Rock Stadium"},
        "Mercedes-Benz": {"city": "Atlanta", "country": "USA", "offset": -4, "venue": "Mercedes-Benz Stadium"},
        "Lincoln Financial": {"city": "Philadelphia", "country": "USA", "offset": -4, "venue": "Lincoln Financial Field"},
        "Lumen Field": {"city": "Seattle", "country": "USA", "offset": -7, "venue": "Lumen Field"},
        "Arrowhead": {"city": "Kansas City", "country": "USA", "offset": -5, "venue": "Arrowhead Stadium"},
        "BC Place": {"city": "Vancouver", "country": "Canada", "offset": -7, "venue": "BC Place"}
    }
    
    for key, info in venues.items():
        if key.lower() in raw_venue.lower():
            return info
    
    # Fallback checking
    if "Miami" in raw_venue: return venues["Hard Rock"]
    if "Toronto" in raw_venue: return venues["BMO Field"]
    if "Mexico City" in raw_venue: return venues["Azteca"]
    
    return {"city": "Unknown", "country": "Unknown", "offset": 0, "venue": raw_venue}

teams_map = {
    "Mexico": "MEX", "South Africa": "RSA", "South Korea": "KOR", "Czechia": "CZE",
    "Canada": "CAN", "Bosnia & Herzegovina": "BIH", "Qatar": "QAT", "Switzerland": "SUI",
    "Brazil": "BRA", "Morocco": "MAR", "Haiti": "HAI", "Scotland": "SCO",
    "USA": "USA", "Paraguay": "PAR", "Australia": "AUS", "Türkiye": "TUR", "Trkiye": "TUR",
    "Germany": "GER", "Curaçao": "CUW", "Craao": "CUW", "Ivory Coast": "CIV", "Ecuador": "ECU",
    "Netherlands": "NED", "Japan": "JPN", "Sweden": "SWE", "Tunisia": "TUN",
    "Belgium": "BEL", "Egypt": "EGY", "Iran": "IRN", "New Zealand": "NZL",
    "Spain": "ESP", "Cape Verde": "CPV", "Saudi Arabia": "KSA", "Uruguay": "URU",
    "France": "FRA", "Senegal": "SEN", "Iraq": "IRQ", "Norway": "NOR",
    "Argentina": "ARG", "Algeria": "ALG", "Austria": "AUT", "Jordan": "JOR",
    "Portugal": "POR", "DR Congo": "COD", "Uzbekistan": "UZB", "Colombia": "COL",
    "England": "ENG", "Croatia": "CRO", "Ghana": "GHA", "Panama": "PAN"
}

def parse_time(date_str, ist_time_str):
    is_next_day = '†' in ist_time_str or '+' in ist_time_str or '' in ist_time_str
    
    # Extract just the time part: HH:MM AM/PM
    time_match = re.search(r'(\d{1,2}:\d{2}\s*[AP]M)', ist_time_str)
    if time_match:
        clean_time = time_match.group(1).strip()
    else:
        clean_time = '12:00 AM' # fallback
    
    # parse date: "Thu, 11 June 2026" or "11 June 2026"
    date_clean = re.sub(r'^[A-Za-z]+, ', '', date_str).strip()
    dt_base = datetime.strptime(date_clean + " " + clean_time, "%d %B %Y %I:%M %p")
    
    if is_next_day:
        dt_ist = dt_base + timedelta(days=1)
    else:
        dt_ist = dt_base
        
    return dt_ist

lines = open('new_schedule.txt', 'r', encoding='utf-8').read().split('\n')
fixtures = []

current_date = None
i = 0
match_id = 1
while i < len(lines):
    line = lines[i].strip()
    if not line:
        i += 1
        continue
    
    # Check for date line
    if re.match(r'^[A-Z][a-z]{2}, \d{1,2} [A-Z][a-z]+ 2026', line):
        current_date = line
        i += 1
        continue
        
    # Check for table headers
    if line == "Grp" or line == "Match" or line == "IST Time":
        i += 1
        continue
        
    # Group match parsing
    if re.match(r'^[A-L]$', line) and i+3 < len(lines):
        group = line
        match_str = lines[i+1].strip()
        ist_time = lines[i+2].strip()
        venue_str = lines[i+3].strip()
        
        # Check if line i+4 is a result or the next block
        step = 4
        if i+4 < len(lines):
            next_line = lines[i+4].strip()
            # If next_line is not a Group, Date, or separator, it's a result line
            if not (re.match(r'^[A-L]$', next_line) or re.match(r'^[A-Z][a-z]{2},', next_line) or next_line == '#' or next_line.startswith('GROUP STAGE')):
                step = 5
        
        parts = match_str.split(' vs ')
        if len(parts) == 2:
            t1, t2 = parts[0].strip(), parts[1].strip()
        else:
            t1, t2 = match_str, "TBD"
            
        home_id = teams_map.get(t1, t1)
        away_id = teams_map.get(t2, t2)
        
        v_info = get_venue_info(venue_str)
        dt_ist = parse_time(current_date, ist_time)
        dt_utc = dt_ist - timedelta(hours=5, minutes=30)
        dt_local = dt_utc + timedelta(hours=v_info["offset"])
        
        fixtures.append({
            "id": match_id,
            "homeTeamId": home_id,
            "awayTeamId": away_id,
            "date": dt_local.strftime("%Y-%m-%d"),
            "localTime": dt_local.strftime("%I:%M %p"),
            "utcTime": dt_utc.strftime("%I:%M %p"),
            "istTime": dt_ist.strftime("%I:%M %p"),
            "venue": v_info["venue"],
            "hostCity": v_info["city"],
            "hostCountry": v_info["country"],
            "status": "upcoming",
            "stage": "group",
            "group": group,
            "homeScore": None,
            "awayScore": None
        })
        match_id += 1
        i += step
        continue
        
    # Knockout parsing
    # M73, M74 etc.
    if re.match(r'^M\d+$', line) and i+3 < len(lines):
        m_num = line
        match_str = lines[i+1].strip()
        ist_time = lines[i+2].strip()
        venue_str = lines[i+3].strip()
        
        parts = match_str.split(' vs ')
        if len(parts) == 2:
            home = parts[0].strip()
            away = parts[1].strip()
        else:
            home = "TBD"
            away = "TBD"
            
        v_info = get_venue_info(venue_str)
        dt_ist = parse_time(current_date, ist_time)
        dt_utc = dt_ist - timedelta(hours=5, minutes=30)
        dt_local = dt_utc + timedelta(hours=v_info["offset"])
        
        stage = "knockout"
        if 73 <= match_id <= 88: stage = "round_of_32"
        elif 89 <= match_id <= 96: stage = "round_of_16"
        elif 97 <= match_id <= 100: stage = "quarter_final"
        elif 101 <= match_id <= 102: stage = "semi_final"
        elif match_id == 103: stage = "third_place"
        elif match_id == 104: stage = "final"
        
        fixtures.append({
            "id": match_id,
            "homeTeamId": None,
            "awayTeamId": None,
            "homeTeamPlaceholder": home,
            "awayTeamPlaceholder": away,
            "date": dt_local.strftime("%Y-%m-%d"),
            "localTime": dt_local.strftime("%I:%M %p"),
            "utcTime": dt_utc.strftime("%I:%M %p"),
            "istTime": dt_ist.strftime("%I:%M %p"),
            "venue": v_info["venue"],
            "hostCity": v_info["city"],
            "hostCountry": v_info["country"],
            "status": "upcoming",
            "stage": stage,
            "homeScore": None,
            "awayScore": None
        })
        match_id += 1
        i += 4
        # some knockouts might have an extra blank line or result line
        if i < len(lines) and "—" in lines[i]:
            i += 1
        continue
        
    i += 1

out = "import type { Match } from '../types';\n\nexport const fixtures: Match[] = " + json.dumps(fixtures, indent=2) + ";\n"
open('src/data/fixtures.ts', 'w', encoding='utf-8').write(out)

# Verification report output
print(f"Total fixtures parsed: {len(fixtures)}")
