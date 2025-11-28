import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="EventDetail"
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <FontAwesome name="ticket" size={24} color="black" />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Ticket<Text style={{ color: 'red' }}>App</Text>
              </Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
