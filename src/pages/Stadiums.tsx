import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stadiums, Stadium } from '../data/stadiums';
import { officialFixtures } from '../data/official_fixtures';
import StadiumMap from '../components/stadiums/StadiumMap';
import StadiumCard from '../components/stadiums/StadiumCard';
import StadiumFilters from '../components/stadiums/StadiumFilters';
import { MapPin } from 'lucide-react';

export default function Stadiums() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);

  // Filter stadiums based on criteria
  const filteredStadiums = useMemo(() => {
    return stadiums.filter(stadium => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !stadium.name.toLowerCase().includes(query) &&
          !stadium.city.toLowerCase().includes(query) &&
          !stadium.country.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // 2. Country Filter
      if (activeCountry && stadium.country !== activeCountry) {
        return false;
      }

      // 3. Stage Filter
      if (activeStage) {
        // Find matches for this stadium
        const stadiumMatches = officialFixtures.filter(match => 
          stadium.keywords.some(keyword => match.venue.includes(keyword))
        );

        if (activeStage === 'group') {
          if (!stadiumMatches.some(m => m.stage === 'group')) return false;
        } else if (activeStage === 'knockout') {
          const koStages = ['round_of_32', 'round_of_16', 'quarter_final', 'semi_final', 'third_place'];
          if (!stadiumMatches.some(m => koStages.includes(m.stage))) return false;
        } else if (activeStage === 'final') {
          if (!stadiumMatches.some(m => m.stage === 'final')) return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeCountry, activeStage]);

  // Auto-close selected stadium if it doesn't match filters
  React.useEffect(() => {
    if (selectedStadium && !filteredStadiums.find(s => s.id === selectedStadium.id)) {
      setSelectedStadium(null);
    }
  }, [filteredStadiums, selectedStadium]);

  // Get matches for selected stadium
  const selectedStadiumMatches = useMemo(() => {
    if (!selectedStadium) return [];
    return officialFixtures.filter(match => 
      selectedStadium.keywords.some(keyword => match.venue.includes(keyword))
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [selectedStadium]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] min-h-[800px] w-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
          <MapPin className="w-8 h-8 mr-3 text-[#C49E59]" />
          Host Stadiums
        </h1>
        <p className="text-gray-400 text-lg">
          Explore the iconic venues across the USA, Canada, and Mexico that will host the FIFA World Cup 2026™.
        </p>
      </div>

      <div className="shrink-0">
        <StadiumFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCountry={activeCountry}
          setActiveCountry={setActiveCountry}
          activeStage={activeStage}
          setActiveStage={setActiveStage}
        />
      </div>

      <div className="flex-1 relative flex flex-col md:flex-row gap-6 pb-6 min-h-0">
        {/* Map Area */}
        <div className={`transition-all duration-500 ease-in-out h-full ${selectedStadium ? 'w-full md:w-2/3' : 'w-full'}`}>
          <StadiumMap 
            stadiums={filteredStadiums}
            selectedStadium={selectedStadium}
            onSelectStadium={setSelectedStadium}
          />
        </div>

        {/* Selected Stadium Overlay / Sidebar */}
        <AnimatePresence>
          {selectedStadium && (
            <motion.div 
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 'auto' }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="md:w-1/3 md:max-w-md absolute md:relative inset-x-4 md:inset-auto bottom-4 md:bottom-auto z-[1000] md:z-auto h-auto max-h-[85vh] md:max-h-full flex shadow-2xl rounded-2xl"
            >
              <div className="w-full bg-black/40 rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl pointer-events-auto">
                 <StadiumCard 
                   stadium={selectedStadium} 
                   matches={selectedStadiumMatches}
                   onClose={() => setSelectedStadium(null)}
                 />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
