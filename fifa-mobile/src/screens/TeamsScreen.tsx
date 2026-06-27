import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import TeamCard from '../components/TeamCard';
import EmptyState from '../components/EmptyState';
import { teamMetadata } from '../data/teams';
import type { Team } from '../types';

export default function TeamsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const teamsArray: Team[] = Object.entries(teamMetadata).map(([id, data]) => ({
    id,
    name: id, // Needs mapping to full name in reality
    code: id,
    ...data,
    group: '',
    flag: id.toLowerCase()
  }));

  // Sort by ranking
  teamsArray.sort((a, b) => a.ranking - b.ranking);

  const filteredTeams = teamsArray.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Participating Teams</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#9CA3AF" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search teams..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TeamCard team={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyState message="No teams found matching your search." />}
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
