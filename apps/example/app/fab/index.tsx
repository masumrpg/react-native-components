import { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Fab, FabVariant } from 'rnc-theme';
import { BicepsFlexed, Plus } from 'lucide-react-native';

export default function FabScreen() {
  const [fabVariant, setFabVariant] = useState<FabVariant>('single');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => setFabVariant('single')}
          style={styles.button}
        >
          <Text style={styles.text}>Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('clustered')}
          style={styles.button}
        >
          <Text style={styles.text}>Clustered</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('doted')}
          style={styles.button}
        >
          <Text style={styles.text}>Doted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('extended')}
          style={styles.button}
        >
          <Text style={styles.text}>Extended</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFabVariant('stacked')}
          style={styles.button}
        >
          <Text style={styles.text}>Stacked</Text>
        </TouchableOpacity>
      </ScrollView>

      {fabVariant === 'single' && (
        <Fab
          variant="single"
          icon={<Plus size={35} color={'white'} strokeWidth={2} />}
          onPress={() => console.log('Pressed')}
        />
      )}

      {fabVariant === 'clustered' && (
        <Fab
          variant="clustered"
          style={{
            backgroundColor: 'pink',
          }}
          items={[
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
          ]}
        />
      )}

      {fabVariant === 'doted' && (
        <Fab
          variant="doted"
          items={[
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
          ]}
        />
      )}

      {fabVariant === 'extended' && (
        <Fab
          variant="extended"
          style={{
            backgroundColor: 'pink',
          }}
          items={[
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
              label: 'Action 1',
            },
          ]}
        />
      )}

      {fabVariant === 'stacked' && (
        <Fab
          variant="stacked"
          items={[
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
            {
              icon: <BicepsFlexed size={30} color={'white'} />,
              onPress: () => console.log('Pressed'),
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
