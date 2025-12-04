import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { useTheme } from '../../ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();

  // Colores según tema
  const isLight = theme === 'light';
  const textColor = isLight ? 'black' : 'white';
  const headerBg = isLight ? 'white' : '#111';
  const tabBg = isLight ? 'white' : '#111';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: textColor,
        tabBarStyle: {
          backgroundColor: tabBg,
          borderTopColor: isLight ? '#ddd' : '#333',
        },

        headerStyle: {
          backgroundColor: headerBg,
        },
        headerTitleAlign: 'center',

        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <FontAwesome name="ticket" size={24} color={textColor} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor }}>
              Ticket<Text style={{ color: 'red' }}>App</Text>
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
