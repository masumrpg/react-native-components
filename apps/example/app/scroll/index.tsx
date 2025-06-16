import React, { useState } from 'react';
import { View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  VScroll,
  HScroll,
  VList,
  HList,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  VStack,
  HStack,
  useThemedStyles,
  Theme,
  HideOnScrollResult,
} from 'rnc-theme';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Story {
  id: string;
  username: string;
  avatar: string;
  viewed: boolean;
}

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  unread: boolean;
}

// Sample data
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://picsum.photos/200',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://picsum.photos/201',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://picsum.photos/202',
    category: 'Sports',
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 149.99,
    image: 'https://picsum.photos/203',
    category: 'Home & Kitchen',
  },
  {
    id: '5',
    name: 'Backpack',
    price: 59.99,
    image: 'https://picsum.photos/204',
    category: 'Accessories',
  },
];

const stories: Story[] = [
  {
    id: '1',
    username: 'john_doe',
    avatar: 'https://picsum.photos/50',
    viewed: false,
  },
  {
    id: '2',
    username: 'jane_smith',
    avatar: 'https://picsum.photos/51',
    viewed: true,
  },
  {
    id: '3',
    username: 'mike_wilson',
    avatar: 'https://picsum.photos/54',
    viewed: false,
  },
  {
    id: '4',
    username: 'sara_parker',
    avatar: 'https://picsum.photos/55',
    viewed: true,
  },
  {
    id: '5',
    username: 'alex_brown',
    avatar: 'https://picsum.photos/56',
    viewed: false,
  },
];

const messages: Message[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: 'https://picsum.photos/52',
    },
    message: 'Hey, how are you?',
    timestamp: '2:30 PM',
    unread: true,
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatar: 'https://picsum.photos/53',
    },
    message: 'Meeting at 3?',
    timestamp: '1:45 PM',
    unread: false,
  },
  {
    id: '3',
    user: {
      name: 'Mike Wilson',
      avatar: 'https://picsum.photos/54',
    },
    message: 'Did you check the latest project updates?',
    timestamp: '1:15 PM',
    unread: true,
  },
  {
    id: '4',
    user: {
      name: 'Sarah Parker',
      avatar: 'https://picsum.photos/55',
    },
    message: 'The presentation looks great! Nice work!',
    timestamp: '12:30 PM',
    unread: false,
  },
  {
    id: '5',
    user: {
      name: 'Alex Brown',
      avatar: 'https://picsum.photos/56',
    },
    message: 'Lunch break in 10 minutes?',
    timestamp: '11:45 AM',
    unread: true,
  },
];

// FIXME bug VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.

const HEADER_HEIGHT = 100;

