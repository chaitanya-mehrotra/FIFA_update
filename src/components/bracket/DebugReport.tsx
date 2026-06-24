import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, ChevronDown, ChevronUp } from 'lucide-react';
import { QualificationResult } from '../../utils/qualification';

interface Props {
  qual: QualificationResult | null;
}

export function DebugReport({ qual }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!qual) return null;

  const getTeamsByStatus = (status: string) => {
    return Object.entries(qual.teamStatus)
      .filter(([_, s]) => s === status)
      .map(([id]) => id);
  };

  const winners = getTeamsByStatus('WINNER');
  const runnersUp = getTeamsByStatus('RUNNER_UP');
  const qualified = getTeamsByStatus('QUALIFIED');
  const eliminated = getTeamsByStatus('ELIMINATED');
  const tbd = getTeamsByStatus('TBD');

  const totalConfirmed = winners.length + runnersUp.length + qualified.length;

  return (
    <div className="mt-16 border border-white/10 rounded-xl overflow-hidden bg-black/40">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 text-fifa-gold">
          <Bug className="w-5 h-5" />
          <h3 className="font-bold tracking-wider">Qualification Debug Report</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-sm">
              
              <div>
                <h4 className="text-green-400 font-bold mb-3 border-b border-white/10 pb-2">Group Winners ({winners.length})</h4>
                <ul className="space-y-1 text-gray-300">
                  {winners.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-blue-400 font-bold mb-3 border-b border-white/10 pb-2">Runners-Up ({runnersUp.length})</h4>
                <ul className="space-y-1 text-gray-300">
                  {runnersUp.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-fifa-gold font-bold mb-3 border-b border-white/10 pb-2">Qualified ({qualified.length})</h4>
                <ul className="space-y-1 text-gray-300">
                  {qualified.map(t => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-400 font-bold mb-3 border-b border-white/10 pb-2">Not Yet Confirmed ({tbd.length})</h4>
                <div className="text-gray-300 flex flex-wrap gap-1">
                  {tbd.map(t => (
                    <span key={t} className="bg-white/5 px-2 py-0.5 rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-red-400 font-bold mb-3 border-b border-white/10 pb-2">Eliminated ({eliminated.length})</h4>
                <div className="text-gray-300 flex flex-wrap gap-1">
                  {eliminated.map(t => (
                    <span key={t} className="bg-white/5 px-2 py-0.5 rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
               <div className="flex items-center gap-2 mb-2">
                 <span className={`w-3 h-3 rounded-full ${totalConfirmed === 32 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                 <span className="text-gray-300 text-sm">Total Confirmed Qualifiers: {totalConfirmed} / 32</span>
               </div>
               {totalConfirmed !== 32 && (
                 <p className="text-yellow-400 text-xs mt-1">INFO: Waiting for groups to finish or math to confirm remaining slots. Slots without confirmed teams will show as TBD.</p>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
