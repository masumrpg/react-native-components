import React, { useState } from 'react';
import { View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  VScroll,
  HScroll,
  HList,
  DraggableList,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  VStack,
  HStack,
  useThemedStyles,
  useTheme,
  Theme,
  HideOnScrollResult,
  DragItem,
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

interface Task extends DragItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
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
  {
    id: '6',
    name: 'Digital Camera',
    price: 599.99,
    image: 'https://picsum.photos/205',
    category: 'Electronics',
  },
  {
    id: '7',
    name: 'Yoga Mat',
    price: 29.99,
    image: 'https://picsum.photos/206',
    category: 'Sports',
  },
  {
    id: '8',
    name: 'Air Fryer',
    price: 129.99,
    image: 'https://picsum.photos/207',
    category: 'Home & Kitchen',
  },
  {
    id: '9',
    name: 'Sunglasses',
    price: 79.99,
    image: 'https://picsum.photos/208',
    category: 'Accessories',
  },
  {
    id: '10',
    name: 'Gaming Console',
    price: 499.99,
    image: 'https://picsum.photos/209',
    category: 'Electronics',
  },
  {
    id: '11',
    name: 'Bluetooth Speaker',
    price: 89.99,
    image: 'https://picsum.photos/210',
    category: 'Electronics',
  },
  {
    id: '12',
    name: 'Tennis Racket',
    price: 159.99,
    image: 'https://picsum.photos/211',
    category: 'Sports',
  },
  {
    id: '13',
    name: 'Blender',
    price: 69.99,
    image: 'https://picsum.photos/212',
    category: 'Home & Kitchen',
  },
  {
    id: '14',
    name: 'Leather Wallet',
    price: 49.99,
    image: 'https://picsum.photos/213',
    category: 'Accessories',
  },
  {
    id: '15',
    name: 'Tablet',
    price: 399.99,
    image: 'https://picsum.photos/214',
    category: 'Electronics',
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

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new UI components',
    description: 'Create reusable components for the design system',
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Check and approve pending code reviews',
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Add examples and improve API documentation',
    priority: 'low',
    completed: true,
  },
  {
    id: '4',
    title: 'Fix responsive layout',
    description: 'Ensure components work on all screen sizes',
    priority: 'high',
    completed: false,
  },
  {
    id: '5',
    title: 'Optimize performance',
    description: 'Reduce bundle size and improve loading times',
    priority: 'medium',
    completed: false,
  },
];

// FIXME bug VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.

const HEADER_HEIGHT = 100;

const ScrollScreen = () => {
  const styles = useThemedStyles(createStyles);
  const { theme } = useTheme();
  const [hideOnScrollResult, setHideOnScrollResult] =
    useState<HideOnScrollResult | null>(null);

  // State untuk infinite scroll
  const [infiniteProducts, setInfiniteProducts] = useState<Product[]>(
    products.slice(0, 3)
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // State untuk draggable list
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const loadMoreProducts = () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);

    // Simulasi API call
    setTimeout(() => {
      const currentLength = infiniteProducts.length;
      const newProducts = products.slice(currentLength, currentLength + 2);

      if (newProducts.length > 0) {
        setInfiniteProducts((prev) => [...prev, ...newProducts]);
      } else {
        setHasMoreProducts(false);
      }

      setIsLoadingMore(false);
    }, 1000);
  };

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
          scrollDirection: 'down',
          hideDirection: 'up',
          result: (value) => {
            setHideOnScrollResult(value);
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
                      <Typography color="white">Item {item}</Typography>
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

          {/* Product List dengan Infinite Scroll */}
          <Card>
            <CardHeader
              title="Product List (Infinite Scroll)"
              subtitle="Horizontal scrolling dengan infinite loading"
            />
            <CardContent>
              <HList
                data={infiniteProducts}
                backgroundColor="surface"
                padding="sm"
                borderRadius="lg"
                themed
                infiniteScroll={{
                  onLoadMore: loadMoreProducts,
                  loading: isLoadingMore,
                  hasMore: hasMoreProducts,
                  threshold: 0.8,
                }}
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
                ListFooterComponent={
                  isLoadingMore ? (
                    <Box padding="md">
                      <Typography variant="caption" color="textSecondary">
                        Loading more products...
                      </Typography>
                    </Box>
                  ) : !hasMoreProducts ? (
                    <Box padding="md">
                      <Typography variant="caption" color="textSecondary">
                        No more products
                      </Typography>
                    </Box>
                  ) : null
                }
              />
            </CardContent>
          </Card>

          {/* Draggable Task List */}
          <Card>
            <CardHeader
              title="Draggable Task List"
              subtitle="Drag and drop to reorder tasks"
            />
            <CardContent>
              <DraggableList
                data={tasks}
                keyExtractor={(item) => item.id}
                onDragEnd={(newTasks) => setTasks(newTasks)}
                itemHeight={80}
                backgroundColor="surface"
                borderRadius="md"
                themed
                style={{ marginTop: 16 }}
                renderItem={({ item, isDragging }) => {
                  const priorityColor = {
                    high: 'error',
                    medium: 'warning',
                    low: 'success',
                  }[item.priority] as keyof Theme['colors'];

                  return (
                    <Box
                      padding="md"
                      margin="sm"
                      backgroundColor={isDragging ? 'primary' : 'surface'}
                      borderRadius="md"
                      style={{
                        borderLeftWidth: 4,
                        borderLeftColor: theme.colors[priorityColor],
                        opacity: isDragging ? 0.9 : 1,
                        transform: [{ scale: isDragging ? 1.02 : 1 }],
                      }}
                    >
                      <HStack spacing="md" style={{ alignItems: 'center' }}>
                        <VStack spacing="xs" style={{ flex: 1 }}>
                          <Typography
                            variant="subtitle"
                            weight="600"
                            color={isDragging ? 'white' : 'text'}
                            style={{
                              textDecorationLine: item.completed
                                ? 'line-through'
                                : 'none',
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={isDragging ? 'white' : 'textSecondary'}
                          >
                            {item.description}
                          </Typography>
                        </VStack>
                        <Box
                          padding="xs"
                          backgroundColor={priorityColor}
                          borderRadius="sm"
                        >
                          <Typography
                            variant="caption"
                            color="white"
                            weight="600"
                          >
                            {item.priority.toUpperCase()}
                          </Typography>
                        </Box>
                      </HStack>
                    </Box>
                  );
                }}
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
