import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import MatchCard from '../components/MatchCard';
import EmptyState from '../components/EmptyState';
import { officialFixtures } from '../data/official_fixtures';

export default function FixturesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMatches = officialFixtures.filter(match => {
    const query = searchQuery.toLowerCase();
    const homeTeam = (match.homeTeamId || match.homeTeamPlaceholder || '').toLowerCase();
    const awayTeam = (match.awayTeamId || match.awayTeamPlaceholder || '').toLowerCase();
    const venue = match.venue.toLowerCase();
    return homeTeam.includes(query) || awayTeam.includes(query) || venue.includes(query);
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Fixtures</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#9CA3AF" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search teams or venues..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState message="No fixtures found matching your search." />}
        initialNumToRender={10}
        windowSize={5}
      />
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
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#102040',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#FFFFFF',
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  }
});
