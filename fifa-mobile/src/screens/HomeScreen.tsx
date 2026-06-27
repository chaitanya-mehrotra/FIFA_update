import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchCard from '../components/MatchCard';
import { officialFixtures } from '../data/official_fixtures';
import type { Match } from '../types';

export default function HomeScreen({ navigation }: any) {
  // Get the first 3 upcoming matches
  const upcomingMatches = officialFixtures
    .filter(m => m.status === 'upcoming')
    .slice(0, 3);

  // Get the first 3 live or finished matches
  const pastMatches = officialFixtures
    .filter(m => m.status === 'finished' || m.status === 'live')
    .slice(-3);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.title}>FIFA World Cup</Text>
          <Text style={styles.subtitle}>2026™ Tournament Platform</Text>
        </View>

        {/* Live / Past Matches */}
        {pastMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Latest Results</Text>
            </View>
            {pastMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </View>
        )}

        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Matches</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Fixtures')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081426',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAll: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
});
