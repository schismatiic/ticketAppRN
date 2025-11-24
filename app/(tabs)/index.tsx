import { ScrollView, Text, StyleSheet } from 'react-native';
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {events.map((e) => (
        <EventCard
          key={e._id}
          name={e.name}
          category={e.category}
          location={e.location}
          image={e.image}
          date={e.date}></EventCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: { alignItems: 'center' },
});
