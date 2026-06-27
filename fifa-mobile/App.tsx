import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TabNavigator from './src/navigation/TabNavigator';

// Create a client
const queryClient = new QueryClient();

const FIFATheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#D4AF37',
    background: '#081426',
    card: '#102040',
    text: '#ffffff',
    border: '#102040',
    notification: '#D4AF37',
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={FIFATheme}>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
