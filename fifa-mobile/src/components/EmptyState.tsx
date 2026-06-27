import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

interface EmptyStateProps {
  message?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  message = 'No data available.',
  icon = <AlertCircle color="#9CA3AF" size={48} />
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    marginTop: 16,
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
  },
});
