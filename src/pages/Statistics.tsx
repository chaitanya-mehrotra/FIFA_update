import { motion } from 'framer-motion';
import { BarChart3, Award, Target, Shield, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { useTeams } from '../hooks/useTeams';
import { useStatistics } from '../hooks/useStatistics';

const COLORS = ['#D4AF37', '#F2C94C', '#60A5FA', '#34D399', '#F87171', '#A78BFA', '#FB923C', '#38BDF8'];

export default function Statistics() {
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: statsData, isLoading: statsLoading } = useStatistics();

  const getTeam = (id: string) => teams?.find(t => t.id === id);

  if (teamsLoading || statsLoading || !statsData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading statistics...</p>
      </div>
    );
  }

  const { topScorers, teamStats, goalDistribution } = statsData;

  const topGoalTeams = [...teamStats].sort((a, b) => b.goalsScored - a.goalsScored).slice(0, 8).map(t => ({
    name: getTeam(t.teamId)?.code || t.teamId,
    goals: t.goalsScored,
  }));

  const goalDiffData = [...teamStats].sort((a, b) => (b.goalsScored - b.goalsConceded) - (a.goalsScored - a.goalsConceded)).slice(0, 8).map(t => ({
    name: getTeam(t.teamId)?.code || t.teamId,
    gd: t.goalsScored - t.goalsConceded,
  }));

  const cleanSheetData = teamStats.filter(t => t.cleanSheets > 0).sort((a, b) => b.cleanSheets - a.cleanSheets).map(t => ({
    name: getTeam(t.teamId)?.code || t.teamId,
    value: t.cleanSheets,
  }));

  const winsData = [...teamStats].sort((a, b) => b.wins - a.wins).slice(0, 8).map(t => ({
    name: getTeam(t.teamId)?.code || t.teamId,
    wins: t.wins,
    draws: t.draws,
    losses: t.losses,
  }));

  const customTooltipStyle = {
    backgroundColor: '#1A2238',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '12px',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-fifa-gold" />
          Statistics
        </h1>
        <p className="text-gray-400 mt-1">Tournament statistics and performance data</p>
      </div>

      {/* Top Scorers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        <div className="px-4 py-3 bg-gradient-to-r from-fifa-gold/20 to-transparent border-b border-white/10 flex items-center gap-2">
          <Award className="w-4 h-4 text-fifa-gold" />
          <h3 className="text-sm font-bold text-white">Top Scorers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] text-gray-400 uppercase tracking-wider">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Player</th>
                <th className="text-left py-3 px-4">Team</th>
                <th className="text-center py-3 px-4">⚽ Goals</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((player, idx) => {
                const team = getTeam(player.teamId);
                return (
                  <tr key={player.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`text-xs font-bold ${idx < 3 ? 'text-fifa-gold' : 'text-gray-400'}`}>{idx + 1}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-white">{player.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {team && (
                          <img src={`https://flagcdn.com/w40/${team.flag}.png`} alt={team.name} className="w-5 h-3.5 rounded object-cover" />
                        )}
                        <span className="text-gray-300">{team?.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4 font-bold text-white">{player.goals}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-fifa-gold" /> Team Goals Scored
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topGoalTeams}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="goals" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Goal Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-fifa-gold" /> Goal Distribution by Minute
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={goalDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="minute" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Line type="monotone" dataKey="goals" stroke="#D4AF37" strokeWidth={3} dot={{ fill: '#D4AF37', r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Goal Difference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-fifa-gold" /> Best Goal Difference
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={goalDiffData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="#9CA3AF" fontSize={11} />
              <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={11} width={40} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="gd" fill="#60A5FA" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Clean Sheets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-5"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-fifa-gold" /> Clean Sheets
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cleanSheetData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {cleanSheetData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Wins / Draws / Losses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5 lg:col-span-2"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-fifa-gold" /> Wins / Draws / Losses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} />
              <Tooltip contentStyle={customTooltipStyle} />
              <Bar dataKey="wins" stackId="a" fill="#34D399" radius={[0, 0, 0, 0]} name="Wins" />
              <Bar dataKey="draws" stackId="a" fill="#FBBF24" radius={[0, 0, 0, 0]} name="Draws" />
              <Bar dataKey="losses" stackId="a" fill="#F87171" radius={[4, 4, 0, 0]} name="Losses" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
