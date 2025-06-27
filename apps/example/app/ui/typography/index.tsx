import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Body,
  Small,
  Subtitle,
  TextError,
  TextPrimary,
  TextSuccess,
  TextWarning,
  TextInfo,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Button,
  ButtonText,
  VStack,
  HStack,
  P,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Theme,
  useThemedStyles,
  VScroll,
  Box,
} from 'rnc-theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TypographyScreen() {
  const { theme } = useTheme();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const styles = useThemedStyles(createStyles);

  return (
    <VScroll
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <VStack spacing="lg" padding="md">
        {/* Header Section */}
        <Card variant="primary" elevation={3}>
          <CardHeader
            title="Typography Showcase"
            subtitle="Comprehensive examples from basic to advanced"
            titleStyle={styles.lightText}
            subtitleStyle={styles.lightText}
          />
          <CardContent>
            <Typography style={styles.lightText}>
              Explore various typography components and their real-world
              applications
            </Typography>
          </CardContent>
        </Card>
        {/* Basic Typography Examples */}
        <Card>
          <CardHeader title="Basic Typography Variants" />
          <CardContent>
            <VStack spacing="sm">
              <Typography variant="heading">Heading Variant</Typography>
              <Typography variant="title">Title Variant</Typography>
              <Typography variant="subtitle">Subtitle Variant</Typography>
              <Typography variant="body">
                Body text for regular content
              </Typography>
              <Typography variant="small">
                Small text for captions and notes
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* HTML-like Components */}
        <Card>
          <CardHeader title="HTML-like Typography Components" />
          <CardContent>
            <VStack spacing="md">
              <H1>H1 - Main Page Title</H1>
              <H2>H2 - Section Heading</H2>
              <H3>H3 - Subsection Title</H3>
              <H4>H4 - Article Heading</H4>
              <H5>H5 - Minor Heading</H5>
              <H6>H6 - Smallest Heading</H6>
              <P>
                This is a paragraph component that uses body variant by default.
                Perfect for regular text content in articles, descriptions, and
                general content.
              </P>
            </VStack>
          </CardContent>
        </Card>
        {/* Semantic Color Typography */}
        <Card>
          <CardHeader title="Semantic Color Typography" />
          <CardContent>
            <VStack spacing="md">
              <TextPrimary variant="title">Primary colored title</TextPrimary>
              <TextSuccess>✓ Operation completed successfully</TextSuccess>
              <TextError>✗ An error occurred during processing</TextError>
              <TextWarning>⚠ Please review your input</TextWarning>
              <TextInfo>ℹ Additional information available</TextInfo>
            </VStack>
          </CardContent>
        </Card>
        {/* Real-world Example: Article Card */}
        <Card
          elevation={2}
          style={selectedCard === 'article' ? styles.selectedCard : undefined}
        >
          <CardHeader
            title="Real-world Example: Article Card"
            subtitle="Interactive typography in content cards"
          />
          <CardContent>
            <VStack spacing="md">
              <H2>The Future of Mobile Development</H2>
              <HStack spacing="sm" align="center">
                <Small color={theme.colors.textSecondary}>By John Doe</Small>
                <Small color={theme.colors.textSecondary}>•</Small>
                <Small color={theme.colors.textSecondary}>5 min read</Small>
                <Small color={theme.colors.textSecondary}>•</Small>
                <Small color={theme.colors.textSecondary}>March 15, 2024</Small>
              </HStack>

              <P
                numberOfLines={selectedCard === 'article' ? undefined : 3}
                ellipsizeMode="tail"
              >
                React Native continues to evolve as one of the most popular
                frameworks for cross-platform mobile development. With its
                component-based architecture and extensive ecosystem, developers
                can create powerful applications that run seamlessly on both iOS
                and Android platforms.
              </P>

              {selectedCard === 'article' && (
                <VStack spacing="md">
                  <H3>Key Benefits</H3>
                  <VStack spacing="sm">
                    <HStack spacing="sm" align="flex-start">
                      <TextSuccess>•</TextSuccess>
                      <Body>Cross-platform compatibility</Body>
                    </HStack>
                    <HStack spacing="sm" align="flex-start">
                      <TextSuccess>•</TextSuccess>
                      <Body>Hot reload for faster development</Body>
                    </HStack>
                    <HStack spacing="sm" align="flex-start">
                      <TextSuccess>•</TextSuccess>
                      <Body>Large community and ecosystem</Body>
                    </HStack>
                  </VStack>
                </VStack>
              )}
            </VStack>
          </CardContent>
          <CardFooter>
            <HStack justify="space-between" align="center">
              <HStack spacing="md">
                <TextPrimary>👍 24</TextPrimary>
                <Typography color={theme.colors.textSecondary}>💬 8</Typography>
                <Typography color={theme.colors.textSecondary}>
                  🔗 Share
                </Typography>
              </HStack>
              <Button variant="ghost" size="sm">
                <ButtonText>
                  {selectedCard === 'article' ? 'Show Less' : 'Read More'}
                </ButtonText>
              </Button>
            </HStack>
          </CardFooter>
        </Card>
        {/* Real-world Example: User Profile Card */}
        <Card elevation={2}>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" align="center">
                <Box style={styles.avatar}>
                  <Typography style={styles.avatarText}>JD</Typography>
                </Box>
                <VStack spacing="xs" flex={1}>
                  <H4>Jane Doe</H4>
                  <Subtitle color={theme.colors.textSecondary}>
                    Senior Developer
                  </Subtitle>
                  <Small color={theme.colors.textSecondary}>
                    San Francisco, CA
                  </Small>
                </VStack>
                <TextSuccess>Online</TextSuccess>
              </HStack>

              <P>
                Passionate full-stack developer with 8+ years of experience in
                React Native, Node.js, and cloud technologies.
              </P>

              <VStack spacing="sm">
                <H5>Skills</H5>
                <HStack spacing="sm" wrap>
                  <Box style={styles.skillTag}>
                    <Small style={styles.skillText}>React Native</Small>
                  </Box>
                  <Box style={styles.skillTag}>
                    <Small style={styles.skillText}>TypeScript</Small>
                  </Box>
                  <Box style={styles.skillTag}>
                    <Small style={styles.skillText}>Node.js</Small>
                  </Box>
                  <Box style={styles.skillTag}>
                    <Small style={styles.skillText}>AWS</Small>
                  </Box>
                </HStack>
              </VStack>
            </VStack>
          </CardContent>
          <CardFooter>
            <HStack spacing="sm">
              <Button variant="primary" size="sm">
                <ButtonText>Connect</ButtonText>
              </Button>
              <Button variant="outline" size="sm">
                <ButtonText>Message</ButtonText>
              </Button>
            </HStack>
          </CardFooter>
        </Card>
        {/* Real-world Example: Notification Card */}
        <Card variant="outline">
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" align="flex-start">
                <Box
                  style={[
                    styles.notificationIcon,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  <MaterialIcons name="notifications" size={16} color="white" />
                </Box>
                <VStack spacing="xs" flex={1}>
                  <H5>New Feature Available</H5>
                  <Body>
                    Dark mode is now available in your app settings. Customize
                    your experience for better readability.
                  </Body>
                  <Small color={theme.colors.textSecondary}>2 hours ago</Small>
                </VStack>
              </HStack>
            </VStack>
          </CardContent>
        </Card>
        {/* Real-world Example: Statistics Dashboard */}
        <Card>
          <CardHeader title="Dashboard Statistics" />
          <CardContent>
            <VStack spacing="lg">
              <HStack spacing="md">
                <VStack spacing="xs" flex={1} align="center">
                  <H2 color={theme.colors.primary}>1,234</H2>
                  <Subtitle>Total Users</Subtitle>
                  <TextSuccess>+12% this month</TextSuccess>
                </VStack>
                <VStack spacing="xs" flex={1} align="center">
                  <H2 color={theme.colors.success}>98.5%</H2>
                  <Subtitle>Uptime</Subtitle>
                  <TextSuccess>+0.2% from last week</TextSuccess>
                </VStack>
              </HStack>

              <HStack spacing="md">
                <VStack spacing="xs" flex={1} align="center">
                  <H2 color={theme.colors.warning}>45</H2>
                  <Subtitle>Pending Tasks</Subtitle>
                  <TextWarning>-5 from yesterday</TextWarning>
                </VStack>
                <VStack spacing="xs" flex={1} align="center">
                  <H2 color={theme.colors.error}>3</H2>
                  <Subtitle>Critical Issues</Subtitle>
                  <TextError>Needs attention</TextError>
                </VStack>
              </HStack>
            </VStack>
          </CardContent>
        </Card>
        {/* Typography Customization Examples */}
        <Card>
          <CardHeader title="Advanced Typography Customization" />
          <CardContent>
            <VStack spacing="md">
              <Typography
                variant="title"
                weight="300"
                align="center"
                style={{ letterSpacing: 2 }}
              >
                LIGHT WEIGHT TITLE
              </Typography>

              <Typography
                variant="body"
                weight="700"
                color={theme.colors.primary}
                numberOfLines={2}
                ellipsizeMode="middle"
              >
                This is a very long text that demonstrates ellipsize mode in the
                middle of the content when it exceeds the specified number of
                lines
              </Typography>

              <Typography
                variant="subtitle"
                align="right"
                style={{
                  fontStyle: 'italic',
                  textDecorationLine: 'underline',
                }}
              >
                Right-aligned italic subtitle with underline
              </Typography>

              <Typography
                variant="body"
                selectable
                onPress={() => console.log('Typography pressed!')}
                style={{
                  backgroundColor: theme.colors.primary + '20',
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                Selectable and pressable typography with custom background (tap
                me!)
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* Real-world Example: Chat Message */}
        <Card>
          <CardHeader title="Chat Interface Example" />
          <CardContent>
            <VStack spacing="md">
              {/* Incoming message */}
              <HStack spacing="sm" align="flex-start">
                <Box style={styles.messageAvatar}>
                  <Small style={styles.avatarText}>A</Small>
                </Box>
                <VStack spacing="xs" flex={1}>
                  <HStack spacing="sm" align="center">
                    <Subtitle>Alice Johnson</Subtitle>
                    <Small color={theme.colors.textSecondary}>10:30 AM</Small>
                  </HStack>
                  <Box style={[styles.messageBubble, styles.incomingMessage]}>
                    <Body style={styles.messageText}>
                      Hey! How's the new typography component coming along? I
                      saw the preview and it looks amazing! 🎉
                    </Body>
                  </Box>
                </VStack>
              </HStack>

              {/* Outgoing message */}
              <HStack spacing="sm" align="flex-start" justify="flex-end">
                <VStack spacing="xs" flex={1} align="flex-end">
                  <HStack spacing="sm" align="center">
                    <Small color={theme.colors.textSecondary}>10:32 AM</Small>
                    <Subtitle>You</Subtitle>
                  </HStack>
                  <Box style={[styles.messageBubble, styles.outgoingMessage]}>
                    <Body style={styles.outgoingMessageText}>
                      Thanks! It's been a lot of work but I'm really happy with
                      how it turned out. The semantic colors and HTML-like
                      components make it so much easier to use.
                    </Body>
                  </Box>
                  <TextSuccess>✓ Read</TextSuccess>
                </VStack>
                <Box style={styles.messageAvatar}>
                  <Small style={styles.avatarText}>Y</Small>
                </Box>
              </HStack>
            </VStack>
          </CardContent>
        </Card>
        {/* Typography Weight and Style Showcase */}
        <Card>
          <CardHeader title="Font Weights & Styles" />
          <CardContent>
            <VStack spacing="sm">
              <Typography variant="title" weight="100">
                Ultra Light (100)
              </Typography>
              <Typography variant="title" weight="200">
                Light (200)
              </Typography>
              <Typography variant="title" weight="300">
                Light (300)
              </Typography>
              <Typography variant="title" weight="400">
                Regular (400)
              </Typography>
              <Typography variant="title" weight="500">
                Medium (500)
              </Typography>
              <Typography variant="title" weight="600">
                Semi Bold (600)
              </Typography>
              <Typography variant="title" weight="700">
                Bold (700)
              </Typography>
              <Typography variant="title" weight="800">
                Extra Bold (800)
              </Typography>
              <Typography variant="title" weight="900">
                Black (900)
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* Typography Weight and Style Showcase */}
        <Card>
          <CardHeader title="Font Weights & Styles" />
          <CardContent>
            <VStack spacing="sm">
              <Typography variant="title" weight="100">
                Ultra Light (100)
              </Typography>
              <Typography variant="title" weight="200">
                Light (200)
              </Typography>
              <Typography variant="title" weight="300">
                Light (300)
              </Typography>
              <Typography variant="title" weight="400">
                Regular (400)
              </Typography>
              <Typography variant="title" weight="500">
                Medium (500)
              </Typography>
              <Typography variant="title" weight="600">
                Semi Bold (600)
              </Typography>
              <Typography variant="title" weight="700">
                Bold (700)
              </Typography>
              <Typography variant="title" weight="800">
                Extra Bold (800)
              </Typography>
              <Typography variant="title" weight="900">
                Black (900)
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* New Typography Variants Showcase */}
        <Card>
          <CardHeader title="New Typography Variants" />
          <CardContent>
            <VStack spacing="md">
              <Typography variant="display">
                Display Variant - For Hero Sections
              </Typography>
              <Typography variant="lead">
                Lead variant for important introductory text that needs to stand
                out from regular body text.
              </Typography>
              <Typography variant="caption">
                Caption variant for image descriptions and small annotations
              </Typography>
              <Typography variant="overline">
                OVERLINE VARIANT FOR SECTION HEADERS
              </Typography>
              <Typography variant="button">BUTTON VARIANT TEXT</Typography>
              <Typography variant="label">
                Label Variant for Form Fields
              </Typography>
              <Typography variant="code">
                const codeVariant = 'for inline code snippets';
              </Typography>
              <Typography variant="quote">
                "Quote variant for highlighting important statements and
                testimonials."
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* Interactive Typography Examples */}
        <Card>
          <CardHeader title="Interactive Typography" />
          <CardContent>
            <VStack spacing="md">
              <Typography
                variant="body"
                onPress={() =>
                  setSelectedCard(
                    selectedCard === 'interactive' ? null : 'interactive'
                  )
                }
                style={{
                  backgroundColor:
                    selectedCard === 'interactive'
                      ? theme.colors.primary + '20'
                      : 'transparent',
                  padding: 8,
                  borderRadius: 4,
                  textDecorationLine: 'underline',
                  color: theme.colors.primary,
                }}
              >
                Tap this text to toggle selection state
              </Typography>

              <Typography
                variant="subtitle"
                selectable
                style={{
                  backgroundColor: theme.colors.surface,
                  padding: 12,
                  borderRadius: 8,
                  borderLeftWidth: 4,
                  borderLeftColor: theme.colors.info,
                }}
              >
                This text is selectable - try long pressing to select and copy
              </Typography>

              <Typography
                variant="body"
                numberOfLines={2}
                ellipsizeMode="tail"
                onPress={() => console.log('Expandable text pressed')}
                style={{
                  backgroundColor: theme.colors.warning + '10',
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                This is a long text that demonstrates ellipsize functionality.
                When text exceeds the specified number of lines, it will be
                truncated with ellipsis. Tap to expand or perform an action.
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* Typography with Icons and Badges */}
        <Card>
          <CardHeader title="Typography with Visual Elements" />
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="sm" align="center">
                <MaterialIcons
                  name="star"
                  size={20}
                  color={theme.colors.warning}
                />
                <Typography variant="subtitle" weight="600">
                  Featured Content
                </Typography>
                <Box
                  style={{
                    backgroundColor: theme.colors.error,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}
                >
                  <Small style={{ color: 'white', fontSize: 10 }}>NEW</Small>
                </Box>
              </HStack>

              <HStack spacing="sm" align="center">
                <MaterialIcons
                  name="verified"
                  size={18}
                  color={theme.colors.success}
                />
                <Typography variant="body">Verified Account</Typography>
              </HStack>

              <HStack spacing="sm" align="center">
                <MaterialIcons
                  name="schedule"
                  size={16}
                  color={theme.colors.textSecondary}
                />
                <Small color={theme.colors.textSecondary}>
                  Last updated 2 minutes ago
                </Small>
              </HStack>
            </VStack>
          </CardContent>
        </Card>
        {/* Typography Alignment Examples */}
        <Card>
          <CardHeader title="Text Alignment Examples" />
          <CardContent>
            <VStack spacing="md">
              <Typography variant="title" align="left">
                Left Aligned Title
              </Typography>
              <Typography variant="body" align="center">
                Center aligned body text for balanced layouts
              </Typography>
              <Typography variant="subtitle" align="right">
                Right Aligned Subtitle
              </Typography>
              <Typography variant="body" align="justify">
                Justified text alignment distributes text evenly across the full
                width of the container, creating clean edges on both sides. This
                is particularly useful for formal documents and articles.
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* Typography Color Variations */}
        <Card>
          <CardHeader title="Color Variations" />
          <CardContent>
            <VStack spacing="sm">
              <Typography color={theme.colors.primary}>
                Primary Color Text
              </Typography>
              <Typography color={theme.colors.secondary}>
                Secondary Color Text
              </Typography>
              <Typography color={theme.colors.success}>
                Success Color Text
              </Typography>
              <Typography color={theme.colors.warning}>
                Warning Color Text
              </Typography>
              <Typography color={theme.colors.error}>
                Error Color Text
              </Typography>
              <Typography color={theme.colors.info}>Info Color Text</Typography>
              <Typography color={theme.colors.textSecondary}>
                Secondary Text Color
              </Typography>
            </VStack>
          </CardContent>
        </Card>
        {/* Real-world Example: Product Card */}
        <Card elevation={2}>
          <CardContent>
            <VStack spacing="md">
              <HStack spacing="md" align="flex-start">
                <Box
                  style={{
                    width: 80,
                    height: 80,
                    backgroundColor: theme.colors.surface,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialIcons
                    name="phone-android"
                    size={40}
                    color={theme.colors.primary}
                  />
                </Box>
                <VStack spacing="xs" flex={1}>
                  <H4>iPhone 15 Pro Max</H4>
                  <Typography
                    variant="lead"
                    color={theme.colors.primary}
                    weight="700"
                  >
                    $1,199.00
                  </Typography>
                  <HStack spacing="xs" align="center">
                    <MaterialIcons
                      name="star"
                      size={16}
                      color={theme.colors.warning}
                    />
                    <Typography variant="caption" weight="600">
                      4.8
                    </Typography>
                    <Typography
                      variant="caption"
                      color={theme.colors.textSecondary}
                    >
                      (2,847 reviews)
                    </Typography>
                  </HStack>
                </VStack>
              </HStack>

              <Typography variant="body" numberOfLines={3}>
                The most advanced iPhone ever, featuring the powerful A17 Pro
                chip, revolutionary camera system, and stunning titanium design.
              </Typography>

              <HStack spacing="sm">
                <Box
                  style={{
                    backgroundColor: theme.colors.success + '20',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Typography
                    variant="caption"
                    color={theme.colors.success}
                    weight="600"
                  >
                    In Stock
                  </Typography>
                </Box>
                <Box
                  style={{
                    backgroundColor: theme.colors.info + '20',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Typography
                    variant="caption"
                    color={theme.colors.info}
                    weight="600"
                  >
                    Free Shipping
                  </Typography>
                </Box>
              </HStack>
            </VStack>
          </CardContent>
          <CardFooter>
            <HStack spacing="sm">
              <Button variant="primary">
                <ButtonText>Add to Cart</ButtonText>
              </Button>
              <Button variant="outline">
                <MaterialIcons
                  name="favorite-border"
                  size={20}
                  color={theme.colors.primary}
                />
              </Button>
            </HStack>
          </CardFooter>
        </Card>
        {/* Typography Performance Tips */}
        <Card>
          <CardHeader title="Typography Best Practices" />
          <CardContent>
            <VStack spacing="md">
              <VStack spacing="sm">
                <H5>✅ Good Practices</H5>
                <Typography variant="body">
                  • Use semantic variants (H1-H6, P) for better accessibility
                </Typography>
                <Typography variant="body">
                  • Limit font weights to maintain performance
                </Typography>
                <Typography variant="body">
                  • Use numberOfLines for long content to prevent layout issues
                </Typography>
                <Typography variant="body">
                  • Apply consistent spacing using VStack and HStack
                </Typography>
              </VStack>

              <VStack spacing="sm">
                <H5>❌ Avoid These</H5>
                <Typography variant="body" color={theme.colors.textSecondary}>
                  • Overusing custom styles instead of variants
                </Typography>
                <Typography variant="body" color={theme.colors.textSecondary}>
                  • Mixing too many font weights in one screen
                </Typography>
                <Typography variant="body" color={theme.colors.textSecondary}>
                  • Using hardcoded colors instead of theme colors
                </Typography>
                <Typography variant="body" color={theme.colors.textSecondary}>
                  • Ignoring text accessibility guidelines
                </Typography>
              </VStack>
            </VStack>
          </CardContent>
        </Card>
      </VStack>
    </VScroll>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    lightText: {
      color: 'white',
    },
    selectedCard: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      color: 'white',
      fontWeight: 'bold',
    },
    skillTag: {
      backgroundColor: theme.colors.primary + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    skillText: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
    notificationIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageBubble: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      maxWidth: '80%',
    },
    incomingMessage: {
      backgroundColor: theme.colors.surface,
      alignSelf: 'flex-start',
    },
    outgoingMessage: {
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-end',
    },
    messageText: {
      color: theme.colors.text,
    },
    outgoingMessageText: {
      color: 'white',
    },
  });
