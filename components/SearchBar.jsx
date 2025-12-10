import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

export function SearchBar({ onSearch, setEvents }) {
  const [data, setData] = React.useState('');
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handledata = () => {
    setEvents([]);
    console.log('[DEBUG]: Borramos la lista');
    onSearch({ q: data });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar eventos..."
        placeholderTextColor={theme === 'light' ? '#666' : '#aaa'}
        returnKeyType="search"
        onSubmitEditing={handledata}
        value={data}
        onChangeText={setData}
      />

      <Pressable style={styles.boton} onPress={handledata}>
        <MaterialIcons name="search" size={21} color={styles.icon.color} />
      </Pressable>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    input: {
      flex: 1,
      height: 45,
      borderWidth: 1,
      borderColor: theme === 'light' ? '#ccc' : '#555',
      backgroundColor: theme === 'light' ? '#fff' : '#222',
      color: theme === 'light' ? '#000' : '#fff',
      paddingHorizontal: 10,
      borderRadius: 25,
    },
    boton: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: theme === 'light' ? '#ddd' : '#444',
      borderRadius: 25,
    },
    botonText: {
      fontWeight: 'bold',
      color: theme === 'light' ? '#000' : '#fff',
    },
    icon: {
      color: theme === 'light' ? '#000' : '#e5e5e5',
    },
  });
