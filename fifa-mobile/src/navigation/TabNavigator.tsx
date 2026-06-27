import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CalendarDays, Trophy, BarChart2, Users } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import FixturesScreen from '../screens/FixturesScreen';
import TeamsScreen from '../screens/TeamsScreen';
import { View, Text, StyleSheet } from 'react-native';

// Placeholder screens for remaining tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const KnockoutScreen = () => <PlaceholderScreen title="Knockout Screen" />;
const StatisticsScreen = () => <PlaceholderScreen title="Statistics Screen" />;

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#081426',
          borderBottomWidth: 1,
          borderBottomColor: '#102040',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#081426',
          borderTopWidth: 1,
          borderTopColor: '#102040',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#D4AF37', // Gold
        tabBarInactiveTintColor: '#9CA3AF', // Gray
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Fixtures" 
        component={FixturesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Knockout" 
        component={KnockoutScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Statistics" 
        component={StatisticsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Teams" 
        component={TeamsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081426',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
