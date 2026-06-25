import React from 'react';
import { Search, Filter, Map } from 'lucide-react';

interface StadiumFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCountry: string | null;
  setActiveCountry: (country: string | null) => void;
  activeStage: string | null;
  setActiveStage: (stage: string | null) => void;
}

export default function StadiumFilters({
  searchQuery,
  setSearchQuery,
  activeCountry,
  setActiveCountry,
  activeStage,
  setActiveStage
}: StadiumFiltersProps) {
  
  const countries = ['USA', 'Canada', 'Mexico'];
  const stages = [
    { id: 'group', label: 'Group Stage' },
    { id: 'knockout', label: 'Knockout Stage' },
    { id: 'final', label: 'Final Venue' }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C49E59] focus:border-transparent transition"
            placeholder="Search by stadium, city, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Country Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center text-sm text-gray-400 mr-2">
            <Map className="w-4 h-4 mr-1" /> Country:
          </div>
          <button
            onClick={() => setActiveCountry(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeCountry === null 
                ? 'bg-[#185399] text-white shadow-md' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            All
          </button>
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center ${
                activeCountry === country 
                  ? 'bg-[#185399] text-white shadow-md' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Filters */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center text-sm text-gray-400 mr-2">
          <Filter className="w-4 h-4 mr-1" /> Filter by matches:
        </div>
        <button
          onClick={() => setActiveStage(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeStage === null 
              ? 'bg-[#C49E59] text-white shadow-md' 
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
          }`}
        >
          Any Matches
        </button>
        {stages.map(stage => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeStage === stage.id 
                ? 'bg-[#C49E59] text-white shadow-md' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            {stage.label}
          </button>
        ))}
      </div>
    </div>
  );
}
