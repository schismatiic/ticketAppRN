import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import React from 'react';

export function SearchBar({ onSearch, setEvents }) {
  const [data, setData] = React.useState('');

  const handledata = () => {
    setEvents([]);
    console.log('[DEBUG]: BOrramos la lista');
    onSearch({ q: data });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar eventos..."
        value={data}
        onChangeText={(t) => setData(t)}
      />

      <Pressable style={styles.boton} onPress={handledata}>
        <Text style={styles.botonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  boton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  botonText: {
    fontWeight: 'bold',
  },
});
