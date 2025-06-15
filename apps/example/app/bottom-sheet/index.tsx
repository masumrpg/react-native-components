import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useBottomSheet } from 'rnc-theme';

const SAMPLE_DATA = [
  { id: '1', title: 'Item 1', description: 'Description for item 1' },
  { id: '2', title: 'Item 2', description: 'Description for item 2' },
  { id: '3', title: 'Item 3', description: 'Description for item 3' },
  { id: '4', title: 'Item 4', description: 'Description for item 4' },
  { id: '5', title: 'Item 5', description: 'Description for item 5' },
  { id: '6', title: 'Item 6', description: 'Description for item 6' },
  { id: '7', title: 'Item 7', description: 'Description for item 7' },
  { id: '8', title: 'Item 8', description: 'Description for item 8' },
  { id: '9', title: 'Item 9', description: 'Description for item 9' },
  { id: '10', title: 'Item 10', description: 'Description for item 10' },
];

export default function BottomSheetScreen() {
  const {
    expand,
    close,
    setContent,
    setSheetTitle,
    setVariant,
    setListData,
    setRenderItem,
    setMaxTo,
  } = useBottomSheet<(typeof SAMPLE_DATA)[0]>();

  // Example usage
  const showScrollExample = () => {
    setMaxTo('95%');
    setVariant('scroll');
    setSheetTitle('Scroll Example');
    setContent(
      <View>
        <Text style={styles.description}>
          This is an example of the bottom sheet with ScrollView. You can add
          any content here.
        </Text>
        <Button title="Close" onPress={close} />
      </View>
    );
    expand('30%');
  };

  // Example of showing a FlatList bottom sheet
  const showFlatListExample = () => {
    setMaxTo('70%');
    setVariant('flatlist');
    setSheetTitle('FlatList Example');

    // Set the content for the header section
    setContent(
      <View style={styles.headerContent}>
        <Text style={styles.description}>
          This is an example of the bottom sheet with FlatList. Below is a list
          of items:
        </Text>
      </View>
    );

    // Set the data for the FlatList
    setListData(SAMPLE_DATA);

    // Set the renderItem function for the FlatList
    setRenderItem(({ item }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          // Example of what happens when an item is pressed
          setVariant('scroll');
          setSheetTitle(`Details for ${item.title}`);
          setContent(
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.moreText}>
                Here you can show more details about the selected item. This
                demonstrates how you can transition between flatlist and scroll
                variants.
              </Text>
              <Button title="Back to List" onPress={showFlatListExample} />
              <Button title="Close" onPress={close} />
            </View>
          );
          expand('80%'); // You can also change the height when showing details
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.description}</Text>
      </TouchableOpacity>
    ));

    expand('50%');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showScrollExample}>
        <Text style={styles.buttonText}>Show Scroll Example</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <TouchableOpacity style={styles.button} onPress={showFlatListExample}>
        <Text style={styles.buttonText}>Show FlatList Example</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  spacer: {
    height: 20,
  },
  headerContent: {
    marginBottom: 10,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  moreText: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
