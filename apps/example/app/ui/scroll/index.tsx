import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
  HScroll,
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
  useTheme,
  Button,
  ButtonIcon,
  ToggleMode,
  AnimatedVScroll,
  useScrollToHide,
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

// FIXME bug VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.

const HEADER_HEIGHT = 100;

const ScrollScreen = () => {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const { onScroll, headerTranslateY } = useScrollToHide();

  // State untuk infinite scroll
  const [infiniteProducts, setInfiniteProducts] = useState<Product[]>(
    products.slice(0, 3)
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

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

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
    };
  });

  return (
    <Box style={styles.container}>
      {/* Animated Header with hideOnScroll integration */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <HStack
          justify="space-between"
          padding="md"
          backgroundColor={theme.colors.surface}
          style={styles.headerContent}
        >
          <Button variant="ghost" onPress={() => router.back()}>
            <ButtonIcon icon={<ArrowLeft color={theme.colors.text} />} />
          </Button>
          <Typography variant="h6" weight="600">
            Scroll Examples
          </Typography>
          <ToggleMode styleType="ghost" />
        </HStack>
      </Animated.View>

      <AnimatedVScroll style={styles.content} themed onScroll={onScroll}>
        <VStack spacing="lg" padding="lg" style={{ paddingBottom: 150 }}>
          {/* Basic HScroll Example */}
          <Card>
            <CardHeader title="Basic Horizontal Scroll" />
            <CardContent>
              <HScroll backgroundColor="surface" padding="sm" borderRadius="md">
                <HStack spacing="sm">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((item) => (
                    <Box
                      key={item}
                      width={100}
                      height={100}
                      backgroundColor={theme.colors.primary}
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
                    <Box style={styles.storyContainer}>
                      <Box
                        style={[
                          styles.storyRing,
                          item.viewed && styles.storyRingViewed,
                        ]}
                      >
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.storyAvatar}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        style={styles.storyUsername}
                      >
                        {item.username}
                      </Typography>
                    </Box>
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
                      <Typography variant="body">${item.price}</Typography>
                      <Typography variant="caption">{item.category}</Typography>
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
        </VStack>
      </AnimatedVScroll>
    </Box>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      position: 'absolute',
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
    },
    headerContent: {
      height: HEADER_HEIGHT,
    },
    content: {
      flex: 1,
      paddingTop: 100, // Add margin to account for header height
    },
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing.lg,
    },
    storyContainer: {
      alignItems: 'center',
      width: 80,
    },
    storyRing: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      padding: 2,
    },
    storyRingViewed: {
      borderColor: theme.colors.border,
    },
    storyAvatar: {
      width: '100%',
      height: '100%',
      borderRadius: 30,
    },
    storyUsername: {
      marginTop: 4,
      maxWidth: 80,
    },
    productCard: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    productImage: {
      width: '100%',
      height: 150,
      borderRadius: theme.components.borderRadius.md,
    },
    messageContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    messageAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
  });

export default ScrollScreen;
