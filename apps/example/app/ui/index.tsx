import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Href, Link } from 'expo-router';
import {
  Badge,
  Bell,
  BookPlus,
  CardSim,
  CheckSquare,
  Circle,
  CircleUser,
  GalleryThumbnails,
  GitPullRequestClosedIcon,
  Info,
  Layers2,
  LayoutDashboard,
  LetterText,
  List,
  ListCollapse,
  Loader,
  Minus,
  Palette,
  ParkingCircleOff,
  PictureInPicture2,
  Plus,
  ScrollText,
  SlidersHorizontal,
  Star,
  Table,
  TextCursorInput,
  ToggleLeft,
  ToggleRight,
  User,
  Calendar,
  CalendarDays,
  Languages,
  Images,
} from 'lucide-react-native';
import { ReactElement } from 'react';
import { Card, Typography, useTheme } from 'rnc-theme';
import { StatusBar } from 'expo-status-bar';

type LibraryItem = {
  id: number;
  title: string;
  path: Href;
  icon: ReactElement;
};

export default function HomeScreen() {
  const { theme, isDark } = useTheme();

  const listLibrary: LibraryItem[] = [
    {
      id: 1,
      title: 'Manual Theme',
      path: '/ui/manual-theme',
      icon: <Images size={30} color={theme.colors.text} />,
    },
    {
      id: 2,
      title: 'Card',
      path: '/ui/card',
      icon: <CardSim size={30} color={theme.colors.text} />,
    },
    {
      id: 3,
      title: 'Button',
      path: '/ui/button',
      icon: <GitPullRequestClosedIcon size={30} color={theme.colors.text} />,
    },
    {
      id: 4,
      title: 'Typography',
      path: '/ui/typography',
      icon: <LetterText size={30} color={theme.colors.text} />,
    },
    {
      id: 5,
      title: 'Input',
      path: '/ui/input',
      icon: <TextCursorInput size={30} color={theme.colors.text} />,
    },
    {
      id: 6,
      title: 'Layout',
      path: '/ui/layout',
      icon: <LayoutDashboard size={30} color={theme.colors.text} />,
    },
    {
      id: 7,
      title: 'Badge',
      path: '/ui/badge',
      icon: <Badge size={30} color={theme.colors.text} />,
    },
    {
      id: 8,
      title: 'Spiner',
      path: '/ui/spiner',
      icon: <Loader size={30} color={theme.colors.text} />,
    },
    {
      id: 9,
      title: 'Table',
      path: '/ui/table',
      icon: <Table size={30} color={theme.colors.text} />,
    },
    {
      id: 10,
      title: 'Progress',
      path: '/ui/progress',
      icon: <ParkingCircleOff size={30} color={theme.colors.text} />,
    },
    {
      id: 11,
      title: 'Divider',
      path: '/ui/divider',
      icon: <Minus size={30} color={theme.colors.text} />,
    },
    {
      id: 12,
      title: 'Checkbox',
      path: '/ui/checkbox',
      icon: <CheckSquare size={30} color={theme.colors.text} />,
    },
    {
      id: 13,
      title: 'Switcher',
      path: '/ui/switcher',
      icon: <ToggleLeft size={30} color={theme.colors.text} />,
    },
    {
      id: 14,
      title: 'Radio',
      path: '/ui/radio',
      icon: <Circle size={30} color={theme.colors.text} />,
    },
    {
      id: 15,
      title: 'Slider',
      path: '/ui/slider',
      icon: <SlidersHorizontal size={30} color={theme.colors.text} />,
    },
    {
      id: 16,
      title: 'Avatar',
      path: '/ui/avatar',
      icon: <CircleUser size={30} color={theme.colors.text} />,
    },
    {
      id: 17,
      title: 'Modal',
      path: '/ui/modal',
      icon: <PictureInPicture2 size={30} color={theme.colors.text} />,
    },
    {
      id: 18,
      title: 'Form Control',
      path: '/ui/form-control',
      icon: <BookPlus size={30} color={theme.colors.text} />,
    },
    {
      id: 19,
      title: 'Combobox',
      path: '/ui/combobox',
      icon: <List size={30} color={theme.colors.text} />,
    },
    {
      id: 20,
      title: 'Toggle',
      path: '/ui/toggle',
      icon: <ToggleRight size={30} color={theme.colors.text} />,
    },
    {
      id: 21,
      title: 'Accordion',
      path: '/ui/accordion',
      icon: <ListCollapse size={30} color={theme.colors.text} />,
    },
    {
      id: 22,
      title: 'Fab',
      path: '/ui/fab',
      icon: <Plus size={30} color={theme.colors.text} />,
    },
    {
      id: 23,
      title: 'Bottom Sheet',
      path: '/ui/bottom-sheet',
      icon: <Layers2 size={30} color={theme.colors.text} />,
    },
    {
      id: 24,
      title: 'Scroll',
      path: '/ui/scroll',
      icon: <ScrollText size={30} color={theme.colors.text} />,
    },
    {
      id: 25,
      title: 'Skeleton',
      path: '/ui/skeleton',
      icon: <User size={30} color={theme.colors.text} />,
    },
    {
      id: 26,
      title: 'Toast',
      path: '/ui/toast',
      icon: <Bell size={30} color={theme.colors.text} />,
    },
    {
      id: 27,
      title: 'Tooltip',
      path: '/ui/tooltip',
      icon: <Info size={30} color={theme.colors.text} />,
    },
    {
      id: 28,
      title: 'Image Carousel',
      path: '/ui/image-carousel',
      icon: <GalleryThumbnails size={30} color={theme.colors.text} />,
    },
    {
      id: 29,
      title: 'Rating',
      path: '/ui/rating',
      icon: <Star size={30} color={theme.colors.text} />,
    },
    {
      id: 30,
      title: 'Calendar',
      path: '/ui/calendar',
      icon: <Calendar size={30} color={theme.colors.text} />,
    },
    {
      id: 31,
      title: 'Date Picker',
      path: '/ui/date-picker',
      icon: <CalendarDays size={30} color={theme.colors.text} />,
    },
    {
      id: 32,
      title: 'Language',
      path: '/ui/i18n',
      icon: <Languages size={30} color={theme.colors.text} />,
    },
    {
      id: 33,
      title: 'Theme Manager',
      path: '/ui/theme-manager',
      icon: <Palette size={30} color={theme.colors.text} />,
    },
  ];

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <FlatList
        data={listLibrary.sort((a, b) => a.title.localeCompare(b.title))}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        renderItem={({ item }) => (
          <Link href={item.path} asChild>
            <Pressable>
              <Card style={styles.listItem}>
                {item.icon}
                <Typography>{item.title}</Typography>
              </Card>
            </Pressable>
          </Link>
        )}
        showsVerticalScrollIndicator={true}
      />
    </>
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
  listItem: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  listItemText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});
