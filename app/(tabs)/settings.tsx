import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../ThemeContext';
import useClear from '@/useHooks/useClear';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  const clear = useClear();

  const items = [
    {
      id: 1,
      label: `Cambiar a ${theme === 'light' ? 'oscuro' : 'claro'}`,
      action: toggleTheme,
      icon: 'brightness-6',
    },
    { id: 2, label: 'Limpiar historial', action: clear, icon: 'delete' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Configuración</Text>
      </View>

      {items.map((item, idx) => (
        <Pressable
          key={item.id}
          style={[styles.listItem, idx === items.length - 1 && styles.lastItem]}
          onPress={item.action}>
          <MaterialIcons
            name={item.icon}
            size={24}
            color={theme === 'light' ? 'black' : 'white'}
            style={styles.icon}
          />
          <Text style={styles.listText}>{item.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      backgroundColor: theme === 'light' ? '#fff' : '#000000e5',
      paddingTop: 20,
    },

    headerWrapper: {
      alignItems: 'center',
      marginBottom: 15,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme === 'light' ? 'black' : 'white',
      paddingBottom: 4,
      width: '60%',
      textAlign: 'center',
    },

    listItem: {
      width: '100%',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#ccc' : '#444',
      flexDirection: 'row',
      alignItems: 'center',
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    listText: {
      color: theme === 'light' ? 'black' : 'white',
      fontSize: 16,
      marginLeft: 10,
    },
    icon: {
      marginRight: 10,
    },
  });
