import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '../ThemeContext';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function CustomHeader() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const textColor = isLight ? 'black' : 'white';

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <FontAwesome name="ticket" size={24} color={textColor} style={{ marginRight: 5 }} />

      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: textColor,
        }}>
        Ticket
      </Text>

      <View
        style={{
          backgroundColor: 'orange',
          borderRadius: 3,
          paddingHorizontal: 4,
          paddingVertical: 0.1,
          marginLeft: 1,
        }}>
        <Text
          style={{
            backgroundColor: 'orange',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          hub
        </Text>
      </View>
    </View>
  );
}

function ThemedStack() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme === 'light' ? '#fff' : '#111' },
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
