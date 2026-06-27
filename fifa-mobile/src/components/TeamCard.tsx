import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import type { Team } from '../types';

interface TeamCardProps {
  team: Team;
  onPress?: (team: Team) => void;
}

export default function TeamCard({ team, onPress }: TeamCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => onPress && onPress(team)}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: `https://flagcdn.com/w80/${team.id.toLowerCase()}.png` }} 
          style={styles.flag} 
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{team.name}</Text>
          <Text style={styles.code}>{team.id}</Text>
        </View>
        <View style={styles.rankingBadge}>
          <Text style={styles.rankingText}>#{team.ranking}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Coach</Text>
          <Text style={styles.detailValue}>{team.coach}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Confederation</Text>
          <Text style={styles.detailValue}>{team.confederation}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#102040',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: '#081426',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  code: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  rankingBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankingText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  }
});
