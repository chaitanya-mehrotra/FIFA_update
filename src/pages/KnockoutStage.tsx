import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import { useFixtures } from '../hooks/useFixtures';
import { useTeams } from '../hooks/useTeams';
import { useStandings } from '../hooks/useStandings';
import { BracketColumn } from '../components/bracket/BracketColumn';
import { BracketMatch } from '../components/bracket/BracketMatch';
import { ChampionHighlight } from '../components/bracket/ChampionHighlight';
import { DebugReport } from '../components/bracket/DebugReport';
import { calculateQualification } from '../utils/qualification';

export default function KnockoutStage() {
  const { data: fixtures, isLoading: fixturesLoading } = useFixtures();
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: standings } = useStandings();

  const isLoading = fixturesLoading || teamsLoading;

  const qual = useMemo(() => {
    if (!standings) return null;
    return calculateQualification(standings);
  }, [standings]);

  const rounds = useMemo(() => {
    if (!fixtures) return { r32: [], r16: [], qf: [], sf: [], final: [], tp: [] };
    
    return {
      r32: fixtures.filter(m => m.stage === 'round_of_32'),
      r16: fixtures.filter(m => m.stage === 'round_of_16'),
      qf: fixtures.filter(m => m.stage === 'quarter_final'),
      sf: fixtures.filter(m => m.stage === 'semi_final'),
      final: fixtures.filter(m => m.stage === 'final'),
      tp: fixtures.filter(m => m.stage === 'third_place')
    };
  }, [fixtures]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <div className="w-12 h-12 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-lg font-medium tracking-wide">Loading Tournament Bracket...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 pb-16"
    >
      <div>
        <h1 className="text-4xl font-black text-white flex items-center gap-4 mb-2">
          <GitBranch className="w-10 h-10 text-fifa-gold drop-shadow-md" />
          Knockout Stage
        </h1>
        <p className="text-gray-400 text-lg">The road to glory in the FIFA World Cup 2026™</p>
      </div>

      {/* Champion Highlight (if final is finished) */}
      {rounds.final[0] && <ChampionHighlight finalMatch={rounds.final[0]} teams={teams || []} />}

      {/* Main Bracket Container */}
      <div className="relative w-full overflow-x-auto pb-10 custom-scrollbar scroll-smooth">
        <div 
          className="flex min-w-max px-6 py-12 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/5 shadow-2xl relative"
          style={{ minHeight: '800px' }} // Ensures enough vertical space for spacing out matches
        >
          {/* Background watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
             <GitBranch className="w-[800px] h-[800px] text-white" />
          </div>

          <BracketColumn title="Round of 32" matches={rounds.r32} teams={teams || []} hasNextColumn={true} qual={qual} />
          <BracketColumn title="Round of 16" matches={rounds.r16} teams={teams || []} hasNextColumn={true} qual={qual} />
          <BracketColumn title="Quarter Finals" matches={rounds.qf} teams={teams || []} hasNextColumn={true} qual={qual} />
          <BracketColumn title="Semi Finals" matches={rounds.sf} teams={teams || []} hasNextColumn={true} qual={qual} />
          <BracketColumn title="Final" matches={rounds.final} teams={teams || []} hasNextColumn={false} isFinal={true} qual={qual} />
        </div>
      </div>

      {/* Third Place Match (Standalone) */}
      {rounds.tp.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-3 rounded-full bg-black/30 border border-white/10 mb-8">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-[0.2em]">Third Place Play-off</h3>
          </div>
          <div className="flex justify-center">
            <BracketMatch match={rounds.tp[0]} teams={teams || []} isFinal={false} qual={qual} />
          </div>
        </motion.div>
      )}

      {/* Qualification Debug Report */}
      <DebugReport qual={qual} />

    </motion.div>
  );
}
