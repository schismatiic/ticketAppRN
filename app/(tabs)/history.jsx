import { View, Text } from 'react-native';
import useLoad from '@/useHooks/useLoad';

export default function History() {
  const data = useLoad();
  console.log(data);
  return (
    <View>
      <Text>History</Text>
      {data && Object.keys(data).map((key, index) => <Text key={index}>{data[key]}</Text>)}
    </View>
  );
}
