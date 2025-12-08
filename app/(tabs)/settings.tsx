import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeContext';
import useClear from '@/useHooks/useClear';
export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  const clear = useClear();
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={clear}>
        <Text style={styles.buttonText}>Limpiar Historial</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
    button: {
      padding: 14,
      borderRadius: 8,
      backgroundColor: theme === 'light' ? 'black' : 'white',
    },
    buttonText: {
      color: theme === 'light' ? 'white' : 'black',
      fontWeight: 'bold',
    },
  });
