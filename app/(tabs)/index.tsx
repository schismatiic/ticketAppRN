import { View, Text, StyleSheet } from 'react-native';
import EventCard from 'components/EventCard';
import { useGetEvents } from '@/useHooks/useEvents';
import { useEffect } from 'react';

export default function Tab() {
  const { getEvents, data, isLoading, error } = useGetEvents(); // hay que modificar el hook para el lazy scrolling

  const events = data?.data || [];

  useEffect(() => {
    getEvents({ limit: 20 });
  }, []);

  console.log(events);
  return (
    <View style={styles.container}>
      <EventCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
