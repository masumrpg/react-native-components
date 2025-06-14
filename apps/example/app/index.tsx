import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Href, Link } from 'expo-router';
import {
  Badge,
  BookPlus,
  CardSim,
  CheckSquare,
  Circle,
  CircleUser,
  GitPullRequestClosedIcon,
  LayoutDashboard,
  LetterText,
  List,
  ListCollapse,
  Loader,
  Minus,
  Palette,
  ParkingCircleOff,
  PictureInPicture2,
  SlidersHorizontal,
  Table,
  TextCursorInput,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react-native';
import { ReactElement } from 'react';

type LibraryItem = {
  id: number;
  title: string;
  path: Href;
  icon: ReactElement;
};

export default function HomeScreen() {
  const listLibrary: LibraryItem[] = [
    {
      id: 1,
      title: 'Theme',
      path: '/theme',
      icon: <Palette size={30} color={'black'} />,
    },
    {
      id: 2,
      title: 'Card',
      path: '/card',
      icon: <CardSim size={30} color={'black'} />,
    },
    {
      id: 3,
      title: 'Button',
      path: '/button',
      icon: <GitPullRequestClosedIcon size={30} color={'black'} />,
    },
    {
      id: 4,
      title: 'Typography',
      path: '/typography',
      icon: <LetterText size={30} color={'black'} />,
    },
    {
      id: 5,
      title: 'Input',
      path: '/input',
      icon: <TextCursorInput size={30} color={'black'} />,
    },
    {
      id: 6,
      title: 'Layout',
      path: '/layout',
      icon: <LayoutDashboard size={30} color={'black'} />,
    },
    {
      id: 7,
      title: 'Badge',
      path: '/badge',
      icon: <Badge size={30} color={'black'} />,
    },
    {
      id: 8,
      title: 'Spiner',
      path: '/spiner',
      icon: <Loader size={30} color={'black'} />,
    },
    {
      id: 9,
      title: 'Table',
      path: '/table',
      icon: <Table size={30} color={'black'} />,
    },
    {
      id: 10,
      title: 'Progress',
      path: '/progress',
      icon: <ParkingCircleOff size={30} color={'black'} />,
    },
    {
      id: 11,
      title: 'Divider',
      path: '/divider',
      icon: <Minus size={30} color={'black'} />,
    },
    {
      id: 12,
      title: 'Checkbox',
      path: '/checkbox',
      icon: <CheckSquare size={30} color={'black'} />,
    },
    {
      id: 13,
      title: 'Switcher',
      path: '/switcher',
      icon: <ToggleLeft size={30} color={'black'} />,
    },
    {
      id: 14,
      title: 'Radio',
      path: '/radio',
      icon: <Circle size={30} color={'black'} />,
    },
    {
      id: 15,
      title: 'Slider',
      path: '/slider',
      icon: <SlidersHorizontal size={30} color={'black'} />,
    },
    {
      id: 16,
      title: 'Avatar',
      path: '/avatar',
      icon: <CircleUser size={30} color={'black'} />,
    },
    {
      id: 17,
      title: 'Modal',
      path: '/modal',
      icon: <PictureInPicture2 size={30} color={'black'} />,
    },
    {
      id: 18,
      title: 'Form Control',
      path: '/form-control',
      icon: <BookPlus size={30} color={'black'} />,
    },
    {
      id: 19,
      title: 'Combobox',
      path: '/combobox',
      icon: <List size={30} color={'black'} />,
    },
    {
      id: 20,
      title: 'Toggle',
      path: '/toggle',
      icon: <ToggleRight size={30} color={'black'} />,
    },
    {
      id: 21,
      title: 'Accordion',
      path: '/accordion',
      icon: <ListCollapse size={30} color={'black'} />,
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.gridContainer}>
          {listLibrary
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item) => (
              <Link href={item.path} key={item.id} asChild>
                <TouchableOpacity style={styles.gridItem}>
                  {item.icon}
                  <Text style={styles.gridItemText}>{item.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: Dimensions.get('window').width / 2 - 24,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItemText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
