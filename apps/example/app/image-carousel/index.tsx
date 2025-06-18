import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
} from 'react-native';
import React from 'react';
import { ImageCarousel } from 'rnc-theme';

const ImageCarouselScreen = () => {
  const data = [
    {
      image: require('../../assets/images/products/image-product-1.jpg'),
    },
    {
      image: require('../../assets/images/products/image-product-2.jpg'),
    },
    {
      image: require('../../assets/images/products/image-product-3.jpg'),
    },
    {
      image: require('../../assets/images/products/image-product-4.jpg'),
    },
  ];
  const data2 = [
    {
      image: require('../../assets/images/products/image-product-1-landscape.jpg'),
    },
    {
      image: require('../../assets/images/products/image-product-2-landscape.jpg'),
    },
    {
      image: require('../../assets/images/products/image-product-3-landscape.jpg'),
    },
    {
      image: require('../../assets/images/products/image-product-4-landscape.jpg'),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.carouselContainer}>
        <Text style={styles.text}>Image Carousel Square</Text>
        <ImageCarousel data={data} autoPlay={true} pagination={true} />
      </View>
      <View style={styles.carouselContainer}>
        <Text style={styles.text}>Image Carousel Landscape</Text>
        <ImageCarousel data={data2} autoPlay={true} pagination={true} />
      </View>
    </SafeAreaView>
  );
};

export default ImageCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'white',
  },
  text: { textAlign: 'center', color: 'black', marginBottom: 10 },
  carouselContainer: {
    marginBottom: 20,
  },
});
