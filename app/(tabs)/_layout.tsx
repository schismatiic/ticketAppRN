import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Header
        tabBarActiveTintColor: 'black',
        headerTitleAlign: 'center',
        headerTitle: () => (
          // Esto es para darle estilos al logo
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <FontAwesome name="ticket" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Ticket
              <Text style={{ color: 'red' }}>App</Text>
            </Text>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
