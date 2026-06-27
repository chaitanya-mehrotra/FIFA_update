import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KnockoutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Knockout Bracket</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            The knockout bracket visualization requires horizontal panning and complex layout structures. 
            This screen will be populated once the group stage is finalized.
          </Text>
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
  content: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  placeholderContainer: {
    backgroundColor: '#102040',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  placeholderText: {
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 15,
  }
});