const ScrollScreen = () => {
  const styles = useThemedStyles(createStyles);
  const [hideOnScrollResult, setHideOnScrollResult] =
    useState<HideOnScrollResult | null>(null);

  return (
    <View style={styles.container}>
      {/* Animated Header with hideOnScroll integration */}
      <Animated.View style={[styles.header, hideOnScrollResult?.animatedStyle]}>
        <Box
          padding="md"
          backgroundColor="surface"
          style={styles.headerContent}
        >
          <Typography variant="h6" weight="600">
            Scroll Examples
          </Typography>
        </Box>
      </Animated.View>

      <VScroll
        style={styles.content}
        themed
        hideOnScroll={{
          height: HEADER_HEIGHT,
          duration: 300,
          threshold: 10,
          scrollDirection: 'down', // Hide when scrolling down
          hideDirection: 'up', // Hide header upward
          result: (value) => {
            setHideOnScrollResult(value);
            console.log('Scroll position:', value?.sharedScrollVertical.value);
          },
        }}
      >
        <VStack spacing="lg" padding="lg" style={{ paddingBottom: 150 }}>
          {/* Basic HScroll Example */}
          <Card>
            <CardHeader title="Basic Horizontal Scroll" />
            <CardContent>
              <HScroll backgroundColor="surface" padding="sm" borderRadius="md">
                <HStack spacing="sm">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Box
                      key={item}
                      width={100}
                      height={100}
                      backgroundColor="primary"
                      borderRadius="md"
                      padding="md"
                    >
                      <Typography color="white" align="center">
                        Item {item}
                      </Typography>
                    </Box>
                  ))}
                </HStack>
              </HScroll>
            </CardContent>
          </Card>

          {/* Stories Example (Instagram-like) */}
          <Card>
            <CardHeader title="Stories" subtitle="Instagram-like stories" />
            <CardContent>
              <HList
                data={stories}
                backgroundColor="surface"
                padding="xs"
                borderRadius="md"
                themed
                renderItem={({ item }) => (
                  <Box padding="xs">
                    <View style={styles.storyContainer}>
                      <View
                        style={[
                          styles.storyRing,
                          item.viewed && styles.storyRingViewed,
                        ]}
                      >
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.storyAvatar}
                        />
                      </View>
                      <Typography
                        variant="caption"
                        align="center"
                        style={styles.storyUsername}
                      >
                        {item.username}
                      </Typography>
                    </View>
                  </Box>
                )}
                keyExtractor={(item) => item.id}
              />
            </CardContent>
          </Card>

          {/* Product List Example */}
          <Card>
            <CardHeader
              title="Product List"
              subtitle="Horizontal scrolling products"
            />
            <CardContent>
              <HList
                hideOnScroll={{
                  result: (value) => {
                    console.log(
                      'Horizontal scroll position:',
                      value?.sharedScrollHorizontal.value
                    );
                  },
                  height: 200,
                }}
                data={products}
                backgroundColor="surface"
                padding="sm"
                borderRadius="lg"
                themed
                renderItem={({ item }) => (
                  <Box
                    width={200}
                    padding="sm"
                    margin="xs"
                    backgroundColor="surface"
                    borderRadius="lg"
                    style={styles.productCard}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImage}
                    />
                    <VStack spacing="xs" padding="sm">
                      <Typography variant="subtitle" weight="600">
                        {item.name}
                      </Typography>
                      <Typography variant="body" color="primary">
                        ${item.price}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.category}
                      </Typography>
                    </VStack>
                  </Box>
                )}
                keyExtractor={(item) => item.id}
              />
            </CardContent>
          </Card>

          {/* Messages List Example */}
          <Card>
            <CardHeader
              title="Messages"
              subtitle="Vertical scrolling messages"
            />
            <CardContent>
              <VList
                data={messages}
                backgroundColor="surface"
                borderRadius="md"
                themed
                renderItem={({ item }) => (
                  <Box
                    padding="md"
                    backgroundColor={item.unread ? 'background' : 'transparent'}
                    style={styles.messageContainer}
                  >
                    <HStack spacing="sm" align="center">
                      <Image
                        source={{ uri: item.user.avatar }}
                        style={styles.messageAvatar}
                      />
                      <VStack flex={1} spacing="xs">
                        <HStack justify="space-between" align="center">
                          <Typography variant="subtitle" weight="600">
                            {item.user.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {item.timestamp}
                          </Typography>
                        </HStack>
                        <Typography
                          variant="body"
                          color={item.unread ? 'text' : 'textSecondary'}
                          numberOfLines={1}
                        >
                          {item.message}
                        </Typography>
                      </VStack>
                    </HStack>
                  </Box>
                )}
                keyExtractor={(item) => item.id}
              />
            </CardContent>
          </Card>
        </VStack>
      </VScroll>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  } as const,
  header: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: theme.colors.background,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  } as const,
  headerContent: {
    height: HEADER_HEIGHT,
    justifyContent: 'center' as const,
  } as const,
  content: {
    flex: 1,
    paddingTop: 100, // Add margin to account for header height
  } as const,
  title: {
    textAlign: 'center' as const,
    marginBottom: theme.spacing.lg,
  } as const,
  storyContainer: {
    alignItems: 'center' as const,
    width: 80,
  } as const,
  storyRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    padding: 2,
  } as const,
  storyRingViewed: {
    borderColor: theme.colors.border,
  } as const,
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  } as const,
  storyUsername: {
    marginTop: 4,
    maxWidth: 80,
  } as const,
  productCard: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  } as const,
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: theme.components.borderRadius.md,
  } as const,
  messageContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  } as const,
  messageAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  } as const,
});

export default ScrollScreen;
