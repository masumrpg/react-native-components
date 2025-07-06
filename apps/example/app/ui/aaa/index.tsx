import { StyleSheet } from 'react-native';
import { useCuisines } from './useCuisines';
import { Box, SelectableTag, Title } from 'rnc-theme';

export default function App() {
  const { cuisines, toggleCuisine } = useCuisines();

  console.log(cuisines);


  return (
    <Box
      themed
      style={[
        styles.container,
      ]}
    >
      <Title style={{
        marginBottom: 24,
      }}>What are your favourite cuisines?</Title>
      <Box style={styles.listContainer}>
        {cuisines.map((cuisine) => {
          return (
            <SelectableTag
              key={cuisine.id}
              label={cuisine.name}
              checked={cuisine.selected}
              onPress={() => {
                toggleCuisine(cuisine.id);
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    paddingRight: 16,
  },
});
