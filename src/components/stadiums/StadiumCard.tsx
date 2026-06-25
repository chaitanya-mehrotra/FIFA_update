import React from 'react';
import { motion } from 'framer-motion';
import { Stadium } from '../../data/stadiums';
import { Match } from '../../types';
import { MapPin, Users, CalendarDays, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StadiumCardProps {
  stadium: Stadium;
  matches: Match[];
  onClose?: () => void;
}

const getFlag = (country: string) => {
  if (country === 'USA') return '🇺🇸';
  if (country === 'Canada') return '🇨🇦';
  if (country === 'Mexico') return '🇲🇽';
  return '🏳️';
};

const formatStage = (stage: string) => {
  if (stage === 'group') return 'Group Stage';
  if (stage === 'round_of_32') return 'Round of 32';
  if (stage === 'round_of_16') return 'Round of 16';
  if (stage === 'quarter_final') return 'Quarter Final';
  if (stage === 'semi_final') return 'Semi Final';
  if (stage === 'final') return 'Final';
  if (stage === 'third_place') return 'Third Place';
  return stage;
};

export default function StadiumCard({ stadium, matches, onClose }: StadiumCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
    >
      {/* Header Image */}
      <div className="relative h-48 sm:h-56 w-full flex-shrink-0">
        <img 
          src={stadium.image} 
          alt={stadium.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-md">
            {stadium.name}
          </h2>
          <div className="flex items-center text-gray-200 text-sm">
            <MapPin className="w-4 h-4 mr-1 text-[#C49E59]" />
            {stadium.city}, {stadium.country} {getFlag(stadium.country)}
          </div>
        </div>
      </div>

      <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center text-gray-400 text-xs mb-1 uppercase tracking-wider">
              <Users className="w-3 h-3 mr-1" /> Capacity
            </div>
            <div className="text-lg font-semibold text-white">
              {stadium.capacity.toLocaleString()}
            </div>
            {/* Capacity Meter */}
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#C49E59] h-full rounded-full" 
                style={{ width: `${Math.min((stadium.capacity / 90000) * 100, 100)}%` }} 
              />
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center text-gray-400 text-xs mb-1 uppercase tracking-wider">
              <CalendarDays className="w-3 h-3 mr-1" /> Matches Hosted
            </div>
            <div className="text-lg font-semibold text-white">
              {matches.length}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            {stadium.description}
          </p>
        </div>

        {/* Upcoming Matches */}
        <div>
          <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 mb-3">
            Scheduled Matches
          </h3>
          {matches.length > 0 ? (
            <div className="space-y-2">
              {matches.map(match => (
                <div key={match.id} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition group">
                  <div>
                    <div className="text-xs text-[#C49E59] font-medium mb-1">
                      {formatStage(match.stage)}
                    </div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>{match.homeTeamId || 'TBD'}</span>
                      <span className="text-gray-500 text-xs">vs</span>
                      <span>{match.awayTeamId || 'TBD'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">
                      {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {match.localTime} Local
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 text-sm py-4 text-center bg-white/5 rounded-lg">
              No matches scheduled yet.
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
        <Link 
          to="/fixtures" 
          className="w-full bg-[#185399] hover:bg-[#1a5da8] text-white flex items-center justify-center py-3 rounded-xl transition shadow-lg font-medium group"
        >
          View All Fixtures 
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
