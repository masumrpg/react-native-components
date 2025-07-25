import { View, StyleSheet } from 'react-native';
import {  Typography, useTheme } from 'rnc-theme';

// Component to demonstrate font usage
export default function FontScreen() {
  const { fontLoadingState } = useTheme();

  return (
    <View style={styles.container}>
      <Typography variant="heading" style={styles.section}>
        Font Integration Demo
      </Typography>

      <Typography variant="body" style={styles.status}>
        Font Status: {fontLoadingState.loaded ? '✅ Loaded' : '⏳ Loading...'}
        {fontLoadingState.error && ` (Error: ${fontLoadingState.error})`}
      </Typography>

      <View style={styles.section}>
        <Typography variant="title" style={styles.sampleText}>
          Typography Variants
        </Typography>

        <Typography variant="heading" style={styles.sampleText}>
          Heading - Poppins Bold (700)
        </Typography>

        <Typography variant="title" style={styles.sampleText}>
          Title - Poppins SemiBold (600)
        </Typography>

        <Typography variant="subtitle" style={styles.sampleText}>
          Subtitle - Poppins Medium (500)
        </Typography>

        <Typography variant="body" style={styles.sampleText}>
          Body - Poppins Regular (400)
        </Typography>

        <Typography variant="small" style={styles.sampleText}>
          Small - Poppins Regular (400)
        </Typography>

        <Typography variant="caption" style={styles.sampleText}>
          Caption - Poppins Regular (400)
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography variant="title" style={styles.sampleText}>
          Custom Weight Examples
        </Typography>

        <Typography variant="body" weight="400" style={styles.sampleText}>
          Weight 400 - Regular
        </Typography>

        <Typography variant="body" weight="500" style={styles.sampleText}>
          Weight 500 - Medium
        </Typography>

        <Typography variant="body" weight="600" style={styles.sampleText}>
          Weight 600 - SemiBold
        </Typography>

        <Typography variant="body" weight="700" style={styles.sampleText}>
          Weight 700 - Bold
        </Typography>
      </View>

      <View style={styles.section}>
        <Typography variant="title" style={styles.sampleText}>
          Text Alignment Examples
        </Typography>

        <Typography variant="body" align="left" style={styles.sampleText}>
          Left aligned text
        </Typography>

        <Typography variant="body" align="center" style={styles.sampleText}>
          Center aligned text
        </Typography>

        <Typography variant="body" align="right" style={styles.sampleText}>
          Right aligned text
        </Typography>
      </View>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    section: {
      marginBottom: 24,
    },
    sampleText: {
      marginBottom: 8,
    },
    status: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: '#e3f2fd',
      borderRadius: 8,
    },
  });