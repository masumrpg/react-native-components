/* eslint-disable */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  useBottomSheet,
  Card,
  CardContent,
  CardHeader,
  Button,
  ButtonText,
  Typography,
  Box,
} from 'rnc-theme';
import { MaterialIcons } from '@expo/vector-icons';

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

// Real-world example data - Updated to match expected structure
const PRODUCTS = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    name: 'Wireless Headphones',
    price: '$199.99',
    rating: 4.5,
    reviews: 128,
    image: '🎧',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    name: 'Smart Watch',
    price: '$299.99',
    rating: 4.3,
    reviews: 89,
    image: '⌚',
    category: 'Wearables',
    inStock: true,
  },
  {
    id: '3',
    title: 'Laptop Stand',
    description: 'Ergonomic laptop stand for better posture',
    name: 'Laptop Stand',
    price: '$49.99',
    rating: 4.7,
    reviews: 203,
    image: '💻',
    category: 'Accessories',
    inStock: false,
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Message',
    description: 'You have received a new message from John',
    message: 'You have received a new message from John',
    time: '2 min ago',
    type: 'message',
    icon: 'message',
    read: false,
  },
  {
    id: '2',
    title: 'Order Shipped',
    description: 'Your order #12345 has been shipped',
    message: 'Your order #12345 has been shipped',
    time: '1 hour ago',
    type: 'order',
    icon: 'local-shipping',
    read: false,
  },
  {
    id: '3',
    title: 'Payment Successful',
    description: 'Payment of $99.99 was processed successfully',
    message: 'Payment of $99.99 was processed successfully',
    time: '3 hours ago',
    type: 'payment',
    icon: 'payment',
    read: true,
  },
];

interface Product {
  id: string;
  title: string;
  description: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
}

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

interface Notification {
  id: string;
  title: string;
  description: string;
  message: string;
  time: string;
  type: string;
  icon: MaterialIconName;
  read: boolean;
}

