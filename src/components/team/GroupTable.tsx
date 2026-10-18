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
              const isTop2 = idx < 2;
              const isBestThird = s.qualificationStatus === 'BEST_THIRD';
              const isQualified = isTop2 || isBestThird;

              return (
                <tr
                  key={s.teamId}
                  className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                    isTop2 ? 'bg-green-500/10' : isBestThird ? 'bg-blue-500/10' : ''
                  }`}
                >
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-bold ${isTop2 ? 'text-green-400' : isBestThird ? 'text-blue-400' : 'text-gray-400'}`}>
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
                      <span className={`font-medium text-sm ${isQualified ? 'text-white' : 'text-gray-400'}`}>
                        {team?.name || s.teamId}
                      </span>
                      {isBestThird && (
                        <span className="text-[9px] font-bold text-blue-300 bg-blue-500/20 px-1 rounded">
                          3rd Adv
                        </span>
                      )}
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
      <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" /> Top 2 Advance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Best 3rd Advance
          </span>
        </div>
      </div>
    </motion.div>
  );
}
