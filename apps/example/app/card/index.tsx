import React, { useState } from 'react';
import { View, Text, ScrollView, Switch } from 'react-native';
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ButtonText,
  Button,
  ButtonIcon,
  useTheme,
} from 'rnc-theme';

const CardScreen: React.FC = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const createStyles = () => ({
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
      textAlign: 'center' as const,
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
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.lg,
    },
    themeText: {
      fontSize: theme.typography.body.fontSize,
      color: theme.colors.text,
    },
    buttonGrid: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    buttonRow: {
      flexDirection: 'row' as const,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
  });

  const styles = createStyles();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>UI Components Demo</Text>

      {/* Theme Control */}
      <View style={styles.themeControl}>
        <Text style={styles.themeText}>
          Mode: {themeMode === 'light' ? 'Light' : 'Dark'}
        </Text>
        <Switch
          value={themeMode === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.surface}
        />
      </View>

      {/* Card Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Card Components</Text>

        <Card style={{ marginBottom: theme.spacing.md }}>
          <CardHeader
            title="Card dengan Header"
            subtitle="Ini adalah subtitle dari card"
          />
          <CardContent>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.body.fontSize,
              }}
            >
              Ini adalah konten dari card. Anda dapat menempatkan berbagai
              komponen di sini.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              <ButtonText variant="outline" size="sm">
                Cancel
              </ButtonText>
            </Button>
            <Button
              variant="primary"
              size="sm"
              style={{ marginLeft: theme.spacing.sm }}
            >
              <ButtonText variant="primary" size="sm">
                Save
              </ButtonText>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardContent>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.body.fontSize,
              }}
            >
              Card sederhana tanpa header dan footer.
            </Text>
          </CardContent>
        </Card>
      </View>

      {/* Button Variants Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Variants</Text>

        <View style={styles.buttonGrid}>
          <Button variant="primary">
            <ButtonText variant="primary">Primary</ButtonText>
          </Button>

          <Button variant="secondary">
            <ButtonText variant="secondary">Secondary</ButtonText>
          </Button>

          <Button variant="outline">
            <ButtonText variant="outline">Outline</ButtonText>
          </Button>

          <Button variant="ghost">
            <ButtonText variant="ghost">Ghost</ButtonText>
          </Button>
        </View>

        <View style={styles.buttonGrid}>
          <Button variant="success">
            <ButtonText variant="success">Success</ButtonText>
          </Button>

          <Button variant="error">
            <ButtonText variant="error">Error</ButtonText>
          </Button>

          <Button variant="warning">
            <ButtonText variant="warning">Warning</ButtonText>
          </Button>

          <Button variant="info">
            <ButtonText variant="info">Info</ButtonText>
          </Button>
        </View>
      </View>

      {/* Button Sizes Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Sizes</Text>

        <View style={styles.buttonRow}>
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
        </View>
      </View>

      {/* Button with Icons Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons with Icons</Text>

        <View style={styles.buttonGrid}>
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
        </View>

        {/* Icon Only Buttons */}
        <View style={styles.buttonRow}>
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
        </View>
      </View>

      {/* Button States Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button States</Text>

        <View style={styles.buttonGrid}>
          <Button variant="primary" disabled>
            <ButtonText variant="primary" disabled>
              Disabled
            </ButtonText>
          </Button>

          <Button
            variant="primary"
            loading={loading}
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
        </View>
      </View>

      {/* Component Types Demo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Component Types</Text>

        <View style={styles.buttonGrid}>
          <Button variant="primary" component="pressable">
            <ButtonText variant="primary">Pressable</ButtonText>
          </Button>

          <Button variant="secondary" component="touchable">
            <ButtonText variant="secondary">TouchableOpacity</ButtonText>
          </Button>
        </View>
      </View>

      {/* Full Width Button */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full Width Button</Text>

        <Button variant="primary" fullWidth>
          <ButtonIcon
            icon={<Plus color={'#fff'} />}
            variant="primary"
            marginRight="xs"
          />
          <ButtonText variant="primary">Full Width Button</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
};

export default CardScreen;
