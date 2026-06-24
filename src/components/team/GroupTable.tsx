import { motion } from 'framer-motion';
import { useTeams } from '../../hooks/useTeams';
import type { GroupStanding } from '../../types';

interface GroupTableProps {
  group: string;
  standings: GroupStanding[];
}

export default function GroupTable({ group, standings }: GroupTableProps) {
  const { data: teams } = useTeams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <div className="px-4 py-3 bg-gradient-to-r from-fifa-gold/20 to-transparent border-b border-white/10">
        <h3 className="text-sm font-bold text-white">
          Group <span className="text-fifa-gold">{group}</span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-white/5">
              <th className="text-left py-2 px-3 w-8">#</th>
              <th className="text-left py-2 px-3">Team</th>
              <th className="text-center py-2 px-1.5">P</th>
              <th className="text-center py-2 px-1.5">W</th>
              <th className="text-center py-2 px-1.5">D</th>
              <th className="text-center py-2 px-1.5">L</th>
              <th className="text-center py-2 px-1.5">GF</th>
              <th className="text-center py-2 px-1.5">GA</th>
              <th className="text-center py-2 px-1.5">GD</th>
              <th className="text-center py-2 px-3 font-bold text-white">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, idx) => {
              const team = teams ? teams.find(t => t.id === s.teamId) : null;
              // Top 2 qualify (top 8 third-place in 12 groups) but visually highlight top 2
              const qualified = idx < 2;
              return (
                <tr
                  key={s.teamId}
                  className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                    qualified ? 'bg-green-500/5' : ''
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-bold ${qualified ? 'text-green-400' : 'text-gray-400'}`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      {team && (
                        <img
                          src={`https://flagcdn.com/w40/${team.flag}.png`}
                          alt={team.name}
                          className="w-6 h-4 rounded object-cover"
                          loading="lazy"
                        />
                      )}
                      <span className="font-medium text-white text-sm">{team?.name || s.teamId}</span>
                    </div>
                  </td>
                  <td className="text-center py-2.5 px-1.5 text-gray-300">{s.played}</td>
                  <td className="text-center py-2.5 px-1.5 text-gray-300">{s.won}</td>
                  <td className="text-center py-2.5 px-1.5 text-gray-300">{s.drawn}</td>
                  <td className="text-center py-2.5 px-1.5 text-gray-300">{s.lost}</td>
                  <td className="text-center py-2.5 px-1.5 text-gray-300">{s.goalsFor}</td>
                  <td className="text-center py-2.5 px-1.5 text-gray-300">{s.goalsAgainst}</td>
                  <td className="text-center py-2.5 px-1.5">
                    <span className={`font-medium ${
                      s.goalDifference > 0 ? 'text-green-400' : s.goalDifference < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {s.goalDifference > 0 ? '+' : ''}{s.goalDifference}
                    </span>
                  </td>
                  <td className="text-center py-2.5 px-3 font-bold text-white">{s.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Legend */}
      <div className="px-4 py-2 border-t border-white/5 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-[10px] text-gray-400">Advances to Knockout Stage</span>
      </div>
    </motion.div>
  );
}
