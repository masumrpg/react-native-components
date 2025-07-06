import { StyleSheet } from 'react-native';
import {
  Box,
  ItemSelectTag,
  SelectableTag,
  SelectableTagContainerList,
  Title,
  useItemSelectTag,
} from 'rnc-theme';

const dummyItems: ItemSelectTag[] = [
  { id: 1, name: 'K-pop', selected: false },
  { id: 2, name: 'K-drama', selected: false },
  { id: 3, name: 'Variety Show', selected: false },
  { id: 4, name: 'Webtoon', selected: false },
  { id: 5, name: 'Fashion', selected: false },
  { id: 6, name: 'Beauty', selected: false },
];

export default function SelectableTagScreen() {
  const { items, toggleItems } = useItemSelectTag(dummyItems);

  console.log(items);

  return (
    <Box themed style={[styles.container]}>
      <Title
        style={{
          marginBottom: 24,
        }}
      >
        Selectable Tag Example?
      </Title>
      <SelectableTagContainerList>
        {items.map((item) => {
          return (
            <SelectableTag
              key={item.id}
              label={item.name}
              checked={item.selected}
              onPress={() => {
                toggleItems(item.id);
              }}
            />
          );
        })}
      </SelectableTagContainerList>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
