import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { useStandings } from '../hooks/useStandings';
import { useTeams } from '../hooks/useTeams';
import GroupTable from '../components/team/GroupTable';
import type { GroupStanding } from '../types';

const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export default function GroupStage() {
  const { data: standings, isLoading: standingsLoading } = useStandings();
  const { data: teams, isLoading: teamsLoading } = useTeams();

  const isLoading = standingsLoading || teamsLoading;

  const thirdPlacedTeams = useMemo(() => {
    if (!standings) return [];
    const list: (GroupStanding & { group: string })[] = [];
    groups.forEach((g) => {
      const groupRows = standings[g];
      if (groupRows && groupRows[2]) {
        list.push({ ...groupRows[2], group: g });
      }
    });

    return list.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
  }, [standings]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading standings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-fifa-gold" />
          Group Stage
        </h1>
        <p className="text-gray-400 mt-1">
          12 groups of 4 teams each (72 completed matches) — Top 2 from each group plus the 8 best 3rd-placed teams advanced to the Round of 32.
        </p>
      </div>

      {/* 12 Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map((g, idx) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
          >
            <GroupTable group={g} standings={standings ? standings[g] || [] : []} />
          </motion.div>
        ))}
      </div>

      {/* Ranking of Third-Placed Teams Table */}
      {thirdPlacedTeams.length === 12 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden mt-8"
        >
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500/20 via-fifa-gold/10 to-transparent border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-fifa-gold" /> Ranking of Third-Placed Teams
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Top 8 teams advanced to the Round of 32 based on points, goal difference, and goals scored.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-white/5">
                  <th className="text-left py-3 px-4 w-12">Rank</th>
                  <th className="text-center py-3 px-3 w-16">Grp</th>
                  <th className="text-left py-3 px-4">Team</th>
                  <th className="text-center py-3 px-2">P</th>
                  <th className="text-center py-3 px-2">W</th>
                  <th className="text-center py-3 px-2">D</th>
                  <th className="text-center py-3 px-2">L</th>
                  <th className="text-center py-3 px-2">GF</th>
                  <th className="text-center py-3 px-2">GA</th>
                  <th className="text-center py-3 px-2">GD</th>
                  <th className="text-center py-3 px-4 font-bold text-white">Pts</th>
                  <th className="text-right py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {thirdPlacedTeams.map((s, idx) => {
                  const team = teams ? teams.find((t) => t.id === s.teamId) : null;
                  const qualified = idx < 8;

                  return (
                    <tr
                      key={s.teamId}
                      className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                        qualified ? 'bg-blue-500/5' : 'opacity-60'
                      }`}
                    >
                      <td className="py-2.5 px-4 font-bold">
                        <span className={`text-xs ${qualified ? 'text-blue-400' : 'text-gray-500'}`}>
                          {idx + 1}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center text-xs font-semibold text-fifa-gold">
                        Group {s.group}
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2">
                          {team && (
                            <img
                              src={`https://flagcdn.com/w40/${team.flag}.png`}
                              alt={team.name}
                              className="w-6 h-4 rounded object-cover"
                              loading="lazy"
                            />
                          )}
                          <span className={`font-medium ${qualified ? 'text-white' : 'text-gray-400'}`}>
                            {team?.name || s.teamId}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-2.5 px-2 text-gray-300">{s.played}</td>
                      <td className="text-center py-2.5 px-2 text-gray-300">{s.won}</td>
                      <td className="text-center py-2.5 px-2 text-gray-300">{s.drawn}</td>
                      <td className="text-center py-2.5 px-2 text-gray-300">{s.lost}</td>
                      <td className="text-center py-2.5 px-2 text-gray-300">{s.goalsFor}</td>
                      <td className="text-center py-2.5 px-2 text-gray-300">{s.goalsAgainst}</td>
                      <td className="text-center py-2.5 px-2">
                        <span
                          className={`font-medium ${
                            s.goalDifference > 0
                              ? 'text-green-400'
                              : s.goalDifference < 0
                              ? 'text-red-400'
                              : 'text-gray-400'
                          }`}
                        >
                          {s.goalDifference > 0 ? '+' : ''}
                          {s.goalDifference}
                        </span>
                      </td>
                      <td className="text-center py-2.5 px-4 font-bold text-white">{s.points}</td>
                      <td className="text-right py-2.5 px-4">
                        {qualified ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                            <CheckCircle className="w-3 h-3" /> Advanced
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-white/5 px-2.5 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" /> Eliminated
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
