import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Goal, Shield, Flame } from 'lucide-react-native';

export default function StatisticsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Tournament Stats</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Golden Boot Mockup */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Goal color="#D4AF37" size={24} />
            <Text style={styles.statTitle}>Golden Boot</Text>
          </View>
          <View style={styles.leaderboard}>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>1</Text>
              <Text style={styles.playerName}>K. Mbappé</Text>
              <Text style={styles.statValue}>5 Goals</Text>
            </View>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>2</Text>
              <Text style={styles.playerName}>H. Kane</Text>
              <Text style={styles.statValue}>4 Goals</Text>
            </View>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>3</Text>
              <Text style={styles.playerName}>V. Osimhen</Text>
              <Text style={styles.statValue}>4 Goals</Text>
            </View>
          </View>
        </View>

        {/* Top Assists */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Flame color="#D4AF37" size={24} />
            <Text style={styles.statTitle}>Top Assists</Text>
          </View>
          <View style={styles.leaderboard}>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>1</Text>
              <Text style={styles.playerName}>K. De Bruyne</Text>
              <Text style={styles.statValue}>4 Assists</Text>
            </View>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>2</Text>
              <Text style={styles.playerName}>L. Messi</Text>
              <Text style={styles.statValue}>3 Assists</Text>
            </View>
          </View>
        </View>

        {/* Clean Sheets */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Shield color="#D4AF37" size={24} />
            <Text style={styles.statTitle}>Clean Sheets</Text>
          </View>
          <View style={styles.leaderboard}>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>1</Text>
              <Text style={styles.playerName}>Alisson</Text>
              <Text style={styles.statValue}>3 CS</Text>
            </View>
            <View style={styles.leaderRow}>
              <Text style={styles.rank}>2</Text>
              <Text style={styles.playerName}>G. Donnarumma</Text>
              <Text style={styles.statValue}>2 CS</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081426',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  statCard: {
    backgroundColor: '#102040',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 12,
  },
  statTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  leaderboard: {
    marginTop: 4,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rank: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: 'bold',
    width: 24,
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  statValue: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  }
});