const BottomSheetScreen: React.FC = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(NOTIFICATIONS);

  const {
    expand,
    close,
    setContent,
    setSheetTitle,
    setVariant,
    setMaxTo,
    setListData,
    setRenderItem,
  } = useBottomSheet();

  // Example of showing a simple bottom sheet
  const showSimpleExample = () => {
    setMaxTo('50%');
    setVariant('scroll');
    setSheetTitle('Simple Example');
    setContent(
      <View>
        <Text style={styles.description}>
          This is a simple example of the bottom sheet component. You can put
          any content here!
        </Text>
        <Button onPress={close}>
          <ButtonText>Close</ButtonText>
        </Button>
      </View>
    );
    expand('30%');
  };

  // Example of showing a bottom sheet with custom title
  const showCustomTitleExample = () => {
    setMaxTo('60%');
    setVariant('scroll');
    setSheetTitle(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginRight: 8 }}>🎉</Text>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Custom Title</Text>
      </View>
    );
    setContent(
      <View>
        <Text style={styles.description}>
          This is an example with custom ReactNode title!
        </Text>
        <Button onPress={close}>
          <ButtonText>Close</ButtonText>
        </Button>
      </View>
    );
    expand('30%');
  };

  // Example of showing a FlatList bottom sheet
  const showFlatListExample = () => {
    setMaxTo('70%');
    setVariant('flatlist');
    setSheetTitle(
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 8 }}>📝</Text>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>Item List</Text>
        </View>
        <Text style={{ fontSize: 12, color: '#666' }}>
          Select an item below
        </Text>
      </View>
    );

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
          setSheetTitle(
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>ℹ️</Text>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>
                {item.title}
              </Text>
            </View>
          );
          setContent(
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.moreText}>
                Here you can show more details about the selected item. This
                demonstrates how you can transition between flatlist and scroll
                variants.
              </Text>
              <Button onPress={showFlatListExample}>
                <ButtonText>Back to List</ButtonText>
              </Button>
              <Button onPress={close}>
                <ButtonText>Close</ButtonText>
              </Button>
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

  // Product Catalog Example
  const showProductCatalog = () => {
    setMaxTo('90%');
    setVariant('scroll');
    setSheetTitle(
      <View style={{ alignItems: 'center' }}>
        <Typography variant="h6">Featured Products</Typography>
        <Typography variant="caption" color="textSecondary">
          Discover our latest collection
        </Typography>
      </View>
    );

    setContent(
      <View style={{ padding: 16 }}>
        {PRODUCTS.map((product) => (
          <Card key={product.id} style={{ marginBottom: 16 }}>
            <CardContent>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 40, marginRight: 12 }}>
                  {product.image}
                </Text>
                <View style={{ flex: 1 }}>
                  <Typography variant="subtitle" style={{ fontWeight: '600' }}>
                    {product.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {product.category}
                  </Typography>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}
                  >
                    <MaterialIcons name="star" size={16} color="#FFD700" />
                    <Typography variant="caption" style={{ marginLeft: 2 }}>
                      {product.rating}
                    </Typography>
                    <Typography variant="caption">
                      {' '}
                      ({product.reviews} reviews)
                    </Typography>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Typography variant="subtitle" style={{ fontWeight: '600' }}>
                    {product.price}
                  </Typography>
                  <View
                    style={{
                      backgroundColor: product.inStock ? '#E8F5E8' : '#FFE8E8',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      marginTop: 4,
                    }}
                  >
                    <Typography
                      variant="caption"
                      style={{
                        color: product.inStock ? '#2E7D32' : '#C62828',
                        fontSize: 10,
                      }}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  gap: 8,
                }}
              >
                <Button
                  style={{ flex: 1 }}
                  variant={product.inStock ? 'primary' : 'outline'}
                  disabled={!product.inStock}
                  onPress={() => addToCart(product)}
                >
                  <ButtonText variant={product.inStock ? 'primary' : 'outline'}>
                    {product.inStock ? 'Add to Cart' : 'Notify Me'}
                  </ButtonText>
                </Button>
                <Button variant="outline" onPress={() => viewProduct(product)}>
                  <ButtonText variant="outline">View Details</ButtonText>
                </Button>
              </View>
            </CardContent>
          </Card>
        ))}
        <View style={{ marginTop: 16 }}>
          <Button onPress={close}>
            <ButtonText>Close</ButtonText>
          </Button>
        </View>
      </View>
    );
    expand('60%');
  };

  // Notification Center Example
  const showNotificationCenter = () => {
    setMaxTo('80%');
    setVariant('scroll');
    setSheetTitle(
      <View style={{ alignItems: 'center' }}>
        <Typography variant="subtitle">Recent Activity</Typography>
        <View
          style={{
            backgroundColor: '#E3F2FD',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 16,
            marginTop: 4,
          }}
        >
          <Typography variant="caption" color="textSecondary">
            {notifications.filter((n) => !n.read).length} unread
          </Typography>
        </View>
      </View>
    );

    setContent(
      <View style={{ padding: 16 }}>
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            style={{
              marginBottom: 12,
              backgroundColor: notification.read ? '#FAFAFA' : '#FFF',
              borderLeftWidth: 3,
              borderLeftColor: getNotificationColor(notification.type),
            }}
          >
            <CardContent>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View
                  style={{
                    backgroundColor: getNotificationColor(notification.type),
                    padding: 8,
                    borderRadius: 20,
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons
                    name={notification.icon}
                    size={16}
                    color="white"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="subtitle">
                      {notification.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      style={{
                        color: notification.read ? '#999' : '#666',
                      }}
                    >
                      {notification.time}
                    </Typography>
                  </View>
                  <Typography variant="body">{notification.message}</Typography>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      style={{ alignSelf: 'flex-start', marginTop: 8 }}
                      onPress={() => markAsRead(notification.id)}
                    >
                      <ButtonText variant="ghost" size="sm">
                        Mark as read
                      </ButtonText>
                    </Button>
                  )}
                </View>
              </View>
            </CardContent>
          </Card>
        ))}
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            marginTop: 16,
          }}
        >
          <Button
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => {
              setNotifications((prev) =>
                prev.map((n) => ({ ...n, read: true }))
              );
            }}
          >
            <ButtonText variant="outline">Mark All Read</ButtonText>
          </Button>
          <Button variant="primary" style={{ flex: 1 }} onPress={close}>
            <ButtonText variant="primary">Close</ButtonText>
          </Button>
        </View>
      </View>
    );
    expand('70%');
  };

  const addToCart = (product: Product) => {
    console.log('Product', product);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return '#2196F3';
      case 'order':
        return '#FF9800';
      case 'payment':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const viewProduct = (product: Product) => {
    setVariant('scroll');
    setSheetTitle(
      <View style={{ alignItems: 'center' }}>
        <Typography variant="subtitle">{product.title}</Typography>
        <Typography variant="caption" color="textSecondary">
          Product Details
        </Typography>
      </View>
    );

    setContent(
      <View style={{ padding: 16 }}>
        <Card>
          <CardContent>
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Text style={{ fontSize: 80, marginBottom: 8 }}>
                {product.image}
              </Text>
              <Typography variant="title">{product.title}</Typography>
              <Typography variant="body">{product.description}</Typography>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <View>
                <Typography variant="caption" color="textSecondary">
                  Price
                </Typography>
                <Typography variant="subtitle">{product.price}</Typography>
              </View>
              <View>
                <Typography variant="caption" color="textSecondary">
                  Rating
                </Typography>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Typography variant="caption">{product.rating}</Typography>
                </View>
              </View>
              <View>
                <Typography variant="caption" color="textSecondary">
                  Reviews
                </Typography>
                <Typography variant="caption">{product.reviews}</Typography>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}
            >
              <Button
                variant="primary"
                style={{ flex: 1 }}
                disabled={!product.inStock}
                onPress={() => addToCart(product)}
              >
                <ButtonText variant="primary">
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </ButtonText>
              </Button>
              <Button variant="outline" onPress={showProductCatalog}>
                <ButtonText variant="outline">Back to Catalog</ButtonText>
              </Button>
            </View>
          </CardContent>
        </Card>
        <View style={{ marginTop: 16 }}>
          <Button onPress={close}>
            <ButtonText>Close</ButtonText>
          </Button>
        </View>
      </View>
    );
    expand('80%');
  };

  return (
    <Box themed style={styles.container}>
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Typography variant="subtitle">Basic Examples</Typography>
        </CardHeader>
        <CardContent>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={showSimpleExample}>
              <ButtonText>Simple Example</ButtonText>
            </Button>
            <Button style={styles.button} onPress={showCustomTitleExample}>
              <ButtonText>Custom Title</ButtonText>
            </Button>
            <Button style={styles.button} onPress={showFlatListExample}>
              <ButtonText>FlatList Example</ButtonText>
            </Button>
          </View>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Typography variant="subtitle">Real-World Examples</Typography>
        </CardHeader>
        <CardContent>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={showProductCatalog}>
              <ButtonText>Product Catalog</ButtonText>
            </Button>
            <Button style={styles.button} onPress={showNotificationCenter}>
              <ButtonText>Notification Center</ButtonText>
            </Button>
          </View>
        </CardContent>
      </Card>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 10,
  },
  headerContent: {
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  moreText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default BottomSheetScreen;
