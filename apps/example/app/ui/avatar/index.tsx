import React, { useState } from 'react';
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  VStack,
  HStack,
  Card,
  Typography,
  Button,
  ButtonText,
  useTheme,
  useThemedStyles,
  Theme,
  ThemeColors,
  VScroll,
} from 'rnc-theme';
import { User, Camera, Heart, Star } from 'lucide-react-native';

export default function AvatarScreen() {
  const { theme } = useTheme();
  const styles = useThemedStyles(createStyles);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const sampleUsers = [
    {
      id: '1',
      name: 'John Doe',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
    },
    {
      id: '2',
      name: 'Jane Smith',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'away',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'offline',
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'online',
    },
    {
      id: '5',
      name: 'David Brown',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      status: 'busy',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return theme.colors.success;
      case 'away':
        return theme.colors.warning;
      case 'busy':
        return theme.colors.error;
      default:
        return theme.colors.border;
    }
  };

  return (
    <VScroll style={styles.container}>
      <VStack spacing="lg">
        {/* Sizes */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Sizes
            </Typography>
            <HStack spacing="md" align="center" justify="center" wrap>
              <VStack spacing="sm" align="center">
                <Avatar size="xs" fallbackText="XS" variant="primary" />
                <Typography variant="small">X-Small</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="sm" fallbackText="SM" variant="primary" />
                <Typography variant="small">Small</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="md" fallbackText="MD" variant="primary" />
                <Typography variant="small">Medium</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" fallbackText="LG" variant="primary" />
                <Typography variant="small">Large</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="xl" fallbackText="XL" variant="primary" />
                <Typography variant="small">X-Large</Typography>
              </VStack>
            </HStack>
          </VStack>
        </Card>

        {/* Variants */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Variants
            </Typography>
            <VStack spacing="lg">
              {/* Row 1 */}
              <HStack spacing="md" align="center" justify="center" wrap>
                <VStack spacing="sm" align="center">
                  <Avatar variant="default" fallbackText="DF" size="lg" />
                  <Typography variant="small">Default</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="primary" fallbackText="PR" size="lg" />
                  <Typography variant="small">Primary</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="secondary" fallbackText="SC" size="lg" />
                  <Typography variant="small">Secondary</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="outline" fallbackText="OL" size="lg" />
                  <Typography variant="small">Outline</Typography>
                </VStack>
              </HStack>

              {/* Row 2 */}
              <HStack spacing="md" align="center" justify="center" wrap>
                <VStack spacing="sm" align="center">
                  <Avatar variant="filled" fallbackText="FL" size="lg" />
                  <Typography variant="small">Filled</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="ghost" fallbackText="GH" size="lg" />
                  <Typography variant="small">Ghost</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="success" fallbackText="SC" size="lg" />
                  <Typography variant="small">Success</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="warning" fallbackText="WR" size="lg" />
                  <Typography variant="small">Warning</Typography>
                </VStack>
              </HStack>

              {/* Row 3 */}
              <HStack spacing="md" align="center" justify="center" wrap>
                <VStack spacing="sm" align="center">
                  <Avatar variant="error" fallbackText="ER" size="lg" />
                  <Typography variant="small">Error</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="info" fallbackText="IF" size="lg" />
                  <Typography variant="small">Info</Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar variant="destructive" fallbackText="DS" size="lg" />
                  <Typography variant="small">Destructive</Typography>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* New Variant Showcase */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              New Variant Styles
            </Typography>
            <VStack spacing="lg">
              <HStack spacing="lg" align="center" justify="center">
                <VStack spacing="sm" align="center">
                  <Avatar
                    variant="outline"
                    fallbackText="OL"
                    size="xl"
                    fallbackIcon={<User />}
                  />
                  <Typography variant="small">Outline Style</Typography>
                  <Typography variant="body">
                    Transparent background with border
                  </Typography>
                </VStack>
                <VStack spacing="sm" align="center">
                  <Avatar
                    variant="ghost"
                    fallbackText="GH"
                    size="xl"
                    fallbackIcon={<Star />}
                  />
                  <Typography variant="small">Ghost Style</Typography>
                  <Typography variant="body">Fully transparent</Typography>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Card>

        {/* Size Comparison */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Size Comparison
            </Typography>
            <HStack spacing="lg" align="center" justify="center">
              <Avatar size="xs" fallbackText="XS" variant="primary" />
              <Avatar size="sm" fallbackText="SM" variant="primary" />
              <Avatar size="md" fallbackText="MD" variant="primary" />
              <Avatar size="lg" fallbackText="LG" variant="primary" />
              <Avatar size="xl" fallbackText="XL" variant="primary" />
            </HStack>
            <Typography variant="body">From XS (24px) to XL (72px)</Typography>
          </VStack>
        </Card>

        {/* With Images */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              With Images
            </Typography>
            <HStack spacing="md" align="center" justify="center" wrap>
              {sampleUsers.slice(0, 3).map((user) => (
                <VStack key={user.id} spacing="sm" align="center">
                  <Avatar
                    size="lg"
                    source={{ uri: user.image }}
                    fallbackText={user.name}
                    badgeColor={
                      getStatusColor(user.status) as keyof ThemeColors
                    }
                    onPress={() => setSelectedAvatar(user.id)}
                    borderWidth={selectedAvatar === user.id ? 3 : 0}
                    borderColor="primary"
                  />
                  <Typography variant="small" numberOfLines={1}>
                    {user.name.split(' ')[0]}
                  </Typography>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </Card>

        {/* With Icons */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              With Icons
            </Typography>
            <HStack spacing="md" align="center" justify="center">
              <VStack spacing="sm" align="center">
                <Avatar size="lg" variant="primary" fallbackIcon={<User />} />
                <Typography variant="small">User</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" variant="success" fallbackIcon={<Camera />} />
                <Typography variant="small">Camera</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" variant="warning" fallbackIcon={<Star />} />
                <Typography variant="small">Star</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" variant="error" fallbackIcon={<Heart />} />
                <Typography variant="small">Heart</Typography>
              </VStack>
            </HStack>
          </VStack>
        </Card>

        {/* Shapes */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Shapes
            </Typography>
            <HStack spacing="lg" align="center" justify="center">
              <VStack spacing="sm" align="center">
                <Avatar
                  size="lg"
                  shape="circle"
                  fallbackText="CI"
                  variant="primary"
                />
                <Typography variant="small">Circle</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar
                  size="lg"
                  shape="square"
                  fallbackText="SQ"
                  variant="primary"
                />
                <Typography variant="small">Square</Typography>
              </VStack>
            </HStack>
          </VStack>
        </Card>

        {/* Avatar Group */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Avatar Group
            </Typography>

            <VStack spacing="lg" align="center">
              <VStack spacing="sm" align="center">
                <Typography variant="body">Team Members (Max 3)</Typography>
                <AvatarGroup max={3} size="md" spacing={-12}>
                  {sampleUsers.map((user) => (
                    <Avatar
                      key={user.id}
                      source={{ uri: user.image }}
                      fallbackText={user.name}
                      borderWidth={2}
                      borderColor="background"
                    />
                  ))}
                </AvatarGroup>
              </VStack>

              <VStack spacing="sm" align="center">
                <Typography variant="body">Large Group (Max 4)</Typography>
                <AvatarGroup max={4} size="lg" spacing={-16}>
                  {sampleUsers.map((user) => (
                    <Avatar
                      key={user.id}
                      source={{ uri: user.image }}
                      fallbackText={user.name}
                      borderWidth={3}
                      borderColor="background"
                      badgeColor={
                        getStatusColor(user.status) as keyof ThemeColors
                      }
                    />
                  ))}
                </AvatarGroup>
              </VStack>
            </VStack>
          </VStack>
        </Card>

        {/* Interactive Examples */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Interactive Examples
            </Typography>

            <VStack spacing="lg" align="center">
              <VStack spacing="sm" align="center">
                <Typography variant="body">Click to Select</Typography>
                <HStack spacing="md">
                  {sampleUsers.slice(0, 3).map((user) => (
                    <Avatar
                      key={user.id}
                      size="lg"
                      source={{ uri: user.image }}
                      fallbackText={user.name}
                      onPress={() =>
                        setSelectedAvatar(
                          selectedAvatar === user.id ? null : user.id
                        )
                      }
                      borderWidth={selectedAvatar === user.id ? 4 : 2}
                      borderColor={
                        selectedAvatar === user.id ? 'primary' : 'border'
                      }
                      badgeColor={
                        getStatusColor(user.status) as keyof ThemeColors
                      }
                    />
                  ))}
                </HStack>
                {selectedAvatar && (
                  <Typography variant="small" style={styles.selectedText}>
                    Selected:{' '}
                    {sampleUsers.find((u) => u.id === selectedAvatar)?.name}
                  </Typography>
                )}
              </VStack>

              <Button
                variant="outline"
                onPress={() => setSelectedAvatar(null)}
                disabled={!selectedAvatar}
              >
                <ButtonText>Clear Selection</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Card>

        {/* Custom Badge Positions */}
        <Card style={styles.card}>
          <VStack spacing="md">
            <Typography variant="subtitle" style={styles.sectionTitle}>
              Custom Badge Positions
            </Typography>
            <HStack spacing="lg" align="center" justify="center" wrap>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" fallbackText="TR" variant="primary">
                  <AvatarBadge position="top-right" color="success" />
                </Avatar>
                <Typography variant="small">Top Right</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" fallbackText="TL" variant="primary">
                  <AvatarBadge position="top-left" color="warning" />
                </Avatar>
                <Typography variant="small">Top Left</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" fallbackText="BR" variant="primary">
                  <AvatarBadge position="bottom-right" color="error" />
                </Avatar>
                <Typography variant="small">Bottom Right</Typography>
              </VStack>
              <VStack spacing="sm" align="center">
                <Avatar size="lg" fallbackText="BL" variant="primary">
                  <AvatarBadge position="bottom-left" color="info" />
                </Avatar>
                <Typography variant="small">Bottom Left</Typography>
              </VStack>
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </VScroll>
  );
}

const createStyles = (theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  headerCard: {
    padding: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.md,
    alignItems: 'center' as const,
  },
  title: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: theme.typography.subtitle.fontWeight,
    color: theme.colors.text,
    textAlign: 'center' as const,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: '600' as const,
  },
});
