import React, { useState, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Box,
  Card,
  HFlashList,
  Typography,
  useTheme,
  VFlashList,
} from 'rnc-theme';

const { width } = Dimensions.get('window');

// Dummy data interfaces
interface Story {
  id: string;
  username: string;
  avatar: string;
  image: string;
  timestamp: string;
}

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

// Generate dummy data
const generateDummyStories = (count: number, offset = 0): Story[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `story-${offset + index}`,
    username: `user${offset + index + 1}`,
    avatar: `https://picsum.photos/60/60?random=${offset + index + 1}`,
    image: `https://picsum.photos/200/300?random=${offset + index + 100}`,
    timestamp: `${Math.floor(Math.random() * 24)}h`,
  }));
};

const generateDummyPosts = (count: number, offset = 0): Post[] => {
  const captions = [
    'Beautiful sunset today! 🌅',
    'Great coffee and good vibes ☕',
    'Weekend adventures 🏔️',
    'Delicious meal with friends 🍽️',
    'Nature is amazing 🌿',
    'City lights at night 🌃',
    'Perfect weather for a walk 🚶',
    'Amazing architecture 🏛️',
    'Beach day vibes 🏖️',
    'Cozy evening at home 🏠',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `post-${offset + index}`,
    username: `user${offset + index + 1}`,
    avatar: `https://picsum.photos/40/40?random=${offset + index + 200}`,
    image: `https://picsum.photos/400/400?random=${offset + index + 300}`,
    caption: captions[Math.floor(Math.random() * captions.length)],
    likes: Math.floor(Math.random() * 1000) + 10,
    comments: Math.floor(Math.random() * 100) + 1,
    timestamp: `${Math.floor(Math.random() * 24)}h`,
  }));
};

const FlashListScreen: React.FC = () => {
  const { theme } = useTheme();
  // Stories state
  const [stories, setStories] = useState<Story[]>(() =>
    generateDummyStories(10)
  );
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [storiesHasMore, setStoriesHasMore] = useState(true);

  // Posts state
  const [posts, setPosts] = useState<Post[]>(() => generateDummyPosts(5));
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsHasMore, setPostsHasMore] = useState(true);

  // Load more stories
  const loadMoreStories = useCallback(() => {
    if (storiesLoading || !storiesHasMore) return;

    setStoriesLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newStories = generateDummyStories(10, stories.length);
      setStories((prev) => [...prev, ...newStories]);
      setStoriesLoading(false);

      // Stop loading after 50 stories
      if (stories.length >= 40) {
        setStoriesHasMore(false);
      }
    }, 1000);
  }, [stories.length, storiesLoading, storiesHasMore]);

  // Load more posts
  const loadMorePosts = useCallback(() => {
    if (postsLoading || !postsHasMore) return;

    setPostsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newPosts = generateDummyPosts(5, posts.length);
      setPosts((prev) => [...prev, ...newPosts]);
      setPostsLoading(false);

      // Stop loading after 50 posts
      if (posts.length >= 45) {
        setPostsHasMore(false);
      }
    }, 1000);
  }, [posts.length, postsLoading, postsHasMore]);

  // Story item renderer
  const renderStoryItem = useCallback(
    ({ item }: { item: Story; index: number }) => (
      <TouchableOpacity style={styles.storyItem}>
        <Box style={styles.storyImageContainer}>
          <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
          <Box style={styles.storyImageWrapper}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
          </Box>
        </Box>
        <Typography style={styles.storyUsername} numberOfLines={1}>
          {item.username}
        </Typography>
        <Typography style={styles.storyTime}>{item.timestamp}</Typography>
      </TouchableOpacity>
    ),
    []
  );

  // Post item renderer
  const renderPostItem = useCallback(
    ({ item }: { item: Post; index: number }) => (
      <Card
        style={[
          styles.postItem,
          { borderRadius: theme.components.borderRadius.md },
        ]}
      >
        {/* Post header */}
        <Box style={styles.postHeader}>
          <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
          <Box style={styles.postUserInfo}>
            <Typography style={styles.postUsername}>{item.username}</Typography>
            <Typography style={styles.postTime}>{item.timestamp}</Typography>
          </Box>
        </Box>

        {/* Post image */}
        <Image
          source={{ uri: item.image }}
          style={[
            styles.postImage,
            { borderRadius: theme.components.borderRadius.md },
          ]}
        />

        {/* Post actions */}
        <Box style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Typography style={styles.actionText}>❤️ {item.likes}</Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Typography style={styles.actionText}>
              💬 {item.comments}
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Typography style={styles.actionText}>📤</Typography>
          </TouchableOpacity>
        </Box>

        {/* Post caption */}
        <Box style={styles.postCaption}>
          <Typography style={styles.captionText}>
            <Typography style={styles.captionUsername}>
              {item.username}
            </Typography>{' '}
            {item.caption}
          </Typography>
        </Box>
      </Card>
    ),
    []
  );

  // Memoized story keyExtractor
  const storyKeyExtractor = useCallback((item: Story) => item.id, []);

  // Memoized post keyExtractor
  const postKeyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <ScrollView style={styles.scrollView}>
      {/* Stories Section */}
      <Box themed style={styles.section}>
        <Box style={styles.sectionHeader}>
          <Typography style={styles.sectionTitle}>Stories</Typography>
          {storiesLoading && <ActivityIndicator size="small" color="#007AFF" />}
        </Box>
        <Box style={styles.storiesContainer}>
          <HFlashList
            data={stories}
            renderItem={renderStoryItem}
            keyExtractor={storyKeyExtractor}
            estimatedItemSize={100}
            estimatedListSize={{ height: 120, width: width }}
            infiniteScroll={{
              onLoadMore: loadMoreStories,
              loading: storiesLoading,
              hasMore: storiesHasMore,
              threshold: 0.8,
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContent}
          />
        </Box>
      </Box>

      {/* Posts Section */}
      <Box themed style={styles.section}>
        <Box style={styles.sectionHeader}>
          <Typography style={styles.sectionTitle}>Posts</Typography>
          {postsLoading && <ActivityIndicator size="small" color="#007AFF" />}
        </Box>
        <Box style={styles.postsContainer}>
          <VFlashList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={postKeyExtractor}
            estimatedItemSize={400}
            estimatedListSize={{ height: 600, width: width }}
            infiniteScroll={{
              onLoadMore: loadMorePosts,
              loading: postsLoading,
              hasMore: postsHasMore,
              threshold: 0.5,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.postsContent}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  // Stories styles
  storiesContainer: {
    height: 120,
  },
  storiesContent: {
    paddingHorizontal: 16,
  },
  storyItem: {
    width: 80,
    marginRight: 12,
    alignItems: 'center',
  },
  storyImageContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  storyAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -2,
    right: -2,
    zIndex: 1,
    borderWidth: 2,
  },
  storyImageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyUsername: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  storyTime: {
    fontSize: 10,
    textAlign: 'center',
  },
  // Posts styles
  postsContainer: {
    height: 600,
  },
  postsContent: {
    paddingHorizontal: 16,
  },
  postItem: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: '600',
  },
  postTime: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 250,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
  },
  postCaption: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 18,
  },
  captionUsername: {
    fontWeight: '600',
  },
});

export default FlashListScreen;
