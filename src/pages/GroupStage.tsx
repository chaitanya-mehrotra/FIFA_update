import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { useStandings } from '../hooks/useStandings';
import GroupTable from '../components/team/GroupTable';

const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export default function GroupStage() {
  const { data: standings, isLoading } = useStandings();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <div className="w-10 h-10 border-4 border-fifa-gold border-t-transparent rounded-full animate-spin mb-4" />
        <p>Loading standings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-fifa-gold" />
          Group Stage
        </h1>
        <p className="text-gray-400 mt-1">12 groups of 4 teams each — Top 2 from each group advance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {groups.map((g, idx) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <GroupTable group={g} standings={standings ? standings[g] || [] : []} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
