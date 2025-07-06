import { StyleSheet } from 'react-native';
import {
  Box,
  ItemSelectTag,
  SelectableTag,
  SelectableTagContainerList,
  Title,
  useItemSelectTag,
  VScroll,
} from 'rnc-theme';

const dummyItems: ItemSelectTag[] = [
  { id: 1, name: 'K-pop', selected: false },
  { id: 2, name: 'K-drama', selected: false },
  { id: 3, name: 'Variety Show', selected: false },
  { id: 4, name: 'Webtoon', selected: false },
  { id: 5, name: 'Fashion', selected: false },
  { id: 6, name: 'Beauty', selected: false },
  { id: 7, name: 'Dance Cover', selected: false },
  { id: 8, name: 'Fanart', selected: false },
  { id: 9, name: 'Idol News', selected: false },
  { id: 10, name: 'Fandom Culture', selected: false },
  { id: 11, name: 'Korean Food', selected: false },
  { id: 12, name: 'K-pop Edits', selected: false },
  { id: 13, name: 'Reaction Videos', selected: false },
  { id: 14, name: 'Behind The Scene', selected: false },
  { id: 15, name: 'OST & Soundtrack', selected: false },
  { id: 16, name: 'Lightsticks', selected: false },
  { id: 17, name: 'Albums & Photocards', selected: false },
  { id: 18, name: 'Korean Language', selected: false },
  { id: 19, name: 'Comeback Schedule', selected: false },
  { id: 20, name: 'Fanmeet & Concert', selected: false },
];

export default function SelectableTagScreen() {
  const { items, toggleItems } = useItemSelectTag(dummyItems);

  console.log(items);

  return (
    <VScroll themed style={[styles.container]}>
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
    </VScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
