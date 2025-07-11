import React, { useState } from 'react';
import {
  Heart,
  Star,
  Settings,
  Download,
  Plus,
  Edit,
  Trash2,
  Save,
} from 'lucide-react-native';
import {
  ButtonText,
  Button,
  ButtonIcon,
  useTheme,
  VScroll,
  Typography,
  Box,
  Theme,
  useThemedStyles,
} from 'rnc-theme';
import { StyleSheet } from 'react-native';

const ButtonScreen: React.FC = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const styles = useThemedStyles(createStyles);

  return (
    <VScroll style={styles.container}>
      <Typography style={styles.header}>UI Components Demo</Typography>

      {/* Button Variants Demo */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Button Variants</Typography>

        <Box style={styles.buttonGrid}>
          <Button variant="default">
            <ButtonText variant="default">Default</ButtonText>
          </Button>

          <Button variant="primary">
            <ButtonText variant="primary">Primary</ButtonText>
          </Button>

          <Button variant="secondary">
            <ButtonText variant="secondary">Secondary</ButtonText>
          </Button>

          <Button variant="outline">
            <ButtonText variant="outline">Outline</ButtonText>
          </Button>
        </Box>

        <Box style={styles.buttonGrid}>
          <Button variant="filled">
            <ButtonText variant="filled">Filled</ButtonText>
          </Button>

          <Button variant="ghost">
            <ButtonText variant="ghost">Ghost</ButtonText>
          </Button>

          <Button variant="success">
            <ButtonText variant="success">Success</ButtonText>
          </Button>

          <Button variant="error">
            <ButtonText variant="error">Error</ButtonText>
          </Button>
        </Box>

        <Box style={styles.buttonGrid}>
          <Button variant="warning">
            <ButtonText variant="warning">Warning</ButtonText>
          </Button>

          <Button variant="info">
            <ButtonText variant="info">Info</ButtonText>
          </Button>

          <Button variant="destructive">
            <ButtonText variant="destructive">Destructive</ButtonText>
          </Button>
        </Box>
      </Box>

      {/* Button Sizes Demo */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Button Sizes</Typography>

        <Box style={styles.buttonRow}>
          <Button variant="primary" size="xs">
            <ButtonText variant="primary" size="xs">
              XS
            </ButtonText>
          </Button>

          <Button variant="primary" size="sm">
            <ButtonText variant="primary" size="sm">
              Small
            </ButtonText>
          </Button>

          <Button variant="primary" size="md">
            <ButtonText variant="primary" size="md">
              Medium
            </ButtonText>
          </Button>

          <Button variant="primary" size="lg">
            <ButtonText variant="primary" size="lg">
              Large
            </ButtonText>
          </Button>

          <Button variant="primary" size="xl">
            <ButtonText variant="primary" size="xl">
              XL
            </ButtonText>
          </Button>
        </Box>
      </Box>

      {/* New Variant Showcase */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>
          New Variant Showcase
        </Typography>

        <Box style={styles.buttonGrid}>
          <Button variant="default">
            <ButtonIcon
              icon={<Settings color={theme.colors.text} />}
              variant="default"
              marginRight="xs"
            />
            <ButtonText variant="default">Default Style</ButtonText>
          </Button>

          <Button variant="filled">
            <ButtonIcon
              icon={<Star color={theme.colors.text} />}
              variant="filled"
              marginRight="xs"
            />
            <ButtonText variant="filled">Filled Style</ButtonText>
          </Button>

          <Button variant="destructive">
            <ButtonIcon
              icon={<Trash2 color={'#fff'} />}
              variant="destructive"
              marginRight="xs"
            />
            <ButtonText variant="destructive">Destructive</ButtonText>
          </Button>
        </Box>
      </Box>

      {/* Size Comparison */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Size Comparison</Typography>

        <Box style={styles.buttonRow}>
          <Button variant="outline" size="xs">
            <ButtonText variant="outline" size="xs">
              XS
            </ButtonText>
          </Button>
          <Button variant="outline" size="sm">
            <ButtonText variant="outline" size="sm">
              SM
            </ButtonText>
          </Button>
          <Button variant="outline" size="md">
            <ButtonText variant="outline" size="md">
              MD
            </ButtonText>
          </Button>
          <Button variant="outline" size="lg">
            <ButtonText variant="outline" size="lg">
              LG
            </ButtonText>
          </Button>
          <Button variant="outline" size="xl">
            <ButtonText variant="outline" size="xl">
              XL
            </ButtonText>
          </Button>
        </Box>
      </Box>

      {/* Button with Icons Demo */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Buttons with Icons</Typography>

        <Box style={styles.buttonGrid}>
          <Button variant="primary">
            <ButtonIcon
              icon={<Heart color={'#fff'} />}
              variant="primary"
              marginRight="xs"
            />
            <ButtonText variant="primary">Like</ButtonText>
          </Button>

          <Button variant="secondary">
            <ButtonIcon
              icon={<Star color={'#fff'} />}
              variant="secondary"
              marginRight="xs"
            />
            <ButtonText variant="secondary">Favorite</ButtonText>
          </Button>

          <Button variant="outline">
            <ButtonIcon
              icon={<Settings color={'#fff'} />}
              variant="outline"
              marginRight="xs"
            />
            <ButtonText variant="outline">Settings</ButtonText>
          </Button>

          <Button variant="success">
            <ButtonIcon
              icon={<Download color={'#fff'} />}
              variant="success"
              marginRight="xs"
            />
            <ButtonText variant="success">Download</ButtonText>
          </Button>
        </Box>

        {/* Icon Only Buttons */}
        <Box style={styles.buttonRow}>
          <Button variant="primary" style={{ width: 48, height: 48 }}>
            <ButtonIcon icon={<Plus color={'#fff'} />} variant="primary" />
          </Button>

          <Button variant="secondary" style={{ width: 48, height: 48 }}>
            <ButtonIcon icon={<Edit color={'#fff'} />} variant="secondary" />
          </Button>

          <Button variant="error" style={{ width: 48, height: 48 }}>
            <ButtonIcon icon={<Trash2 color={'#fff'} />} variant="error" />
          </Button>

          <Button variant="success" style={{ width: 48, height: 48 }}>
            <ButtonIcon icon={<Save color={'#fff'} />} variant="success" />
          </Button>
        </Box>
      </Box>

      {/* Button States Demo */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Button States</Typography>

        <Box style={styles.buttonGrid}>
          <Button variant="primary" disabled>
            <ButtonText variant="primary" disabled>
              Disabled
            </ButtonText>
          </Button>

          <Button
            variant="primary"
            loading={loading}
            disabled={loading}
            onPress={handleLoadingDemo}
          >
            <ButtonText
              variant="primary"
              loading={loading}
              showLoadingIndicator
            >
              {loading ? 'Loading...' : 'Click for Loading'}
            </ButtonText>
          </Button>
        </Box>
      </Box>

      {/* Component Types Demo */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Component Types</Typography>

        <Box style={styles.buttonGrid}>
          <Button variant="primary" component="pressable">
            <ButtonText variant="primary">Pressable</ButtonText>
          </Button>

          <Button variant="secondary" component="touchable">
            <ButtonText variant="secondary">TouchableOpacity</ButtonText>
          </Button>
        </Box>
      </Box>

      {/* Full Width Button */}
      <Box style={styles.section}>
        <Typography style={styles.sectionTitle}>Full Width Button</Typography>

        <Button variant="primary" fullWidth>
          <ButtonIcon
            icon={<Plus color={'#fff'} />}
            variant="primary"
            marginRight="xs"
          />
          <ButtonText variant="primary">Full Width Button</ButtonText>
        </Button>
      </Box>
    </VScroll>
  );
};

export default ButtonScreen;

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  header: {
    fontSize: theme.typography.heading.fontSize,
    fontWeight: theme.typography.heading.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
    textAlign: 'center' ,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: theme.typography.subtitle.fontWeight,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  themeControl: {
    flexDirection: 'row' ,
    alignItems: 'center' ,
    justifyContent: 'space-between' ,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.components.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  themeText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  buttonGrid: {
    flexDirection: 'row' ,
    flexWrap: 'wrap' ,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  buttonRow: {
    flexDirection: 'row' ,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
});