import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import useLoad from '@/useHooks/useLoad';
import { useTheme } from '../../ThemeContext';
import BuyCard from 'components/BuyCard';

export default function History() {
  const { theme } = useTheme();
  const data = useLoad();
  const styles = getStyles(theme);

  console.log(data);
  return (
    <ScrollView style={styles.container}>
      {data && data.map((id) => <BuyCard key={id} _id={id} />)}
    </ScrollView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
  });
