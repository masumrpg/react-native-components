import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Fab,
  FabVariant,
  Card,
  CardHeader,
  CardContent,
  Typography,
  VStack,
  HStack,
  Button,
  ButtonText,
  useThemedStyles,
  Theme,
  Box,
  VScroll,
} from 'rnc-theme';
import {
  BicepsFlexed,
  Plus,
  Heart,
  Star,
  Share,
  MessageCircle,
  Settings,
  Mail,
  Phone,
  Download,
  Copy,
  Save,
} from 'lucide-react-native';

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    variantButton: {
      marginBottom: 8,
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
    },
    selectedButton: {
      backgroundColor: theme.colors.secondary,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
    headerCard: {
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    exampleCard: {
      marginBottom: 16,
    },
    description: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 12,
    },
  });

export default function FabScreen() {
  const styles = useThemedStyles(createStyles);
  const [fabVariant, setFabVariant] = useState<FabVariant>('single');
  const [selectedExample, setSelectedExample] = useState<string>('basic');

  const fabVariants: { key: FabVariant; label: string; description: string }[] =
    [
      {
        key: 'single',
        label: 'Single FAB',
        description: 'Simple floating action button with single action',
      },
      {
        key: 'clustered',
        label: 'Clustered FAB',
        description: 'Multiple actions with labels in horizontal layout',
      },
      {
        key: 'doted',
        label: 'Dotted FAB',
        description: 'Actions arranged in dot pattern around main button',
      },
      {
        key: 'extended',
        label: 'Extended FAB',
        description: 'Expandable FAB with vertical list of actions',
      },
      {
        key: 'stacked',
        label: 'Stacked FAB',
        description: 'Actions stacked vertically above main button',
      },
    ];

  const examples = [
    { key: 'basic', label: 'Basic Examples' },
    { key: 'social', label: 'Social Media Actions' },
    { key: 'productivity', label: 'Productivity Actions' },
    { key: 'communication', label: 'Communication Actions' },
  ];

  // Fix: Return proper tuple types for FAB items
  const getExampleItems = () => {
    switch (selectedExample) {
      case 'social':
        return [
          {
            icon: <Heart size={30} color={'white'} />,
            onPress: () => console.log('Like pressed'),
            label: 'Like',
          },
          {
            icon: <Share size={30} color={'white'} />,
            onPress: () => console.log('Share pressed'),
            label: 'Share',
          },
          {
            icon: <MessageCircle size={30} color={'white'} />,
            onPress: () => console.log('Comment pressed'),
            label: 'Comment',
          },
        ] as const;
      case 'productivity':
        return [
          {
            icon: <Save size={30} color={'white'} />,
            onPress: () => console.log('Save pressed'),
            label: 'Save',
          },
          {
            icon: <Copy size={30} color={'white'} />,
            onPress: () => console.log('Copy pressed'),
            label: 'Copy',
          },
          {
            icon: <Download size={30} color={'white'} />,
            onPress: () => console.log('Download pressed'),
            label: 'Download',
          },
        ] as const;
      case 'communication':
        return [
          {
            icon: <Mail size={30} color={'white'} />,
            onPress: () => console.log('Email pressed'),
            label: 'Email',
          },
          {
            icon: <Phone size={30} color={'white'} />,
            onPress: () => console.log('Call pressed'),
            label: 'Call',
          },
          {
            icon: <MessageCircle size={30} color={'white'} />,
            onPress: () => console.log('Message pressed'),
            label: 'Message',
          },
        ] as const;
      default:
        return [
          {
            icon: <BicepsFlexed size={30} color={'white'} />,
            onPress: () => console.log('Action 1 pressed'),
            label: 'Action 1',
          },
          {
            icon: <Star size={30} color={'white'} />,
            onPress: () => console.log('Action 2 pressed'),
            label: 'Action 2',
          },
          {
            icon: <Settings size={30} color={'white'} />,
            onPress: () => console.log('Action 3 pressed'),
            label: 'Action 3',
          },
        ] as const;
    }
  };

  const renderFab = () => {
    const items = getExampleItems();

    switch (fabVariant) {
      case 'single':
        return (
          <Fab
            variant="single"
            icon={<Plus size={35} color={'white'} strokeWidth={2} />}
            onPress={() => console.log('Single FAB pressed')}
          />
        );
      case 'clustered':
        return (
          <Fab
            variant="clustered"
            items={
              items as unknown as [
                (typeof items)[0],
                (typeof items)[1]?,
                (typeof items)[2]?
              ]
            }
            isOpen={(isOpen) => console.log('Clustered FAB is open:', isOpen)}
          />
        );
      case 'doted':
        return (
          <Fab
            variant="doted"
            items={
              items.map(({ icon, onPress }) => ({ icon, onPress })) as [
                { icon: React.ReactNode; onPress: () => void },
                { icon: React.ReactNode; onPress: () => void }?,
                { icon: React.ReactNode; onPress: () => void }?
              ]
            }
            isOpen={(isOpen) => console.log('Dotted FAB is open:', isOpen)}
          />
        );
      case 'extended':
        return (
          <Fab
            variant="extended"
            items={
              items as unknown as [
                (typeof items)[0],
                (typeof items)[1]?,
                (typeof items)[2]?
              ]
            }
            isOpen={(isOpen) => console.log('Extended FAB is open:', isOpen)}
          />
        );
      case 'stacked':
        return (
          <Fab
            variant="stacked"
            items={
              items.map(({ icon, onPress }) => ({ icon, onPress })) as [
                { icon: React.ReactNode; onPress: () => void },
                { icon: React.ReactNode; onPress: () => void }?,
                { icon: React.ReactNode; onPress: () => void }?
              ]
            }
            isOpen={(isOpen) => console.log('Stacked FAB is open:', isOpen)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box style={styles.container}>
      <VScroll
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <VStack spacing="lg">
          {/* Header Card */}
          <Card style={styles.headerCard}>
            <CardHeader
              title="FAB Showcase"
              subtitle="Floating Action Button Examples"
            />
            <CardContent>
              <VStack spacing="md">
                <Typography style={styles.description}>
                  Explore different FAB variants with various action examples.
                  Each variant offers unique interaction patterns and visual
                  layouts.
                </Typography>
              </VStack>
            </CardContent>
          </Card>

          {/* FAB Variant Selection */}
          <Card style={styles.exampleCard}>
            <CardHeader title="FAB Variants" />
            <CardContent>
              <VStack spacing="sm">
                {fabVariants.map((variant) => (
                  <Button
                    key={variant.key}
                    onPress={() => setFabVariant(variant.key)}
                    variant={fabVariant === variant.key ? 'primary' : 'outline'}
                    size="md"
                  >
                    <ButtonText>{variant.label}</ButtonText>
                  </Button>
                ))}
              </VStack>
            </CardContent>
          </Card>

          {/* Example Type Selection */}
          <Card style={styles.exampleCard}>
            <CardHeader title="Action Examples" />
            <CardContent>
              <VStack spacing="sm">
                {examples.map((example) => (
                  <Button
                    key={example.key}
                    onPress={() => setSelectedExample(example.key)}
                    variant={
                      selectedExample === example.key ? 'secondary' : 'outline'
                    }
                    size="sm"
                  >
                    <ButtonText>{example.label}</ButtonText>
                  </Button>
                ))}
              </VStack>
            </CardContent>
          </Card>

          {/* Current Selection Info */}
          <Card style={styles.exampleCard}>
            <CardHeader title="Current Configuration" />
            <CardContent>
              <VStack spacing="sm">
                <HStack justify="space-between">
                  <Typography variant="body">Variant:</Typography>
                  <Typography variant="body" style={{ fontWeight: 'bold' }}>
                    {fabVariants.find((v) => v.key === fabVariant)?.label}
                  </Typography>
                </HStack>
                <HStack justify="space-between">
                  <Typography variant="body">Example:</Typography>
                  <Typography variant="body" style={{ fontWeight: 'bold' }}>
                    {examples.find((e) => e.key === selectedExample)?.label}
                  </Typography>
                </HStack>
                <Typography style={styles.description}>
                  {fabVariants.find((v) => v.key === fabVariant)?.description}
                </Typography>
              </VStack>
            </CardContent>
          </Card>

          {/* Usage Instructions */}
          <Card style={styles.exampleCard}>
            <CardHeader title="How to Use" />
            <CardContent>
              <VStack spacing="sm">
                <Typography style={styles.description}>
                  • Select a FAB variant from the buttons above
                </Typography>
                <Typography style={styles.description}>
                  • Choose an action example type
                </Typography>
                <Typography style={styles.description}>
                  • The FAB will appear in the bottom-right corner
                </Typography>
                <Typography style={styles.description}>
                  • Tap the main button to expand (for multi-action variants)
                </Typography>
                <Typography style={styles.description}>
                  • Toggle dark mode to see theme adaptation
                </Typography>
              </VStack>
            </CardContent>
          </Card>

          {/* Spacer for FAB visibility */}
          <Box style={{ height: 120 }} />
        </VStack>
      </VScroll>

      {/* Render the selected FAB */}
      {renderFab()}
    </Box>
  );
}
