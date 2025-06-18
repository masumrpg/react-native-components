import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Text,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import { ImageCarousel, useTheme } from 'rnc-theme';

const ImageCarouselScreen = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

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
      <ScrollView>
        <View style={styles.carouselContainer}>
          <Text style={styles.text}>Image Carousel Square</Text>
          <ImageCarousel data={data} autoPlay={true} pagination={true} />
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.text}>Image Carousel Landscape</Text>
          <ImageCarousel data={data2} autoPlay={true} pagination={true} />
        </View>

        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Fullscreen Landscape</Text>
          <ImageCarousel
            data={data2}
            fullscreen={true}
            pagination={true}
            paginationPosition="bottom"
            width={width}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </View>

        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>
            Fullscreen with Overlay Controls
          </Text>
          <ImageCarousel
            data={data2}
            fullscreen={true}
            pagination={true}
            paginationPosition="overlay"
            width={width}
            paginationStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            dotStyle={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
            activeDotStyle={{ backgroundColor: 'white' }}
          />
        </View>

        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Custom Styled Carousel</Text>
          <ImageCarousel
            data={data}
            pagination={true}
            paginationPosition="bottom"
            width={width - 32}
            containerStyle={{ marginHorizontal: 16 }}
            showControls={{
              arrows: true,
              counter: true,
              pagination: true,
            }}
            dotStyle={{
              backgroundColor: theme.colors.primary,
              width: 6,
              height: 6,
            }}
            activeDotStyle={{
              backgroundColor: theme.colors.primary,
              width: 20,
            }}
          />
        </View>

        <View style={[styles.carouselContainer, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>Mini Carousel</Text>
          <ImageCarousel
            data={data2}
            width={width * 0.5}
            height={150}
            pagination={true}
            autoPlay={true}
            autoPlayInterval={1500}
            imageStyle={{ borderRadius: theme.components.borderRadius.sm }}
          />
        </View>
      </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
    marginBottom: 16,
    marginTop: 16,
  },
  text: { textAlign: 'center', color: 'black', marginBottom: 10 },
  carouselContainer: {
    marginBottom: 20,
  },
});
