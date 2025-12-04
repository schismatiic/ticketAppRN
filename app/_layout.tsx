import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function CustomHeader() {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <FontAwesome name="ticket" size={24} color={theme === 'light' ? 'black' : 'white'} />
      <Text
        style={{ fontSize: 20, fontWeight: 'bold', color: theme === 'light' ? 'black' : 'white' }}>
        Ticket<Text style={{ color: 'red' }}>App</Text>
      </Text>
    </View>
  );
}

function ThemedStack() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme === 'light' ? '#fff' : '#000' },
        headerTitleAlign: 'center',
        headerTitle: () => <CustomHeader />,
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="EventDetail" />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
