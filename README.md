# ⚽ FIFA World Cup 2026™ — Tournament Platform

> A complete, data-accurate post-tournament archive and interactive platform for the **FIFA World Cup 2026**.

🔴 **Live Demo:** [https://fifa-update-tghj.vercel.app](https://fifa-update-tghj.vercel.app)

---

## 📸 Features

- **🏠 Home** — Champion showcase, tournament overview, official awards, and key stats
- **📅 Fixtures** — All 104 completed match results with scorers, stages, and venues
- **🏆 Group Stage** — Final group standings for all 12 groups (A–L) with GD and points
- **🥊 Knockout Bracket** — Full interactive bracket from Round of 32 to the Final
- **📊 Statistics** — Top scorers leaderboard, team goals, goal distribution by minute, clean sheets
- **🗺️ Stadiums** — Interactive Leaflet map of all 16 host venues across USA, Canada & Mexico
- **👕 Teams** — Profiles for all 48 participating nations with flags, coach, and confederation

---

## 🏅 Tournament Results

| Award | Winner |
|---|---|
| 🏆 **Champion** | Spain (def. Argentina 1–0 AET) |
| 🥈 **Runner-Up** | Argentina |
| 🥉 **Third Place** | England (def. France 6–4) |
| 🥇 **Golden Boot** | Kylian Mbappé (France) — 10 Goals |
| ⭐ **Golden Ball** | Rodri (Spain) |
| 🧤 **Golden Glove** | Unai Simón (Spain) — 7 Clean Sheets |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **Data Fetching** | TanStack Query v5 |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Maps** | Leaflet + React-Leaflet |
| **Deployment** | Vercel |

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/chaitanya-mehrotra/FIFA_update.git
cd FIFA_update

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── data/
│   ├── tournamentFixtures.json   # All 104 verified match results
│   ├── tournamentArchive.ts      # Awards, overview, champion data
│   ├── stadiums.ts               # 16 host stadium details + coordinates
│   └── localTeams.ts             # All 48 participating nations
├── pages/                        # Route-level page components
├── components/                   # Reusable UI components
├── hooks/                        # Custom React hooks (useStatistics, useTeams…)
└── services/
    └── footballApi.ts            # Centralised data service
```

---

## 📊 Data Accuracy

All 104 match results, scorers, and standings are manually verified against:
- **FIFA Official Archives** (fifa.com/worldcup)
- **ESPN Football Results & Standings Database**
- **BBC Sport World Cup Archive**

> Verification Date: October 18, 2026 · Status: ✅ Verified Final Archive

---

## 📄 License

MIT © [chaitanya-mehrotra](https://github.com/chaitanya-mehrotra)
