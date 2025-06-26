import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Card,
  CardContent,
  CardHeader,
  Button,
  ButtonText,
  Typography,
} from 'rnc-theme';

const SkeletonScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Control Button */}
      <Card margin="md">
        <CardContent>
          <Button onPress={toggleLoading} variant="primary">
            <ButtonText>
              {isLoading ? 'Show Content' : 'Show Skeleton'}
            </ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* 1. Basic Skeleton */}
      <Card margin="md">
        <CardHeader title="Basic Skeleton" />
        <CardContent>
          {isLoading ? (
            <View>
              <Skeleton width="100%" height={20} style={styles.mb8} />
              <Skeleton width="80%" height={20} style={styles.mb8} />
              <Skeleton width="60%" height={20} />
            </View>
          ) : (
            <View>
              <Typography style={styles.mb8}>
                This is the actual content that would be displayed.
              </Typography>
              <Typography style={styles.mb8}>
                The skeleton provides a placeholder while loading.
              </Typography>
              <Typography>Content is now fully loaded!</Typography>
            </View>
          )}
        </CardContent>
      </Card>

      {/* 2. Skeleton Text Component */}
      <Card margin="md">
        <CardHeader title="Skeleton Text" />
        <CardContent>
          {isLoading ? (
            <SkeletonText lines={4} lineHeight={18} lastLineWidth="70%" />
          ) : (
            <View>
              <Typography style={styles.mb8}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography style={styles.mb8}>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
              <Typography style={styles.mb8}>
                Ut enim ad minim veniam, quis nostrud exercitation.
              </Typography>
              <Typography>
                Duis aute irure dolor in reprehenderit.
              </Typography>
            </View>
          )}
        </CardContent>
      </Card>

      {/* 3. Skeleton Circle (Avatar) */}
      <Card margin="md">
        <CardHeader title="Skeleton Circle" />
        <CardContent>
          <View style={styles.profileContainer}>
            {isLoading ? (
              <SkeletonCircle diameter={60} />
            ) : (
              <View style={styles.avatar}>
                <Typography style={styles.avatarText}>JD</Typography>
              </View>
            )}
            <View style={styles.profileInfo}>
              {isLoading ? (
                <View>
                  <Skeleton width={120} height={20} style={styles.mb4} />
                  <Skeleton width={80} height={16} />
                </View>
              ) : (
                <View>
                  <Typography style={styles.profileName}>John Doe</Typography>
                  <Typography style={styles.profileRole}>Developer</Typography>
                </View>
              )}
            </View>
          </View>
        </CardContent>
      </Card>

      {/* 4. Complex Card Layout */}
      <Card margin="md">
        <CardHeader title="Complex Layout" />
        <CardContent>
          {isLoading ? (
            <View>
              {/* Header skeleton */}
              <View style={styles.complexHeader}>
                <SkeletonCircle diameter={40} />
                <View style={styles.complexHeaderText}>
                  <Skeleton width={100} height={16} style={styles.mb4} />
                  <Skeleton width={60} height={12} />
                </View>
              </View>

              {/* Content skeleton */}
              <View style={styles.mt16}>
                <Skeleton width="100%" height={120} borderRadius="lg" style={styles.mb8} />
                <SkeletonText lines={3} lineHeight={16} lastLineWidth="80%" />
              </View>

              {/* Footer skeleton */}
              <View style={styles.complexFooter}>
                <Skeleton width={60} height={32} borderRadius="md" />
                <Skeleton width={80} height={32} borderRadius="md" />
              </View>
            </View>
          ) : (
            <View>
              {/* Actual content */}
              <View style={styles.complexHeader}>
                <View style={styles.actualAvatar}>
                  <Typography style={styles.avatarText}>AB</Typography>
                </View>
                <View style={styles.complexHeaderText}>
                  <Typography style={styles.actualName}>Alice Brown</Typography>
                  <Typography style={styles.actualRole}>Designer</Typography>
                </View>
              </View>

              <View style={styles.mt16}>
                <View style={styles.actualImage}>
                  <Typography style={styles.imageText}>📸 Image Content</Typography>
                </View>
                <Typography style={styles.mb8}>
                  This is a complex layout with multiple elements.
                </Typography>
                <Typography style={styles.mb8}>
                  The skeleton provides placeholders for all components.
                </Typography>
                <Typography>
                  Including images, text, and interactive elements.
                </Typography>
              </View>

              <View style={styles.complexFooter}>
                <Button size="sm" variant="outline">
                  <ButtonText>Like</ButtonText>
                </Button>
                <Button size="sm" variant="primary">
                  <ButtonText>Share</ButtonText>
                </Button>
              </View>
            </View>
          )}
        </CardContent>
      </Card>

      {/* 5. Product Card Skeleton - Real World Example */}
      <Card margin="md">
        <CardHeader title="Product Card Skeleton" subtitle="E-commerce use case" />
        <CardContent>
          {isLoading ? (
            <View>
              {/* Product Image Skeleton */}
              <Skeleton
                width="100%"
                height={200}
                borderRadius="lg"
                style={styles.mb12}
              />

              {/* Product Info Skeleton */}
              <View style={styles.productInfo}>
                {/* Category */}
                <Skeleton width={80} height={14} style={styles.mb8} />

                {/* Product Title */}
                <Skeleton width="100%" height={20} style={styles.mb4} />
                <Skeleton width="75%" height={20} style={styles.mb8} />

                {/* Rating */}
                <View style={styles.ratingContainer}>
                  <Skeleton width={100} height={16} style={styles.mr8} />
                  <Skeleton width={60} height={16} />
                </View>

                {/* Price */}
                <View style={styles.priceContainer}>
                  <Skeleton width={80} height={24} style={styles.mr8} />
                  <Skeleton width={60} height={18} />
                </View>

                {/* Features */}
                <View style={styles.featuresContainer}>
                  <Skeleton width={120} height={16} style={styles.mb4} />
                  <View style={styles.featuresList}>
                    <Skeleton width={90} height={14} style={styles.mr8} />
                    <Skeleton width={70} height={14} style={styles.mr8} />
                    <Skeleton width={100} height={14} />
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <Skeleton width={120} height={40} borderRadius="md" style={styles.mr8} />
                  <Skeleton width={40} height={40} borderRadius="md" />
                </View>
              </View>
            </View>
          ) : (
            <View>
              {/* Actual Product Content */}
              <View style={styles.productImage}>
                <Typography style={styles.productImageText}>📱 iPhone 15 Pro</Typography>
              </View>

              <View style={styles.productInfo}>
                <Typography style={styles.categoryText}>Electronics</Typography>

                <Typography style={styles.productTitle}>
                  iPhone 15 Pro Max 256GB Natural Titanium
                </Typography>

                <View style={styles.ratingContainer}>
                  <Typography style={styles.ratingText}>⭐ 4.8 (2,341)</Typography>
                  <Typography style={styles.reviewText}>reviews</Typography>
                </View>

                <View style={styles.priceContainer}>
                  <Typography style={styles.currentPrice}>$1,199</Typography>
                  <Typography style={styles.originalPrice}>$1,299</Typography>
                </View>

                <View style={styles.featuresContainer}>
                  <Typography style={styles.featuresTitle}>Key Features:</Typography>
                  <View style={styles.featuresList}>
                    <Typography style={styles.featureItem}>A17 Pro</Typography>
                    <Typography style={styles.featureItem}>Pro Camera</Typography>
                    <Typography style={styles.featureItem}>Titanium</Typography>
                  </View>
                </View>

                <View style={styles.actionButtons}>
                  <Button variant="primary" style={styles.addToCartBtn}>
                    <ButtonText>Add to Cart</ButtonText>
                  </Button>
                  <Button variant="outline" style={styles.wishlistBtn}>
                    <ButtonText>♡</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </CardContent>
      </Card>

      {/* 6. News Feed Skeleton - Social Media Use Case */}
      <Card margin="md">
        <CardHeader title="News Feed Skeleton" subtitle="Social media use case" />
        <CardContent>
          {isLoading ? (
            <View>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <SkeletonCircle diameter={50} />
                <View style={styles.postHeaderInfo}>
                  <Skeleton width={120} height={16} style={styles.mb4} />
                  <Skeleton width={80} height={12} />
                </View>
                <Skeleton width={24} height={24} />
              </View>

              {/* Post Content */}
              <View style={styles.postContent}>
                <SkeletonText lines={3} lineHeight={16} lastLineWidth="60%" style={styles.mb12} />

                {/* Post Image */}
                <Skeleton width="100%" height={250} borderRadius="lg" style={styles.mb12} />

                {/* Engagement Stats */}
                <View style={styles.engagementStats}>
                  <Skeleton width={60} height={14} style={styles.mr16} />
                  <Skeleton width={80} height={14} style={styles.mr16} />
                  <Skeleton width={70} height={14} />
                </View>

                {/* Action Buttons */}
                <View style={styles.postActions}>
                  <Skeleton width={60} height={32} borderRadius="md" style={styles.mr8} />
                  <Skeleton width={70} height={32} borderRadius="md" style={styles.mr8} />
                  <Skeleton width={60} height={32} borderRadius="md" style={styles.mr8} />
                  <Skeleton width={50} height={32} borderRadius="md" />
                </View>
              </View>
            </View>
          ) : (
            <View>
              {/* Actual Post Content */}
              <View style={styles.postHeader}>
                <View style={styles.postAvatar}>
                  <Typography style={styles.avatarText}>MK</Typography>
                </View>
                <View style={styles.postHeaderInfo}>
                  <Typography style={styles.postAuthor}>Maria Kim</Typography>
                  <Typography style={styles.postTime}>2 hours ago</Typography>
                </View>
                <Typography style={styles.postMenu}>⋯</Typography>
              </View>

              <View style={styles.postContent}>
                <Typography style={styles.postText}>
                  Just finished an amazing hiking trip in the mountains! The view was absolutely breathtaking. Can't wait to go back next weekend.
                </Typography>

                <View style={styles.postImageContainer}>
                  <Typography style={styles.postImageText}>🏔️ Mountain View</Typography>
                </View>

                <View style={styles.engagementStats}>
                  <Typography style={styles.statText}>👍 234 likes</Typography>
                  <Typography style={styles.statText}>💬 45 comments</Typography>
                  <Typography style={styles.statText}>🔄 12 shares</Typography>
                </View>

                <View style={styles.postActions}>
                  <Button size="sm" variant="ghost">
                    <ButtonText>Like</ButtonText>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ButtonText>Comment</ButtonText>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ButtonText>Share</ButtonText>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ButtonText>Save</ButtonText>
                  </Button>
                </View>
              </View>
            </View>
          )}
        </CardContent>
      </Card>

      {/* 7. Dashboard Widget Skeleton - Analytics Use Case */}
      <Card margin="md">
        <CardHeader title="Dashboard Widget" subtitle="Analytics dashboard use case" />
        <CardContent>
          {isLoading ? (
            <View>
              {/* Widget Header */}
              <View style={styles.widgetHeader}>
                <Skeleton width={150} height={20} style={styles.mb4} />
                <Skeleton width={100} height={14} />
              </View>

              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Skeleton width={40} height={40} borderRadius="md" style={styles.mb8} />
                  <Skeleton width={60} height={24} style={styles.mb4} />
                  <Skeleton width={80} height={14} />
                </View>
                <View style={styles.statCard}>
                  <Skeleton width={40} height={40} borderRadius="md" style={styles.mb8} />
                  <Skeleton width={70} height={24} style={styles.mb4} />
                  <Skeleton width={90} height={14} />
                </View>
              </View>

              {/* Chart Area */}
              <View style={styles.chartArea}>
                <Skeleton width="100%" height={200} borderRadius="lg" style={styles.mb12} />
              </View>

              {/* Recent Activity */}
              <View style={styles.recentActivity}>
                <Skeleton width={120} height={16} style={styles.mb12} />
                {[1, 2, 3].map((item) => (
                  <View key={item} style={styles.activityItem}>
                    <SkeletonCircle diameter={32} />
                    <View style={styles.activityInfo}>
                      <Skeleton width={150} height={14} style={styles.mb4} />
                      <Skeleton width={100} height={12} />
                    </View>
                    <Skeleton width={60} height={12} />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View>
              {/* Actual Dashboard Content */}
              <View style={styles.widgetHeader}>
                <Typography style={styles.widgetTitle}>Sales Overview</Typography>
                <Typography style={styles.widgetSubtitle}>Last 30 days</Typography>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <View style={styles.statIcon}>
                    <Typography style={styles.statIconText}>💰</Typography>
                  </View>
                  <Typography style={styles.statValue}>$24.5K</Typography>
                  <Typography style={styles.statLabel}>Revenue</Typography>
                </View>
                <View style={styles.statCard}>
                  <View style={styles.statIcon}>
                    <Typography style={styles.statIconText}>📊</Typography>
                  </View>
                  <Typography style={styles.statValue}>1,234</Typography>
                  <Typography style={styles.statLabel}>Orders</Typography>
                </View>
              </View>

              <View style={styles.chartContainer}>
                <Typography style={styles.chartText}>📈 Sales Chart</Typography>
              </View>

              <View style={styles.recentActivity}>
                <Typography style={styles.activityTitle}>Recent Activity</Typography>
                <View style={styles.activityItem}>
                  <View style={styles.activityAvatar}>
                    <Typography style={styles.avatarText}>JD</Typography>
                  </View>
                  <View style={styles.activityInfo}>
                    <Typography style={styles.activityText}>New order from John Doe</Typography>
                    <Typography style={styles.activityTime}>5 minutes ago</Typography>
                  </View>
                  <Typography style={styles.activityAmount}>$299</Typography>
                </View>
                <View style={styles.activityItem}>
                  <View style={styles.activityAvatar}>
                    <Typography style={styles.avatarText}>SM</Typography>
                  </View>
                  <View style={styles.activityInfo}>
                    <Typography style={styles.activityText}>Payment received from Sarah Miller</Typography>
                    <Typography style={styles.activityTime}>12 minutes ago</Typography>
                  </View>
                  <Typography style={styles.activityAmount}>$150</Typography>
                </View>
                <View style={styles.activityItem}>
                  <View style={styles.activityAvatar}>
                    <Typography style={styles.avatarText}>RJ</Typography>
                  </View>
                  <View style={styles.activityInfo}>
                    <Typography style={styles.activityText}>Refund processed for Robert Johnson</Typography>
                    <Typography style={styles.activityTime}>1 hour ago</Typography>
                  </View>
                  <Typography style={styles.activityAmount}>-$75</Typography>
                </View>
              </View>
            </View>
          )}
        </CardContent>
      </Card>

      {/* 8. Different Sizes */}
      <Card margin="md">
        <CardHeader title="Different Sizes" />
        <CardContent>
          <View style={styles.sizesContainer}>
            <View style={styles.sizeItem}>
              <Typography style={styles.sizeLabel}>Extra Small</Typography>
              <Skeleton width="100%" size="xs" />
            </View>
            <View style={styles.sizeItem}>
              <Typography style={styles.sizeLabel}>Small</Typography>
              <Skeleton width="100%" size="sm" />
            </View>
            <View style={styles.sizeItem}>
              <Typography style={styles.sizeLabel}>Medium</Typography>
              <Skeleton width="100%" size="md" />
            </View>
            <View style={styles.sizeItem}>
              <Typography style={styles.sizeLabel}>Large</Typography>
              <Skeleton width="100%" size="lg" />
            </View>
            <View style={styles.sizeItem}>
              <Typography style={styles.sizeLabel}>Extra Large</Typography>
              <Skeleton width="100%" size="xl" />
            </View>
          </View>
        </CardContent>
      </Card>

      {/* 9. Non-animated Skeleton */}
      <Card margin="md">
        <CardHeader title="Static Skeleton" subtitle="Without animation" />
        <CardContent>
          <View>
            <Skeleton width="100%" height={20} animated={false} style={styles.mb8} />
            <Skeleton width="80%" height={20} animated={false} style={styles.mb8} />
            <Skeleton width="60%" height={20} animated={false} />
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    gap: 16
  },
  mb4: {
    marginBottom: 4,
  },
  mb8: {
    marginBottom: 8,
  },
  mb12: {
    marginBottom: 12,
  },
  mb16: {
    marginBottom: 16,
  },
  mr8: {
    marginRight: 8,
  },
  mr16: {
    marginRight: 16,
  },
  mt16: {
    marginTop: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
  },
  complexHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  complexHeaderText: {
    marginLeft: 12,
    flex: 1,
  },
  actualAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actualRole: {
    fontSize: 12,
    color: '#666',
  },
  actualImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  imageText: {
    fontSize: 16,
    color: '#1976D2',
  },
  complexFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  sizesContainer: {
    gap: 12,
  },
  sizeItem: {
    marginBottom: 8,
  },
  sizeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  // Product Card Styles
  productInfo: {
    paddingTop: 12,
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  productImageText: {
    fontSize: 18,
    color: '#666',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    fontSize: 12,
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartBtn: {
    flex: 1,
    marginRight: 8,
  },
  wishlistBtn: {
    width: 48,
    height: 48,
  },
  // News Feed Styles
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postMenu: {
    fontSize: 20,
    color: '#666',
  },
  postContent: {
    marginTop: 12,
  },
  postText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  postImageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  postImageText: {
    fontSize: 18,
    color: '#4CAF50',
  },
  engagementStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  // Dashboard Widget Styles
  widgetHeader: {
    marginBottom: 16,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  widgetSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  chartArea: {
    marginBottom: 20,
  },
  chartContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartText: {
    fontSize: 18,
    color: '#1976D2',
  },
  recentActivity: {
    marginTop: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9C27B0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default SkeletonScreen;