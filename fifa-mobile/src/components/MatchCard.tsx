import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Match } from '../types';

interface MatchCardProps {
  match: Match;
  onPress?: (match: Match) => void;
}

export default function MatchCard({ match, onPress }: MatchCardProps) {
  const isFinished = match.status === 'finished';
  const isLive = match.status === 'live';

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => onPress && onPress(match)}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={styles.dateText}>
          {new Date(match.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </Text>
        <View style={[styles.statusBadge, isLive ? styles.liveBadge : isFinished ? styles.finishedBadge : styles.upcomingBadge]}>
          <Text style={styles.statusText}>
            {match.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.teamsContainer}>
        {/* Home Team */}
        <View style={styles.team}>
          {match.homeTeamId ? (
            <Image source={{ uri: `https://flagcdn.com/w80/${match.homeTeamId.toLowerCase()}.png` }} style={styles.flag} />
          ) : (
            <View style={styles.placeholderFlag} />
          )}
          <Text style={styles.teamName} numberOfLines={1}>
            {match.homeTeamId || match.homeTeamPlaceholder || 'TBD'}
          </Text>
        </View>

        {/* Score / Time */}
        <View style={styles.scoreContainer}>
          {isFinished || isLive ? (
            <Text style={styles.scoreText}>
              {match.homeScore ?? 0} - {match.awayScore ?? 0}
            </Text>
          ) : (
            <Text style={styles.timeText}>{match.localTime}</Text>
          )}
        </View>

        {/* Away Team */}
        <View style={styles.team}>
          {match.awayTeamId ? (
            <Image source={{ uri: `https://flagcdn.com/w80/${match.awayTeamId.toLowerCase()}.png` }} style={styles.flag} />
          ) : (
            <View style={styles.placeholderFlag} />
          )}
          <Text style={styles.teamName} numberOfLines={1}>
            {match.awayTeamId || match.awayTeamPlaceholder || 'TBD'}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.venueText}>{match.venue}</Text>
        <Text style={styles.stageText}>{match.stage.replace(/_/g, ' ').toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#102040',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveBadge: { backgroundColor: '#EF4444' },
  finishedBadge: { backgroundColor: '#374151' },
  upcomingBadge: { backgroundColor: '#D4AF37' },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#081426',
  },
  placeholderFlag: {
    width: 48,
    height: 32,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#374151',
  },
  teamName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 12,
  },
  venueText: {
    color: '#9CA3AF',
    fontSize: 11,
    flex: 1,
  },
  stageText: {
    color: '#D4AF37',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
