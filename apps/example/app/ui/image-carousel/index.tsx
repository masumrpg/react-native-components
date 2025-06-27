import {
  StyleSheet,
  Platform,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import { Box, ImageCarousel, Typography, useTheme, VScroll } from 'rnc-theme';

const ImageCarouselScreen = () => {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();

  const data = [
    {
      image: {
        uri: 'https://picsum.photos/seed/product1/800/800',
      },
    },
    {
      image: {
        uri: 'https://picsum.photos/seed/product2/800/800',
      },
    },
    {
      image: {
        uri: 'https://picsum.photos/seed/product3/800/800',
      },
    },
    {
      image: {
        uri: 'https://picsum.photos/seed/product4/800/800',
      },
    },
  ];

  const data2 = [
    {
      image: {
        uri: 'https://picsum.photos/seed/product1/1200/800',
      },
    },
    {
      image: {
        uri: 'https://picsum.photos/seed/product2/1200/800',
      },
    },
    {
      image: {
        uri: 'https://picsum.photos/seed/product3/1200/800',
      },
    },
    {
      image: {
        uri: 'https://picsum.photos/seed/product4/1200/800',
      },
    },
  ];

  return (
    <Box themed style={[styles.container, { paddingVertical: 16 }]}>
      <VScroll>
        <Box style={styles.carouselContainer}>
          <Typography style={styles.sectionTitle}>
            Image Carousel Square
          </Typography>
          <ImageCarousel data={data} autoPlay={true} pagination={true} />
        </Box>
        <Box style={styles.carouselContainer}>
          <Typography style={styles.sectionTitle}>
            Image Carousel Landscape
          </Typography>
          <ImageCarousel data={data2} autoPlay={true} pagination={true} />
        </Box>

        <Box style={styles.carouselContainer}>
          <Typography style={styles.sectionTitle}>
            Fullscreen Landscape
          </Typography>
          <ImageCarousel
            data={data2}
            fullscreen={true}
            pagination={true}
            paginationPosition="bottom"
            width={width}
            autoPlay={true}
            autoPlayInterval={5000}
          />
        </Box>

        <Box style={styles.carouselContainer}>
          <Typography style={styles.sectionTitle}>
            Fullscreen with Overlay Controls
          </Typography>
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
        </Box>

        <Box style={styles.carouselContainer}>
          <Typography style={styles.sectionTitle}>
            Custom Styled Carousel
          </Typography>
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
        </Box>

        <Box style={[styles.carouselContainer, { marginBottom: 30 }]}>
          <Typography style={styles.sectionTitle}>Mini Carousel</Typography>
          <ImageCarousel
            data={data2}
            width={width * 0.5}
            height={150}
            pagination={true}
            autoPlay={true}
            autoPlayInterval={1500}
            imageStyle={{ borderRadius: theme.components.borderRadius.sm }}
          />
        </Box>
      </VScroll>
    </Box>
  );
};

export default ImageCarouselScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  carouselContainer: {
    marginBottom: 20,
  },
});
